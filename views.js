/* ==========================================================================
   12 · ENGINE — quiz rules (no DOM)
   Option indexes here are always the ORIGINAL indexes from the data;
   the display order lives in record.perm.
   ========================================================================== */
const Engine = {
  get s() { return Store.session; },
  currentId() { return this.s.ids[this.s.index]; },
  rec(id) { return this.s.records[id]; },

  isAnswered(id) {
    const r = this.rec(id);
    return this.s.mode === `exam` ? r.selected !== null : r.revealed;
  },
  /** correct | wrong | skipped | answered (exam, before finishing) */
  outcome(id) {
    const s = this.s, r = s.records[id], q = Q(id);
    if (s.mode === `exam`) {
      if (r.selected === null) return `skipped`;
      if (!s.finishedAt) return `answered`;
      return r.selected === q.correct ? `correct` : `wrong`;
    }
    if (!r.revealed) return `skipped`;
    return r.firstTry ? `correct` : `wrong`;
  },
  scoreLocked() { return this.s.mode === `exam` && !this.s.finishedAt; },
  counts() {
    const ids = this.s.ids;
    const answered = ids.filter((id) => this.isAnswered(id)).length;
    const correct = ids.filter((id) => this.outcome(id) === `correct`).length;
    const eta = sum(ids.filter((id) => !this.isAnswered(id)), (id) => Q(id).time);
    return { total: ids.length, answered, correct, remaining: ids.length - answered, eta, accuracy: answered ? correct / answered : null };
  },

  /** Records XP, stars, streak and long-term memory for a resolved question. */
  award(id, firstTry) {
    const s = this.s, r = s.records[id], q = Q(id), base = CONFIG.xp[q.diff];
    if (firstTry) { s.streak += 1; s.longest = Math.max(s.longest, s.streak); s.stars += CONFIG.stars[q.diff]; }
    else s.streak = 0;
    const foundLater = !firstTry && s.mode === `practice` && r.revealed && !r.timedOut;
    r.xp = firstTry ? base : foundLater ? Math.round(base * CONFIG.practiceRetryXp) : 0;
    r.streakXp = firstTry && s.streak >= 2 ? CONFIG.streakBonusStep * Math.min(s.streak - 1, CONFIG.streakBonusCap) : 0;
    r.bonus = firstTry && s.mode === `challenge` && r.timeLeft != null ? Math.round(base * CONFIG.speedBonusMax * clamp(r.timeLeft / q.time, 0, 1)) : 0;
    s.xp += r.xp + r.streakXp + r.bonus;
    Memory.update(q, firstTry);
  },

  choose(idx) {
    const s = this.s, id = this.currentId(), r = this.rec(id), q = Q(id);
    if (s.finishedAt) return { kind: `ignored` };
    r.skipped = false;
    if (r.order === null) r.order = ++s.seq;
    if (s.mode === `exam`) {
      if (r.selected === idx) return { kind: `ignored` };
      r.selected = idx;
      return { kind: `selected` };
    }
    if (s.mode === `practice`) {
      if (r.revealed || r.tries.includes(idx)) return { kind: `ignored` };
      r.tries.push(idx);
      if (idx !== q.correct) { if (r.tries.length === 1) s.streak = 0; return { kind: `retry` }; }
      r.selected = idx; r.revealed = true; r.firstTry = r.tries.length === 1;
      this.award(id, r.firstTry);
      return { kind: `correct` };
    }
    if (r.revealed) return { kind: `ignored` };
    r.selected = idx; r.tries = [idx]; r.revealed = true; r.firstTry = idx === q.correct;
    this.award(id, r.firstTry);
    return { kind: r.firstTry ? `correct` : `wrong` };
  },
  timeout() {
    const s = this.s, id = this.currentId(), r = this.rec(id);
    if (r.revealed) return false;
    r.revealed = true; r.timedOut = true; r.firstTry = false; r.timeLeft = 0; r.skipped = false;
    if (r.order === null) r.order = ++s.seq;
    this.award(id, false);
    return true;
  },
  finish() {
    const s = this.s;
    if (s.mode === `exam`) {
      s.streak = 0; s.longest = 0; s.xp = 0; s.stars = 0;
      s.finishedAt = Date.now();
      s.ids.filter((id) => s.records[id].selected !== null)
        .sort((a, b) => s.records[a].order - s.records[b].order)
        .forEach((id) => { const r = s.records[id]; r.revealed = true; r.firstTry = r.selected === Q(id).correct; this.award(id, r.firstTry); });
    }
    s.finishedAt = s.finishedAt || Date.now();
    Store.saveNow();
  }
};

/** Display letter for an original option index within a record’s shuffle. */
const letterOf = (r, orig) => CONFIG.letters[r && r.perm ? r.perm.indexOf(orig) : orig];
const posLabel = (id) => Store.session.ids.indexOf(id) + 1;

/* ==========================================================================
   13 · ROUTER & TOP BAR
   ========================================================================== */
const Router = {
  current: null, busy: false,
  go(name, { instant = false } = {}) {
    if (this.busy) return;
    const view = $(`#view`), prev = view.firstElementChild;
    const render = () => {
      this.busy = false;
      this.current = name;
      document.body.dataset.screen = name;
      view.innerHTML = Screens[name].html();
      Topbar.update();
      window.scrollTo({ top: 0, behavior: `instant` });
      Screens[name].mount && Screens[name].mount(view.firstElementChild);
    };
    if (prev && !instant && !prefersReducedMotion()) { this.busy = true; prev.classList.add(`is-leaving`); setTimeout(render, 300); }
    else render();
  },
  refresh() {
    const y = window.scrollY, view = $(`#view`), name = this.current;
    if (!name) return;
    view.innerHTML = Screens[name].html();
    const screen = view.firstElementChild;
    screen.style.animation = `none`;
    Screens[name].mount && Screens[name].mount(screen, { refresh: true });
    Topbar.update();
    window.scrollTo({ top: y, behavior: `instant` });
  }
};

const Topbar = {
  render() {
    const t = L();
    $(`#topbar`).innerHTML = `
      <a class="brand" href="#" data-action="brand" aria-label="Summit ${t.brandSub}">${brandSeal()}<span><span class="brand__name">Summit</span><span class="brand__sub">${t.brandSub}</span></span></a>
      <div class="topbar__center"><span class="topbar__title" id="topbar-title"></span></div>
      <div class="topbar__actions">
        ${Segmented.html([[`ru`, `RU`, `Русский`], [`en`, `EN`, `English`]], lang(), `data-lang`)}
        <button class="icon-btn" data-action="sound" aria-pressed="${Store.state.sound}" aria-label="${t.a11y.sound}" title="${t.a11y.sound} (M)">${icon(Store.state.sound ? `volume` : `volumeOff`)}</button>
        <button class="icon-btn" data-action="library" data-only="home quiz results" aria-label="${t.lib.title}" title="${t.lib.title}">${icon(`book`)}</button>
        <button class="icon-btn hide-sm" data-action="shortcuts" data-only="quiz" aria-label="${t.a11y.shortcuts}" title="${t.a11y.shortcuts} (?)">${icon(`keyboard`)}</button>
        <button class="icon-btn" data-action="navigator" data-only="quiz" aria-label="${t.a11y.navigator}" title="${t.a11y.navigator} (N)">${icon(`grid`)}</button>
        <button class="icon-btn" data-action="home" data-only="quiz results library" aria-label="${t.a11y.home}" title="${t.a11y.home}">${icon(`home`)}</button>
      </div>
      <div class="topbar__progress" aria-hidden="true"><span id="top-progress"></span></div>`;
    $(`#topbar .seg`).setAttribute(`aria-label`, t.a11y.lang);
    this.update();
    requestAnimationFrame(() => Segmented.sync($(`#topbar`)));
  },
  update() {
    $$(`#topbar [data-only]`).forEach((b) => { b.hidden = !b.dataset.only.split(` `).includes(Router.current); });
    const title = $(`#topbar-title`);
    if (title) title.textContent = (Router.current === `quiz` || Router.current === `results`) && Store.session ? Sessions.title(Store.session.scope) : Router.current === `library` ? L().lib.title : COURSE[lang()].title;
  }
};

