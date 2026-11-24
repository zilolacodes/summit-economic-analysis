/* ==========================================================================
   07b · LEARNING ENGINE — memory, spaced repetition and session building
   --------------------------------------------------------------------------
   Every written question and every generator template has a memory card
   (Leitner box 1–5). A first-try correct answer moves it up a box, a mistake
   sends it back to box 1. Session building samples by weight: weak and new
   items appear more often, mastered and just-seen items less often.
   Generators are remembered by template, so a weak skill comes back with
   new numbers rather than the same problem.
   ========================================================================== */
const Memory = {
  key: (q) => q.gen || q.id,
  get(key) { return Store.state.memory[key] || null; },
  update(q, ok) {
    const k = this.key(q), m = Store.state.memory[k] || { s: 0, c: 0, b: 0, t: 0 };
    m.s += 1; if (ok) { m.c += 1; m.b = Math.min(5, Math.max(1, m.b) + 1); } else m.b = 1;
    m.t = Date.now();
    Store.state.memory[k] = m;
  },
  weight(key) {
    const m = this.get(key);
    if (!m) return 3;
    const base = [3, 6, 3.5, 2, 1.2, 0.6][m.b] ?? 1;
    return Date.now() - m.t < 15 * 60 * 1000 ? base * 0.25 : base;
  },
  /** Items (bank ids and generator ids) that belong to a module. */
  items(moduleId) {
    return [...Object.values(CATALOG).filter((q) => q.module === moduleId).map((q) => q.id), ...GEN.list.filter((g) => g.module === moduleId).map((g) => g.id)];
  },
  /** Mastery 0–100: average box progress; `seen` — items practised at least once. */
  mastery(moduleId) {
    const items = this.items(moduleId);
    let score = 0, seen = 0;
    items.forEach((k) => { const m = this.get(k); if (m) { seen++; score += clamp((m.b - 1) / 4, 0, 1); } });
    return { pct: items.length ? Math.round(score / items.length * 100) : 0, seen, total: items.length };
  },
  weakItems() {
    return Object.entries(Store.state.memory).filter(([, m]) => m.b === 1).map(([k]) => k).filter((k) => CATALOG[k] || GEN.byId[k]);
  }
};

const Builder = {
  /** Weighted sampling without replacement. */
  sample(pool, k, rnd) {
    const out = [], items = [...pool];
    while (out.length < k && items.length) {
      const total = sum(items, (x) => x.w);
      let t = rnd() * total, i = 0;
      while (i < items.length - 1 && (t -= items[i].w) > 0) i++;
      out.push(items.splice(i, 1)[0]);
    }
    return out;
  },
  /**
   * Builds a session: a difficulty mix of about 25 / 40 / 25 / 10 per cent,
   * drawn by memory weight. Generators may appear more than once (new numbers).
   */
  build({ modules = null, keys = null, size = 20 }) {
    const rnd = mulberry32((Date.now() ^ (Math.random() * 1e9)) >>> 0);
    const inScope = (m) => !modules || modules.includes(m);
    let pool = [
      ...Object.values(CATALOG).filter((q) => inScope(q.module)).map((q) => ({ key: q.id, diff: q.diff, gen: false })),
      ...GEN.list.filter((g) => inScope(g.module)).map((g) => ({ key: g.id, diff: g.diff, gen: true }))
    ];
    if (keys) pool = pool.filter((x) => keys.includes(x.key));
    pool.forEach((x) => { x.w = Memory.weight(x.key) * (x.gen ? 1.15 : 1); });
    if (!pool.length) return [];

    const shares = { easy: 0.25, medium: 0.4, hard: 0.25, expert: 0.1 };
    const target = Object.fromEntries(CONFIG.diffs.map((d) => [d, Math.round(size * shares[d])]));
    let diffSum = sum(Object.values(target)); target.medium += size - diffSum;

    const picked = [];
    CONFIG.diffs.forEach((d) => picked.push(...this.sample(pool.filter((x) => x.diff === d && !picked.includes(x)), target[d], rnd)));
    // Fill any shortfall from the rest of the pool, then let generators repeat with new numbers.
    if (picked.length < size) picked.push(...this.sample(pool.filter((x) => !picked.includes(x)), size - picked.length, rnd));
    const gens = pool.filter((x) => x.gen);
    let guard = 0;
    while (picked.length < size && gens.length && guard++ < 200) picked.push({ ...this.sample(gens, 1, rnd)[0] });

    const seed = () => 1 + Math.floor(rnd() * 2e9);
    return picked
      .map((x) => ({ x, r: rnd() }))
      .sort((a, b) => CONFIG.diffLevel[a.x.diff] - CONFIG.diffLevel[b.x.diff] || a.r - b.r)
      .map(({ x }) => (x.gen ? `g:${x.key}:${seed()}` : x.key));
  }
};

