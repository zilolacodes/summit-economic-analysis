/* ==========================================================================
   18 · RESULTS — analytics (pure) + dashboard
   ========================================================================== */
const Analytics = {
  run() {
    const s = Store.session, mode = s.mode;
    const items = s.ids.map((id, k) => ({ id, n: k + 1, q: Q(id), r: s.records[id], o: Engine.outcome(id) }));
    const total = items.length, correct = items.filter((i) => i.o === `correct`).length;
    const answered = items.filter((i) => i.o !== `skipped`).length;
    const pct = Math.round(correct / total * 100);
    const grade = pct >= 90 ? `A` : pct >= 80 ? `B` : pct >= 70 ? `C` : pct >= 60 ? `D` : `F`;
    const group = (keyOf, keys) => keys.map((key) => {
      const list = items.filter((i) => keyOf(i) === key);
      const c = list.filter((i) => i.o === `correct`).length;
      return { key, total: list.length, correct: c, pct: list.length ? Math.round(c / list.length * 100) : 0, items: list };
    }).filter((g) => g.total);
    const spec = this.groupSpec(items);
    const keys = [...new Set(items.map(spec.keyOf))];
    if (spec.kind === `module`) keys.sort((x, y) => MODMAP[x].n - MODMAP[y].n);
    const topics = group(spec.keyOf, keys);
    topics.forEach((g) => { g.label = spec.label(g.key); g.tip = spec.tip(g.key); });
    const diffs = group((i) => i.q.diff, CONFIG.diffs);

    const seq = [...items.filter((i) => i.r.order !== null).sort((a, b) => a.r.order - b.r.order), ...items.filter((i) => i.r.order === null)];
    let run = 0;
    const timeline = seq.map((it, k) => { if (it.o === `correct`) run++; return { ...it, acc: run / (k + 1) }; });

    const credit = (i) => {
      if (i.o === `correct`) return mode === `challenge` && i.r.timeLeft != null && i.r.timeLeft / i.q.time < 0.15 ? 0.9 : 1;
      if (mode === `practice` && i.r.revealed && !i.r.timedOut) return [0, 0, 0.5, 0.25, 0.1][i.r.tries.length] ?? 0;
      return 0;
    };
    const wSum = sum(items, (i) => CONFIG.weight[i.q.diff]);
    const mastery = Math.round(sum(items, (i) => CONFIG.weight[i.q.diff] * credit(i)) / wSum * 100);
    const level = mastery < 40 ? `novice` : mastery < 60 ? `basic` : mastery < 80 ? `confident` : mastery < 92 ? `advanced` : `expert`;

    const byPctDesc = [...topics].sort((a, b) => b.pct - a.pct || b.total - a.total);
    const strongest = byPctDesc[0];
    const weakest = [...topics].sort((a, b) => a.pct - b.pct || b.total - a.total)[0];
    const hasWeak = weakest && weakest.pct < 100 && weakest.key !== strongest.key;

    const spent = sum(items, (i) => i.r.spent);
    const hardSet = items.filter((i) => i.q.diff === `hard` || i.q.diff === `expert`);
    const expertSet = items.filter((i) => i.q.diff === `expert`);
    const swiftCount = items.filter((i) => i.o === `correct` && mode === `challenge` && i.r.timeLeft != null && i.r.timeLeft / i.q.time >= 0.5).length;
    const badges = [
      [`first`, `sprout`, correct >= 1],
      [`streak5`, `flame`, s.longest >= 5],
      [`streak10`, `wave`, s.longest >= 10],
      [`summit`, `mountain`, hardSet.length > 0 && hardSet.every((i) => i.o === `correct`)],
      [`expert`, `diamond`, expertSet.length > 0 && expertSet.every((i) => i.o === `correct`)],
      [`swift`, `bolt`, swiftCount >= 5],
      [`honours`, `star`, pct >= 90],
      [`finisher`, `flag`, answered === total]
    ].map(([key, ic, earned]) => ({ key, icon: ic, earned }));

    return { s, mode, items, total, correct, answered, pct, grade, topics, diffs, timeline, mastery, level, strongest, weakest: hasWeak ? weakest : null,
             spent, duration: (s.finishedAt || Date.now()) - s.startedAt, badges, recs: this.recs({ topics, items, pct, mode }), groupKind: spec.kind };
  },
  /** How to group results: by module (mixed sessions), by sub-topic (cash flows) or by question type. */
  groupSpec(items) {
    const mods = [...new Set(items.map((i) => i.q.module))];
    if (mods.length > 1) return { kind: `module`, keyOf: (i) => i.q.module, label: (k) => modText(k).title, tip: (k) => modText(k).tip };
    if (mods[0] === `cashflow`) return { kind: `topic`, keyOf: (i) => (TOPICS[i.q.topic] ? i.q.topic : `basics`), label: (k) => TOPICS[k][lang()], tip: (k) => TOPICS[k].tip[lang()] };
    return { kind: `type`, keyOf: (i) => i.q.type, label: (k) => L().types[k], tip: () => modText(mods[0]).tip };
  },
  recs({ topics, items, pct, mode }) {
    const R = L().results, out = [];
    topics.filter((g) => g.pct < 75).sort((a, b) => a.pct - b.pct).slice(0, 3).forEach((g) => {
      const concepts = [...new Set(g.items.filter((i) => i.o !== `correct` && qText(i.q).related).map((i) => qText(i.q).related.split(/;\s*/)[0].replace(/\.$/, ``)))].slice(0, 4);
      out.push({ title: fmt(R.recTopic, { topic: g.label, c: g.correct, t: g.total }), text: g.tip, concepts });
    });
    const skipped = items.filter((i) => i.o === `skipped`).length;
    if (skipped) out.push({ title: R.recSkipped, text: fmt(R.recSkippedText, { n: skipped }) });
    if (pct < 60 && mode !== `study`) out.push({ title: R.recStudy, text: R.recStudyText });
    if (pct >= 60 && (mode === `study` || mode === `practice`)) out.push({ title: R.recExam, text: R.recExamText });
    if (pct >= 80 && mode === `exam`) out.push({ title: R.recChallenge, text: R.recChallengeText });
    out.push({ title: R.recSpaced, text: R.recSpacedText });
    return out.slice(0, 4);
  }
};

