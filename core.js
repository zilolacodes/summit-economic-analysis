/* ==========================================================================
   01 · CONFIG
   ========================================================================== */
const CONFIG = Object.freeze({
  storageKey: `sansui.cashflow.v1`,
  letters: [`A`, `B`, `C`, `D`],
  modes: [`study`, `exam`, `practice`, `challenge`],
  diffs: [`easy`, `medium`, `hard`, `expert`],
  diffLevel: { easy: 1, medium: 2, hard: 3, expert: 4 },
  xp: { easy: 10, medium: 20, hard: 30, expert: 50 },
  stars: { easy: 1, medium: 2, hard: 3, expert: 4 },
  weight: { easy: 1, medium: 2, hard: 3, expert: 4 },
  practiceRetryXp: 0.3,          // share of XP for a correct answer found after retries
  speedBonusMax: 0.5,            // challenge mode: up to +50% XP for speed
  streakBonusStep: 2,            // +2 XP per streak level beyond the first…
  streakBonusCap: 5,             // …capped at five levels
  splashMinMs: 900,
  resultsLoaderMs: 1500
});

/* ==========================================================================
   02 · INTERNATIONALISATION
   ========================================================================== */
const I18N = {
  ru: {
    langName: `Русский`, brandSub: `Академия`,
    plural: { question: [`вопрос`, `вопроса`, `вопросов`], minute: [`минута`, `минуты`, `минут`], topic: [`тема`, `темы`, `тем`], level: [`уровень`, `уровня`, `уровней`] },
    a11y: { lang: `Язык интерфейса`, sound: `Звук`, navigator: `Навигатор по вопросам`, shortcuts: `Горячие клавиши`, home: `На главную`, close: `Закрыть`, options: `Варианты ответа`, modes: `Режим обучения` },
    welcome: {
      facts: { questions: `вопросов`, minutes: `минут`, levels: `уровня сложности`, topics: `тем курса` },
      seal: `Работает без интернета. Прогресс сохраняется на этом устройстве.`,
      setupTitle: `Начнём`, setupHint: `≈ {min} мин`,
      name: `Ваше имя`, nameHint: `Нужно для сертификата`,
      language: `Язык`, mode: `Режим обучения`,
      start: `Начать обучение`, note: `Нажмите`, noteTail: `чтобы начать`
    },
    modes: {
      study:     { name: `Учёба`,     desc: `Подробный разбор сразу после каждого ответа.` },
      exam:      { name: `Экзамен`,   desc: `Без подсказок. Ответы можно менять, разбор — в конце.` },
      practice:  { name: `Практика`,  desc: `Пробуйте снова, пока не найдёте верный ответ.` },
      challenge: { name: `Испытание`, desc: `Таймер на каждый вопрос и бонус XP за скорость.` }
    },
    resume: { title: `Незавершённая попытка`, text: `Вопрос {n} из {t} · режим «{mode}»`, go: `Продолжить`, discard: `Заново`,
              doneTitle: `Последний результат: {pct}%`, doneText: `Режим «{mode}» · {date}`, open: `Открыть итоги` },
    diff: { easy: `Лёгкий`, medium: `Средний`, hard: `Сложный`, expert: `Экспертный` },
    types: { scenario: `Ситуационная задача`, match: `Сопоставление`, compare: `Сравнение понятий`, concept: `Понимание концепции`, calc: `Расчётная задача`,
             order: `Последовательность`, case: `Кейс`, incorrect: `Найдите неверное утверждение`, cause: `Причина и следствие` },
    quiz: {
      question: `Вопрос`, prev: `Назад`, next: `Далее`, skip: `Пропустить`, finish: `Завершить`,
      bookmark: `Закладка`, review: `Вернуться позже`,
      sec: `с`, min: `мин`, approx: `≈`,
      saved: `Ответ сохранён. До завершения экзамена его можно изменить.`,
      retry: `Не совсем. Подумайте ещё раз.`, retryWhy: `Почему не {l}:`,
      timeout: `Время вышло`
    },
    verdict: {
      right: [`Верно`, `Именно так`, `Точно в цель`, `Совершенно верно`],
      wrong: [`Не совсем`, `Почти, но нет`, `Есть над чем подумать`],
      afterTries: `Найдено с {n}-й попытки`, timeout: `Время вышло`,
      answer: `Правильный ответ`, xp: `XP`, speed: `бонус за скорость`, streak: `за серию`
    },
    ex: { why: `Почему это верно`, takeaway: `Главный вывод`, options: `Разбор каждого варианта`, picked: `ваш выбор`,
          trick: `Приём запоминания`, mistake: `Частая ошибка на экзамене`, example: `Применение на практике`, related: `Связанное понятие` },
    hud: { progress: `Прогресс`, answered: `отвечено`, score: `Счёт`, accuracy: `Точность`, streak: `Серия`, longest: `Рекорд`,
           xp: `XP`, stars: `Звёзды`, remaining: `Осталось`, eta: `Время`, locked: `Счёт откроется после завершения экзамена`,
           navigator: `Навигатор`, finish: `Завершить` },
    nav: { title: `Навигатор`, sub: `{a} из {t} отвечено`, stats: `Статистика`, grid: `Вопросы`,
           legend: { none: `Без ответа`, answered: `Отвечен`, ok: `Верно`, bad: `Неверно`, bm: `Закладка`, rv: `Вернуться позже` },
           jump: `Перейти к вопросу`, jumpGo: `Перейти`, jumpPh: `№ 1–{t}`, jumpBad: `Введите номер от 1 до {t}` },
    finish: { title: `Завершить попытку?`, text: `Проверьте сводку. После завершения ответы изменить нельзя.`,
              answered: `Отвечено`, unanswered: `Без ответа`, review: `Отмечено «вернуться позже»`,
              stay: `Продолжить`, confirm: `Завершить и посмотреть итоги`, gotoFirst: `К первому без ответа`, gotoReview: `К отложенным` },
    exit: { title: `Выйти на главную?`, text: `Прогресс сохранится — вы сможете продолжить с того же места.`, stay: `Остаться`, confirm: `Выйти` },
    keys: { title: `Горячие клавиши`, text: `Всё управление доступно с клавиатуры.`,
            list: [[`Выбрать ответ`, [`1`, `–`, `4`]], [`Выбрать ответ`, [`A`, `–`, `D`]], [`Следующий вопрос`, [`→`]], [`Предыдущий вопрос`, [`←`]],
                   [`Пропустить`, [`S`]], [`Закладка`, [`K`]], [`Вернуться позже`, [`R`]], [`Навигатор`, [`N`]], [`Звук`, [`M`]], [`Эта справка`, [`?`]], [`Закрыть окно`, [`Esc`]]] },
    toast: { bm: `Добавлено в закладки`, bmOff: `Закладка снята`, rv: `Отмечено: вернуться позже`, rvOff: `Отметка снята`,
             skipped: `Вопрос пропущен — вернуться можно через навигатор`, soundOn: `Звук включён`, soundOff: `Звук выключен`,
             allDone: `Все вопросы отвечены — можно завершать`, retry: `Повторяем ошибки: {n}`, noStorage: `Браузер не разрешает сохранять прогресс — не закрывайте вкладку` },
    loader: { boot: `Раскрываем свиток`, bootSub: `Готовим материалы курса`, results: `Подводим итоги`, resultsSub: `Анализируем ответы по темам и уровням` },
    results: {
      eyebrow: `Итоги попытки`, of: `верных ответов`,
      headline: { A: `Блестящий результат`, B: `Сильный результат`, C: `Хорошая основа`, D: `Есть база — продолжим`, F: `Начало пути` },
      message: {
        A: `Вы уверенно владеете логикой анализа денежных потоков — от классификации до моделей управления остатком. Такое понимание переносится на любые реальные отчёты.`,
        B: `Почти все ключевые идеи усвоены. Несколько точечных пробелов — и материал будет освоен полностью.`,
        C: `Основные принципы понятны. Разберите ошибки ниже: в каждой есть приём запоминания и пример из практики.`,
        D: `Фундамент есть. Пройдите разбор ошибок и повторите курс в режиме «Учёба» — объяснения после каждого вопроса быстро закроют пробелы.`,
        F: `Каждый эксперт когда-то начинал отсюда. Начните с режима «Учёба»: разборы построены так, чтобы объяснять, а не просто проверять.`
      },
      gradeLabel: { A: `Отлично`, B: `Очень хорошо`, C: `Хорошо`, D: `Удовлетворительно`, F: `Нужно повторить` },
      tiles: { correct: `Верно`, accuracy: `Точность`, xp: `Опыт`, longest: `Лучшая серия`, stars: `Звёзды`, time: `Время` },
      topics: `Результаты по темам`, topicsHint: `Доля верных ответов с первой попытки`,
      diff: `По уровням сложности`,
      timeline: `Динамика точности`, timelineHint: `Линия — накопленная точность по ходу попытки, точки — отдельные вопросы, золотые полосы — серии верных ответов. Нажмите на точку, чтобы открыть разбор.`,
      legend: { ok: `Верно`, bad: `Неверно`, skip: `Без ответа`, streak: `Серия` },
      sw: `Сильные и слабые стороны`, strong: `Сильнейшая тема`, weak: `Требует внимания`, allStrong: `Слабых тем не найдено`, allStrongText: `Все темы пройдены на высоком уровне`,
      mastery: `Оценка владения материалом`, masteryNote: `Учитывает сложность вопросов, число попыток и скорость ответа.`,
      levels: { novice: `Начальный уровень`, basic: `Базовый уровень`, confident: `Уверенный уровень`, advanced: `Продвинутый уровень`, expert: `Экспертный уровень` },
      levelText: {
        novice: `Понятия знакомы, но связи между ними ещё не сложились. Двигайтесь от сущности денежного потока к методам расчёта.`,
        basic: `Основные определения усвоены. Следующий шаг — расчёты и интерпретация показателей.`,
        confident: `Вы понимаете логику и умеете считать. Отработайте сложные кейсы, где нужно сопоставлять несколько показателей.`,
        advanced: `Вы свободно применяете методы анализа. Остались отдельные тонкости экспертного уровня.`,
        expert: `Вы владеете материалом на уровне, достаточном для анализа реальной отчётности.`
      },
      recs: `Рекомендации`, recsHint: `Персональный план на основе ваших ответов`,
      recTopic: `{topic}: {c} из {t}`,
      recSkipped: `Вернитесь к пропущенным вопросам`, recSkippedText: `Без ответа осталось: {n}. Даже неверная попытка с последующим разбором учит лучше, чем пропуск.`,
      recStudy: `Пройдите курс в режиме «Учёба»`, recStudyText: `Разбор после каждого ответа помогает выстроить логику темы шаг за шагом.`,
      recExam: `Проверьте себя в режиме «Экзамен»`, recExamText: `Без подсказок станет видно, что действительно закрепилось.`,
      recChallenge: `Примите «Испытание»`, recChallengeText: `Таймер проверит, насколько автоматическим стало ваше понимание.`,
      recSpaced: `Закрепите через неделю`, recSpacedText: `Интервальное повторение — самый надёжный способ перевести знания в долговременную память.`,
      badges: `Достижения`, badgesHint: `{n} из {t} получено`,
      review: `Разбор ответов`, filters: { all: `Все`, wrong: `Ошибки`, bm: `Закладки`, rv: `Отложенные` },
      yours: `Ваш ответ`, correctAns: `Правильный ответ`, none: `нет ответа`, timedOut: `время вышло`, afterTries: `найден с {n}-й попытки`, empty: `В этой категории вопросов нет.`,
      actions: { cert: `Сертификат`, print: `Сохранить отчёт в PDF`, retry: `Повторить ошибки`, restart: `Новая попытка` }
    },
    badges: {
      first:    [`Первый шаг`, `Первый верный ответ`],
      streak5:  [`Пять подряд`, `Серия из 5 верных ответов`],
      streak10: [`Ровный поток`, `Серия из 10 верных ответов`],
      summit:   [`Покоритель вершин`, `Все сложные и экспертные вопросы — верно`],
      expert:   [`Экспертный взгляд`, `Оба экспертных вопроса — верно`],
      swift:    [`Быстрая мысль`, `5 верных ответов в «Испытании», пока таймер не прошёл половину`],
      honours:  [`С отличием`, `Результат 90% и выше`],
      finisher: [`До конца`, `Ответ дан на каждый вопрос`]
    },
    cert: { kicker: `Академия Summit`, title: `Сертификат`, sub: `настоящим подтверждается, что`,
            body: `успешно прошёл(а) интерактивный курс <b>«{course}»</b> по дисциплине «{subject}»`,
            score: `Результат`, grade: `Оценка`, level: `Уровень`, sig: `Учебный совет`, sigName: `Академия Summit`, date: `Дата`, no: `№`,
            nameLabel: `Имя в сертификате`, fallbackName: `Слушатель курса`, print: `Печать или PDF`, close: `Закрыть` },
    level: { novice: `Начальный`, basic: `Базовый`, confident: `Уверенный`, advanced: `Продвинутый`, expert: `Экспертный` }
  },

  en: {
    langName: `English`, brandSub: `Academy`,
    plural: { question: [`question`, `questions`], minute: [`minute`, `minutes`], topic: [`topic`, `topics`], level: [`level`, `levels`] },
    a11y: { lang: `Interface language`, sound: `Sound`, navigator: `Question navigator`, shortcuts: `Keyboard shortcuts`, home: `Home`, close: `Close`, options: `Answer options`, modes: `Learning mode` },
    welcome: {
      facts: { questions: `questions`, minutes: `minutes`, levels: `difficulty levels`, topics: `course topics` },
      seal: `Works offline. Your progress is saved on this device.`,
      setupTitle: `Let’s begin`, setupHint: `≈ {min} min`,
      name: `Your name`, nameHint: `Used on your certificate`,
      language: `Language`, mode: `Learning mode`,
      start: `Start learning`, note: `Press`, noteTail: `to begin`
    },
    modes: {
      study:     { name: `Study`,     desc: `A full explanation right after every answer.` },
      exam:      { name: `Exam`,      desc: `No hints. Change answers freely; review at the end.` },
      practice:  { name: `Practice`,  desc: `Keep trying until you find the right answer.` },
      challenge: { name: `Challenge`, desc: `A timer on every question and bonus XP for speed.` }
    },
    resume: { title: `Unfinished attempt`, text: `Question {n} of {t} · {mode} mode`, go: `Continue`, discard: `Start over`,
              doneTitle: `Last result: {pct}%`, doneText: `{mode} mode · {date}`, open: `Open results` },
    diff: { easy: `Easy`, medium: `Medium`, hard: `Hard`, expert: `Expert` },
    types: { scenario: `Scenario`, match: `Matching`, compare: `Compare concepts`, concept: `Concept check`, calc: `Calculation`,
             order: `Sequence`, case: `Case study`, incorrect: `Find the incorrect statement`, cause: `Cause and effect` },
    quiz: {
      question: `Question`, prev: `Back`, next: `Next`, skip: `Skip`, finish: `Finish`,
      bookmark: `Bookmark`, review: `Review later`,
      sec: `s`, min: `min`, approx: `≈`,
      saved: `Answer saved. You can change it until you finish the exam.`,
      retry: `Not quite. Think it through once more.`, retryWhy: `Why not {l}:`,
      timeout: `Time is up`
    },
    verdict: {
      right: [`Correct`, `Exactly`, `Spot on`, `Well reasoned`],
      wrong: [`Not quite`, `Close, but no`, `Worth a second look`],
      afterTries: `Found on attempt {n}`, timeout: `Time is up`,
      answer: `Correct answer`, xp: `XP`, speed: `speed bonus`, streak: `streak`
    },
    ex: { why: `Why this is correct`, takeaway: `Key takeaway`, options: `Every option, explained`, picked: `your pick`,
          trick: `Memory trick`, mistake: `Common exam mistake`, example: `Real-world application`, related: `Related concept` },
    hud: { progress: `Progress`, answered: `answered`, score: `Score`, accuracy: `Accuracy`, streak: `Streak`, longest: `Best`,
           xp: `XP`, stars: `Stars`, remaining: `Left`, eta: `Time`, locked: `Your score unlocks when the exam is finished`,
           navigator: `Navigator`, finish: `Finish` },
    nav: { title: `Navigator`, sub: `{a} of {t} answered`, stats: `Statistics`, grid: `Questions`,
           legend: { none: `Unanswered`, answered: `Answered`, ok: `Correct`, bad: `Incorrect`, bm: `Bookmark`, rv: `Review later` },
           jump: `Jump to question`, jumpGo: `Go`, jumpPh: `No. 1–{t}`, jumpBad: `Enter a number from 1 to {t}` },
    finish: { title: `Finish this attempt?`, text: `Check the summary. Answers cannot be changed after finishing.`,
              answered: `Answered`, unanswered: `Unanswered`, review: `Marked “review later”`,
              stay: `Keep going`, confirm: `Finish and see results`, gotoFirst: `First unanswered`, gotoReview: `Go to marked` },
    exit: { title: `Return home?`, text: `Your progress is saved — you can pick up exactly where you left off.`, stay: `Stay`, confirm: `Leave` },
    keys: { title: `Keyboard shortcuts`, text: `Everything can be done from the keyboard.`,
            list: [[`Choose an answer`, [`1`, `–`, `4`]], [`Choose an answer`, [`A`, `–`, `D`]], [`Next question`, [`→`]], [`Previous question`, [`←`]],
                   [`Skip`, [`S`]], [`Bookmark`, [`K`]], [`Review later`, [`R`]], [`Navigator`, [`N`]], [`Sound`, [`M`]], [`This help`, [`?`]], [`Close dialog`, [`Esc`]]] },
    toast: { bm: `Bookmarked`, bmOff: `Bookmark removed`, rv: `Marked to review later`, rvOff: `Mark removed`,
             skipped: `Question skipped — return any time from the navigator`, soundOn: `Sound on`, soundOff: `Sound off`,
             allDone: `Every question answered — you can finish now`, retry: `Retrying mistakes: {n}`, noStorage: `This browser blocks saving progress — keep the tab open` },
    loader: { boot: `Unrolling the scroll`, bootSub: `Preparing the course`, results: `Gathering your results`, resultsSub: `Analysing answers by topic and level` },
    results: {
      eyebrow: `Attempt summary`, of: `correct answers`,
      headline: { A: `An outstanding result`, B: `A strong result`, C: `A solid foundation`, D: `The basics are there`, F: `The start of the path` },
      message: {
        A: `You have a confident command of cash flow analysis — from classification to cash balance models. This understanding carries over to any real statement.`,
        B: `Nearly every key idea has landed. Close a few specific gaps and the material is fully yours.`,
        C: `The core principles are clear. Work through the mistakes below — each comes with a memory trick and a real-world example.`,
        D: `The foundation is in place. Review your mistakes and repeat the course in Study mode — explanations after every question close gaps quickly.`,
        F: `Every expert started here. Begin with Study mode: the explanations are built to teach, not just to test.`
      },
      gradeLabel: { A: `Excellent`, B: `Very good`, C: `Good`, D: `Satisfactory`, F: `Needs review` },
      tiles: { correct: `Correct`, accuracy: `Accuracy`, xp: `Experience`, longest: `Best streak`, stars: `Stars`, time: `Time` },
      topics: `Performance by topic`, topicsHint: `Share of correct first-attempt answers`,
      diff: `By difficulty`,
      timeline: `Accuracy timeline`, timelineHint: `The line traces cumulative accuracy through the attempt, dots are individual questions, gold bands are correct streaks. Select a dot to open its explanation.`,
      legend: { ok: `Correct`, bad: `Incorrect`, skip: `Unanswered`, streak: `Streak` },
      sw: `Strengths and gaps`, strong: `Strongest topic`, weak: `Needs attention`, allStrong: `No weak topics found`, allStrongText: `Every topic was completed at a high level`,
      mastery: `Estimated mastery`, masteryNote: `Accounts for question difficulty, number of attempts and answer speed.`,
      levels: { novice: `Beginner level`, basic: `Foundation level`, confident: `Confident level`, advanced: `Advanced level`, expert: `Expert level` },
      levelText: {
        novice: `The terms are familiar, but the links between them have not formed yet. Move from the nature of cash flow towards the calculation methods.`,
        basic: `The core definitions are in place. Next step: calculations and interpreting the indicators.`,
        confident: `You understand the logic and can calculate. Practise complex cases that require weighing several indicators together.`,
        advanced: `You apply the methods fluently. Only a few expert-level subtleties remain.`,
        expert: `You command the material well enough to analyse real financial statements.`
      },
      recs: `Recommendations`, recsHint: `A personal plan based on your answers`,
      recTopic: `{topic}: {c} of {t}`,
      recSkipped: `Return to the skipped questions`, recSkippedText: `Left unanswered: {n}. Even a wrong attempt followed by the explanation teaches more than a skip.`,
      recStudy: `Take the course in Study mode`, recStudyText: `An explanation after every answer builds the logic of the topic step by step.`,
      recExam: `Test yourself in Exam mode`, recExamText: `Without hints you will see what has truly stuck.`,
      recChallenge: `Take the Challenge`, recChallengeText: `The timer shows how automatic your understanding has become.`,
      recSpaced: `Revisit in a week`, recSpacedText: `Spaced repetition is the most reliable way to move knowledge into long-term memory.`,
      badges: `Achievements`, badgesHint: `{n} of {t} earned`,
      review: `Answer review`, filters: { all: `All`, wrong: `Mistakes`, bm: `Bookmarks`, rv: `Marked` },
      yours: `Your answer`, correctAns: `Correct answer`, none: `no answer`, timedOut: `time ran out`, afterTries: `found on attempt {n}`, empty: `No questions in this category.`,
      actions: { cert: `Certificate`, print: `Save report as PDF`, retry: `Retry mistakes`, restart: `New attempt` }
    },
    badges: {
      first:    [`First step`, `Your first correct answer`],
      streak5:  [`Five in a row`, `A streak of 5 correct answers`],
      streak10: [`Steady flow`, `A streak of 10 correct answers`],
      summit:   [`Summit reached`, `Every hard and expert question correct`],
      expert:   [`Expert eye`, `Both expert questions correct`],
      swift:    [`Swift mind`, `5 correct Challenge answers before half the timer ran out`],
      honours:  [`With honours`, `A score of 90% or higher`],
      finisher: [`All the way`, `An answer to every question`]
    },
    cert: { kicker: `Summit Academy`, title: `Certificate`, sub: `this is to certify that`,
            body: `has successfully completed the interactive course <b>“{course}”</b> in {subject}`,
            score: `Score`, grade: `Grade`, level: `Level`, sig: `Academic board`, sigName: `Summit Academy`, date: `Date`, no: `No.`,
            nameLabel: `Name on certificate`, fallbackName: `Course participant`, print: `Print or save as PDF`, close: `Close` },
    level: { novice: `Beginner`, basic: `Foundation`, confident: `Confident`, advanced: `Advanced`, expert: `Expert` }
  }
};