/* ==========================================================================
   14 · SESSIONS — choosing scope, mode and length
   ========================================================================== */
const MODE_ICON = { study: `book`, exam: `cap`, practice: `refresh`, challenge: `bolt` };
const Sessions = {
  pending: null,
  title(scope) {
    const t = L().session;
    if (!scope) return COURSE[lang()].title;
    if (scope.kind === `module`) return modText(scope.id).title;
    return { mixed: t.mixedTitle, review: t.reviewTitle, retry: t.retryTitle }[scope.kind] || COURSE[lang()].title;
  },
  /** Opens the session dialog for a scope: {kind:'module', id} | {kind:'mixed'} | {kind:'review'} */
  open(scope) {
    if (scope.kind === `review` && !Memory.weakItems().length) { Toast.show(L().toastX.noReview, `info`); return; }
    this.pending = scope;
    const t = L(), st = Store.state;
    const size = scope.kind === `mixed` ? 30 : st.size;
    this.size = size;
    const modes = CONFIG.modes.map((m) => `
      <button type="button" class="mode mode--compact" role="radio" data-mode="${m}" aria-checked="${st.mode === m}" tabindex="${st.mode === m ? 0 : -1}">
        <span class="mode__icon">${icon(MODE_ICON[m])}</span><span class="mode__title">${t.modes[m].name}</span><span class="mode__desc">${t.modes[m].desc}</span>
        <span class="mode__check" aria-hidden="true">${icon(`check`)}</span></button>`).join(``);
    const sizes = scope.kind === `review` ? `` : `
      <div class="setup__section"><div class="setup__label"><h3>${t.session.size}</h3></div>
        ${Segmented.html([10, 20, 30].map((n) => [String(n), String(n)]), String(size), `data-size`).replace(`class="seg"`, `class="seg seg--lg"`)}</div>`;
    const m = scope.kind === `module` ? MODMAP[scope.id] : null;
    Dialog.open({
      label: t.session.title,
      html: `<p class="eyebrow">${t.session.title}</p><h2 style="margin-top:10px">${this.title(scope)}</h2>
        ${m ? `<p class="dialog__text">${modText(m).lead}</p>` : ``}
        <div class="setup__section" style="margin-top:22px"><div class="setup__label"><h3 id="modes-label">${t.session.mode}</h3></div>
          <div class="modes" role="radiogroup" aria-labelledby="modes-label">${modes}</div></div>
        ${sizes}
        <p class="session-note">${icon(`shuffle`, `icon--sm`)}${t.home.endless}</p>
        <div class="dialog__actions"><button class="btn btn--primary btn--lg" data-action="session-start" autofocus>${t.session.start}${icon(`arrowRight`)}</button></div>`,
      onOpen: (panel) => requestAnimationFrame(() => Segmented.sync(panel))
    });
  },
  selectMode(mode, focus = false) {
    Store.set({ mode });
    $$(`.mode`).forEach((el) => { const on = el.dataset.mode === mode; el.setAttribute(`aria-checked`, on); el.tabIndex = on ? 0 : -1; if (on && focus) el.focus(); });
    Sound.play(`select`);
  },
  setSize(n) {
    this.size = n;
    if (this.pending && this.pending.kind !== `mixed`) Store.set({ size: n });
    $$(`[data-size]`).forEach((b) => b.setAttribute(`aria-pressed`, +b.dataset.size === n));
    Segmented.sync($(`.dialog`) || document);
  },
  start() {
    const scope = this.pending || { kind: `mixed` }, mode = Store.state.mode;
    let ids = [];
    if (scope.kind === `module`) ids = Builder.build({ modules: [scope.id], size: this.size });
    else if (scope.kind === `mixed`) ids = Builder.build({ size: this.size });
    else if (scope.kind === `review`) { const keys = Memory.weakItems(); ids = Builder.build({ keys, size: Math.min(20, Math.max(5, keys.length)) }); }
    if (!ids.length) return;
    Dialog.closeAll();
    Store.newSession(ids, mode, { scope });
    Sound.play(`toggle`);
    Router.go(`quiz`);
  }
};

/* ==========================================================================
   15 · HOME — assignment, quick actions and the course map
   ========================================================================== */
const Screens = {};
const masteryRing = (pct, size = 64) => {
  const C = 2 * Math.PI * 26;
  return `<div class="mring" style="width:${size}px;height:${size}px" aria-hidden="true"><svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="26" fill="none" stroke="rgba(215,221,213,.8)" stroke-width="5"/>
    <circle class="mring__bar" cx="30" cy="30" r="26" fill="none" stroke="url(#ringGrad)" stroke-width="5" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${C.toFixed(1)}" data-mring="${pct}"/></svg>
    <b class="num">${pct}<small>%</small></b></div>`;
};