const Charts = {
  bars(groups, labelOf) {
    return `<div class="bars">${groups.map((g) => `
      <div class="bar-row"><div class="bar-row__label">${labelOf(g)}<small class="num">${g.correct}/${g.total}</small></div>
      <div class="bar-row__value num">${g.pct}%</div>
      <div class="bar-track"><div class="bar-fill" data-tone="${g.pct < 50 ? `low` : g.pct < 75 ? `mid` : `high`}" style="--v:${(g.pct / 100).toFixed(3)}"></div></div></div>`).join(``)}</div>`;
  },
  diffColumns(groups) {
    const t = L();
    return `<div class="diff-chart">${groups.map((g) => `
      <div class="diff-col"><span class="diff-col__pct num">${g.pct}%</span><div class="diff-col__track"><div class="diff-col__fill" style="--v:${Math.max(0.02, g.pct / 100).toFixed(3)}"></div></div>
      <div class="diff-col__label"><b>${t.diff[g.key]}</b><span class="num">${g.correct}/${g.total}</span></div></div>`).join(``)}</div>`;
  },
  timeline(points) {
    const narrow = window.innerWidth < 720;
    const W = narrow ? 420 : 800, H = narrow ? 230 : 240, pl = narrow ? 38 : 44, pr = 14, pt = 18, pb = 34, n = points.length, t = L();
    const x = (i) => n === 1 ? (pl + W - pr) / 2 : pl + i * (W - pl - pr) / (n - 1);
    const y = (a) => pt + (1 - a) * (H - pt - pb);
    const step = n > 1 ? (W - pl - pr) / (n - 1) : 40;
    let bands = ``, runStart = -1;
    points.forEach((p, i) => {
      const ok = p.o === `correct`;
      if (ok && runStart < 0) runStart = i;
      if ((!ok || i === n - 1) && runStart >= 0) {
        const end = ok ? i : i - 1;
        if (end - runStart >= 2) bands += `<rect class="streak-band" x="${(x(runStart) - step / 2).toFixed(1)}" y="${pt}" width="${(x(end) - x(runStart) + step).toFixed(1)}" height="${H - pt - pb}" rx="10"/>`;
        runStart = -1;
      }
    });
    const line = points.map((p, i) => `${i ? `L` : `M`}${x(i).toFixed(1)} ${y(p.acc).toFixed(1)}`).join(` `);
    const area = `${line} L${x(n - 1).toFixed(1)} ${H - pb} L${x(0).toFixed(1)} ${H - pb} Z`;
    const grid = [0, 0.5, 1].map((a) => `<line class="grid-line" x1="${pl}" x2="${W - pr}" y1="${y(a)}" y2="${y(a)}"/><text class="axis-label" x="${pl - 10}" y="${y(a) + 4}" text-anchor="end">${a * 100}%</text>`).join(``);
    const labels = points.map((p, i) => ((narrow ? n <= 12 : n <= 24) || i % 2 === 0) ? `<text class="axis-label" x="${x(i)}" y="${H - 10}" text-anchor="middle">${i + 1}</text>` : ``).join(``);
    const oLabel = { correct: t.results.legend.ok, wrong: t.results.legend.bad, skipped: t.results.legend.skip };
    const dots = points.map((p, i) => `<g class="pt" data-o="${p.o}" data-action="review-jump" data-id="${p.id}" tabindex="0" role="button" aria-label="${t.quiz.question} ${p.n}: ${oLabel[p.o]}"><title>${t.quiz.question} ${p.n} · ${oLabel[p.o]} · ${Math.round(p.acc * 100)}%</title><circle cx="${x(i).toFixed(1)}" cy="${y(p.acc).toFixed(1)}" r="6.5"/></g>`).join(``);
    return `<svg class="timeline" viewBox="0 0 ${W} ${H}" role="img" aria-label="${t.results.timeline}">${grid}${bands}<path class="acc-area" d="${area}"/><path class="acc-line" d="${line}"/>${dots}${labels}</svg>`;
  },
  gauge(m) {
    const len = Math.PI * 110;
    const ticks = [40, 60, 80, 92].map((v) => { const a = Math.PI * (1 - v / 100); return `<line x1="${140 + 96 * Math.cos(a)}" y1="${140 - 96 * Math.sin(a)}" x2="${140 + 86 * Math.cos(a)}" y2="${140 - 86 * Math.sin(a)}" stroke="#D7DDD5" stroke-width="2" stroke-linecap="round"/>`; }).join(``);
    return `<svg viewBox="0 0 280 160" aria-hidden="true">
      <path d="M30 140A110 110 0 0 1 250 140" fill="none" stroke="#E3E8E2" stroke-width="16" stroke-linecap="round"/>
      <path class="gauge__arc" data-gauge="${m}" d="M30 140A110 110 0 0 1 250 140" fill="none" stroke="url(#gaugeGrad)" stroke-width="16" stroke-linecap="round" stroke-dasharray="${len.toFixed(1)}" stroke-dashoffset="${len.toFixed(1)}"/>
      ${ticks}</svg>`;
  }
};