/* ── Dates & schedule ───────────────────────────────────────────────────── */
const Schedule = {
  today() { const d = new Date(); d.setHours(0, 0, 0, 0); return d; },
  parse(s) { if (!s) return null; const [y, m, d] = s.split(`-`).map(Number); return new Date(y, m - 1, d); },
  daysUntil(s) { const d = this.parse(s); return d ? Math.round((d - this.today()) / 86400000) : null; },
  short(s) { const d = this.parse(s); return d ? `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}` : `—`; },
  long(s) { const d = this.parse(s); return d ? d.toLocaleDateString(lang() === `ru` ? `ru-RU` : `en-GB`, { day: `numeric`, month: `long`, year: `numeric` }) : `—`; },
  lastDate(m) { return [...m.lectures, ...m.practices].map((x) => x[1]).filter(Boolean).sort().pop(); },
  status(m) {
    if (m.id === ASSIGNMENT.module) return `assignment`;
    const last = this.lastDate(m);
    if (last && this.daysUntil(last) < 0) return `done`;
    const upcoming = MODULES.filter((x) => x.id !== ASSIGNMENT.module && this.daysUntil(this.lastDate(x)) >= 0)
      .sort((a, b) => this.lastDate(a).localeCompare(this.lastDate(b)));
    return upcoming[0] && upcoming[0].id === m.id ? `next` : `upcoming`;
  },
  countdown(s) {
    const n = this.daysUntil(s), t = L().home.due;
    if (n === null) return ``;
    if (n === 0) return t.today;
    if (n === 1) return t.tomorrow;
    if (n > 1) return fmt(t.inDays, { n, d: plural(n, `day`) });
    return fmt(t.overdue, { n: -n, d: plural(-n, `day`) });
  },
  range(list) {
    if (!list.length) return ``;
    const nums = list.map((x) => x[0]);
    return nums.length > 1 ? `${nums[0]}–${nums[nums.length - 1]}` : `${nums[0]}`;
  }
};