Screens.home = {
  html() {
    const t = L(), h = t.home, c = COURSE[lang()], st = Store.state;
    const am = MODMAP[ASSIGNMENT.module], at = modText(am), ms = Memory.mastery(am.id);
    const days = Schedule.daysUntil(ASSIGNMENT.due);
    const weak = Memory.weakItems().length;
    const lecs = am.lectures.map((x) => `${h.lecture} ${x[0]} · ${Schedule.short(x[1])}`).join(`<span class="dot-sep"></span>`);
    const quick = (action, ic, title, text, extra = ``) => `<button class="card quick" data-action="${action}" ${extra}><span class="quick__icon">${icon(ic, `icon--lg`)}</span><span><b>${title}</b><span>${text}</span></span>${icon(`arrowRight`, `quick__go`)}</button>`;
    return `<section class="screen">
      <div class="home-hero">
        <div class="hero">
          <p class="eyebrow hero__eyebrow">${h.eyebrow}</p>
          <h1 class="hero__title">${c.hero}</h1>
          <p class="hero__lead">${c.lead}</p>
          <div class="profile">
            <div class="field">${icon(`user`)}<input id="student-name" type="text" autocomplete="name" maxlength="48" placeholder=" " value="${escapeHTML(st.name)}"><label for="student-name">${h.profile}</label></div>
            ${Segmented.html([[`ru`, `Русский`], [`en`, `English`]], lang(), `data-lang`).replace(`class="seg"`, `class="seg seg--lg"`)}
          </div>
        </div>
        <article class="card assignment" aria-labelledby="as-title">
          <div class="assignment__art" aria-hidden="true">${this.artHTML()}</div>
          <div class="assignment__head">
            <span class="eyebrow assignment__eyebrow">${icon(`flag`, `icon--sm`)}${h.assignment} · ${h.practice} ${ASSIGNMENT.n}</span>
            <span class="due-chip${days === 0 ? ` is-today` : days < 0 ? ` is-over` : ``}">${icon(`calendar`, `icon--sm`)}${Schedule.countdown(ASSIGNMENT.due)}</span>
          </div>
          <h2 class="assignment__title" id="as-title">${at.title}</h2>
          <p class="assignment__meta">${h.due.label}: <b>${Schedule.long(ASSIGNMENT.due)}</b><span class="dot-sep"></span>${lecs}</p>
          <div class="assignment__progress">
            ${masteryRing(ms.pct, 72)}
            <div><b>${h.mastery}</b><span>${fmt(h.studied, { a: ms.seen, t: ms.total })} ${plural(ms.total, `task`)}</span></div>
          </div>
          <div class="assignment__actions">
            <button class="btn btn--primary btn--lg" data-action="session" data-scope="module" data-module="${am.id}">${icon(`play`)}${h.prepare}</button>
            <button class="btn btn--lg" data-action="open-lib" data-module="${am.id}">${icon(`book`)}${h.notes}</button>
          </div>
        </article>
      </div>
      ${this.resumeHTML()}
      <div class="quicks">
        ${quick(`session`, `award`, h.quick.mixed, h.quick.mixedText, `data-scope="mixed"`)}
        ${quick(`session`, `refresh`, h.quick.review, weak ? fmt(h.quick.reviewText, { n: weak, w: plural(weak, `task`) }) : h.quick.reviewNone, `data-scope="review"`)}
        ${quick(`go-library`, `library`, h.quick.library, h.quick.libraryText)}
      </div>
      <div class="section-head"><h2>${h.map}</h2><p>${h.mapHint}</p></div>
      <div class="modmap">${MODULES.map((m, i) => this.moduleCard(m, i)).join(``)}</div>
    </section>`;
  },
  artHTML() {
    const rng = mulberry32(3);
    const a = Scenery.ridge(rng, { w: 400, h: 140, base: 140, rough: 3, peaks: [[60, 60, 30], [170, 100, 34], [280, 72, 30], [370, 90, 30]] });
    const b = Scenery.ridge(rng, { w: 400, h: 140, base: 140, rough: 3, peaks: [[110, 50, 40], [230, 64, 34], [340, 40, 40]] });
    return `<svg viewBox="0 0 400 140" preserveAspectRatio="xMaxYMax slice"><defs><linearGradient id="asA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9CB7A4" stop-opacity=".45"/><stop offset="1" stop-color="#9CB7A4" stop-opacity="0"/></linearGradient><linearGradient id="asB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6F9584" stop-opacity=".35"/><stop offset="1" stop-color="#6F9584" stop-opacity="0"/></linearGradient></defs>
      <circle cx="320" cy="34" r="16" fill="#D6B86E" opacity=".35"/><path d="${a.d}" fill="url(#asA)"/><path d="${b.d}" fill="url(#asB)"/></svg>`;
  },
  moduleCard(m, i) {
    const t = L(), h = t.home, mt = modText(m), st = Schedule.status(m), ms = Memory.mastery(m.id);
    const lec = m.lectures.length ? `${m.lectures.length > 1 ? h.lectures : h.lecture} ${Schedule.range(m.lectures)} · ${m.lectures.map((x) => Schedule.short(x[1])).join(`, `)}` : ``;
    const pr = m.practices.filter((x) => x[1]).map((x) => `${h.practice} ${x[0]} · ${Schedule.short(x[1])}`).join(``);
    return `<article class="card mod" data-status="${st}" style="--i:${i}">
      <div class="mod__top"><span class="mod__n num">${pad2(m.n)}</span><span class="mod__status">${h.status[st]}</span><span class="mod__icon">${icon(m.icon)}</span></div>
      <h3 class="mod__title">${mt.title}</h3>
      <p class="mod__dates">${lec}${pr ? `<br>${pr}` : ``}</p>
      <div class="mod__bar" aria-label="${h.mastery}: ${ms.pct}%"><span style="--v:${(ms.pct / 100).toFixed(3)}"></span></div>
      <div class="mod__foot"><span class="num">${ms.pct}%</span>
        <div class="mod__actions"><button class="btn btn--sm btn--ghost" data-action="open-lib" data-module="${m.id}">${icon(`book`, `icon--sm`)}${h.notes}</button>
        <button class="btn btn--sm" data-action="session" data-scope="module" data-module="${m.id}">${icon(`play`, `icon--sm`)}${h.test}</button></div></div>
    </article>`;
  },
  resumeHTML() {
    const s = Store.session, t = L().resume;
    if (!s) return ``;
    const mode = L().modes[s.mode].name, title = Sessions.title(s.scope);
    if (!s.finishedAt) {
      return `<div class="resume" role="status"><span class="resume__icon">${icon(`bookmark`)}</span>
        <div class="resume__text"><b>${t.title} · ${title}</b>${fmt(t.text, { n: s.index + 1, t: s.ids.length, mode })}</div>
        <div class="resume__actions"><button class="btn btn--sm btn--ghost" data-action="discard">${t.discard}</button><button class="btn btn--sm btn--primary" data-action="resume">${t.go}</button></div></div>`;
    }
    const pct = Math.round(Engine.counts().correct / s.ids.length * 100);
    return `<div class="resume" role="status"><span class="resume__icon">${icon(`award`)}</span>
      <div class="resume__text"><b>${fmt(t.doneTitle, { pct })} · ${title}</b>${fmt(t.doneText, { mode, date: fmtDate(s.finishedAt) })}</div>
      <div class="resume__actions"><button class="btn btn--sm" data-action="open-results">${t.open}</button></div></div>`;
  },
  mount(screen, { refresh } = {}) {
    Segmented.sync(screen);
    const input = $(`#student-name`, screen);
    input.addEventListener(`input`, () => Store.set({ name: input.value.trim() }));
    const C = 2 * Math.PI * 26;
    requestAnimationFrame(() => setTimeout(() => $$(`[data-mring]`, screen).forEach((el) => { el.style.strokeDashoffset = (C * (1 - el.dataset.mring / 100)).toFixed(1); }), refresh ? 0 : 400));
    requestAnimationFrame(() => setTimeout(() => screen.classList.add(`is-drawn`), refresh ? 0 : 500));
  }
};

/* ==========================================================================
   16 · LIBRARY — study notes for every topic
   ========================================================================== */