Screens.results = {
  data: null, filter: `all`,
  html() {
    const a = this.data = Analytics.run(), t = L(), R = t.results, s = a.s;
    const name = Store.state.name;
    const C = 2 * Math.PI * 88;
    const tile = (ic, label, value, suffix = ``) => `<div class="card tile"><div class="tile__label">${icon(ic)}${label}</div><div class="tile__value num">${value}${suffix ? `<small>${suffix}</small>` : ``}</div></div>`;
    const maxStars = sum(a.items, (i) => CONFIG.stars[i.q.diff]);
    const accuracy = a.answered ? Math.round(a.correct / a.answered * 100) : 0;
    const swItem = (g, weak) => `<div class="sw__item${weak ? ` sw__item--weak` : ``}"><span class="sw__icon">${icon(weak ? `target` : `mountain`)}</span><div><span>${weak ? R.weak : R.strong}</span><b>${g.label}</b></div><span class="sw__pct num">${g.pct}%</span></div>`;
    const earned = a.badges.filter((b) => b.earned).length;
    const counts = { all: a.items.length, wrong: a.items.filter((i) => i.o !== `correct`).length, bm: s.bookmarks.filter((id) => s.ids.includes(id)).length, rv: s.review.filter((id) => s.ids.includes(id)).length };
    return `<section class="screen"><div class="results">
      <div class="card r-hero span-12">
        <div class="score-ring">
          <svg viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="88" fill="none" stroke="#E3E8E2" stroke-width="12"/>
            <circle class="score-ring__bar" cx="100" cy="100" r="88" fill="none" stroke="url(#scoreGrad)" stroke-width="12" stroke-linecap="round" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${C.toFixed(1)}" data-score-ring="${a.pct}"/></svg>
          <div class="score-ring__label"><b class="num"><span data-countup="${a.pct}">0</span><small>%</small></b><span class="num">${a.correct} / ${a.total} ${R.of}</span></div>
        </div>
        <div class="r-hero__text">
          <p class="eyebrow">${R.eyebrow}${s.retry ? ` · ${t.modes.practice.name}` : ``}</p>
          <h1>${R.headline[a.grade]}${name ? `, ${escapeHTML(name)}` : ``}</h1>
          <p>${R.message[a.grade]}</p>
          <div class="meta-chips">
            <span class="badge">${icon({ study: `book`, exam: `cap`, practice: `refresh`, challenge: `bolt` }[a.mode])}${t.modes[a.mode].name}</span>
            <span class="badge badge--plain">${icon(`clock`)}${fmtDuration(a.duration / 1000, { long: true })}</span>
            <span class="badge badge--plain">${icon(`award`)}${t.level[a.level]}</span>
            <span class="badge badge--plain">${icon(`scroll`)}${fmtDate(s.finishedAt)}</span>
          </div>
        </div>
        <div class="grade" aria-label="${R.gradeLabel[a.grade]}"><div class="grade__seal">${a.grade}</div><span>${R.gradeLabel[a.grade]}</span></div>
      </div>

      <div class="tiles span-12">
        ${tile(`check`, R.tiles.correct, `<span data-countup="${a.correct}">0</span>`, `/ ${a.total}`)}
        ${tile(`target`, R.tiles.accuracy, `<span data-countup="${accuracy}">0</span>`, `%`)}
        ${tile(`sparkle`, R.tiles.xp, `<span data-countup="${s.xp}">0</span>`)}
        ${tile(`flame`, R.tiles.longest, `<span data-countup="${s.longest}">0</span>`)}
        ${tile(`star`, R.tiles.stars, `<span data-countup="${s.stars}">0</span>`, `/ ${maxStars}`)}
      </div>

      <div class="card card--pad span-7 chart-card" data-draw>
        <h2 class="card__title">${icon(`layers`)}${a.groupKind === `type` ? R.byType : a.groupKind === `module` ? R.byModule : R.topics}</h2><p class="card__hint">${R.topicsHint}</p>
        ${Charts.bars(a.topics, (g) => g.label)}
      </div>
      <div class="card card--pad span-5 chart-card" data-draw>
        <h2 class="card__title">${icon(`chart`)}${R.diff}</h2>
        ${Charts.diffColumns(a.diffs)}
      </div>

      <div class="card card--pad span-12" data-draw>
        <h2 class="card__title">${icon(`wave`)}${R.timeline}</h2><p class="card__hint">${R.timelineHint}</p>
        ${Charts.timeline(a.timeline)}
        <div class="chart-legend"><span><i style="background:var(--green)"></i>${R.legend.ok}</span><span><i style="background:var(--rose)"></i>${R.legend.bad}</span><span><i style="background:var(--stone)"></i>${R.legend.skip}</span><span><i style="background:rgba(214,184,110,.35);border-radius:3px"></i>${R.legend.streak}</span></div>
      </div>

      <div class="card card--pad span-6">
        <h2 class="card__title">${icon(`mountain`)}${R.sw}</h2>
        <div class="sw">
          ${a.strongest ? swItem(a.strongest, false) : ``}
          ${a.weakest ? swItem(a.weakest, true) : `<div class="sw__item"><span class="sw__icon">${icon(`check`)}</span><div><span>${R.allStrong}</span><b>${R.allStrongText}</b></div><span></span></div>`}
        </div>
        <div class="sw" style="margin-top:12px">${[...a.topics].sort((x, y) => x.pct - y.pct).filter((g) => a.weakest && g.key !== a.weakest.key && g.pct < 75).slice(0, 2).map((g) => swItem(g, true)).join(``)}</div>
      </div>
      <div class="card card--pad span-6 gauge" data-draw>
        <h2 class="card__title" style="align-self:flex-start">${icon(`target`)}${R.mastery}</h2>
        ${Charts.gauge(a.mastery)}
        <b class="num"><span data-countup="${a.mastery}">0</span>%</b>
        <div class="gauge__level">${R.levels[a.level]}</div>
        <p>${R.levelText[a.level]}</p>
        <p style="font-size:12px">${R.masteryNote}</p>
      </div>

      <div class="card card--pad span-7">
        <h2 class="card__title">${icon(`bulb`)}${R.recs}</h2><p class="card__hint">${R.recsHint}</p>
        <div class="recs">${a.recs.map((r) => `<div class="rec"><div><b>${r.title}</b><p>${r.text}</p>${r.concepts && r.concepts.length ? `<div class="concepts">${r.concepts.map((c) => `<span>${c}</span>`).join(``)}</div>` : ``}</div></div>`).join(``)}</div>
      </div>
      <div class="card card--pad span-5">
        <h2 class="card__title">${icon(`award`)}${R.badges}</h2><p class="card__hint">${fmt(R.badgesHint, { n: earned, t: a.badges.length })}</p>
        <div class="badges" style="grid-template-columns:repeat(2,minmax(0,1fr))">${a.badges.map((b, i) => `<div class="ach ${b.earned ? `is-earned` : `is-locked`}" style="--i:${i}">${medal(b.earned ? b.icon : `lock`)}<b>${t.badges[b.key][0]}</b><span>${t.badges[b.key][1]}</span></div>`).join(``)}</div>
      </div>

      <div class="card card--pad span-12" id="review">
        <h2 class="card__title">${icon(`book`)}${R.review}</h2>
        <div class="review-filters" role="group">${Object.keys(counts).map((k) => `<button class="filter" data-action="filter" data-filter="${k}" aria-pressed="${this.filter === k}">${R.filters[k]}<b class="num">${counts[k]}</b></button>`).join(``)}</div>
        <div id="review-list">${this.reviewHTML()}</div>
      </div>

      <div class="card r-actions span-12">
        <button class="btn btn--gold btn--lg" data-action="certificate">${icon(`award`)}${R.actions.cert}</button>
        <button class="btn btn--lg" data-action="print-results">${icon(`printer`)}${R.actions.print}</button>
        ${counts.wrong ? `<button class="btn btn--lg" data-action="retry-wrong">${icon(`refresh`)}${R.actions.retry}</button>` : ``}
        <button class="btn btn--primary btn--lg" data-action="restart">${icon(`arrowRight`)}${R.actions.restart}</button>
      </div>
    </div></section>`;
  },
  reviewHTML() {
    const a = this.data, s = a.s, R = L().results, t = L();
    const list = a.items.filter((i) => this.filter === `all` || (this.filter === `wrong` && i.o !== `correct`) || (this.filter === `bm` && s.bookmarks.includes(i.id)) || (this.filter === `rv` && s.review.includes(i.id)));
    if (!list.length) return `<p class="empty-note">${R.empty}</p>`;
    return list.map((i) => {
      const tx = qText(i.q), first = a.mode === `practice` ? i.r.tries[0] : i.r.selected;
      const yours = i.r.timedOut ? R.timedOut : first == null ? R.none : `${letterOf(i.r, first)} — ${tx.o[first]}`;
      const extra = a.mode === `practice` && i.r.tries.length > 1 ? ` <span class="muted">(${fmt(R.afterTries, { n: i.r.tries.length })})</span>` : ``;
      const body = `<div class="review-item__answers">
          <div class="${i.o === `correct` ? `ok` : `bad`}"><span>${R.yours}</span><span>${yours}${extra}</span></div>
          ${i.o !== `correct` ? `<div class="ok"><span>${R.correctAns}</span><span>${letterOf(i.r, i.q.correct)} — ${tx.o[i.q.correct]}</span></div>` : ``}
        </div>${Explain.html(i.q, i.r, { verdict: false })}`;
      const head = `<span class="review-item__num num">${pad2(i.n)}</span><span class="review-item__q">${tx.q}</span>`;
      return Accordion.html({ head, body, cls: `review-item`, attrs: `data-o="${i.o}" data-id="${i.id}"` });
    }).join(``);
  },
  mount(screen, { refresh } = {}) {
    const a = this.data;
    const draw = (el) => {
      el.classList.add(`is-drawn`);
      const line = $(`.acc-line`, el);
      if (line) { const len = line.getTotalLength(); line.style.setProperty(`--len`, len.toFixed(1)); void line.getBoundingClientRect(); requestAnimationFrame(() => el.classList.add(`is-drawn`)); }
      const g = $(`[data-gauge]`, el);
      if (g) { const len = Math.PI * 110; requestAnimationFrame(() => { g.style.strokeDashoffset = (len * (1 - a.mastery / 100)).toFixed(1); }); }
    };
    // Timeline line needs its length before drawing.
    $$(`.acc-line`, screen).forEach((line) => { const len = line.getTotalLength(); line.style.setProperty(`--len`, len.toFixed(1)); });
    const targets = $$(`[data-draw]`, screen);
    if (refresh || !(`IntersectionObserver` in window)) targets.forEach(draw);
    else {
      const io = new IntersectionObserver((entries) => entries.forEach((e) => { if (e.isIntersecting) { setTimeout(() => draw(e.target), 150); io.unobserve(e.target); } }), { threshold: 0.25 });
      targets.forEach((el) => io.observe(el));
    }
    const ringEl = $(`[data-score-ring]`, screen), C = 2 * Math.PI * 88;
    requestAnimationFrame(() => setTimeout(() => { ringEl.style.strokeDashoffset = (C * (1 - a.pct / 100)).toFixed(1); }, refresh ? 0 : 350));
    $$(`[data-countup]`, screen).forEach((el, i) => {
      if (refresh) { el.textContent = el.dataset.countup; return; }
      Effects.count(el, +el.dataset.countup, { dur: 1800, delay: 350 + i * 60 });
    });
    if (!refresh) {
      setTimeout(() => { Sound.play(`complete`); Confetti.fire(a.pct >= 80 ? 1 : a.pct >= 60 ? 0.6 : 0.3); }, 900);
    }
  },
  setFilter(f) {
    this.filter = f;
    $$(`[data-action="filter"]`).forEach((b) => b.setAttribute(`aria-pressed`, b.dataset.filter === f));
    $(`#review-list`).innerHTML = this.reviewHTML();
  },
  jumpTo(id) {
    if (this.filter !== `all` && !$(`.review-item[data-id="${id}"]`)) this.setFilter(`all`);
    const item = $(`.review-item[data-id="${id}"]`); if (!item) return;
    Accordion.toggle($(`.accordion__btn`, item), true);
    setTimeout(() => {
      window.scrollTo({ top: item.getBoundingClientRect().top + window.scrollY - 100, behavior: prefersReducedMotion() ? `auto` : `smooth` });
      $(`.accordion__btn`, item).focus({ preventScroll: true });
    }, 60);
  },
  retryWrong() {
    const ids = this.data.items.filter((i) => i.o !== `correct`).map((i) => i.id);
    if (!ids.length) return;
    Store.newSession(ids, `practice`, { retry: true, scope: { kind: `retry` } });
    Store.set({ mode: `practice` });
    this.filter = `all`;
    Toast.show(fmt(L().toast.retry, { n: ids.length }), `refresh`);
    Router.go(`quiz`);
  },
  printReport() {
    $$(`.review-item`).forEach((el) => Accordion.toggle($(`.accordion__btn`, el), el.dataset.o !== `correct`));
    $$(`[data-draw]`).forEach((el) => el.classList.add(`is-drawn`));
    $$(`[data-gauge]`).forEach((g) => { g.style.strokeDashoffset = (Math.PI * 110 * (1 - this.data.mastery / 100)).toFixed(1); });
    setTimeout(() => window.print(), 120);
  }
};