/* ==========================================================================
   05 · UTILITIES
   ========================================================================== */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const sum = (arr, fn = (x) => x) => arr.reduce((s, x) => s + fn(x), 0);
const pad2 = (n) => String(n).padStart(2, `0`);
const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": `&amp;`, "<": `&lt;`, ">": `&gt;`, '"': `&quot;`, "'": `&#39;` }[c]));
const prefersReducedMotion = () => window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

/** Current language bundle, plus helpers for lookup, interpolation and plurals. */
const lang = () => Store.state.lang;
const L = () => I18N[lang()];
const fmt = (str, vars = {}) => String(str).replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? ``));
function plural(n, key) {
  const forms = L().plural[key];
  if (lang() === `en`) return n === 1 ? forms[0] : forms[1];
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return forms[0];
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return forms[1];
  return forms[2];
}
function fmtDuration(sec, { long = false } = {}) {
  const t = L().quiz;
  sec = Math.max(0, Math.round(sec));
  if (sec < 60) return `${sec} ${t.sec}`;
  const m = Math.floor(sec / 60), s = sec % 60;
  if (long) return s ? `${m} ${t.min} ${pad2(s)} ${t.sec}` : `${m} ${t.min}`;
  return `${m}:${pad2(s)}`;
}
function fmtDate(ts) {
  return new Date(ts).toLocaleDateString(lang() === `ru` ? `ru-RU` : `en-GB`, { day: `numeric`, month: `long`, year: `numeric` });
}
const pick = (arr, seed) => arr[Math.abs(seed) % arr.length];
const hashStr = (s) => { let h = 2166136261; for (const ch of s) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const mulberry32 = (a) => () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

/* ── Question catalogue ────────────────────────────────────────────────────
   Written questions (cash-flow set + topic bank) are indexed once; generated
   questions are rebuilt on demand from their id `g:<generator>:<seed>`.     */
const DIFF_TIME = { easy: 45, medium: 75, hard: 105, expert: 140 };
const CATALOG = Object.fromEntries([...QUESTIONS, ...BANK].map((q) => [q.id, { ...q, topic: q.topic || q.module, time: q.time || DIFF_TIME[q.diff] }]));
const MODMAP = Object.fromEntries(MODULES.map((m) => [m.id, m]));
function Q(id) {
  if (CATALOG[id]) return CATALOG[id];
  if (id.startsWith(`g:`)) { const [, gen, seed] = id.split(`:`); return GEN.build(gen, +seed); }
  return null;
}
const qText = (q) => q[lang()];
const modText = (m) => (typeof m === `string` ? MODMAP[m] : m)[lang()];

/* ==========================================================================
   06 · ICONS — one stroke family (24 × 24, 1.6 px, round joins)
   ========================================================================== */
const ICONS = {
  check: `<path d="M5 12.5l4.2 4.2L19 7"/>`,
  checkDraw: `<path class="draw" d="M5 12.5l4.2 4.2L19 7"/>`,
  x: `<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>`,
  xDraw: `<path class="draw" d="M7 7l10 10M17 7L7 17"/>`,
  arrowLeft: `<path d="M19 12H5M11 6l-6 6 6 6"/>`,
  arrowRight: `<path d="M5 12h14M13 6l6 6-6 6"/>`,
  skip: `<path d="M5 6.5l5.5 5.5L5 17.5M12.5 6.5L18 12l-5.5 5.5"/>`,
  bookmark: `<path d="M7.5 4h9A1.5 1.5 0 0 1 18 5.5V20l-6-4-6 4V5.5A1.5 1.5 0 0 1 7.5 4z"/>`,
  flag: `<path d="M6 21V4"/><path d="M6 4.5h11l-2.2 4 2.2 4H6"/>`,
  grid: `<rect x="4" y="4" width="6.5" height="6.5" rx="1.8"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="1.8"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="1.8"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.8"/>`,
  keyboard: `<rect x="2.5" y="6" width="19" height="12" rx="2.6"/><path d="M6.5 10h.01M10 10h.01M13.5 10h.01M17 10h.01M7.5 14h9"/>`,
  volume: `<path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z"/><path d="M15.5 9.2a4 4 0 0 1 0 5.6M18 6.8a7.4 7.4 0 0 1 0 10.4"/>`,
  volumeOff: `<path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>`,
  home: `<path d="M4 11l8-6.5 8 6.5"/><path d="M6 9.5V20h12V9.5"/><path d="M10 20v-5h4v5"/>`,
  book: `<path d="M12 6.6C10 5 7.4 4.5 4 4.8v13.6c3.4-.3 6 .2 8 1.8 2-1.6 4.6-2.1 8-1.8V4.8c-3.4-.3-6 .2-8 1.8z"/><path d="M12 6.6V20"/>`,
  bulb: `<path d="M9.2 18h5.6M10.2 21h3.6"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z"/>`,
  target: `<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>`,
  globe: `<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.5 3.5 5.3 3.5 8.5s-1.1 6-3.5 8.5c-2.4-2.5-3.5-5.3-3.5-8.5S9.6 6 12 3.5z"/>`,
  link: `<path d="M10 14a4 4 0 0 0 5.7 0l3-3A4 4 0 0 0 13 5.3l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>`,
  star: `<path d="M12 3.8l2.5 5.1 5.6.8-4 3.9.9 5.6-5-2.6-5 2.6.9-5.6-4-3.9 5.6-.8z"/>`,
  flame: `<path d="M12 21c3.6 0 6-2.4 6-5.8 0-3.4-2.5-5.4-3.6-8.7-.4 2-1.4 3.2-2.6 3.8.3-2.7-.7-5.6-3.3-7.3.2 3.3-2.5 5.6-2.5 9.8C6 18.4 8.4 21 12 21z"/>`,
  sparkle: `<path d="M12 3.5l1.7 5.3L19 10.5l-5.3 1.7L12 17.5l-1.7-5.3L5 10.5l5.3-1.7z"/><path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>`,
  clock: `<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>`,
  layers: `<path d="M12 4l8.5 4.5L12 13 3.5 8.5z"/><path d="M3.5 12.5L12 17l8.5-4.5M3.5 16.5L12 21l8.5-4.5"/>`,
  mountain: `<path d="M2.5 19l6.5-10.5 3.6 5.6 2.4-3.4 6.5 8.3z"/><path d="M7.4 11.1l1.6-.9 1.3 1.6"/>`,
  cap: `<path d="M2.5 9.5L12 5l9.5 4.5L12 14z"/><path d="M6.5 11.6V16c1.5 1.4 3.4 2.2 5.5 2.2s4-.8 5.5-2.2v-4.4M21.5 9.5v5"/>`,
  refresh: `<path d="M19.5 10.5A7.8 7.8 0 0 0 5.3 7.2L4 8.8"/><path d="M4 4.2v4.6h4.6"/><path d="M4.5 13.5a7.8 7.8 0 0 0 14.2 3.3l1.3-1.6"/><path d="M20 19.8v-4.6h-4.6"/>`,
  bolt: `<path d="M13 3L5 13.5h6L10 21l8-10.5h-6z"/>`,
  printer: `<path d="M7 9V4h10v5"/><rect x="3.5" y="9" width="17" height="8" rx="2"/><path d="M7 14h10v6.5H7z"/>`,
  award: `<circle cx="12" cy="9" r="5.5"/><path d="M8.6 13.3L7 21l5-2.6 5 2.6-1.6-7.7"/>`,
  chart: `<path d="M4 20V4M4 20h16"/><path d="M8 16v-4M12 16V8M16 16v-6"/>`,
  info: `<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8h.01"/>`,
  help: `<circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.4a2.5 2.5 0 0 1 4.8.9c0 1.7-2.4 2.2-2.4 3.7M12 17h.01"/>`,
  chevronDown: `<path d="M6 9l6 6 6-6"/>`,
  user: `<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5"/>`,
  sprout: `<path d="M12 20.5v-8.5"/><path d="M12 12c0-4.2 2.6-6.7 7.2-6.7 0 4.6-2.6 6.7-7.2 6.7zM12 14.2c0-3.1-2-5.2-6.2-5.2 0 3.2 2.1 5.2 6.2 5.2z"/>`,
  diamond: `<path d="M6.5 4.5h11l3 4.5L12 20 3.5 9z"/><path d="M3.5 9h17M9.5 4.5L12 20l2.5-15.5"/>`,
  hourglass: `<path d="M7 3.5h10M7 20.5h10"/><path d="M8 3.5c0 4.2 8 4.8 8 8.5s-8 4.3-8 8.5M16 3.5c0 4.2-8 4.8-8 8.5s8 4.3 8 8.5"/>`,
  lock: `<rect x="5" y="10.5" width="14" height="9.5" rx="2.4"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>`,
  scroll: `<path d="M8 4h10.5A1.5 1.5 0 0 1 20 5.5V7h-4"/><path d="M16 5.5V18a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.5h10"/><path d="M8 4a2 2 0 0 0-2 2v10.5"/><path d="M9.5 9h3.5M9.5 12.5h3.5"/>`,
  wave: `<path d="M3 9c2.2 0 2.2-2 4.5-2S9.8 9 12 9s2.2-2 4.5-2S18.8 9 21 9M3 15c2.2 0 2.2-2 4.5-2s2.3 2 4.5 2 2.2-2 4.5-2 2.3 2 4.5 2"/>`,
  compass: `<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>`,
  cog: `<circle cx="12" cy="12" r="3"/><path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4L18 18M6 18l1.6-1.6M16.4 7.6L18 6"/>`,
  map: `<path d="M9 5L3.5 7v12L9 17l6 2 5.5-2V5L15 7z"/><path d="M9 5v12M15 7v12"/>`,
  box: `<path d="M12 3.5l8 4v9l-8 4-8-4v-9z"/><path d="M4 7.5l8 4 8-4M12 11.5v9"/>`,
  shield: `<path d="M12 3.5l7 2.8v5.2c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6.3z"/><path d="M9 12l2.2 2.2L15.5 10"/>`,
  calendar: `<rect x="4" y="5.5" width="16" height="14.5" rx="2.5"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>`,
  search: `<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>`,
  library: `<path d="M5 4.5h3.5v15H5zM10.5 4.5H14v15h-3.5z"/><path d="M16 5.2l3.3-.9 3 14.4-3.3.9z" transform="translate(-1.8 .2)"/>`,
  shuffle: `<path d="M4 7h3.5c2.5 0 3.7 1.4 5 5s2.5 5 5 5H20M17.5 14.5L20 17l-2.5 2.5M4 17h3.5c1.3 0 2.2-.4 2.9-1.1M20 7h-2.5c-1.3 0-2.2.4-2.9 1.1M17.5 4.5L20 7l-2.5 2.5"/>`,
  play: `<path d="M8 5.5v13l10.5-6.5z"/>`,
  chevronLeft: `<path d="M15 6l-6 6 6 6"/>`,
  chevronRight: `<path d="M9 6l6 6-6 6"/>`,
  formula: `<path d="M8 19c2 0 2.5-1.5 3-5l1.2-8c.4-2 1.2-2.5 2.8-2.5M8 10h7M14.5 14l5 5M19.5 14l-5 5"/>`,
  list: `<path d="M9 6.5h11M9 12h11M9 17.5h11"/><circle cx="4.8" cy="6.5" r="1"/><circle cx="4.8" cy="12" r="1"/><circle cx="4.8" cy="17.5" r="1"/>`
};
const icon = (name, cls = ``) => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[name]}</svg>`;

/** Brand seal — a forest-green chop with gold mountain strokes. */
const brandSeal = (cls = `brand__seal`) => `
  <svg class="${cls}" viewBox="0 0 40 40" aria-hidden="true">
    <rect x="1" y="1" width="38" height="38" rx="11" fill="#30463E"/>
    <rect x="4.5" y="4.5" width="31" height="31" rx="8" fill="none" stroke="#D6B86E" stroke-opacity=".55" stroke-width=".9"/>
    <circle cx="27" cy="13" r="3.2" fill="#D6B86E"/>
    <path d="M8 28.5l7.5-11 4.2 6 3.3-4.3 9 9.3" fill="none" stroke="#F7F8F5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9 31.5c3-1.3 5.6-1.3 8 0s5 1.3 8 0 4.8-1.3 6 0" fill="none" stroke="#9CB7A4" stroke-width="1.3" stroke-linecap="round"/>
  </svg>`;

/** Ensō brush circle used by the loaders. */
const enso = () => `
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <path class="enso-path" pathLength="1" d="M70 18C56 9 32 12 21 30s-6 44 14 52 46 2 52-20c3-12-1-24-9-32" fill="none" stroke="#486B5E" stroke-width="5.5" stroke-linecap="round"/>
  </svg>`;

/** Achievement medal: gold ring, forest disc, icon in cloud white. */
const medal = (name) => `
  <svg class="ach__medal" viewBox="0 0 64 64" aria-hidden="true">
    <circle cx="32" cy="32" r="30" fill="url(#medalGold)"/>
    <circle cx="32" cy="32" r="25.5" fill="#30463E"/>
    <circle cx="32" cy="32" r="23" fill="none" stroke="#D6B86E" stroke-opacity=".45" stroke-dasharray="1.5 3"/>
    <g transform="translate(20 20)" fill="none" stroke="#F7F8F5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]}</g>
  </svg>`;

/* ==========================================================================
   07 · STORAGE & STATE
   ========================================================================== */
const Storage = {
  ok: (() => { try { const k = `__sansui`; localStorage.setItem(k, `1`); localStorage.removeItem(k); return true; } catch (e) { return false; } })(),
  read(key) { if (!this.ok) return null; try { return JSON.parse(localStorage.getItem(key)); } catch (e) { return null; } },
  write(key, value) { if (!this.ok) return; try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* quota or privacy mode */ } }
};

const Store = {
  state: null,
  _saveTimer: 0,

  defaults() {
    return { v: 1, lang: `ru`, name: ``, mode: `study`, size: 20, sound: false, session: null, memory: {}, lib: ASSIGNMENT.module };
  },
  load() {
    const saved = Storage.read(CONFIG.storageKey);
    this.state = Object.assign(this.defaults(), saved && saved.v === 1 ? saved : {});
    // Drop sessions that reference questions no longer in the bank.
    if (!this.state.memory) this.state.memory = {};
    const s = this.state.session;
    if (s && (!s.ids.every((id) => Q(id)) || !s.scope)) this.state.session = null;
  },
  /** Debounced persistence — many small updates collapse into one write. */
  save() { clearTimeout(this._saveTimer); this._saveTimer = setTimeout(() => Storage.write(CONFIG.storageKey, this.state), 120); },
  saveNow() { clearTimeout(this._saveTimer); Storage.write(CONFIG.storageKey, this.state); },
  set(patch) { Object.assign(this.state, patch); this.save(); },

  get session() { return this.state.session; },
  newSession(ids, mode, { retry = false, scope = { kind: `mixed` } } = {}) {
    const rnd = mulberry32((Date.now() ^ (Math.random() * 1e9)) >>> 0);
    const perm = () => { const a = [0, 1, 2, 3]; for (let i = 3; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const blank = () => ({ selected: null, tries: [], revealed: false, firstTry: null, timedOut: false, skipped: false, xp: 0, bonus: 0, streakXp: 0, spent: 0, timeLeft: null, order: null, perm: perm() });
    this.state.session = {
      ids: [...ids], mode, retry, scope, index: 0, startedAt: Date.now(), finishedAt: null, seq: 0,
      records: Object.fromEntries(ids.map((id) => [id, blank()])),
      bookmarks: [], review: [], xp: 0, stars: 0, streak: 0, longest: 0
    };
    this.saveNow();
    return this.state.session;
  }
};

/* ==========================================================================
   08 · SOUND — tiny Web Audio synth, off by default
   ========================================================================== */
const Sound = {
  ctx: null, master: null,
  ensure() {
    if (!this.ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.9;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === `suspended`) this.ctx.resume();
    return this.ctx;
  },
  tone(freq, { type = `sine`, dur = 0.18, gain = 0.05, delay = 0, glide = null } = {}) {
    const c = this.ctx, t0 = c.currentTime + delay;
    const osc = c.createOscillator(), g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (glide) osc.frequency.exponentialRampToValueAtTime(glide, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(g).connect(this.master);
    osc.start(t0); osc.stop(t0 + dur + 0.05);
  },
  play(name, force = false) {
    if (!Store.state.sound && !force) return;
    if (!this.ensure()) return;
    const T = this.tone.bind(this);
    switch (name) {
      case `click`: T(880, { type: `triangle`, dur: 0.06, gain: 0.02 }); break;
      case `select`: T(659, { dur: 0.12, gain: 0.035 }); break;
      case `correct`: T(784, { type: `triangle`, dur: 0.24, gain: 0.05 }); T(1046.5, { delay: 0.09, dur: 0.4, gain: 0.045 }); break;
      case `wrong`: T(330, { dur: 0.26, gain: 0.04, glide: 262 }); break;
      case `tick`: T(1320, { dur: 0.035, gain: 0.014 }); break;
      case `toggle`: T(523.25, { dur: 0.14, gain: 0.035 }); T(784, { delay: 0.07, dur: 0.2, gain: 0.035 }); break;
      case `complete`: [523.25, 587.33, 659.25, 783.99, 880, 1046.5].forEach((f, i) => T(f, { type: `triangle`, delay: i * 0.11, dur: 0.6, gain: 0.04 })); break;
    }
  }
};

/* ==========================================================================
   09 · EFFECTS — ripple, number counting, floating XP, confetti
   ========================================================================== */
const Effects = {
  ripple(e) {
    const host = e.target.closest(`.btn, .option, .icon-btn, .chip-toggle, .mode`);
    if (!host || host.disabled || prefersReducedMotion()) return;
    const r = host.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2.2;
    const dot = document.createElement(`span`);
    dot.className = `ripple`;
    dot.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    host.appendChild(dot);
    dot.addEventListener(`animationend`, () => dot.remove(), { once: true });
  },

  /** Count a number up inside `el`. Formatting is delegated to `render`. */
  count(el, to, { dur = 1600, delay = 0, render = (v) => Math.round(v) } = {}) {
    if (!el) return;
    if (prefersReducedMotion()) { el.textContent = render(to); return; }
    const start = performance.now() + delay;
    const step = (now) => {
      const t = clamp((now - start) / dur, 0, 1);
      el.textContent = render(to * easeOutCubic(t));
      if (t < 1) requestAnimationFrame(step);
    };
    el.textContent = render(0);
    requestAnimationFrame(step);
  },

  floatXP(anchor, text) {
    if (!anchor) return;
    const r = anchor.getBoundingClientRect();
    const el = document.createElement(`div`);
    el.className = `xp-float`;
    el.textContent = text;
    el.style.left = `${r.left + r.width / 2}px`;
    el.style.top = `${r.top - 8}px`;
    document.body.appendChild(el);
    el.addEventListener(`animationend`, () => el.remove(), { once: true });
  }
};

const Confetti = {
  fire(intensity = 1) {
    if (prefersReducedMotion()) return;
    const canvas = $(`#confetti`), ctx = canvas.getContext(`2d`);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth, h = window.innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const colors = [`#D6B86E`, `#E7D29C`, `#6F9584`, `#9CB7A4`, `#486B5E`, `#F1F5F0`, `#C7DACB`];
    const n = Math.round((w < 700 ? 90 : 160) * intensity);
    const parts = Array.from({ length: n }, (_, i) => {
      const fromLeft = i % 2 === 0;
      const angle = (fromLeft ? -60 : -120) * Math.PI / 180 + (Math.random() - 0.5) * 0.7;
      const speed = 9 + Math.random() * 9;
      return {
        x: fromLeft ? -10 : w + 10, y: h * (0.55 + Math.random() * 0.25),
        vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        size: 5 + Math.random() * 7, rot: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.3,
        wob: Math.random() * 6.28, shape: i % 3, color: colors[i % colors.length], alpha: 1
      };
    });
    const t0 = performance.now();
    const frame = (now) => {
      ctx.clearRect(0, 0, w, h);
      let alive = 0;
      for (const p of parts) {
        p.vy += 0.22; p.vx *= 0.985; p.vy *= 0.985; p.wob += 0.08;
        p.x += p.vx + Math.sin(p.wob) * 0.6; p.y += p.vy; p.rot += p.vr;
        if (now - t0 > 2600) p.alpha = Math.max(0, p.alpha - 0.012);
        if (p.y > h + 30 || p.alpha <= 0) continue;
        alive++;
        ctx.save(); ctx.globalAlpha = p.alpha; ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.color;
        if (p.shape === 0) ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        else if (p.shape === 1) { ctx.beginPath(); ctx.ellipse(0, 0, p.size / 2, p.size / 4.5, 0, 0, 6.29); ctx.fill(); }
        else { ctx.beginPath(); ctx.arc(0, 0, p.size / 3, 0, 6.29); ctx.fill(); }
        ctx.restore();
      }
      if (alive) requestAnimationFrame(frame); else ctx.clearRect(0, 0, w, h);
    };
    requestAnimationFrame(frame);
  }
};