const Library = {
  moduleHTML(m, { inDialog = false } = {}) {
    const t = L(), h = t.home, lb = t.lib, mt = modText(m);
    const sched = [m.lectures.length ? `${m.lectures.length > 1 ? h.lectures : h.lecture} ${Schedule.range(m.lectures)} (${m.lectures.map((x) => Schedule.short(x[1])).join(`, `)})` : ``,
      ...m.practices.filter((x) => x[1]).map((x) => `${h.practice} ${x[0]} (${Schedule.short(x[1])})`)].filter(Boolean).join(` · `);
    const idx = MODULES.indexOf(m), prev = MODULES[idx - 1], next = MODULES[idx + 1];
    return `<article class="lib-doc">
      <header class="lib-doc__head">
        <p class="eyebrow">${lb.topic} ${pad2(m.n)} · ${sched}</p>
        <h1 class="lib-doc__title">${mt.title}</h1>
        <p class="lib-doc__lead">${mt.lead}</p>
        <div class="lib-doc__actions">${inDialog ? `` : `<button class="btn btn--primary" data-action="session" data-scope="module" data-module="${m.id}">${icon(`play`)}${lb.test}</button>`}${m.id === ASSIGNMENT.module ? `<span class="due-chip">${icon(`flag`, `icon--sm`)}${h.assignment}</span>` : ``}</div>
      </header>
      <section class="lib-sec"><h2 class="lib-sec__title">${icon(`list`)}${lb.concepts}</h2>
        <dl class="concepts">${mt.concepts.map(([k, v]) => `<div class="concept"><dt>${k}</dt><dd>${v}</dd></div>`).join(``)}</dl></section>
      ${mt.formulas.length ? `<section class="lib-sec"><h2 class="lib-sec__title">${icon(`formula`)}${lb.formulas}</h2>
        <div class="formulas">${mt.formulas.map(([n, f, note]) => `<div class="formula"><span class="formula__name">${n}</span><div class="formula__expr">${f}</div>${note ? `<p class="formula__note">${note}</p>` : ``}</div>`).join(``)}</div></section>` : ``}
      <section class="lib-sec"><h2 class="lib-sec__title">${icon(`target`)}${lb.example}: ${mt.example.title}</h2>
        <ol class="steps">${mt.example.steps.map((s) => `<li>${s}</li>`).join(``)}</ol>
        <div class="takeaway"><span class="eyebrow">${icon(`star`, `icon--sm`)}${lb.summary}</span><p>${mt.example.result}</p></div></section>
      <section class="lib-sec"><h2 class="lib-sec__title">${icon(`x`)}${lb.pitfalls}</h2>
        <ul class="pitfalls">${mt.pitfalls.map((p) => `<li>${icon(`x`, `icon--sm`)}<span>${p}</span></li>`).join(``)}</ul></section>
      <blockquote class="lib-summary">${mt.summary}</blockquote>
      ${inDialog ? `` : `<nav class="lib-pager">
        ${prev ? `<button class="btn btn--ghost" data-action="lib-select" data-module="${prev.id}">${icon(`chevronLeft`)}<span><small>${lb.prev}</small>${modText(prev).title}</span></button>` : `<span></span>`}
        ${next ? `<button class="btn btn--ghost lib-pager__next" data-action="lib-select" data-module="${next.id}"><span><small>${lb.next}</small>${modText(next).title}</span>${icon(`chevronRight`)}</button>` : ``}
      </nav>`}
    </article>`;
  },
  navHTML(active, query = ``) {
    const q = query.trim().toLowerCase();
    const hits = MODULES.filter((m) => {
      if (!q) return true;
      const mt = modText(m);
      return [mt.title, mt.lead, ...mt.concepts.flat(), ...mt.formulas.flat()].join(` `).toLowerCase().includes(q);
    });
    if (!hits.length) return `<p class="lib-empty">${L().lib.nothing}</p>`;
    return hits.map((m) => { const ms = Memory.mastery(m.id); return `<button class="lib-link${m.id === active ? ` is-active` : ``}" data-action="lib-select" data-module="${m.id}" ${m.id === active ? `aria-current="page"` : ``}>
      <span class="lib-link__n num">${pad2(m.n)}</span><span class="lib-link__t">${modText(m).title}</span>${m.id === ASSIGNMENT.module ? `<span class="lib-link__flag" title="${L().home.assignment}"></span>` : ``}<span class="lib-link__m num">${ms.pct}%</span></button>`; }).join(``);
  },
  openDialog(id) {
    const m = MODMAP[id];
    Dialog.open({ wide: true, label: modText(m).title, html: this.moduleHTML(m, { inDialog: true }) });
  }
};

Screens.library = {
  query: ``,
  html() {
    const t = L(), active = MODMAP[Store.state.lib] || MODULES[0];
    return `<section class="screen"><div class="lib">
      <aside class="card lib-nav" aria-label="${t.lib.title}">
        <div class="lib-nav__head"><h2>${t.lib.title}</h2>
          <div class="field field--search">${icon(`search`)}<input id="lib-search" type="search" placeholder=" " value="${escapeHTML(this.query)}" autocomplete="off"><label for="lib-search">${t.lib.search}</label></div></div>
        <div class="lib-nav__list" id="lib-list">${Library.navHTML(active.id, this.query)}</div>
      </aside>
      <button class="card lib-picker" data-action="lib-picker">${icon(`list`)}<span><small>${t.lib.choose}</small>${pad2(active.n)} · ${modText(active).title}</span>${icon(`chevronDown`)}</button>
      <div class="card lib-main" id="lib-main">${Library.moduleHTML(active)}</div>
    </div></section>`;
  },
  mount(screen) {
    const input = $(`#lib-search`, screen);
    input.addEventListener(`input`, () => { this.query = input.value; $(`#lib-list`).innerHTML = Library.navHTML(Store.state.lib, this.query); });
  },
  select(id) {
    Store.set({ lib: id });
    if (Router.current !== `library`) { Router.go(`library`); return; }
    $(`#lib-main`).innerHTML = Library.moduleHTML(MODMAP[id]);
    const main = $(`#lib-main`); main.classList.remove(`is-swap`); void main.offsetWidth; main.classList.add(`is-swap`);
    $(`#lib-list`).innerHTML = Library.navHTML(id, this.query);
    const picker = $(`.lib-picker span`); if (picker) picker.innerHTML = `<small>${L().lib.choose}</small>${pad2(MODMAP[id].n)} · ${modText(MODMAP[id]).title}`;
    const top = main.getBoundingClientRect().top + window.scrollY - 90;
    if (window.scrollY > top) window.scrollTo({ top, behavior: prefersReducedMotion() ? `auto` : `smooth` });
    Sound.play(`click`);
  },
  picker() {
    Dialog.open({ variant: `sheet`, label: L().lib.choose, html: `<h2>${L().lib.choose}</h2><div class="lib-nav__list" style="margin-top:16px">${Library.navHTML(Store.state.lib)}</div>` });
  }
};

/* ==========================================================================
   17 · QUIZ
   ========================================================================== */