/* ==========================================================================
   19 · CERTIFICATE
   ========================================================================== */
const Certificate = {
  art() {
    const rng = mulberry32(11);
    const back = Scenery.ridge(rng, { w: 300, h: 110, base: 108, rough: 2, peaks: [[40, 50, 26], [110, 78, 30], [180, 58, 24], [250, 70, 30]] });
    const front = Scenery.ridge(rng, { w: 300, h: 110, base: 110, rough: 2, peaks: [[70, 40, 30], [150, 52, 26], [230, 36, 30]] });
    const band = Scenery.ridge(rng, { w: 1100, h: 90, base: 90, rough: 3, peaks: [[60, 40, 60], [260, 26, 80], [520, 46, 70], [760, 30, 90], [1000, 44, 70]] });
    const corner = `<g fill="none" stroke-linecap="round" transform="translate(44 44)">
      <path d="M14 70V34C14 22 22 14 34 14H70" stroke="#30463E" stroke-opacity=".45" stroke-width="1"/>
      <path d="M26 58c0-13 11-19 20-14 8 4 6 15-2 15-5 0-7-6-3-8" stroke="#D6B86E" stroke-width="1.5"/>
      <path d="M58 26c-13 0-19 11-14 20" stroke="#D6B86E" stroke-width="1.5"/>
      <rect x="-4" y="-4" width="8" height="8" transform="rotate(45)" fill="#D6B86E" stroke="none"/></g>`;
    return `<svg class="cert__art" viewBox="0 0 1188 840" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <radialGradient id="certGlow" cx=".5" cy=".35" r=".75"><stop offset="0" stop-color="#FFFDF6"/><stop offset="1" stop-color="#F3F1E6"/></radialGradient>
        <linearGradient id="certMtA" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9CB7A4" stop-opacity=".75"/><stop offset="1" stop-color="#9CB7A4" stop-opacity="0"/></linearGradient>
        <linearGradient id="certMtB" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#486B5E" stop-opacity=".8"/><stop offset="1" stop-color="#486B5E" stop-opacity="0"/></linearGradient>
      </defs>
      <rect width="1188" height="840" fill="url(#certGlow)"/>
      <rect x="30" y="30" width="1128" height="780" fill="none" stroke="#30463E" stroke-width="2.4"/>
      <rect x="44" y="44" width="1100" height="752" fill="none" stroke="#D6B86E" stroke-width="1.2"/>
      <g>${corner}</g><g transform="translate(1188 0) scale(-1 1)">${corner}</g>
      <g transform="translate(0 840) scale(1 -1)">${corner}</g><g transform="translate(1188 840) scale(-1 -1)">${corner}</g>
      <g transform="translate(444 62)">
        <circle cx="196" cy="34" r="17" fill="#D6B86E" opacity=".55"/>
        <path d="${back.d}" fill="url(#certMtA)"/><path d="${front.d}" fill="url(#certMtB)"/>
        <path d="M60 30q5-4 10 0q5-4 10 0M86 22q4-3 8 0q4-3 8 0" fill="none" stroke="#30463E" stroke-width="1.4" stroke-linecap="round"/>
      </g>
      <path d="M300 172H430M758 172H888" stroke="#D6B86E" stroke-width="1"/>
      <circle cx="594" cy="172" r="3" fill="#D6B86E"/>
      <g transform="translate(44 706)" opacity=".22"><path d="${band.d}" fill="#6F9584"/></g>
      <path d="M120 790h140M928 790h140" stroke="#9CB7A4" stroke-opacity=".5" stroke-width="1.2" stroke-linecap="round"/>
    </svg>`;
  },
  stamp() {
    return `<svg class="cert__stamp" viewBox="0 0 100 100" aria-hidden="true">
      <rect x="4" y="4" width="92" height="92" rx="12" fill="#A9574A"/>
      <rect x="11" y="11" width="78" height="78" rx="7" fill="none" stroke="#FBFAF4" stroke-width="2.4"/>
      <circle cx="68" cy="30" r="6" fill="#FBFAF4"/>
      <path d="M20 66L39 38l10 14 8-10 22 24" fill="none" stroke="#FBFAF4" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M24 77q8-5 16 0t16 0t16 0" fill="none" stroke="#FBFAF4" stroke-width="3" stroke-linecap="round"/>
    </svg>`;
  },
  html(a) {
    const t = L().cert, c = { title: Sessions.title(a.s.scope), subject: COURSE[lang()].subject }, s = a.s;
    const name = Store.state.name || t.fallbackName;
    const no = `SM-${new Date(s.finishedAt).getFullYear()}-${hashStr(name + s.startedAt).toString(36).toUpperCase().slice(0, 6)}`;
    return `<div class="cert">
      ${this.art()}
      <div class="cert__content">
        <div class="cert__kicker">${t.kicker}</div>
        <div class="cert__title">${t.title}</div>
        <div class="cert__sub">${t.sub}</div>
        <div class="cert__name" data-cert-name>${escapeHTML(name)}</div>
        <div class="cert__body">${fmt(t.body, { course: c.title, subject: c.subject })}</div>
        <div class="cert__stats">
          <div><b>${a.pct}%</b><span>${t.score}</span></div>
          <div><b>${a.grade}</b><span>${t.grade}</span></div>
          <div><b>${L().level[a.level]}</b><span>${t.level}</span></div>
        </div>
        <div class="cert__foot">
          <div class="cert__sig"><div>${t.sigName}</div><span>${t.sig}</span></div>
          <div class="cert__date"><div>${fmtDate(s.finishedAt)}</div><span>${t.date}</span></div>
        </div>
      </div>
      ${this.stamp()}
      <div class="cert__no">${t.no} ${no}</div>
    </div>`;
  },
  open() {
    const a = Screens.results.data, t = L().cert;
    Dialog.open({
      wide: true, label: t.title,
      html: `<div class="cert-head"><h2 style="padding:0">${t.title}</h2>
        <div class="field">${icon(`user`)}<input id="cert-name" type="text" maxlength="48" placeholder=" " value="${escapeHTML(Store.state.name)}"><label for="cert-name">${t.nameLabel}</label></div></div>
        <div class="cert-wrap">${this.html(a)}</div>
        <div class="dialog__actions"><button class="btn" data-close>${t.close}</button><button class="btn btn--primary" data-action="print-cert">${icon(`printer`)}${t.print}</button></div>`,
      onOpen: (panel) => {
        const input = $(`#cert-name`, panel);
        input.addEventListener(`input`, () => {
          Store.set({ name: input.value.trim() });
          $(`[data-cert-name]`, panel).textContent = input.value.trim() || t.fallbackName;
        });
      }
    });
  },
  print() {
    const root = $(`#print-root`);
    root.innerHTML = this.html(Screens.results.data);
    const page = document.createElement(`style`);
    page.id = `page-style`;
    page.textContent = `@media print{@page{size:A4 landscape;margin:0}html,body{width:297mm;height:210mm}.print-root .cert{width:297mm;height:210mm;aspect-ratio:auto;border-radius:0;box-shadow:none;animation:none}.print-root .cert__stamp{animation:none}}`;
    document.head.appendChild(page);
    document.body.classList.add(`print-cert`);
    const cleanup = () => { document.body.classList.remove(`print-cert`); page.remove(); root.innerHTML = ``; window.removeEventListener(`afterprint`, cleanup); };
    window.addEventListener(`afterprint`, cleanup);
    setTimeout(() => window.print(), 60);
  }
};