/* ==========================================================================
   10 · SCENERY — original procedural ink-wash landscape in stacked layers
   ========================================================================== */
const Scenery = {
  layers: [],
  target: { x: 0, y: 0 }, current: { x: 0, y: 0 }, scroll: 0, raf: 0,

  /** A ridge line built from soft karst peaks plus fine brush noise. */
  ridge(rng, { w = 1600, h, base, peaks, rough = 6 }) {
    const yAt = (x) => {
      let y = base;
      for (const [px, ph, pw] of peaks) y -= ph * Math.exp(-Math.pow((x - px) / pw, 2));
      y += Math.sin(x * 0.021 + peaks.length) * rough * 0.6 + Math.sin(x * 0.067) * rough * 0.35 + Math.sin(x * 0.13 + 1.3) * rough * 0.2;
      return y;
    };
    let d = `M0 ${h} L0 ${yAt(0).toFixed(1)}`;
    for (let x = 6; x <= w; x += 6) d += ` L${x} ${yAt(x).toFixed(1)}`;
    d += ` L${w} ${h} Z`;
    return { d, yAt };
  },

  /** Pagoda with upturned eaves, generated tier by tier. */
  pagoda(tiers = 4) {
    const roof = (cy, hw) => `M${20 - hw} ${cy}Q${20 - hw * .55} ${cy - 2.2} 20 ${cy - 7}Q${20 + hw * .55} ${cy - 2.2} ${20 + hw} ${cy}Q${20 + hw * .72} ${cy + 1.4} ${20 + hw * .6} ${cy + 1.7}L${20 - hw * .6} ${cy + 1.7}Q${20 - hw * .72} ${cy + 1.4} ${20 - hw} ${cy}Z`;
    let out = `<path d="M20 2v9" stroke="currentColor" stroke-width="1.2"/><circle cx="20" cy="6" r="1.4"/>`;
    for (let i = 0; i < tiers; i++) {
      const cy = 18 + i * 16, hw = 9 + i * 3;
      out += `<path d="${roof(cy, hw)}"/><rect x="${20 - hw * .48}" y="${cy + 1.7}" width="${hw * .96}" height="${16 - 8}" opacity=".85"/>`;
      out += `<rect x="${20 - hw * .4}" y="${cy + 3}" width="1.6" height="6" fill="#A9574A" opacity=".55"/><rect x="${20 + hw * .4 - 1.6}" y="${cy + 3}" width="1.6" height="6" fill="#A9574A" opacity=".55"/>`;
    }
    const by = 18 + tiers * 16;
    out += `<rect x="6" y="${by - 4}" width="28" height="4" rx="1"/>`;
    return { svg: out, h: by };
  },

  pavilion() {
    return `<path d="M4 18Q20 15 40 4Q60 15 76 18Q68 21 60 21H20Q12 21 4 18Z"/>
      <path d="M14 30Q28 28 40 22Q52 28 66 30Q60 32 54 32H26Q20 32 14 30Z" opacity=".9"/>
      <rect x="22" y="21" width="2" height="18" opacity=".8"/><rect x="56" y="21" width="2" height="18" opacity=".8"/>
      <rect x="38" y="21" width="2" height="18" fill="#A9574A" opacity=".5"/>
      <rect x="12" y="39" width="56" height="3" rx="1"/>
      <path d="M18 42v8M30 42v8M50 42v8M62 42v8" stroke="currentColor" stroke-width="1.3" opacity=".6"/>`;
  },

  /** Cloud-puff canopy tree, as in East Asian landscape painting. */
  tree(x, y, s, dark, light, flip = 1) {
    const puffs = [[0, 0, 30], [34, -12, 26], [-32, -6, 24], [14, -36, 24], [-14, -30, 22], [52, 10, 18], [-52, 12, 16], [30, -42, 16]];
    const hi = [[-6, -8, 16], [28, -20, 12], [-30, -14, 12], [10, -42, 10]];
    const tr = `translate(${x} ${y}) scale(${s * flip} ${s})`;
    return `<g transform="${tr}">
      <path d="M2 120C6 90-2 70 4 40 8 28 18 20 26 14M4 60C-8 50-20 46-34 46" fill="none" stroke="${dark}" stroke-width="9" stroke-linecap="round"/>
      ${puffs.map(([px, py, r]) => `<circle cx="${px}" cy="${py}" r="${r}" fill="${dark}"/>`).join(``)}
      ${hi.map(([px, py, r]) => `<circle cx="${px}" cy="${py}" r="${r}" fill="${light}" opacity=".55"/>`).join(``)}
    </g>`;
  },

  cloud(x, y, s, o = 1) {
    return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${o}">
      <path d="M0 40C0 26 14 19 27 23 31 7 54 1 66 13 76 3 98 5 102 21 118 17 132 29 126 40Z" fill="rgba(251,251,248,.82)" stroke="#D6B86E" stroke-opacity=".5" stroke-width="1.2"/>
      <path d="M58 32c-7-1-9-9-3-11 5-2 9 4 5 7" fill="none" stroke="#D6B86E" stroke-opacity=".55" stroke-width="1.2" stroke-linecap="round"/>
      <path d="M86 30c-5 0-6-6-2-7 4-1 6 3 3 5" fill="none" stroke="#D6B86E" stroke-opacity=".5" stroke-width="1.1" stroke-linecap="round"/>
    </g>`;
  },

  build() {
    const rng = mulberry32(7);
    const grad = (id, top, a1, bottom, a2) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}" stop-opacity="${a1}"/><stop offset=".62" stop-color="${top}" stop-opacity="${a1 * .55}"/><stop offset="1" stop-color="${bottom}" stop-opacity="${a2}"/></linearGradient>`;
    const svg = (vb, body, defs = ``) => `<svg viewBox="${vb}" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${defs ? `<defs>${defs}</defs>` : ``}${body}</svg>`;

    const far = this.ridge(rng, { h: 600, base: 520, rough: 5, peaks: [[120, 210, 80], [330, 330, 95], [560, 240, 80], [860, 400, 115], [1130, 300, 85], [1380, 380, 100], [1580, 250, 80]] });
    const far2 = this.ridge(rng, { h: 600, base: 560, rough: 4, peaks: [[240, 200, 90], [700, 250, 120], [1010, 210, 90], [1490, 230, 110]] });
    const mid = this.ridge(rng, { h: 520, base: 470, rough: 7, peaks: [[60, 220, 70], [280, 280, 80], [520, 170, 70], [790, 150, 95], [1060, 300, 75], [1300, 230, 90], [1560, 200, 70]] });
    const near = this.ridge(rng, { h: 380, base: 350, rough: 8, peaks: [[0, 190, 150], [360, 90, 170], [780, 50, 150], [1240, 150, 160], [1600, 210, 140]] });

    const pg = this.pagoda(4), pgs = this.pagoda(3);
    const pagodaAt = (ridge, x, scale, color, tiers) => {
      const p = tiers === 3 ? pgs : pg;
      const y = ridge.yAt(x) - p.h * scale + 4;
      return `<g transform="translate(${x - 20 * scale} ${y}) scale(${scale})" fill="${color}" color="${color}">${p.svg}</g>`;
    };
    const treeline = (ridge, from, to, step, color, size) => {
      let out = ``;
      for (let x = from; x < to; x += step + rng() * step) {
        const y = ridge.yAt(x);
        out += `<ellipse cx="${x.toFixed(0)}" cy="${(y + 2).toFixed(1)}" rx="${(size * (0.6 + rng() * 0.6)).toFixed(1)}" ry="${(size * (0.9 + rng() * 0.7)).toFixed(1)}" fill="${color}"/>`;
      }
      return out;
    };

    const clouds = svg(`0 0 1600 420`,
      this.cloud(140, 70, 1.5, .9) + this.cloud(560, 30, 1.1, .75) + this.cloud(980, 110, 1.8, .85) + this.cloud(1340, 40, 1.2, .7) +
      `<path d="M40 210C180 180 300 196 430 200S700 176 820 190" fill="none" stroke="#D6B86E" stroke-opacity=".28" stroke-width="1.4" stroke-linecap="round"/>
       <path d="M900 250C1040 226 1180 240 1300 236S1500 222 1580 230" fill="none" stroke="#D6B86E" stroke-opacity=".24" stroke-width="1.2" stroke-linecap="round"/>`);

    const farSvg = svg(`0 0 1600 600`,
      `<path d="${far.d}" fill="url(#gFar)"/><path d="${far2.d}" fill="url(#gFar2)"/>` + pagodaAt(far2, 1010, 0.9, `#9DB7A8`, 3),
      grad(`gFar`, `#A7C0B1`, .55, `#EEF5EF`, 0) + grad(`gFar2`, `#93B2A2`, .6, `#EEF5EF`, 0));

    const midSvg = svg(`0 0 1600 520`,
      `<path d="${mid.d}" fill="url(#gMid)"/>` + treeline(mid, 980, 1150, 7, `#6E9483`, 5) + treeline(mid, 230, 330, 8, `#6E9483`, 4.5) +
      pagodaAt(mid, 1062, 1.15, `#557D6C`, 4),
      grad(`gMid`, `#7FA191`, .75, `#EEF5EF`, 0));

    const nearSvg = svg(`0 0 1600 380`,
      `<path d="${near.d}" fill="url(#gNear)"/>` + treeline(near, 0, 260, 10, `#3F5F53`, 7) + treeline(near, 1150, 1600, 11, `#3F5F53`, 7.5) +
      `<g transform="translate(1290 ${near.yAt(1330) + 6}) scale(.9)" fill="#3E5C50" color="#3E5C50">${this.pavilion()}</g>`,
      grad(`gNear`, `#56806F`, .82, `#EEF5EF`, 0));

    const lakeLines = Array.from({ length: 9 }, (_, i) => {
      const y = 70 + i * 16, x = 120 + ((i * 263) % 1200), len = 80 + ((i * 97) % 160);
      return `<line x1="${x}" y1="${y}" x2="${x + len}" y2="${y}" stroke="#FBFBF8" stroke-width="1.6" stroke-linecap="round"/>`;
    }).join(``);
    const lakeSvg = svg(`0 0 1600 240`,
      `<rect y="0" width="1600" height="240" fill="url(#gLake)"/>
       <g transform="translate(560 66) scale(.7)" fill="#5D8574" color="#5D8574" opacity=".85">${this.pavilion()}</g>
       <path d="M520 104h150" stroke="#9CB7A4" stroke-opacity=".6" stroke-width="2" stroke-linecap="round"/>
       <path d="M980 120q14 6 34 0" stroke="#486B5E" stroke-opacity=".5" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M997 120v-9" stroke="#486B5E" stroke-opacity=".45" stroke-width="1.2"/>
       <g class="lake-shimmer">${lakeLines}</g>`,
      `<linearGradient id="gLake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9F1EB" stop-opacity="0"/><stop offset=".3" stop-color="#E4EEE7" stop-opacity=".92"/><stop offset="1" stop-color="#D7E6DC" stop-opacity=".95"/></linearGradient>`);

    const foreSvg = svg(`0 0 1600 400`,
      this.tree(70, 250, 1.35, `#3E5E52`, `#6F9584`) + this.tree(1570, 270, 1.15, `#3E5E52`, `#6F9584`, -1) +
      `<path d="M1260 400c40-40 120-60 200-56M0 380c90-20 170-12 260 6" fill="none" stroke="#30463E" stroke-opacity=".25" stroke-width="2"/>`);

    const bird = (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path class="bird" d="M0 6Q6 0 12 6Q18 0 24 6" fill="none" stroke="#30463E" stroke-width="1.8" stroke-linecap="round"/></g>`;
    const birds = (list, w, h) => `<svg class="birds${w < 200 ? ` birds--2` : ``}" viewBox="0 0 ${w} ${h}" aria-hidden="true">${list.map((b) => bird(...b)).join(``)}</svg>`;

    const particles = Array.from({ length: 16 }, (_, i) =>
      `<i style="left:${(i * 61) % 100}%;--d:${18 + (i * 7) % 16}s;--dl:-${(i * 3.1).toFixed(1)}s;--dx:${((i % 5) - 2) * 22}px"></i>`).join(``);

    this.grain = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .45  0 0 0 0 .5  0 0 0 0 .45  0 0 0 .08 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`;

    return `
      <div class="scenery__sun"></div>
      <div class="scenery__layer layer-clouds" data-depth="0.6"><div class="scenery__drift" style="height:100%">${clouds}</div></div>
      <div class="scenery__layer layer-far" data-depth="0.25">${farSvg}</div>
      <div class="fog fog--3"></div>
      <div class="scenery__layer layer-mid" data-depth="0.5">${midSvg}</div>
      <div class="fog fog--1"></div>
      ${birds([[0, 30, 1], [36, 18, .8], [64, 40, .9], [96, 12, .7], [128, 34, .75], [170, 22, .6], [210, 44, .55]], 260, 90)}
      ${birds([[0, 20, .7], [30, 10, .6], [60, 26, .55], [100, 14, .5]], 160, 60)}
      <div class="scenery__layer layer-near" data-depth="0.85">${nearSvg}</div>
      <div class="scenery__layer layer-lake" data-depth="0.95">${lakeSvg}</div>
      <div class="fog fog--2"></div>
      <div class="particles">${particles}</div>
      <div class="scenery__layer layer-fore" data-depth="1.5">${foreSvg}</div>
      <div class="scenery__grain"></div>
      <div class="scenery__veil"></div>`;
  },

  mount(root) {
    root.innerHTML = this.build();
    const grainEl = $(`.scenery__grain`, root); if (grainEl) grainEl.style.backgroundImage = this.grain;
    this.layers = $$(`[data-depth]`, root).map((el) => ({ el, depth: parseFloat(el.dataset.depth) }));
    if (prefersReducedMotion()) { document.body.classList.add(`reduce-motion`); return; }
    const fine = window.matchMedia(`(pointer: fine)`).matches;
    if (fine) window.addEventListener(`pointermove`, (e) => {
      this.target.x = (e.clientX / window.innerWidth) * 2 - 1;
      this.target.y = (e.clientY / window.innerHeight) * 2 - 1;
      this.kick();
    }, { passive: true });
    window.addEventListener(`scroll`, () => { this.scroll = window.scrollY; this.kick(); }, { passive: true });
  },
  kick() { if (!this.raf) this.raf = requestAnimationFrame(() => this.tick()); },
  /** Eased parallax: runs only while the scene is still settling. */
  tick() {
    const c = this.current, t = this.target;
    c.x += (t.x - c.x) * 0.06; c.y += (t.y - c.y) * 0.06;
    const sc = Math.min(this.scroll, 1600);
    for (const { el, depth } of this.layers) {
      el.style.transform = `translate3d(${(-c.x * depth * 14).toFixed(2)}px, ${(-c.y * depth * 6 + sc * depth * 0.05).toFixed(2)}px, 0)`;
    }
    this.raf = Math.abs(t.x - c.x) + Math.abs(t.y - c.y) > 0.001 ? requestAnimationFrame(() => this.tick()) : 0;
  }
};

/* ==========================================================================
   11 · UI COMPONENTS — dialogs, toasts, accordions, segmented controls
   ========================================================================== */
const Toast = {
  show(text, iconName = `info`) {
    const root = $(`#toast-root`);
    while (root.children.length > 1) root.firstElementChild.remove();
    const el = document.createElement(`div`);
    el.className = `toast`; el.setAttribute(`role`, `status`);
    el.innerHTML = `${icon(iconName)}<span>${escapeHTML(text)}</span>`;
    root.appendChild(el);
    setTimeout(() => { el.classList.add(`is-out`); el.addEventListener(`animationend`, () => el.remove(), { once: true }); }, 2600);
  }
};

const Dialog = {
  stack: [],
  /**
   * Opens a modal. `variant` is `dialog` (centred; bottom sheet on phones)
   * or `sheet` (side drawer on desktop; bottom sheet on phones).
   */
  open({ html, variant = `dialog`, wide = false, label = ``, onOpen = null, onClose = null }) {
    const layer = document.createElement(`div`);
    layer.className = `dialog-layer${variant === `sheet` ? ` dialog-layer--sheet` : ``}`;
    const panelClass = variant === `sheet` ? `sheet` : `dialog${wide ? ` dialog--wide` : ``}`;
    layer.innerHTML = `<div class="dialog-backdrop" data-close></div>
      <div class="${panelClass}" role="dialog" aria-modal="true" aria-label="${escapeHTML(label)}" tabindex="-1">
        ${variant === `sheet` ? `<div class="sheet__handle" aria-hidden="true"></div>` : ``}
        <button class="icon-btn dialog__close" data-close aria-label="${L().a11y.close}">${icon(`x`)}</button>
        ${html}
      </div>`;
    const entry = { layer, panel: layer.lastElementChild, onClose, returnFocus: document.activeElement };
    this.stack.push(entry);
    document.body.appendChild(layer);
    layer.addEventListener(`click`, (e) => { if (e.target.closest(`[data-close]`)) this.close(); });
    if (variant === `sheet`) this.enableSwipe(entry);
    requestAnimationFrame(() => {
      const first = entry.panel.querySelector(`[autofocus]`) || entry.panel;
      first.focus({ preventScroll: true });
    });
    onOpen && onOpen(entry.panel);
    return entry.panel;
  },
  close() {
    const entry = this.stack.pop();
    if (!entry) return;
    entry.layer.classList.add(`is-closing`);
    setTimeout(() => entry.layer.remove(), prefersReducedMotion() ? 0 : 290);
    entry.onClose && entry.onClose();
    if (entry.returnFocus && document.contains(entry.returnFocus)) entry.returnFocus.focus({ preventScroll: true });
  },
  closeAll() { while (this.stack.length) this.close(); },
  get top() { return this.stack[this.stack.length - 1]; },
  trap(e) {
    const top = this.top; if (!top || e.key !== `Tab`) return;
    const f = $$(`button:not([disabled]), input, [tabindex]:not([tabindex="-1"])`, top.panel).filter((el) => el.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  },
  /** Drag the mobile bottom sheet down to dismiss it. */
  enableSwipe(entry) {
    const panel = entry.panel; let y0 = null, dy = 0;
    panel.addEventListener(`touchstart`, (e) => { if (panel.scrollTop > 0) return; y0 = e.touches[0].clientY; dy = 0; panel.style.transition = `none`; }, { passive: true });
    panel.addEventListener(`touchmove`, (e) => { if (y0 === null) return; dy = Math.max(0, e.touches[0].clientY - y0); panel.style.transform = `translate3d(0, ${dy}px, 0)`; }, { passive: true });
    panel.addEventListener(`touchend`, () => {
      if (y0 === null) return; y0 = null; panel.style.transition = ``;
      if (dy > 90) this.close(); else panel.style.transform = ``;
    });
  }
};

/** Accordion: any `.accordion` with a `.accordion__btn` toggles itself. */
const Accordion = {
  html({ title, iconName, body, open = false, cls = ``, attrs = ``, head = null }) {
    const id = `acc-${Math.random().toString(36).slice(2, 9)}`;
    return `<div class="accordion ${cls}${open ? ` is-open` : ``}" ${attrs}>
      <button class="accordion__btn" aria-expanded="${open}" aria-controls="${id}">${head ?? `${icon(iconName)}<span>${title}</span>`}${icon(`chevronDown`, `accordion__chev`)}</button>
      <div class="accordion__panel" id="${id}" role="region"><div class="accordion__clip"><div class="accordion__content">${body}</div></div></div>
    </div>`;
  },
  toggle(btn, force) {
    const acc = btn.closest(`.accordion`);
    const open = force ?? !acc.classList.contains(`is-open`);
    acc.classList.toggle(`is-open`, open);
    btn.setAttribute(`aria-expanded`, open);
  }
};

/** Segmented control with a sliding thumb. */
const Segmented = {
  html(items, active, attr) {
    return `<div class="seg" role="group">${items.map(([v, label, aria]) =>
      `<button type="button" ${attr}="${v}" aria-pressed="${v === active}"${aria ? ` aria-label="${aria}"` : ``}>${label}</button>`).join(``)}<span class="seg__thumb" aria-hidden="true"></span></div>`;
  },
  sync(root = document) {
    $$(`.seg`, root).forEach((seg) => {
      const on = seg.querySelector(`[aria-pressed="true"]`), thumb = seg.querySelector(`.seg__thumb`);
      if (!on || !thumb) return;
      thumb.style.width = `${on.offsetWidth}px`;
      thumb.style.transform = `translateX(${on.offsetLeft - 3}px)`;
      thumb.style.left = `3px`;
    });
  }
};

/** Polite live region for screen readers. */
const Announce = (text) => { const el = $(`#sr-live`); el.textContent = ``; setTimeout(() => { el.textContent = text; }, 30); };