const RING_C = 2 * Math.PI * 44;
const ring = (small = false) => `
  <div class="ring" aria-hidden="true"><svg viewBox="0 0 100 100"><circle class="ring__track" cx="50" cy="50" r="44" fill="none" stroke-width="${small ? 9 : 6}"/>
  <circle class="ring__bar" data-ring cx="50" cy="50" r="44" fill="none" stroke-width="${small ? 9 : 6}" stroke-linecap="round" stroke-dasharray="${RING_C.toFixed(2)}" stroke-dashoffset="${RING_C.toFixed(2)}"/></svg>
  <div class="ring__label"><div><b data-stat="progress">0</b>${small ? `` : `<span>${L().hud.answered}</span>`}</div></div></div>`;

const STAT_DEFS = [[`score`, `target`], [`accuracy`, `chart`], [`streak`, `flame`], [`longest`, `award`], [`xp`, `sparkle`], [`stars`, `star`], [`remaining`, `layers`], [`eta`, `clock`]];
const statsHTML = () => `<div class="stats">${STAT_DEFS.map(([k, ic]) =>
  `<div class="stat${k === `streak` ? ` stat--flame` : ``}"><div class="stat__label">${icon(ic)}${L().hud[k]}</div><div class="stat__value" data-stat="${k}">—</div></div>`).join(``)}</div>`;