/* ==========================================================================
   20 · DIALOGS (shortcuts, exit)
   ========================================================================== */
const Dialogs = {
  shortcuts() {
    const k = L().keys;
    Dialog.open({
      label: k.title,
      html: `<div class="dialog__icon">${icon(`keyboard`, `icon--lg`)}</div><h2>${k.title}</h2><p class="dialog__text">${k.text}</p>
        <div class="shortcuts">${k.list.map(([label, keys]) => `<div class="shortcut"><span>${label}</span><span>${keys.map((x) => x === `–` ? `<span class="muted">–</span>` : `<span class="kbd">${x}</span>`).join(``)}</span></div>`).join(``)}</div>`
    });
  },
  exit() {
    const t = L().exit;
    Dialog.open({
      label: t.title,
      html: `<div class="dialog__icon">${icon(`home`, `icon--lg`)}</div><h2>${t.title}</h2><p class="dialog__text">${t.text}</p>
        <div class="dialog__actions"><button class="btn" data-close autofocus>${t.stay}</button><button class="btn btn--primary" data-action="do-exit">${t.confirm}</button></div>`
    });
  }
};

/* ==========================================================================
   21 · INPUT — click delegation and keyboard
   ========================================================================== */
const Actions = {
  session: (el) => Sessions.open(el.dataset.scope === `module` ? { kind: `module`, id: el.dataset.module } : { kind: el.dataset.scope }),
  'session-start': () => Sessions.start(),
  resume: () => Router.go(`quiz`),
  discard: () => { Store.set({ session: null }); Router.refresh(); },
  'open-results': () => Router.go(`results`),
  'open-lib': (el) => { Dialog.closeAll(); Store.set({ lib: el.dataset.module }); Router.go(`library`); },
  'go-library': () => Router.go(`library`),
  library: () => { if (Router.current === `quiz`) Library.openDialog(Q(Engine.currentId()).module); else Router.go(`library`); },
  'lib-select': (el) => { Dialog.closeAll(); Screens.library.select(el.dataset.module); },
  'lib-picker': () => Screens.library.picker(),
  'notes-dialog': (el) => Library.openDialog(el.dataset.module),
  opt: (el) => Screens.quiz.choose(+el.dataset.opt),
  prev: () => Screens.quiz.prev(),
  next: () => Screens.quiz.next(),
  skip: () => Screens.quiz.skip(),
  bookmark: () => Screens.quiz.toggleList(`bookmarks`, `bm`, `bmOff`, `bookmark`),
  review: () => Screens.quiz.toggleList(`review`, `rv`, `rvOff`, `flag`),
  navigator: () => { if (Router.current === `quiz`) { if (Dialog.top) Dialog.closeAll(); else Nav.open(); } },
  shortcuts: () => Dialogs.shortcuts(),
  finish: () => { const had = Dialog.stack.length; Dialog.closeAll(); setTimeout(() => Screens.quiz.confirmFinish(), had ? 300 : 0); },
  'do-finish': () => Screens.quiz.finish(),
  goto: (el) => { const i = +el.dataset.index; Dialog.closeAll(); Screens.quiz.go(i); },
  home: () => { if (Router.current === `quiz`) Dialogs.exit(); else Router.go(`home`); },
  brand: () => Actions.home(),
  'do-exit': () => { Dialog.closeAll(); Screens.quiz.leave(); Store.saveNow(); Router.go(`home`); },
  sound: () => {
    const on = !Store.state.sound; Store.set({ sound: on });
    const b = $(`[data-action="sound"]`); b.setAttribute(`aria-pressed`, on); b.innerHTML = icon(on ? `volume` : `volumeOff`);
    if (on) Sound.play(`toggle`, true);
    Toast.show(L().toast[on ? `soundOn` : `soundOff`], on ? `volume` : `volumeOff`);
  },
  filter: (el) => Screens.results.setFilter(el.dataset.filter),
  'review-jump': (el) => Screens.results.jumpTo(el.dataset.id),
  certificate: () => Certificate.open(),
  'print-cert': () => Certificate.print(),
  'print-results': () => Screens.results.printReport(),
  'retry-wrong': () => Screens.results.retryWrong(),
  restart: () => Router.go(`home`)
};