/* ── Interface strings for the course dashboard and library ─────────────── */
Object.assign(I18N.ru.plural, { day: [`день`, `дня`, `дней`], task: [`задание`, `задания`, `заданий`] });
Object.assign(I18N.en.plural, { day: [`day`, `days`], task: [`task`, `tasks`] });
Object.assign(I18N.ru.results, { byType: `По типам заданий`, byModule: `Результаты по темам курса` });
Object.assign(I18N.en.results, { byType: `By question type`, byModule: `Results by course topic` });
I18N.ru.keys.list.splice(9, 0, [`Конспект темы`, [`L`]]);
I18N.en.keys.list.splice(9, 0, [`Topic notes`, [`L`]]);
Object.assign(I18N.ru, {
  home: {
    eyebrow: `Курс · 15 тем · 22 лекции · 15 практик`,
    profile: `Ваше имя`, language: `Язык`,
    assignment: `Текущее задание`, practice: `Практика`, lecture: `Лекция`, lectures: `Лекции`,
    due: { label: `Срок`, today: `сегодня`, tomorrow: `завтра`, inDays: `через {n} {d}`, overdue: `срок прошёл {n} {d} назад` },
    mastery: `Освоение темы`, studied: `отработано {a} из {t}`,
    prepare: `Подготовиться`, notes: `Конспект`,
    quick: { mixed: `Итоговый тест`, mixedText: `30 вопросов по всем 15 темам`, review: `Работа над ошибками`, reviewText: `{n} {w} к повторению`, reviewNone: `Ошибок пока нет`, library: `Библиотека`, libraryText: `Конспекты, формулы и примеры` },
    map: `Программа курса`, mapHint: `Каждая тема — конспект и бесконечный тренажёр. Освоение растёт с каждым верным ответом.`,
    status: { assignment: `Задание`, done: `Пройдено`, next: `Далее`, upcoming: `Впереди` },
    test: `Тест`, open: `Открыть`, endless: `Задачи с новыми числами при каждой попытке`
  },
  session: { title: `Новая сессия`, mode: `Режим`, size: `Количество вопросов`, start: `Начать`, mixedTitle: `Итоговый тест по курсу`, reviewTitle: `Работа над ошибками`, retryTitle: `Повторение ошибок`, scopeAll: `Весь курс` },
  lib: { title: `Библиотека`, search: `Поиск по темам и формулам`, nothing: `Ничего не найдено`, topic: `Тема`, concepts: `Ключевые понятия`, formulas: `Формулы`, example: `Разбор примера`, pitfalls: `Типичные ошибки`, summary: `Главное`, test: `Проверить себя`, prev: `Предыдущая тема`, next: `Следующая тема`, choose: `Выбрать тему`, step: `Шаг`, openNotes: `Открыть конспект темы` },
  toastX: { noReview: `Пока нечего повторять — сначала пройдите несколько тестов`, nameNeeded: `` }
});
Object.assign(I18N.en, {
  home: {
    eyebrow: `Course · 15 topics · 22 lectures · 15 practicals`,
    profile: `Your name`, language: `Language`,
    assignment: `Current assignment`, practice: `Practical`, lecture: `Lecture`, lectures: `Lectures`,
    due: { label: `Due`, today: `today`, tomorrow: `tomorrow`, inDays: `in {n} {d}`, overdue: `{n} {d} overdue` },
    mastery: `Topic mastery`, studied: `{a} of {t} practised`,
    prepare: `Prepare`, notes: `Study notes`,
    quick: { mixed: `Final test`, mixedText: `30 questions across all 15 topics`, review: `Fix my mistakes`, reviewText: `{n} {w} to review`, reviewNone: `No mistakes yet`, library: `Library`, libraryText: `Notes, formulas and examples` },
    map: `Course map`, mapHint: `Every topic has study notes and an endless trainer. Mastery grows with every correct answer.`,
    status: { assignment: `Assignment`, done: `Done`, next: `Next`, upcoming: `Ahead` },
    test: `Test`, open: `Open`, endless: `New numbers in problems on every attempt`
  },
  session: { title: `New session`, mode: `Mode`, size: `Number of questions`, start: `Start`, mixedTitle: `Final course test`, reviewTitle: `Fix my mistakes`, retryTitle: `Retry mistakes`, scopeAll: `Whole course` },
  lib: { title: `Library`, search: `Search topics and formulas`, nothing: `Nothing found`, topic: `Topic`, concepts: `Key concepts`, formulas: `Formulas`, example: `Worked example`, pitfalls: `Common mistakes`, summary: `In short`, test: `Test yourself`, prev: `Previous topic`, next: `Next topic`, choose: `Choose a topic`, step: `Step`, openNotes: `Open topic notes` },
  toastX: { noReview: `Nothing to review yet — take a few tests first`, nameNeeded: `` }
});