Screens.quiz = {
  enteredAt: null,
  html() {
    const t = L(), s = Store.session, mode = t.modes[s.mode];
    const timerStat = s.mode === `challenge` ? `<span class="mstrip__stat">${icon(`clock`)}<span data-timer-label>—</span></span>` : ``;
    return `<section class="screen">
      <div class="mstrip card">
        <button class="icon-btn" data-action="navigator" aria-label="${t.a11y.navigator}" style="width:auto;height:auto;padding:0;border-radius:50%">${ring(true)}</button>
        <div class="mstrip__stats">
          <span class="mstrip__stat">${icon(`target`)}<span data-stat="score">—</span></span>
          <span class="mstrip__stat is-flame">${icon(`flame`)}<span data-stat="streak">—</span></span>
          <span class="mstrip__stat">${icon(`sparkle`)}<span data-stat="xp">—</span></span>
          ${timerStat}
        </div>
      </div>
      <div class="quiz">
        <div class="quiz__main"><article class="card q-card" id="qcard" aria-labelledby="q-text"></article></div>
        <aside class="hud" aria-label="${t.hud.progress}">
          <div class="card hud__card">
            <div class="hud__top">${ring()}<div class="hud__mode"><span class="eyebrow">${mode.name}</span><b>${Sessions.title(s.scope)}</b><span>${mode.desc}</span></div></div>
            ${statsHTML()}
            ${Engine.scoreLocked() ? `<p class="hud__locked">${icon(`lock`, `icon--sm`)}${t.hud.locked}</p>` : ``}
          </div>
          <div class="card hud__card">
            <span class="eyebrow">${t.hud.navigator}</span>
            <div class="mini-nav nav-grid">${Nav.cellsHTML()}</div>
            <div class="hud__actions" style="margin-top:16px">
              <button class="btn btn--sm" data-action="shortcuts">${icon(`keyboard`)}<span class="kbd">?</span></button>
              <button class="btn btn--sm btn--primary" data-action="finish">${icon(`flag`)}${t.hud.finish}</button>
            </div>
          </div>
        </aside>
      </div>
    </section>`;
  },
  mount(screen, { refresh } = {}) {
    if (Store.session.finishedAt) { Router.go(`results`, { instant: true }); return; }
    this.renderCard(refresh ? null : `next`, { quiet: true });
    Hud.update({ silent: true });
  },

  cardHTML() {
    const t = L(), s = Store.session, id = Engine.currentId(), q = Q(id), tx = qText(q), r = Engine.rec(id);
    const n = s.index + 1, total = s.ids.length, last = n === total;
    const ctx = tx.ctx ? (() => {
      const signs = tx.ctx.rows.every((row) => row.slice(1).every((v) => /^[+−-]$/.test(v)));
      return `<div class="q-ctx${signs ? ` q-ctx--signs` : ``}"><table>
        ${tx.ctx.head ? `<thead><tr>${tx.ctx.head.map((h) => `<th scope="col">${h}</th>`).join(``)}</tr></thead>` : ``}
        <tbody>${tx.ctx.rows.map((row) => `<tr>${row.map((c, i) => i ? `<td>${c}</td>` : `<th scope="row">${c}</th>`).join(``)}</tr>`).join(``)}</tbody></table></div>`;
    })() : ``;
    const dots = CONFIG.diffs.map((d, i) => `<i class="${i < CONFIG.diffLevel[q.diff] ? `on` : ``}"></i>`).join(``);
    const timeChip = s.mode === `challenge`
      ? `<span class="badge badge--plain">${icon(`clock`)}<span data-timer-label>${fmtDuration(r.timeLeft ?? q.time)}</span></span>`
      : `<span class="badge badge--plain">${icon(`clock`)}${t.quiz.approx} ${fmtDuration(q.time)}</span>`;
    const topicLabel = q.module === `cashflow` && TOPICS[q.topic] ? TOPICS[q.topic][lang()] : modText(q.module).title;
    const options = r.perm.map((orig, pos) => `
      <button type="button" class="option" data-action="opt" data-opt="${orig}">
        <span class="option__letter" aria-hidden="true">${CONFIG.letters[pos]}</span>
        <span class="option__text"><span class="sr-only">${CONFIG.letters[pos]}. </span>${tx.o[orig]}</span>
        <span class="option__state" aria-hidden="true"></span>
      </button>`).join(``);
    return `
      ${s.mode === `challenge` ? `<div class="q-timer" id="q-timer" aria-hidden="true"><span></span></div>` : ``}
      <header class="q-head">
        <div class="q-head__meta">
          <span class="q-num"><b class="num">${pad2(n)}</b>/ ${pad2(total)}</span>
          <span class="badge">${icon(MODMAP[q.module].icon)}${topicLabel}</span>
          <span class="badge badge--diff" data-diff="${q.diff}"><span class="diff-dots" aria-hidden="true">${dots}</span>${t.diff[q.diff]}</span>
          ${timeChip}
          ${q.gen ? `<span class="badge badge--plain" title="${t.home.endless}">${icon(`shuffle`)}</span>` : ``}
        </div>
        <div class="q-head__tools">
          <button class="chip-toggle" data-action="bookmark" data-kind="bm" aria-pressed="${s.bookmarks.includes(id)}" title="K">${icon(`bookmark`, `icon--sm`)}<span>${t.quiz.bookmark}</span></button>
          <button class="chip-toggle" data-action="review" data-kind="review" aria-pressed="${s.review.includes(id)}" title="R">${icon(`flag`, `icon--sm`)}<span>${t.quiz.review}</span></button>
        </div>
      </header>
      <div class="q-stage" id="q-stage">
        <p class="eyebrow q-type">${t.types[q.type]}</p>
        <h2 class="q-text" id="q-text" tabindex="-1">${tx.q}</h2>
        ${ctx}
        <div class="options" role="group" aria-label="${t.a11y.options}">${options}</div>
        <div class="q-feedback" id="q-feedback" aria-live="polite"></div>
        <section class="explain" id="explain" aria-live="polite"></section>
      </div>
      <footer class="q-foot">
        <button class="btn q-foot__prev" data-action="prev" ${s.index === 0 ? `disabled` : ``} aria-label="${t.quiz.prev}">${icon(`arrowLeft`)}<span class="label-sm-hide">${t.quiz.prev}</span></button>
        <div class="q-foot__mid"><button class="btn btn--ghost" data-action="skip" ${Engine.isAnswered(id) ? `disabled` : ``}>${t.quiz.skip}<span class="kbd">S</span></button></div>
        <button class="btn btn--primary q-foot__next" data-action="next">${last ? t.quiz.finish : t.quiz.next}${icon(last ? `flag` : `arrowRight`)}</button>
      </footer>`;
  },

  renderCard(dir, { quiet = false } = {}) {
    const card = $(`#qcard`); if (!card) return;
    card.innerHTML = this.cardHTML();
    const stage = $(`#q-stage`);
    if (dir) stage.classList.add(dir === `prev` ? `is-enter-prev` : `is-enter-next`);
    this.paint({ instant: true });
    this.enteredAt = performance.now();
    Timer.start(Engine.currentId());
    Nav.refresh();
    Topbar.update();
    if (!quiet) $(`#q-text`).focus({ preventScroll: true });
  },

  paint({ instant = false, justTried = null } = {}) {
    const s = Store.session, id = Engine.currentId(), q = Q(id), r = Engine.rec(id), t = L();
    const stage = $(`#q-stage`); if (!stage) return;
    stage.classList.toggle(`no-anim`, instant);
    const revealed = s.mode !== `exam` && r.revealed;
    $$(`.option`, stage).forEach((el) => {
      const i = +el.dataset.opt, isCorrect = i === q.correct;
      const wrongPick = revealed && !isCorrect && (r.selected === i || (s.mode === `practice` && r.tries.includes(i)));
      const tried = s.mode === `practice` && !r.revealed && r.tries.includes(i);
      el.className = `option` +
        (s.mode === `exam` && r.selected === i ? ` is-selected` : ``) +
        (revealed && isCorrect ? ` is-correct` : ``) +
        (wrongPick || tried ? ` is-wrong` : ``) +
        (tried && i !== justTried ? ` is-tried` : ``) +
        (revealed && !isCorrect && !wrongPick ? ` is-dim` : ``) +
        (revealed || tried ? ` is-locked` : ``);
      el.setAttribute(`aria-pressed`, s.mode === `exam` ? String(r.selected === i) : `false`);
      if (revealed || tried) el.setAttribute(`aria-disabled`, `true`); else el.removeAttribute(`aria-disabled`);
      $(`.option__state`, el).innerHTML = revealed && isCorrect ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${ICONS.checkDraw}</svg>`
        : (wrongPick || tried) ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">${ICONS.xDraw}</svg>` : ``;
    });
    const fb = $(`#q-feedback`);
    fb.className = `q-feedback`;
    if (s.mode === `exam` && r.selected !== null) { fb.classList.add(`is-saved`); fb.innerHTML = `${icon(`check`)}<span>${t.quiz.saved}</span>`; }
    else if (s.mode === `practice` && !r.revealed && r.tries.length) {
      const lastTry = r.tries[r.tries.length - 1];
      fb.classList.add(`is-hint`);
      fb.innerHTML = `${icon(`info`)}<span><b>${t.quiz.retry}</b><br>${fmt(t.quiz.retryWhy, { l: letterOf(r, lastTry) })} ${qText(q).why[lastTry]}</span>`;
    } else fb.innerHTML = ``;
    const ex = $(`#explain`);
    if (revealed && !ex.childElementCount) {
      ex.innerHTML = `<div class="explain__clip"><div class="explain__body">${Explain.html(q, r, { verdict: true })}</div></div>`;
      if (instant) ex.classList.add(`is-open`);
      else { void ex.offsetHeight; requestAnimationFrame(() => ex.classList.add(`is-open`)); }
    }
    const skip = $(`[data-action="skip"]`, $(`#qcard`));
    if (skip) skip.disabled = Engine.isAnswered(id);
  },

  /** `pos` is a display position (keyboard); converted to the original index. */
  chooseAt(pos) { const r = Engine.rec(Engine.currentId()); this.choose(r.perm[pos]); },
  choose(idx) {
    const s = Store.session; if (!s || s.finishedAt) return;
    if (s.mode === `challenge`) Timer.stop();
    const id = Engine.currentId(), r = Engine.rec(id);
    const wasRevealed = r.revealed;
    const res = Engine.choose(idx);
    if (res.kind === `ignored`) { if (s.mode === `challenge` && !r.revealed) Timer.start(id); return; }
    const optEl = $(`.option[data-opt="${idx}"]`);
    const t = L(), q = Q(id);
    if (res.kind === `selected`) {
      Sound.play(`select`);
      this.paint();
      if (Engine.counts().remaining === 0) Toast.show(t.toast.allDone, `check`);
    } else if (res.kind === `retry`) {
      Sound.play(`wrong`);
      this.paint({ justTried: idx });
      setTimeout(() => optEl && optEl.classList.add(`is-tried`), 560);
      Announce(t.quiz.retry);
    } else {
      if (!wasRevealed) this.trackTime(id);
      const ok = res.kind === `correct`;
      Sound.play(ok ? `correct` : `wrong`);
      this.paint();
      const target = $(`.option[data-opt="${q.correct}"]`);
      if (ok && target && !prefersReducedMotion()) { const b = document.createElement(`span`); b.className = `option__burst`; target.appendChild(b); b.addEventListener(`animationend`, () => b.remove()); }
      const gained = r.xp + r.bonus + r.streakXp;
      if (gained > 0) setTimeout(() => Effects.floatXP(target, `+${gained} XP`), 260);
      Announce(ok ? t.verdict.right[0] : `${t.verdict.wrong[0]}. ${t.verdict.answer}: ${letterOf(r, q.correct)}`);
      setTimeout(() => this.scrollToExplain(), 420);
    }
    Hud.update();
    Store.save();
  },
  onTimeout() {
    if (!Engine.timeout()) return;
    this.trackTime(Engine.currentId());
    Sound.play(`wrong`);
    this.paint();
    Hud.update(); Store.save();
    Announce(L().quiz.timeout);
    setTimeout(() => this.scrollToExplain(), 420);
  },
  scrollToExplain() {
    const el = $(`#explain`); if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue(`--topbar-h`)) || 68) - 24;
    if (top > window.scrollY + window.innerHeight * 0.35) window.scrollTo({ top, behavior: prefersReducedMotion() ? `auto` : `smooth` });
  },
  trackTime(id) {
    if (this.enteredAt == null) return;
    Engine.rec(id).spent += (performance.now() - this.enteredAt) / 1000;
    this.enteredAt = null;
  },
  leave() {
    const s = Store.session; if (!s || s.finishedAt) return;
    const id = Engine.currentId();
    Timer.stop();
    if (!s.records[id].revealed) this.trackTime(id);
  },
  go(index) {
    const s = Store.session;
    if (index < 0 || index >= s.ids.length || index === s.index) return;
    const dir = index > s.index ? `next` : `prev`;
    this.leave();
    s.index = index; Store.save();
    Sound.play(`click`);
    this.renderCard(dir);
    Hud.update({ silent: true });
    const card = $(`#qcard`);
    if (card && card.getBoundingClientRect().top < 0) window.scrollTo({ top: Math.max(0, card.getBoundingClientRect().top + window.scrollY - 90), behavior: prefersReducedMotion() ? `auto` : `smooth` });
  },
  next() { const s = Store.session; if (s.index === s.ids.length - 1) this.confirmFinish(); else this.go(s.index + 1); },
  prev() { this.go(Store.session.index - 1); },
  skip() {
    const s = Store.session, id = Engine.currentId();
    if (Engine.isAnswered(id)) return this.next();
    s.records[id].skipped = true;
    Toast.show(L().toast.skipped, `skip`);
    const order = [...s.ids.keys()].map((k) => (s.index + 1 + k) % s.ids.length);
    const nextIdx = order.find((k) => k !== s.index && !Engine.isAnswered(s.ids[k]) && !s.records[s.ids[k]].skipped)
      ?? order.find((k) => k !== s.index && !Engine.isAnswered(s.ids[k]));
    if (nextIdx === undefined) this.confirmFinish(); else this.go(nextIdx);
  },
  toggleList(list, okKey, offKey, iconName) {
    const s = Store.session, id = Engine.currentId(), arr = s[list], i = arr.indexOf(id);
    if (i >= 0) arr.splice(i, 1); else arr.push(id);
    const on = i < 0;
    const btn = $(`[data-action="${list === `bookmarks` ? `bookmark` : `review`}"]`, $(`#qcard`));
    if (btn) btn.setAttribute(`aria-pressed`, on);
    Toast.show(L().toast[on ? okKey : offKey], iconName);
    Sound.play(`click`); Nav.refresh(); Store.save();
  },
  confirmFinish() {
    const t = L().finish, s = Store.session, c = Engine.counts();
    const marked = s.review.filter((id) => s.ids.includes(id)).length;
    const firstUn = s.ids.findIndex((id) => !Engine.isAnswered(id));
    const firstRv = s.ids.findIndex((id) => s.review.includes(id));
    Dialog.open({
      label: t.title,
      html: `<div class="dialog__icon">${icon(`flag`, `icon--lg`)}</div><h2>${t.title}</h2><p class="dialog__text">${t.text}</p>
        <ul class="summary-list">
          <li><span>${t.answered}</span><b class="num">${c.answered} / ${c.total}</b></li>
          ${c.remaining ? `<li><span>${t.unanswered}</span><b class="num">${c.remaining}</b></li>` : ``}
          ${marked ? `<li><span>${t.review}</span><b class="num">${marked}</b></li>` : ``}
        </ul>
        <div class="dialog__actions">
          ${firstUn >= 0 ? `<button class="btn" data-action="goto" data-index="${firstUn}">${t.gotoFirst}</button>` : marked ? `<button class="btn" data-action="goto" data-index="${firstRv}">${t.gotoReview}</button>` : `<button class="btn" data-close>${t.stay}</button>`}
          <button class="btn btn--primary" data-action="do-finish" autofocus>${t.confirm}</button>
        </div>`
    });
  },
  finish() {
    Dialog.closeAll();
    this.leave();
    Engine.finish();
    Router.go(`loading`);
    setTimeout(() => Router.go(`results`), CONFIG.resultsLoaderMs);
  }
};