function setLanguage(code) {
  if (code === lang()) return;
  Store.set({ lang: code });
  document.documentElement.lang = code;
  const keepSession = Dialog.top && $(`.dialog [data-action="session-start"]`) ? Sessions.pending : null;
  Dialog.closeAll();
  Topbar.render();
  Router.refresh();
  if (keepSession) setTimeout(() => Sessions.open(keepSession), 320);
  Sound.play(`click`);
}

function bindInput() {
  document.addEventListener(`click`, (e) => {
    const langBtn = e.target.closest(`[data-lang]`);
    if (langBtn) { setLanguage(langBtn.dataset.lang); return; }
    const sizeBtn = e.target.closest(`[data-size]`);
    if (sizeBtn) { Sessions.setSize(+sizeBtn.dataset.size); Sound.play(`click`); return; }
    const mode = e.target.closest(`.mode`);
    if (mode) { Sessions.selectMode(mode.dataset.mode); return; }
    const acc = e.target.closest(`.accordion__btn`);
    if (acc) { Accordion.toggle(acc); Sound.play(`click`); return; }
    const el = e.target.closest(`[data-action]`);
    if (!el || el.disabled) return;
    if (el.getAttribute(`aria-disabled`) === `true` && el.dataset.action === `opt`) return;
    if (el.tagName === `A`) e.preventDefault();
    const fn = Actions[el.dataset.action];
    if (fn) fn(el);
  });
  document.addEventListener(`pointerdown`, Effects.ripple, { passive: true });
  document.addEventListener(`submit`, (e) => {
    if (e.target.dataset.form !== `jump`) return;
    e.preventDefault();
    const input = $(`input`, e.target), n = parseInt(input.value, 10), total = Store.session.ids.length;
    if (!(n >= 1 && n <= total)) { Toast.show(fmt(L().nav.jumpBad, { t: total }), `info`); input.focus(); return; }
    Dialog.closeAll(); Screens.quiz.go(n - 1);
  });

  document.addEventListener(`keydown`, (e) => {
    const m = e.target.closest && e.target.closest(`.mode`);
    if (m && /Arrow/.test(e.key)) {
      e.preventDefault();
      const list = CONFIG.modes, i = list.indexOf(m.dataset.mode), d = /Right|Down/.test(e.key) ? 1 : -1;
      Sessions.selectMode(list[(i + d + list.length) % list.length], true);
      return;
    }
    if (Dialog.top) {
      if (e.key === `Escape`) { e.preventDefault(); Dialog.close(); return; }
      Dialog.trap(e);
      if (e.key === `?` && !/INPUT/.test(e.target.tagName)) { e.preventDefault(); Dialog.close(); }
      return;
    }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key === `?`) { e.preventDefault(); Dialogs.shortcuts(); return; }
    if (e.code === `KeyM`) { Actions.sound(); return; }
    if ((e.key === `Enter` || e.key === ` `) && e.target.getAttribute(`role`) === `button`) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent(`click`, { bubbles: true })); return; }
    if (Router.current === `library` && /^Arrow(Left|Right)$/.test(e.key)) {
      const i = MODULES.findIndex((x) => x.id === Store.state.lib), n = MODULES[i + (e.key === `ArrowRight` ? 1 : -1)];
      if (n) { e.preventDefault(); Screens.library.select(n.id); }
      return;
    }
    if (Router.current !== `quiz`) return;
    const optKeys = { Digit1: 0, Digit2: 1, Digit3: 2, Digit4: 3, Numpad1: 0, Numpad2: 1, Numpad3: 2, Numpad4: 3, KeyA: 0, KeyB: 1, KeyC: 2, KeyD: 3 };
    if (e.code in optKeys) { e.preventDefault(); Screens.quiz.chooseAt(optKeys[e.code]); return; }
    const map = { ArrowRight: `next`, ArrowLeft: `prev`, KeyS: `skip`, KeyK: `bookmark`, KeyR: `review`, KeyN: `navigator`, KeyL: `library` };
    const action = map[e.code] || map[e.key];
    if (action) { e.preventDefault(); Actions[action](); return; }
    if (e.key === `Enter` && !/BUTTON|A/.test(e.target.tagName)) { e.preventDefault(); Actions.next(); }
  });

  const topbar = $(`#topbar`);
  window.addEventListener(`scroll`, () => topbar.classList.toggle(`is-raised`, window.scrollY > 8), { passive: true });
  let rz; window.addEventListener(`resize`, () => { clearTimeout(rz); rz = setTimeout(() => Segmented.sync(), 120); }, { passive: true });
  window.addEventListener(`pagehide`, () => { if (Router.current === `quiz`) Screens.quiz.leave(); Store.saveNow(); });
  document.addEventListener(`visibilitychange`, () => { if (document.hidden) Store.saveNow(); });
}

/* ==========================================================================
   24 · BOOT
   ========================================================================== */
function boot() {
  const t0 = performance.now();
  Store.load();
  document.documentElement.lang = Store.state.lang;
  const splash = $(`#splash`);
  $(`#splash-title`).textContent = L().loader.boot;
  $(`#splash-sub`).textContent = L().loader.bootSub;
  Scenery.mount($(`#scenery`));
  Topbar.render();
  bindInput();
  Router.go(`home`, { instant: true });
  const reveal = () => {
    splash.classList.add(`is-done`);
    setTimeout(() => splash.remove(), 800);
    Segmented.sync();
    if (!Storage.ok) setTimeout(() => Toast.show(L().toast.noStorage, `info`), 900);
  };
  setTimeout(reveal, Math.max(0, CONFIG.splashMinMs - (performance.now() - t0)));
}
document.addEventListener(`DOMContentLoaded`, boot);