Screens.loading = {
  html() { const t = L().loader; return `<section class="screen"><div class="loading-screen"><div class="loader" role="status">${enso()}<b>${t.results}</b><span>${t.resultsSub}</span></div></div></section>`; }
};

/* ==========================================================================
   18 · EXPLANATION COMPONENT (quiz + review)
   ========================================================================== */
const Explain = {
  html(q, r, { verdict = true } = {}) {
    const t = L(), tx = qText(q), mode = Store.session.mode;
    let head = ``;
    if (verdict) {
      const ok = r.firstTry === true, seed = hashStr(q.id + lang());
      const title = r.timedOut ? t.verdict.timeout
        : ok ? pick(t.verdict.right, seed)
        : mode === `practice` ? fmt(t.verdict.afterTries, { n: r.tries.length })
        : pick(t.verdict.wrong, seed);
      const good = ok || (mode === `practice` && !r.timedOut);
      const total = r.xp + r.bonus + r.streakXp;
      const detail = [r.bonus ? `+${r.bonus} ${t.verdict.speed}` : ``, r.streakXp ? `+${r.streakXp} ${t.verdict.streak}` : ``].filter(Boolean).join(` · `);
      head = `<div class="verdict${good ? `` : ` verdict--wrong`}">
        <span class="verdict__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">${r.timedOut ? ICONS.hourglass : good ? ICONS.checkDraw : ICONS.xDraw}</svg></span>
        <div><div class="verdict__title">${title}</div><div class="verdict__answer">${t.verdict.answer}: <b>${letterOf(r, q.correct)} — ${tx.o[q.correct]}</b></div></div>
        ${total ? `<div class="verdict__xp">+${total} ${t.verdict.xp}${detail ? `<small>${detail}</small>` : ``}</div>` : ``}
      </div>`;
    }
    const picked = new Set(mode === `practice` ? r.tries : r.selected !== null ? [r.selected] : []);
    const order = r.perm || [0, 1, 2, 3];
    const why = `<ul class="why-list">${order.map((i) => `<li class="${i === q.correct ? `is-right` : ``}${picked.has(i) ? ` is-picked` : ``}"><span class="letter">${letterOf(r, i)}</span><span>${tx.why[i]}${picked.has(i) ? `<span class="picked-tag">· ${t.ex.picked}</span>` : ``}</span></li>`).join(``)}</ul>`;
    const insight = (cls, ic, title, text) => text ? `<div class="insight insight--${cls}"><div class="insight__head"><span class="insight__icon">${icon(ic)}</span><span class="insight__title">${title}</span></div><p>${text}</p></div>` : ``;
    return `${head}
      <div class="ex-block"><div class="ex-block__head">${icon(`book`)}<h3>${t.ex.why}</h3></div><p>${tx.ex}</p></div>
      <div class="takeaway"><span class="eyebrow">${icon(`star`, `icon--sm`)}${t.ex.takeaway}</span><p>${tx.takeaway}</p></div>
      ${Accordion.html({ title: t.ex.options, iconName: `layers`, body: why, open: true })}
      <div class="insights">
        ${insight(`trick`, `bulb`, t.ex.trick, tx.trick)}
        ${insight(`mistake`, `target`, t.ex.mistake, tx.mistake)}
        ${insight(`example`, `globe`, t.ex.example, tx.example)}
        ${insight(`related`, `link`, t.ex.related, tx.related)}
      </div>
      <button class="btn btn--sm btn--ghost ex-notes" data-action="notes-dialog" data-module="${q.module}">${icon(`book`, `icon--sm`)}${t.lib.openNotes}: ${modText(q.module).title}</button>`;
  }
};

/* ==========================================================================
   19 · TIMER (challenge mode)
   ========================================================================== */
const Timer = {
  id: null, limit: 0, left: 0, last: 0, iv: 0, whole: null,
  start(id) {
    this.stop();
    const s = Store.session; if (!s || s.mode !== `challenge`) return;
    const r = s.records[id], limit = Q(id).time;
    if (r.revealed) { this.render(r.timeLeft ?? 0, limit); return; }
    this.id = id; this.limit = limit; this.left = r.timeLeft ?? limit; this.last = performance.now(); this.whole = null;
    this.render(this.left, limit);
    this.iv = setInterval(() => this.tick(), 200);
  },
  tick() {
    const now = performance.now();
    if (document.hidden) { this.last = now; return; }
    this.left -= (now - this.last) / 1000; this.last = now;
    const r = Store.session.records[this.id];
    r.timeLeft = Math.max(0, this.left);
    if (this.left <= 0) { this.stop(); Screens.quiz.onTimeout(); return; }
    const whole = Math.ceil(this.left);
    if (whole !== this.whole) {
      this.whole = whole; this.render(this.left, this.limit);
      if (whole <= 5) Sound.play(`tick`);
      if (whole % 5 === 0) Store.save();
    }
  },
  stop() {
    clearInterval(this.iv); this.iv = 0;
    const s = Store.session;
    if (this.id && s) { const r = s.records[this.id]; if (r && !r.revealed) r.timeLeft = Math.max(0, this.left); }
    this.id = null;
  },
  render(left, limit) {
    const p = clamp(left / limit, 0, 1);
    const bar = $(`#q-timer`);
    if (bar) { bar.style.setProperty(`--p`, p.toFixed(3)); bar.dataset.state = p < 0.15 ? `danger` : p < 0.35 ? `warn` : `ok`; }
    $$(`[data-timer-label]`).forEach((el) => { el.textContent = fmtDuration(Math.ceil(left)); });
  }
};

/* ==========================================================================
   20 · HUD & NAVIGATOR
   ========================================================================== */
const Hud = {
  update({ silent = false } = {}) {
    const s = Store.session; if (!s) return;
    const c = Engine.counts(), locked = Engine.scoreLocked(), dash = `—`;
    const etaMin = Math.round(c.eta / 60);
    const values = {
      progress: `${c.answered}/${c.total}`,
      score: locked ? dash : c.correct,
      accuracy: locked || c.accuracy === null ? dash : `${Math.round(c.accuracy * 100)}%`,
      streak: locked ? dash : s.streak,
      longest: locked ? dash : s.longest,
      xp: locked ? dash : s.xp,
      stars: locked ? dash : s.stars,
      remaining: c.remaining,
      eta: c.eta ? (etaMin >= 1 ? `${etaMin} ${L().quiz.min}` : `${c.eta} ${L().quiz.sec}`) : `0`
    };
    $$(`[data-stat]`).forEach((el) => {
      const k = el.dataset.stat, v = String(values[k]);
      if (el.dataset.v === v) return;
      const grew = !silent && el.dataset.v !== undefined && parseFloat(v) > parseFloat(el.dataset.v);
      el.dataset.v = v; el.textContent = v;
      el.classList.toggle(`is-locked`, v === dash);
      if (grew && el.classList.contains(`stat__value`)) { el.classList.remove(`is-bump`); void el.offsetWidth; el.classList.add(`is-bump`); }
    });
    const p = c.answered / c.total;
    $$(`[data-ring]`).forEach((el) => { el.style.strokeDashoffset = (RING_C * (1 - p)).toFixed(2); });
    const top = $(`#top-progress`); if (top) top.style.setProperty(`--p`, p.toFixed(3));
    Nav.refresh();
  }
};

const Nav = {
  cellState(id) {
    const s = Store.session, o = Engine.outcome(id);
    if (o === `answered`) return `answered`;
    if (o === `correct` || o === `wrong`) return o;
    return s.records[id].skipped ? `skipped` : `none`;
  },
  cellsHTML() {
    return Store.session.ids.map((id, i) => `<button class="nav-cell num" data-action="goto" data-index="${i}" data-id="${id}">${i + 1}</button>`).join(``);
  },
  refresh() {
    const s = Store.session; if (!s) return;
    const t = L();
    $$(`.nav-cell[data-id]`).forEach((el) => {
      const id = el.dataset.id, i = +el.dataset.index, st = this.cellState(id);
      const bm = s.bookmarks.includes(id), rv = s.review.includes(id);
      el.dataset.state = st;
      el.classList.toggle(`is-current`, i === s.index);
      el.innerHTML = `${i + 1}${bm ? `<span class="flag flag--bm"></span>` : ``}${rv ? `<span class="flag flag--rv"></span>` : ``}`;
      const labels = { none: t.nav.legend.none, answered: t.nav.legend.answered, correct: t.nav.legend.ok, wrong: t.nav.legend.bad, skipped: t.nav.legend.none };
      el.setAttribute(`aria-label`, `${t.quiz.question} ${i + 1}: ${labels[st]}${bm ? `, ${t.nav.legend.bm}` : ``}${rv ? `, ${t.nav.legend.rv}` : ``}`);
      if (i === s.index) el.setAttribute(`aria-current`, `step`); else el.removeAttribute(`aria-current`);
    });
    const sub = $(`#nav-sub`); if (sub) { const c = Engine.counts(); sub.textContent = fmt(t.nav.sub, { a: c.answered, t: c.total }); }
  },
  open() {
    const t = L(), s = Store.session, c = Engine.counts(), lg = t.nav.legend, exam = s.mode === `exam`;
    Dialog.open({
      variant: `sheet`, label: t.nav.title,
      html: `<h2>${t.nav.title}</h2><p class="muted" id="nav-sub">${fmt(t.nav.sub, { a: c.answered, t: c.total })}</p>
        <div class="sheet__section sheet-stats"><span class="eyebrow">${t.nav.stats}</span>${statsHTML()}</div>
        <div class="sheet__section"><span class="eyebrow">${t.nav.grid}</span>
          <div class="nav-grid">${this.cellsHTML()}</div>
          <div class="legend"><span><i></i>${lg.none}</span>${exam ? `<span><i class="l-ans"></i>${lg.answered}</span>` : `<span><i class="l-ok"></i>${lg.ok}</span><span><i class="l-bad"></i>${lg.bad}</span>`}<span><i class="l-bm"></i>${lg.bm}</span><span><i class="l-rv"></i>${lg.rv}</span></div>
        </div>
        <div class="sheet__section"><span class="eyebrow">${t.nav.jump}</span>
          <form class="jump" data-form="jump" novalidate><input type="number" inputmode="numeric" min="1" max="${s.ids.length}" placeholder="${fmt(t.nav.jumpPh, { t: s.ids.length })}" aria-label="${t.nav.jump}"><button class="btn" type="submit">${t.nav.jumpGo}${icon(`arrowRight`)}</button></form>
        </div>
        <div class="sheet__section"><button class="btn btn--primary btn--block" data-action="finish">${icon(`flag`)}${t.hud.finish}</button></div>`,
      onOpen: () => { $$(`.sheet [data-stat]`).forEach((el) => delete el.dataset.v); Hud.update({ silent: true }); }
    });
  }
};
