/* ==========================================================================
   04d · QUESTION GENERATORS — unlimited calculation problems
   --------------------------------------------------------------------------
   Each generator draws fresh, realistic figures from a seeded random source,
   computes the correct answer and builds three distractors from typical
   student mistakes (wrong base, wrong sign, missing factor…). Both languages
   are produced together, so switching language mid-question is seamless.
   A generated question's id is `g:<generatorId>:<seed>` — it can always be
   rebuilt from the id, so nothing but the id needs to be stored.
   Option 0 is always the correct answer; sessions shuffle option order.
   ========================================================================== */
const GEN = (() => {
  const list = [];
  const fmtN = (v, d, lang) => Number(v).toLocaleString(lang === `ru` ? `ru-RU` : `en-US`, { minimumFractionDigits: d, maximumFractionDigits: d });
  const F = (lang) => ({
    n: (v, d = 0) => fmtN(v, d, lang),
    p: (v, d = 1) => `${fmtN(v, d, lang)}%`,
    s: (v, d = 0) => `${v > 0 ? `+` : v < 0 ? `−` : ``}${fmtN(Math.abs(v), d, lang)}`
  });
  /** Builds both language versions from one template function. */
  const bi = (fn) => ({ ru: fn(F(`ru`), (ru) => ru, `ru`), en: fn(F(`en`), (ru, en) => en, `en`) });
  const def = (g) => list.push(g);
  const round = (v, step = 1) => Math.round(v / step) * step;

  /* ── Methods ─────────────────────────────────────────────────────────── */
  def({ id: `met-chain`, module: `methods`, diff: `medium`, type: `calc`, time: 90, make(r) {
    const N0 = r.int(40, 120, 5), W0 = r.int(20, 60, 2), dN = r.nz(-10, 15, 5), dW = r.nz(-6, 8, 2);
    const N1 = N0 + dN, W1 = W0 + dW, Y0 = N0 * W0, Y1 = N1 * W1;
    const effN = dN * W0, effW = N1 * dW, total = Y1 - Y0;
    const askW = r.chance(0.5);
    const vals = askW ? [effW, N0 * dW, effN, total] : [effN, dN * W1, effW, total];
    return bi((f, t) => ({
      q: t(`Выпуск = Численность × Выработка. Определите влияние изменения ${askW ? `выработки` : `численности`} на выпуск способом цепных подстановок.`,
           `Output = Headcount × Output per worker. Find the effect of the change in ${askW ? `productivity` : `headcount`} on output using chain substitution.`),
      ctx: { head: [t(`Показатель`, `Item`), t(`База`, `Base`), t(`Отчёт`, `Actual`)], rows: [
        [t(`Численность, чел`, `Headcount`), f.n(N0), f.n(N1)], [t(`Выработка, млн сум`, `Output per worker, m soums`), f.n(W0), f.n(W1)], [t(`Выпуск, млн сум`, `Output, m soums`), f.n(Y0), f.n(Y1)]] },
      o: vals.map((v) => `${f.s(v)} ${t(`млн сум`, `m soums`)}`),
      ex: t(`Подстановка 1 (численность): ${f.n(N1)} × ${f.n(W0)} = ${f.n(N1 * W0)}; влияние численности ${f.s(effN)}. Подстановка 2 (выработка): ${f.n(N1)} × ${f.n(W1)} = ${f.n(Y1)}; влияние выработки ${f.s(effW)}. Проверка: ${f.s(effN)} ${effW < 0 ? `−` : `+`} ${f.n(Math.abs(effW))} = ${f.s(total)}.`,
            `Step 1 (headcount): ${f.n(N1)} × ${f.n(W0)} = ${f.n(N1 * W0)}; headcount effect ${f.s(effN)}. Step 2 (productivity): ${f.n(N1)} × ${f.n(W1)} = ${f.n(Y1)}; productivity effect ${f.s(effW)}. Check: ${f.s(effN)} ${effW < 0 ? `−` : `+`} ${f.n(Math.abs(effW))} = ${f.s(total)}.`),
      why: askW ? [t(`Верно: отчётная численность × изменение выработки.`, `Correct: actual headcount × change in productivity.`), t(`Изменение выработки умножено на базисную численность — нарушен порядок подстановки.`, `Productivity change × base headcount — the substitution order is broken.`), t(`Это влияние численности.`, `That is the headcount effect.`), t(`Это общее отклонение выпуска.`, `That is the total change.`)]
                  : [t(`Верно: изменение численности × базисная выработка.`, `Correct: change in headcount × base productivity.`), t(`Использована отчётная выработка — так считается влияние при обратном порядке.`, `Actual productivity was used — that belongs to the reverse order.`), t(`Это влияние выработки.`, `That is the productivity effect.`), t(`Это общее отклонение выпуска.`, `That is the total change.`)],
      trick: t(`Количественный фактор — с базисным качественным, качественный — с отчётным количественным.`, `Quantity factor × base quality; quality factor × actual quantity.`),
      mistake: t(`Брать для обоих факторов базисные значения.`, `Using base values for both factors.`),
      takeaway: t(`Сумма влияний всегда равна общему отклонению.`, `Factor effects always add up to the total change.`)
    })); } });

  def({ id: `met-growth`, module: `methods`, diff: `easy`, type: `calc`, time: 45, make(r) {
    const V0 = r.int(400, 2000, 20), g = r.nz(-18, 32, 2), V1 = round(V0 * (1 + g / 100), 2);
    const inc = (V1 / V0 - 1) * 100, gr = V1 / V0 * 100, wrongBase = (V1 - V0) / V1 * 100;
    return bi((f, t) => ({
      q: t(`Показатель изменился с ${f.n(V0)} до ${f.n(V1)} млн сум. Чему равен темп прироста?`, `An indicator changed from ${f.n(V0)} to ${f.n(V1)} m soums. What is the rate of increase?`),
      o: [f.p(inc), f.p(gr), f.p(wrongBase), `${f.s(V1 - V0)} ${t(`млн сум`, `m soums`)}`],
      ex: t(`Темп роста = ${f.n(V1)} / ${f.n(V0)} × 100% = ${f.p(gr)}. Темп прироста = темп роста − 100% = ${f.p(inc)}.`, `Growth rate = ${f.n(V1)} / ${f.n(V0)} × 100% = ${f.p(gr)}. Rate of increase = growth rate − 100% = ${f.p(inc)}.`),
      why: [t(`Верно.`, `Correct.`), t(`Это темп роста, а не прироста.`, `That is the growth rate, not the rate of increase.`), t(`Изменение разделено на отчётное значение вместо базисного.`, `The change was divided by the new value instead of the base.`), t(`Это абсолютное отклонение.`, `That is the absolute change.`)],
      trick: t(`Прирост = рост − 100%.`, `Increase = growth − 100%.`), mistake: t(`Делить на отчётное значение.`, `Dividing by the new value.`), takeaway: t(`База сравнения — всегда базисный период.`, `The base of comparison is always the base period.`)
    })); } });

  /* ── Information / balance sheet ────────────────────────────────────── */
  def({ id: `info-share`, module: `info`, diff: `medium`, type: `calc`, time: 75, make(r) {
    const T0 = r.int(8000, 16000, 200), s0 = r.int(35, 70), I0 = round(T0 * s0 / 100, 10);
    const T1 = round(T0 * (1 + r.int(5, 30) / 100), 100), I1 = round(I0 * (1 + r.int(-10, 20) / 100), 10);
    const d0 = I0 / T0 * 100, d1 = I1 / T1 * 100, dd = d1 - d0;
    if (Math.abs(dd) < 0.6) return null;
    return bi((f, t) => ({
      q: t(`Основные средства на начало года — ${f.n(I0)} при валюте баланса ${f.n(T0)}; на конец — ${f.n(I1)} при валюте ${f.n(T1)} (млн сум). Как изменилась доля основных средств в структуре активов?`,
           `Fixed assets were ${f.n(I0)} of total assets ${f.n(T0)} at the start of the year and ${f.n(I1)} of ${f.n(T1)} at the end (m soums). How did their share of assets change?`),
      o: [`${f.s(dd, 1)} ${t(`п.п.`, `p.p.`)}`, `${f.s(dd / d0 * 100, 1)}%`, `${f.s((I1 / I0 - 1) * 100, 1)}%`, `${f.s(-dd, 1)} ${t(`п.п.`, `p.p.`)}`],
      ex: t(`Доля на начало: ${f.n(I0)} / ${f.n(T0)} = ${f.p(d0)}; на конец: ${f.n(I1)} / ${f.n(T1)} = ${f.p(d1)}. Изменение структуры = ${f.p(d1)} − ${f.p(d0)} = ${f.s(dd, 1)} п.п.`,
            `Opening share: ${f.n(I0)} / ${f.n(T0)} = ${f.p(d0)}; closing: ${f.n(I1)} / ${f.n(T1)} = ${f.p(d1)}. Structural change = ${f.p(d1)} − ${f.p(d0)} = ${f.s(dd, 1)} p.p.`),
      why: [t(`Верно: разность долей в процентных пунктах.`, `Correct: the difference in shares, in percentage points.`), t(`Это относительное изменение самой доли — для структуры не используется.`, `That is the relative change in the share itself — not used for structure.`), t(`Это темп прироста суммы основных средств, а не их доли.`, `That is the growth of the amount, not of the share.`), t(`Знак перепутан.`, `The sign is reversed.`)],
      trick: t(`Структура — в процентных пунктах.`, `Structure — in percentage points.`), mistake: t(`Путать рост суммы с ростом доли.`, `Confusing growth of the amount with growth of the share.`), takeaway: t(`Сумма может расти, а доля — падать.`, `An amount can grow while its share falls.`)
    })); } });

  /* ── Potential ──────────────────────────────────────────────────────── */
  def({ id: `pot-capacity`, module: `potential`, diff: `easy`, type: `calc`, time: 45, make(r) {
    const M = r.int(8, 40) * 1000, Q = round(M * r.int(55, 95) / 100, 100), K = Q / M;
    return bi((f, t) => ({
      q: t(`Производственная мощность — ${f.n(M)} изделий в год, фактический выпуск — ${f.n(Q)}. Каков коэффициент использования мощности?`, `Capacity is ${f.n(M)} units a year; actual output is ${f.n(Q)}. What is the capacity utilisation ratio?`),
      o: [f.n(K, 2), f.n(M / Q, 2), f.n(1 - K, 2), `${f.n(M - Q)} ${t(`изделий`, `units`)}`],
      ex: t(`Kм = ${f.n(Q)} / ${f.n(M)} = ${f.n(K, 2)}. Резерв без новых вложений — ${f.n(M - Q)} изделий.`, `Ku = ${f.n(Q)} / ${f.n(M)} = ${f.n(K, 2)}. The reserve without new investment is ${f.n(M - Q)} units.`),
      why: [t(`Верно.`, `Correct.`), t(`Отношение перевёрнуто.`, `The ratio is inverted.`), t(`Это доля неиспользованной мощности.`, `That is the unused share.`), t(`Это резерв в натуральном выражении, а не коэффициент.`, `That is the reserve in units, not the ratio.`)],
      trick: t(`Факт — в числителе.`, `Actual on top.`), mistake: t(`Делить мощность на выпуск.`, `Dividing capacity by output.`), takeaway: t(`Коэффициент ниже 1 — ищите резервы внутри.`, `Below 1 — look for reserves inside.`)
    })); } });

  /* ── Fixed assets ───────────────────────────────────────────────────── */
  def({ id: `fix-move`, module: `fixed`, diff: `medium`, type: `calc`, time: 75, make(r) {
    const open = r.int(3000, 9000, 100), add = r.int(300, 1200, 50), ret = r.int(100, 600, 50), close = open + add - ret;
    const ren = add / close * 100, retR = ret / open * 100, grow = (add - ret) / open * 100;
    const askRen = r.chance(0.5);
    const vals = askRen ? [ren, add / open * 100, retR, grow] : [retR, ret / close * 100, ren, grow];
    return bi((f, t) => ({
      q: t(`ОС на начало года — ${f.n(open)}, поступило — ${f.n(add)}, выбыло — ${f.n(ret)}, на конец года — ${f.n(close)} млн сум. Каков коэффициент ${askRen ? `обновления` : `выбытия`}?`,
           `Opening fixed assets ${f.n(open)}, added ${f.n(add)}, retired ${f.n(ret)}, closing ${f.n(close)} m soums. What is the ${askRen ? `renewal` : `retirement`} ratio?`),
      o: vals.map((v) => f.p(v)),
      ex: askRen ? t(`Kобн = Поступившие / ОС на конец = ${f.n(add)} / ${f.n(close)} = ${f.p(ren)}.`, `Kren = Additions / Closing = ${f.n(add)} / ${f.n(close)} = ${f.p(ren)}.`)
                 : t(`Kвыб = Выбывшие / ОС на начало = ${f.n(ret)} / ${f.n(open)} = ${f.p(retR)}.`, `Kret = Retirements / Opening = ${f.n(ret)} / ${f.n(open)} = ${f.p(retR)}.`),
      why: askRen ? [t(`Верно: база — конец года.`, `Correct: the base is the closing value.`), t(`Поступившие разделены на ОС на начало.`, `Additions divided by the opening value.`), t(`Это коэффициент выбытия.`, `That is the retirement ratio.`), t(`Это коэффициент прироста.`, `That is the growth ratio.`)]
                   : [t(`Верно: база — начало года.`, `Correct: the base is the opening value.`), t(`Выбывшие разделены на ОС на конец.`, `Retirements divided by the closing value.`), t(`Это коэффициент обновления.`, `That is the renewal ratio.`), t(`Это коэффициент прироста.`, `That is the growth ratio.`)],
      trick: t(`Новое — к концу, старое — к началу.`, `New against the end, old against the start.`), mistake: t(`Путать базы коэффициентов движения.`, `Mixing up the bases of movement ratios.`), takeaway: t(`Сравнивайте обновление с выбытием — так видно, растёт ли парк.`, `Compare renewal with retirement to see whether the fleet grows.`)
    })); } });

  def({ id: `fix-turn`, module: `fixed`, diff: `medium`, type: `calc`, time: 75, make(r) {
    const open = r.int(2000, 8000, 100), close = open + r.int(-500, 1500, 100), avg = (open + close) / 2;
    const rev = round(avg * r.int(15, 40) / 10, 100), at = rev / avg;
    if (open === close) return null;
    return bi((f, t) => ({
      q: t(`Выручка — ${f.n(rev)} млн сум. Основные средства на начало года — ${f.n(open)}, на конец — ${f.n(close)} млн сум. Чему равна фондоотдача?`, `Revenue is ${f.n(rev)} m soums. Fixed assets were ${f.n(open)} at the start and ${f.n(close)} m soums at the end. What is asset turnover?`),
      o: [f.n(at, 2), f.n(rev / open, 2), f.n(rev / close, 2), f.n(avg / rev, 3)],
      ex: t(`Среднегодовая стоимость = (${f.n(open)} + ${f.n(close)}) / 2 = ${f.n(avg)}. ФО = ${f.n(rev)} / ${f.n(avg)} = ${f.n(at, 2)}.`, `Average value = (${f.n(open)} + ${f.n(close)}) / 2 = ${f.n(avg)}. AT = ${f.n(rev)} / ${f.n(avg)} = ${f.n(at, 2)}.`),
      why: [t(`Верно: выручка к среднегодовой стоимости.`, `Correct: revenue over the average value.`), t(`Взята стоимость на начало года.`, `The opening value was used.`), t(`Взята стоимость на конец года.`, `The closing value was used.`), t(`Это фондоёмкость.`, `That is capital intensity.`)],
      trick: t(`В знаменателе — среднее.`, `Average in the denominator.`), mistake: t(`Брать остаток на дату.`, `Using a point-in-time balance.`), takeaway: t(`ФО — сколько выручки даёт сум фондов.`, `AT — revenue per soum of fixed assets.`)
    })); } });

  /* ── Intangibles ────────────────────────────────────────────────────── */
  def({ id: `int-amort`, module: `intangible`, diff: `medium`, type: `calc`, time: 75, make(r) {
    const life = r.pick([3, 4, 5, 6, 8, 10]), annual = r.int(8, 40), cost = annual * life, years = r.int(1, life - 1);
    const acc = annual * years, wear = years / life * 100, res = cost - acc;
    const opt = (w, v) => `${w}; ${v}`;
    return bi((f, t) => ({
      q: t(`НМА стоимостью ${f.n(cost)} млн сум амортизируется линейно ${life} лет. Прошло ${years} г. Каковы коэффициент износа и остаточная стоимость?`, `An intangible costing ${f.n(cost)} m soums is amortised straight-line over ${life} years. ${years} year(s) have passed. What are the wear ratio and carrying amount?`),
      o: [opt(f.p(wear), `${f.n(res)} ${t(`млн сум`, `m soums`)}`), opt(f.p(100 - wear), `${f.n(acc)} ${t(`млн сум`, `m soums`)}`), opt(f.p(wear), `${f.n(acc)} ${t(`млн сум`, `m soums`)}`), opt(f.p((years + 1) / life * 100), `${f.n(cost - annual * (years + 1))} ${t(`млн сум`, `m soums`)}`)],
      ex: t(`Годовая амортизация ${f.n(cost)} / ${life} = ${f.n(annual)}; за ${years} г. — ${f.n(acc)}. Kизн = ${f.n(acc)} / ${f.n(cost)} = ${f.p(wear)}; остаточная стоимость ${f.n(cost)} − ${f.n(acc)} = ${f.n(res)}.`,
            `Annual amortisation ${f.n(cost)} / ${life} = ${f.n(annual)}; over ${years} year(s) — ${f.n(acc)}. Wear = ${f.n(acc)} / ${f.n(cost)} = ${f.p(wear)}; carrying amount ${f.n(cost)} − ${f.n(acc)} = ${f.n(res)}.`),
      why: [t(`Верно.`, `Correct.`), t(`Перепутаны износ и годность, остаток и амортизация.`, `Wear and serviceability, carrying amount and amortisation are swapped.`), t(`Остаточная стоимость перепутана с накопленной амортизацией.`, `Carrying amount confused with accumulated amortisation.`), t(`Посчитан лишний год.`, `One year too many.`)],
      trick: t(`Износ + годность = 100%.`, `Wear + serviceability = 100%.`), mistake: t(`Путать накопленную амортизацию и остаток.`, `Confusing accumulated amortisation with the carrying amount.`), takeaway: t(`Остаточная = первоначальная − накопленная амортизация.`, `Carrying amount = cost − accumulated amortisation.`)
    })); } });

  /* ── Working capital ────────────────────────────────────────────────── */
  def({ id: `wc-turn`, module: `working`, diff: `easy`, type: `calc`, time: 60, make(r) {
    const k = r.pick([3, 4, 5, 6, 8, 9, 10, 12]), avg = r.int(5, 30, 1) * 100, rev = avg * k, T = 360 / k;
    const opt = (a, b) => `${a}; ${b}`;
    return bi((f, t) => ({
      q: t(`Выручка за год — ${f.n(rev)} млн сум, средний остаток оборотных активов — ${f.n(avg)} млн сум. Чему равны коэффициент оборачиваемости и длительность оборота (год = 360 дней)?`, `Annual revenue is ${f.n(rev)} m soums; average current assets are ${f.n(avg)} m soums. What are the turnover ratio and days per turnover (year = 360 days)?`),
      o: [opt(t(`${f.n(k)} об.`, `${f.n(k)} turns`), t(`${f.n(T)} дн.`, `${f.n(T)} days`)), opt(t(`${f.n(1 / k, 2)} об.`, `${f.n(1 / k, 2)} turns`), t(`${f.n(360 * k)} дн.`, `${f.n(360 * k)} days`)),
          opt(t(`${f.n(k)} об.`, `${f.n(k)} turns`), t(`${f.n(100 / k, 1)} дн.`, `${f.n(100 / k, 1)} days`)), opt(t(`${f.n(k - 1)} об.`, `${f.n(k - 1)} turns`), t(`${f.n(360 / (k - 1), 1)} дн.`, `${f.n(360 / (k - 1), 1)} days`))],
      ex: t(`Kоб = ${f.n(rev)} / ${f.n(avg)} = ${f.n(k)}; T = 360 / ${f.n(k)} = ${f.n(T)} дней.`, `Kt = ${f.n(rev)} / ${f.n(avg)} = ${f.n(k)}; T = 360 / ${f.n(k)} = ${f.n(T)} days.`),
      why: [t(`Верно.`, `Correct.`), t(`Отношение перевёрнуто.`, `The ratio is inverted.`), t(`Вместо 360 дней взято 100.`, `100 was used instead of 360 days.`), t(`Из выручки вычтен остаток — так оборачиваемость не считают.`, `The balance was subtracted from revenue — not how turnover works.`)],
      trick: t(`Дни × обороты = 360.`, `Days × turns = 360.`), mistake: t(`Делить остаток на выручку.`, `Dividing the balance by revenue.`), takeaway: t(`Больше оборотов — меньше денег в обороте.`, `More turns — less money tied up.`)
    })); } });

  def({ id: `wc-release`, module: `working`, diff: `medium`, type: `calc`, time: 90, make(r) {
    const day = r.int(5, 40), rev = day * 360, T0 = r.int(40, 100, 2), dT = r.nz(-12, 12, 1), T1 = T0 + dT, eff = dT * day;
    return bi((f, t) => {
      const lab = (v) => v < 0 ? t(`Высвобождено`, `Released`) : t(`Дополнительно вовлечено`, `Additionally tied up`);
      return {
        q: t(`Длительность оборота оборотных активов изменилась с ${T0} до ${T1} дней. Выручка отчётного года — ${f.n(rev)} млн сум (год = 360 дней). Каков эффект?`, `Days per turnover of current assets changed from ${T0} to ${T1}. Revenue for the year is ${f.n(rev)} m soums (year = 360 days). What is the effect?`),
        o: [`${lab(eff)} ${f.n(Math.abs(eff))} ${t(`млн сум`, `m soums`)}`, `${lab(-eff)} ${f.n(Math.abs(eff))} ${t(`млн сум`, `m soums`)}`, `${lab(eff)} ${f.n(Math.abs(dT))} ${t(`млн сум`, `m soums`)}`, `${lab(eff)} ${f.n(Math.abs(dT * day * 10))} ${t(`млн сум`, `m soums`)}`],
        ex: t(`Однодневная выручка = ${f.n(rev)} / 360 = ${f.n(day)}. ΔОА = (${T1} − ${T0}) × ${f.n(day)} = ${f.s(eff)} млн сум: ${eff < 0 ? `минус — средства высвобождены` : `плюс — нужно вовлечь дополнительные средства`}.`,
              `Daily revenue = ${f.n(rev)} / 360 = ${f.n(day)}. ΔCA = (${T1} − ${T0}) × ${f.n(day)} = ${f.s(eff)} m soums: ${eff < 0 ? `negative — funds are released` : `positive — extra funds are tied up`}.`),
        why: [t(`Верно.`, `Correct.`), t(`Знак истолкован наоборот.`, `The sign is misread.`), t(`Это изменение в днях, а не в деньгах.`, `That is the change in days, not money.`), t(`Дни умножены на выручку за 10 дней вместо однодневной.`, `Days were multiplied by ten days’ revenue instead of one day’s.`)],
        trick: t(`Дни × однодневная выручка = деньги.`, `Days × daily revenue = money.`), mistake: t(`Путать высвобождение и вовлечение.`, `Confusing release with tie-up.`), takeaway: t(`Ускорение оборота — бесплатный источник денег.`, `Faster turnover is a free source of cash.`)
      };
    }); } });

  /* ── Cadastre ───────────────────────────────────────────────────────── */
  def({ id: `cad-value`, module: `cadastre`, diff: `easy`, type: `calc`, time: 45, make(r) {
    const area = r.int(12, 80) / 10, unit = r.int(10, 60, 5), v = area * unit;
    return bi((f, t) => ({
      q: t(`Площадь участка — ${f.n(area, 1)} га, удельный показатель кадастровой стоимости — ${f.n(unit)} млн сум за гектар. Какова кадастровая стоимость?`, `A plot covers ${f.n(area, 1)} ha; the unit cadastral value is ${f.n(unit)} m soums per hectare. What is the cadastral value?`),
      o: [v, unit / area, area + unit, v * 10].map((x) => `${f.n(x, 1)} ${t(`млн сум`, `m soums`)}`),
      ex: t(`КС = ${f.n(area, 1)} × ${f.n(unit)} = ${f.n(v, 1)} млн сум.`, `CV = ${f.n(area, 1)} × ${f.n(unit)} = ${f.n(v, 1)} m soums.`),
      why: [t(`Верно.`, `Correct.`), t(`Деление вместо умножения.`, `Division instead of multiplication.`), t(`Сложение вместо умножения.`, `Addition instead of multiplication.`), t(`Ошибка на порядок.`, `An order-of-magnitude error.`)],
      trick: t(`Удельный показатель — цена одного гектара.`, `The unit value is the price of one hectare.`), mistake: t(`Делить вместо умножения.`, `Dividing instead of multiplying.`), takeaway: t(`КС = площадь × удельный показатель.`, `CV = area × unit value.`)
    })); } });

  /* ── Labour ─────────────────────────────────────────────────────────── */
  def({ id: `lab-turn`, module: `labour`, diff: `medium`, type: `calc`, time: 75, make(r) {
    const hc = r.int(150, 900, 10), vol = r.int(5, 40), mis = r.int(1, 8), other = r.int(3, 20), left = vol + mis + other, hired = r.int(10, 80);
    return bi((f, t) => ({
      q: t(`Среднесписочная численность — ${f.n(hc)} чел. Принято ${hired}, выбыло ${left}, в том числе по собственному желанию — ${vol}, за нарушения дисциплины — ${mis}. Каков коэффициент текучести?`, `Average headcount is ${f.n(hc)}. ${hired} were hired and ${left} left, including ${vol} voluntarily and ${mis} dismissed for misconduct. What is the turnover rate?`),
      o: [(vol + mis) / hc, left / hc, hired / hc, vol / hc].map((x) => f.p(x * 100)),
      ex: t(`Kтек = (${vol} + ${mis}) / ${f.n(hc)} = ${f.p((vol + mis) / hc * 100)}. Остальные ${other} выбывших ушли по объективным причинам.`, `Kt = (${vol} + ${mis}) / ${f.n(hc)} = ${f.p((vol + mis) / hc * 100)}. The other ${other} left for objective reasons.`),
      why: [t(`Верно.`, `Correct.`), t(`Это коэффициент выбытия.`, `That is the leaving rate.`), t(`Это коэффициент оборота по приёму.`, `That is the hiring rate.`), t(`Не учтены уволенные за нарушения.`, `Dismissals for misconduct were left out.`)],
      trick: t(`Текучесть ≤ выбытие.`, `Turnover ≤ leaving rate.`), mistake: t(`Подставлять всех выбывших.`, `Using all leavers.`), takeaway: t(`Текучесть отражает проблемы мотивации.`, `Turnover reflects motivation problems.`)
    })); } });

  def({ id: `lab-outpace`, module: `labour`, diff: `hard`, type: `case`, time: 100, make(r) {
    const gO = r.int(-2, 14), gW = r.int(2, 16);
    if (gO === gW) return null;
    const K = (1 + gO / 100) / (1 + gW / 100);
    return bi((f, t) => {
      const good = t(`производительность опережает зарплату — затраты на оплату труда на единицу продукции снижаются`, `productivity outpaces pay — labour cost per unit falls`);
      const bad = t(`зарплата растёт быстрее производительности — затраты на оплату труда на единицу продукции растут`, `pay grows faster than productivity — labour cost per unit rises`);
      return {
        q: t(`Выработка на одного работника изменилась на ${f.s(gO)}%, средняя заработная плата — на ${f.s(gW)}%. Какой вывод верен?`, `Output per worker changed by ${f.s(gO)}% and the average wage by ${f.s(gW)}%. Which conclusion is correct?`),
        o: [`${t(`Kоп`, `Ko`)} ≈ ${f.n(K, 3)}: ${K >= 1 ? good : bad}`, `${t(`Kоп`, `Ko`)} ≈ ${f.n(1 / K, 3)}: ${K >= 1 ? bad : good}`, `${t(`Kоп`, `Ko`)} ≈ ${f.n(K, 3)}: ${K >= 1 ? bad : good}`, t(`Вывод невозможен без данных о прибыли`, `No conclusion is possible without profit data`)],
        ex: t(`Kоп = I выработки / I зарплаты = ${f.n(1 + gO / 100, 2)} / ${f.n(1 + gW / 100, 2)} ≈ ${f.n(K, 3)}. ${K >= 1 ? `Значение ≥ 1 — ` : `Значение < 1 — `}${K >= 1 ? good : bad}.`,
              `Ko = Output index / Wage index = ${f.n(1 + gO / 100, 2)} / ${f.n(1 + gW / 100, 2)} ≈ ${f.n(K, 3)}. ${K >= 1 ? `At or above 1 — ` : `Below 1 — `}${K >= 1 ? good : bad}.`),
        why: [t(`Верно.`, `Correct.`), t(`Индексы поставлены в обратном порядке.`, `The indices are inverted.`), t(`Значение верное, но вывод противоположен.`, `The value is right, but the conclusion is reversed.`), t(`Вывод о затратах на единицу следует из соотношения индексов.`, `The unit-cost conclusion follows from the ratio of indices.`)],
        trick: t(`«Сначала заработай, потом получи».`, `“Earn first, then get paid.”`), mistake: t(`Сравнивать не индексы, а направления.`, `Comparing directions instead of indices.`), takeaway: t(`Kоп > 1 — условие снижения себестоимости.`, `Ko > 1 is a condition for lower unit cost.`)
      };
    }); } });

  /* ── Financial potential ────────────────────────────────────────────── */
  def({ id: `fp-dfl`, module: `finpot`, diff: `medium`, type: `calc`, time: 90, make(r) {
    const ER = r.int(10, 30), i = r.int(8, 24), DE = r.pick([0.4, 0.5, 0.6, 0.8, 1, 1.2, 1.5]), tax = r.pick([15, 20]);
    if (ER === i) return null;
    const fle = (1 - tax / 100) * (ER - i) * DE;
    return bi((f, t) => ({
      q: t(`ЭР = ${ER}%, средняя ставка по кредитам = ${i}%, ЗК / СК = ${f.n(DE, 1)}, ставка налога на прибыль = ${tax}%. Каков эффект финансового рычага?`, `ER = ${ER}%, average interest rate = ${i}%, D / E = ${f.n(DE, 1)}, profit tax = ${tax}%. What is the financial leverage effect?`),
      o: [fle, (ER - i) * DE, (1 - tax / 100) * (ER - i), ER - i].map((x) => `${f.s(x, 2)}%`),
      ex: t(`ЭФР = (1 − ${f.n(tax / 100, 2)}) × (${ER}% − ${i}%) × ${f.n(DE, 1)} = ${f.s(fle, 2)}%. ${fle >= 0 ? `Дифференциал положителен — заём повышает ROE.` : `Дифференциал отрицателен — заём снижает ROE.`}`,
            `FLE = (1 − ${f.n(tax / 100, 2)}) × (${ER}% − ${i}%) × ${f.n(DE, 1)} = ${f.s(fle, 2)}%. ${fle >= 0 ? `The differential is positive — debt lifts ROE.` : `The differential is negative — debt lowers ROE.`}`),
      why: [t(`Верно.`, `Correct.`), t(`Не учтён налоговый корректор.`, `The tax adjustment was left out.`), t(`Не учтено плечо ЗК / СК.`, `Leverage D / E was left out.`), t(`Это только дифференциал.`, `That is only the differential.`)],
      trick: t(`Налог × дифференциал × плечо.`, `Tax × differential × leverage.`), mistake: t(`Забывать (1 − Т).`, `Forgetting (1 − t).`), takeaway: t(`Знак эффекта задаёт дифференциал.`, `The differential sets the sign.`)
    })); } });

  def({ id: `fp-dupont`, module: `finpot`, diff: `medium`, type: `calc`, time: 75, make(r) {
    const ros = r.int(3, 15), at = r.pick([0.8, 1, 1.2, 1.5, 2, 2.5, 3]), m = r.pick([1.5, 2, 2.5, 3]);
    return bi((f, t) => ({
      q: t(`Рентабельность продаж — ${ros}%, оборачиваемость активов — ${f.n(at, 1)}, мультипликатор капитала — ${f.n(m, 1)}. Чему равна ROE по модели Дюпона?`, `Return on sales ${ros}%, asset turnover ${f.n(at, 1)}, equity multiplier ${f.n(m, 1)}. What is ROE by DuPont?`),
      o: [ros * at * m, ros * at, ros * m, ros * at / m].map((x) => f.p(x)),
      ex: t(`ROE = ${ros}% × ${f.n(at, 1)} × ${f.n(m, 1)} = ${f.p(ros * at * m)}. ROA = ${ros}% × ${f.n(at, 1)} = ${f.p(ros * at)}.`, `ROE = ${ros}% × ${f.n(at, 1)} × ${f.n(m, 1)} = ${f.p(ros * at * m)}. ROA = ${ros}% × ${f.n(at, 1)} = ${f.p(ros * at)}.`),
      why: [t(`Верно.`, `Correct.`), t(`Это ROA — без мультипликатора.`, `That is ROA — no multiplier.`), t(`Пропущена оборачиваемость.`, `Turnover was left out.`), t(`Мультипликатор поделён, а не умножен.`, `The multiplier was divided instead of multiplied.`)],
      trick: t(`Маржа × оборот × плечо.`, `Margin × turnover × leverage.`), mistake: t(`Путать ROA и ROE.`, `Confusing ROA and ROE.`), takeaway: t(`Дюпон показывает источник доходности.`, `DuPont shows the source of returns.`)
    })); } });

  /* ── Cash flow ──────────────────────────────────────────────────────── */
  def({ id: `cf-indirect`, module: `cashflow`, topic: `methods`, diff: `medium`, type: `calc`, time: 90, make(r) {
    const NP = r.int(300, 1500, 50), D = r.int(50, 400, 10), dAR = r.nz(-150, 300, 10), dInv = r.nz(-100, 200, 10), dAP = r.nz(-100, 250, 10);
    const ocf = NP + D - dAR - dInv + dAP;
    const vals = [ocf, NP + D + dAR + dInv + dAP, NP + D - dAR - dInv - dAP, NP + D];
    return bi((f, t) => ({
      q: t(`Рассчитайте чистый денежный поток от операционной деятельности косвенным методом.`, `Calculate net operating cash flow using the indirect method.`),
      ctx: { head: [t(`Показатель`, `Item`), t(`млн сум`, `m soums`)], rows: [[t(`Чистая прибыль`, `Net profit`), f.n(NP)], [t(`Амортизация`, `Depreciation`), f.n(D)],
        [t(`Изменение дебиторской задолженности`, `Change in receivables`), f.s(dAR)], [t(`Изменение запасов`, `Change in inventory`), f.s(dInv)], [t(`Изменение кредиторской задолженности`, `Change in payables`), f.s(dAP)]] },
      o: vals.map((v) => `${f.n(v)} ${t(`млн сум`, `m soums`)}`),
      ex: t(`ОДП = ${f.n(NP)} + ${f.n(D)} ${dAR > 0 ? `−` : `+`} ${f.n(Math.abs(dAR))} ${dInv > 0 ? `−` : `+`} ${f.n(Math.abs(dInv))} ${dAP > 0 ? `+` : `−`} ${f.n(Math.abs(dAP))} = ${f.n(ocf)}. Рост активов вычитаем, снижение — прибавляем; рост пассивов прибавляем, снижение — вычитаем.`,
            `OCF = ${f.n(NP)} + ${f.n(D)} ${dAR > 0 ? `−` : `+`} ${f.n(Math.abs(dAR))} ${dInv > 0 ? `−` : `+`} ${f.n(Math.abs(dInv))} ${dAP > 0 ? `+` : `−`} ${f.n(Math.abs(dAP))} = ${f.n(ocf)}. Asset increases are subtracted, decreases added; liability increases are added, decreases subtracted.`),
      why: [t(`Верно.`, `Correct.`), t(`Изменения активов взяты со знаком изменения, а не с обратным.`, `Asset changes kept their own sign instead of the opposite.`), t(`Знак изменения кредиторской задолженности перепутан.`, `The sign of the payables change is reversed.`), t(`Изменение оборотного капитала проигнорировано.`, `Working-capital changes were ignored.`)],
      trick: t(`Актив растёт — деньги уходят; пассив растёт — деньги приходят.`, `Asset up — cash out; liability up — cash in.`), mistake: t(`Путать знаки корректировок.`, `Mixing up adjustment signs.`), takeaway: t(`Прибыль ± неденежные статьи ± ΔОК = ОДП.`, `Profit ± non-cash items ± ΔWC = OCF.`)
    })); } });

  def({ id: `cf-liq`, module: `cashflow`, topic: `ratios`, diff: `medium`, type: `calc`, time: 60, make(r) {
    const inf = r.int(8, 40), out = r.int(8, 40);
    if (inf === out) return null;
    const k = inf / out;
    return bi((f, t) => ({
      q: t(`За квартал положительный денежный поток — ${inf} млн сум, отрицательный — ${out} млн сум. Чему равен коэффициент ликвидности денежного потока?`, `Quarterly cash inflows are ${inf} m soums and outflows ${out} m soums. What is the cash flow liquidity ratio?`),
      o: [f.n(k, 2), f.n(out / inf, 2), f.n(inf / (inf + out), 2), f.s(inf - out)],
      ex: t(`Kл = ПДП / ОДП = ${inf} / ${out} = ${f.n(k, 2)}. ${k >= 1 ? `Поступления покрывают выплаты.` : `Поступления покрывают лишь часть выплат — остаток денег снижается.`}`, `Kl = Inflows / Outflows = ${inf} / ${out} = ${f.n(k, 2)}. ${k >= 1 ? `Inflows cover outflows.` : `Inflows cover only part of outflows — the cash balance falls.`}`),
      why: [t(`Верно.`, `Correct.`), t(`Отношение перевёрнуто.`, `The ratio is inverted.`), t(`Это доля притока в обороте, а не коэффициент ликвидности.`, `That is the inflow share of turnover, not the liquidity ratio.`), t(`Это чистый денежный поток, а не коэффициент.`, `That is net cash flow, not a ratio.`)],
      trick: t(`Сколько пришло на каждый ушедший сум.`, `How much came in per soum that went out.`), mistake: t(`Делить отток на приток.`, `Dividing outflows by inflows.`), takeaway: t(`Ориентир — не ниже 1.`, `Benchmark — at least 1.`)
    })); } });

  def({ id: `cf-cycle`, module: `cashflow`, topic: `cycle`, diff: `medium`, type: `calc`, time: 75, make(r) {
    const inv = r.int(20, 90), ar = r.int(10, 60), ap = r.int(10, 70), ccc = inv + ar - ap;
    return bi((f, t) => ({
      q: t(`Определите продолжительность финансового цикла.`, `Determine the cash conversion cycle.`),
      ctx: { head: [t(`Показатель`, `Item`), t(`дней`, `days`)], rows: [[t(`Оборот запасов`, `Inventory period`), inv], [t(`Оборот дебиторской задолженности`, `Receivables period`), ar], [t(`Оборот кредиторской задолженности`, `Payables period`), ap]] },
      o: [ccc, inv + ar, inv + ar + ap, inv - ap].map((v) => t(`${v} дн.`, `${v} days`)),
      ex: t(`ОЦ = ${inv} + ${ar} = ${inv + ar}; ФЦ = ${inv + ar} − ${ap} = ${ccc} дней.${ccc < 0 ? ` Отрицательный цикл — компания работает на деньгах поставщиков.` : ``}`, `OC = ${inv} + ${ar} = ${inv + ar}; CCC = ${inv + ar} − ${ap} = ${ccc} days.${ccc < 0 ? ` A negative cycle — the company runs on suppliers’ money.` : ``}`),
      why: [t(`Верно.`, `Correct.`), t(`Это операционный цикл.`, `That is the operating cycle.`), t(`Кредиторка сокращает цикл, а не удлиняет.`, `Payables shorten the cycle.`), t(`Пропущена дебиторская задолженность.`, `Receivables were left out.`)],
      trick: t(`Склад + долг покупателя − отсрочка поставщика.`, `Stock + customer credit − supplier credit.`), mistake: t(`Путать ОЦ и ФЦ.`, `Confusing OC with CCC.`), takeaway: t(`Короче цикл — меньше потребность в финансировании.`, `Shorter cycle — less financing needed.`)
    })); } });

  def({ id: `cf-baumol`, module: `cashflow`, topic: `models`, diff: `hard`, type: `calc`, time: 120, make(r) {
    const T = r.int(6, 60) * 100000, F = r.pick([80, 100, 120, 150, 200, 250]), rate = r.pick([5, 6, 8, 10, 12]);
    const Q = Math.sqrt(2 * F * T / (rate / 100));
    return bi((f, t) => ({
      q: t(`По модели Баумоля определите оптимальную сумму пополнения денежных средств.`, `Using the Baumol model, find the optimal cash replenishment amount.`),
      ctx: { head: [t(`Показатель`, `Item`), t(`Значение`, `Value`)], rows: [[t(`Годовая потребность (T), сум`, `Annual need (T), soums`), f.n(T)], [t(`Расходы на одну операцию (F), сум`, `Cost per transfer (F), soums`), f.n(F)], [t(`Доходность ценных бумаг (r)`, `Securities yield (r)`), `${rate}%`]] },
      o: [Q, Math.sqrt(F * T / (rate / 100)), Q / 2, Q * 2].map((v) => `${f.n(v)} ${t(`сум`, `soums`)}`),
      ex: t(`Q* = √(2 × ${f.n(F)} × ${f.n(T)} / ${f.n(rate / 100, 2)}) ≈ ${f.n(Q)} сум. Средний остаток Q*/2 ≈ ${f.n(Q / 2)}; число пополнений T/Q* ≈ ${f.n(T / Q, 1)}.`, `Q* = √(2 × ${f.n(F)} × ${f.n(T)} / ${f.n(rate / 100, 2)}) ≈ ${f.n(Q)} soums. Average balance Q*/2 ≈ ${f.n(Q / 2)}; transfers T/Q* ≈ ${f.n(T / Q, 1)}.`),
      why: [t(`Верно.`, `Correct.`), t(`Пропущен множитель 2.`, `The factor 2 was dropped.`), t(`Это средний остаток, а не сумма пополнения.`, `That is the average balance, not the transfer size.`), t(`Удвоенная сумма — упущенная выгода превысит транзакционные издержки.`, `Double the amount — opportunity cost would exceed transaction cost.`)],
      trick: t(`Баумоль = EOQ для денег; двойка в числителе.`, `Baumol = EOQ for cash; 2 in the numerator.`), mistake: t(`Путать Q* и Q*/2.`, `Confusing Q* with Q*/2.`), takeaway: t(`В оптимуме транзакционные издержки равны упущенной выгоде.`, `At the optimum, transaction cost equals opportunity cost.`)
    })); } });

  def({ id: `cf-npv`, module: `cashflow`, topic: `value`, diff: `hard`, type: `calc`, time: 120, make(r) {
    const I0 = r.int(500, 2000, 50), C1 = r.int(200, 1200, 50), C2 = r.int(200, 1200, 50), rate = r.pick([8, 10, 12, 15, 20]), k = rate / 100;
    const npv = C1 / (1 + k) + C2 / (1 + k) ** 2 - I0;
    const vals = [npv, C1 + C2 - I0, C1 / (1 + k) + C2 / (1 + 2 * k) - I0, (C1 + C2) / (1 + k) ** 2 - I0];
    return bi((f, t) => ({
      q: t(`Рассчитайте NPV проекта.`, `Calculate the project’s NPV.`),
      ctx: { head: [t(`Показатель`, `Item`), t(`млн сум`, `m soums`)], rows: [[t(`Инвестиции сегодня`, `Investment today`), f.n(I0)], [t(`Поступление в конце 1-го года`, `Inflow, end of year 1`), f.n(C1)], [t(`Поступление в конце 2-го года`, `Inflow, end of year 2`), f.n(C2)], [t(`Ставка дисконтирования`, `Discount rate`), `${rate}%`]] },
      o: vals.map((v) => `${f.s(v, 1)} ${t(`млн сум`, `m soums`)}`),
      ex: t(`PV₁ = ${f.n(C1)} / ${f.n(1 + k, 2)} = ${f.n(C1 / (1 + k), 1)}; PV₂ = ${f.n(C2)} / ${f.n((1 + k) ** 2, 4)} = ${f.n(C2 / (1 + k) ** 2, 1)}. NPV = ${f.n(C1 / (1 + k) + C2 / (1 + k) ** 2, 1)} − ${f.n(I0)} = ${f.s(npv, 1)}. ${npv >= 0 ? `Проект увеличивает ценность.` : `Проект не окупается при данной ставке.`}`,
            `PV₁ = ${f.n(C1)} / ${f.n(1 + k, 2)} = ${f.n(C1 / (1 + k), 1)}; PV₂ = ${f.n(C2)} / ${f.n((1 + k) ** 2, 4)} = ${f.n(C2 / (1 + k) ** 2, 1)}. NPV = ${f.n(C1 / (1 + k) + C2 / (1 + k) ** 2, 1)} − ${f.n(I0)} = ${f.s(npv, 1)}. ${npv >= 0 ? `The project adds value.` : `The project does not pay back at this rate.`}`),
      why: [t(`Верно.`, `Correct.`), t(`Дисконтирование пропущено.`, `Discounting was skipped.`), t(`Второй год — простой процент вместо сложного.`, `Year 2 used simple instead of compound interest.`), t(`Оба потока продисконтированы на два года.`, `Both flows were discounted for two years.`)],
      trick: t(`Год n → (1 + r)ⁿ.`, `Year n → (1 + r)ⁿ.`), mistake: t(`Делить на (1 + 2r).`, `Dividing by (1 + 2r).`), takeaway: t(`Потоки разных лет сравнивают только после дисконтирования.`, `Flows from different years are compared only after discounting.`)
    })); } });

  def({ id: `cf-fcf`, module: `cashflow`, topic: `value`, diff: `easy`, type: `calc`, time: 45, make(r) {
    const ocf = r.int(400, 3000, 50), capex = r.int(200, 3500, 50), div = r.int(50, 400, 50);
    if (ocf === capex) return null;
    return bi((f, t) => ({
      q: t(`Операционный денежный поток — ${f.n(ocf)}, капитальные вложения — ${f.n(capex)}, выплачено дивидендов — ${f.n(div)} млн сум. Каков свободный денежный поток?`, `Operating cash flow ${f.n(ocf)}, capital expenditure ${f.n(capex)}, dividends paid ${f.n(div)} m soums. What is free cash flow?`),
      o: [ocf - capex, ocf + capex, ocf - capex - div, capex - ocf].map((v) => `${f.s(v)} ${t(`млн сум`, `m soums`)}`),
      ex: t(`FCF = ОДП − CAPEX = ${f.n(ocf)} − ${f.n(capex)} = ${f.s(ocf - capex)}. Дивиденды выплачиваются из FCF и в его расчёт не входят.`, `FCF = OCF − CAPEX = ${f.n(ocf)} − ${f.n(capex)} = ${f.s(ocf - capex)}. Dividends are paid out of FCF and are not part of it.`),
      why: [t(`Верно.`, `Correct.`), t(`Капвложения прибавлены.`, `Capex was added.`), t(`Дивиденды вычтены — они распределяют FCF, а не уменьшают его.`, `Dividends were deducted — they distribute FCF rather than reduce it.`), t(`Знак перевёрнут.`, `The sign is reversed.`)],
      trick: t(`Свободный — после обязательных инвестиций.`, `Free — after necessary investment.`), mistake: t(`Вычитать дивиденды.`, `Deducting dividends.`), takeaway: t(`FCF — источник дивидендов и погашения долга.`, `FCF funds dividends and debt repayment.`)
    })); } });

  /* ── Output ─────────────────────────────────────────────────────────── */
  def({ id: `out-rhythm`, module: `output`, diff: `medium`, type: `calc`, time: 75, make(r) {
    const p = r.int(100, 400, 20), a = [0, 1, 2].map(() => p + round(p * r.int(-30, 30) / 100, 10));
    if (!a.some((x) => x < p) || !a.some((x) => x > p)) return null;
    const kr = a.reduce((s, x) => s + Math.min(x, p), 0) / (3 * p), vol = a.reduce((s, x) => s + x, 0) / (3 * p);
    return bi((f, t) => ({
      q: t(`План выпуска по декадам — ${p} / ${p} / ${p} изделий, факт — ${a.join(` / `)}. Каков коэффициент ритмичности?`, `The plan by ten-day periods is ${p} / ${p} / ${p} units; actual is ${a.join(` / `)}. What is the rhythm ratio?`),
      o: [kr, vol, a[0] / p, Math.min(...a) / p].map((v) => f.n(v, 3)),
      ex: t(`Засчитываем не выше плана: ${a.map((x) => Math.min(x, p)).join(` + `)} = ${a.reduce((s, x) => s + Math.min(x, p), 0)}. Kритм = ${a.reduce((s, x) => s + Math.min(x, p), 0)} / ${3 * p} = ${f.n(kr, 3)}.`, `Count no more than plan: ${a.map((x) => Math.min(x, p)).join(` + `)} = ${a.reduce((s, x) => s + Math.min(x, p), 0)}. Kr = ${a.reduce((s, x) => s + Math.min(x, p), 0)} / ${3 * p} = ${f.n(kr, 3)}.`),
      why: [t(`Верно.`, `Correct.`), t(`Это выполнение плана по объёму — сверхплан засчитан.`, `That is volume fulfilment — over-fulfilment counted.`), t(`Учтена только первая декада.`, `Only the first period was used.`), t(`Взята худшая декада.`, `Only the worst period was used.`)],
      trick: t(`Ритмичность не бывает больше 1.`, `Rhythm never exceeds 1.`), mistake: t(`Засчитывать сверхплан.`, `Counting over-fulfilment.`), takeaway: t(`Выполнение плана ≠ ритмичность.`, `Meeting the plan ≠ rhythm.`)
    })); } });

  def({ id: `out-sales`, module: `output`, diff: `easy`, type: `calc`, time: 45, make(r) {
    const o = r.int(100, 800, 10), q = r.int(2000, 9000, 100), c = r.int(100, 900, 10);
    if (o === c) return null;
    return bi((f, t) => ({
      q: t(`Остаток готовой продукции на начало — ${f.n(o)}, выпуск — ${f.n(q)}, остаток на конец — ${f.n(c)} млн сум. Каков объём реализации?`, `Opening finished goods ${f.n(o)}, output ${f.n(q)}, closing finished goods ${f.n(c)} m soums. What are sales?`),
      o: [o + q - c, o + q + c, q - o + c, q].map((v) => `${f.n(v)} ${t(`млн сум`, `m soums`)}`),
      ex: t(`РП = ${f.n(o)} + ${f.n(q)} − ${f.n(c)} = ${f.n(o + q - c)}.`, `Sales = ${f.n(o)} + ${f.n(q)} − ${f.n(c)} = ${f.n(o + q - c)}.`),
      why: [t(`Верно.`, `Correct.`), t(`Остатки сложены.`, `Both balances were added.`), t(`Знаки остатков перепутаны.`, `The signs of the balances are swapped.`), t(`Выпуск ≠ реализация при изменении остатков.`, `Output ≠ sales when stocks change.`)],
      trick: t(`Было + сделали − осталось = продали.`, `Had + made − left = sold.`), mistake: t(`Отождествлять выпуск и продажи.`, `Equating output with sales.`), takeaway: t(`Рост остатков — сигнал проблем сбыта.`, `Rising stock signals a sales problem.`)
    })); } });

  /* ── Stability ──────────────────────────────────────────────────────── */
  def({ id: `st-liq`, module: `stability`, diff: `medium`, type: `calc`, time: 75, make(r) {
    const CL = r.int(1500, 6000, 100), CA = round(CL * r.int(9, 30) / 10, 100), inv = round(CA * r.int(20, 60) / 100, 100), cash = round(CA * r.int(3, 18) / 100, 10);
    const cur = CA / CL, quick = (CA - inv) / CL, abs = cash / CL, ask = r.pick([`cur`, `quick`, `abs`]);
    const order = { cur: [cur, quick, abs, inv / CL], quick: [quick, cur, abs, inv / CL], abs: [abs, quick, cur, inv / CL] }[ask];
    return bi((f, t) => {
      const name = { cur: t(`текущей`, `current`), quick: t(`быстрой`, `quick`), abs: t(`абсолютной`, `cash`) }[ask];
      const nm = { cur: t(`текущая ликвидность`, `the current ratio`), quick: t(`быстрая ликвидность`, `the quick ratio`), abs: t(`абсолютная ликвидность`, `the cash ratio`) };
      const rest = Object.keys(nm).filter((k) => k !== ask);
      return {
        q: t(`Оборотные активы — ${f.n(CA)}, в том числе запасы ${f.n(inv)} и денежные средства ${f.n(cash)}; краткосрочные обязательства — ${f.n(CL)} млн сум. Каков коэффициент ${name} ликвидности?`, `Current assets ${f.n(CA)}, including inventory ${f.n(inv)} and cash ${f.n(cash)}; current liabilities ${f.n(CL)} m soums. What is ${nm[ask]}?`),
        o: order.map((v) => f.n(v, 2)),
        ex: t(`Текущая = ${f.n(CA)} / ${f.n(CL)} = ${f.n(cur, 2)}; быстрая = (${f.n(CA)} − ${f.n(inv)}) / ${f.n(CL)} = ${f.n(quick, 2)}; абсолютная = ${f.n(cash)} / ${f.n(CL)} = ${f.n(abs, 2)}.`, `Current = ${f.n(CA)} / ${f.n(CL)} = ${f.n(cur, 2)}; quick = (${f.n(CA)} − ${f.n(inv)}) / ${f.n(CL)} = ${f.n(quick, 2)}; cash = ${f.n(cash)} / ${f.n(CL)} = ${f.n(abs, 2)}.`),
        why: [t(`Верно.`, `Correct.`), t(`Это ${nm[rest[0]]}.`, `That is ${nm[rest[0]]}.`), t(`Это ${nm[rest[1]]}.`, `That is ${nm[rest[1]]}.`), t(`Запасы разделены на обязательства — не коэффициент ликвидности.`, `Inventory over liabilities — not a liquidity ratio.`)],
        trick: t(`Всё оборотное → без запасов → только деньги.`, `All current → minus inventory → cash only.`), mistake: t(`Путать три коэффициента.`, `Mixing up the three ratios.`), takeaway: t(`Читайте три коэффициента вместе.`, `Read the three ratios together.`)
      };
    }); } });

  def({ id: `st-struct`, module: `stability`, diff: `medium`, type: `calc`, time: 60, make(r) {
    const E = r.int(2000, 9000, 100), D = r.int(1000, 9000, 100), ask = r.chance(0.5) ? `auto` : `lev`;
    if (E === D) return null;
    const vals = ask === `auto` ? [E / (E + D), D / E, D / (E + D), E / D] : [D / E, E / (E + D), E / D, D / (E + D)];
    return bi((f, t) => ({
      q: t(`Собственный капитал — ${f.n(E)}, заёмный — ${f.n(D)} млн сум. Каков коэффициент ${ask === `auto` ? `автономии` : `капитализации (ЗК / СК)`}?`, `Equity ${f.n(E)}, debt ${f.n(D)} m soums. What is the ${ask === `auto` ? `autonomy ratio` : `leverage ratio (D / E)`}?`),
      o: vals.map((v) => f.n(v, 2)),
      ex: t(`Автономия = ${f.n(E)} / ${f.n(E + D)} = ${f.n(E / (E + D), 2)} (ориентир ≥ 0,5); капитализация = ${f.n(D)} / ${f.n(E)} = ${f.n(D / E, 2)} (ориентир ≤ 1).`, `Autonomy = ${f.n(E)} / ${f.n(E + D)} = ${f.n(E / (E + D), 2)} (benchmark ≥ 0.5); leverage = ${f.n(D)} / ${f.n(E)} = ${f.n(D / E, 2)} (benchmark ≤ 1).`),
      why: ask === `auto` ? [t(`Верно.`, `Correct.`), t(`Это капитализация.`, `That is leverage.`), t(`Это доля заёмного капитала.`, `That is the debt share.`), t(`Это коэффициент финансирования.`, `That is the financing ratio.`)]
                          : [t(`Верно.`, `Correct.`), t(`Это автономия.`, `That is autonomy.`), t(`Это обратное отношение.`, `That is the inverse.`), t(`Это доля заёмного капитала.`, `That is the debt share.`)],
      trick: t(`Автономия — своё ко всему; капитализация — чужое к своему.`, `Autonomy — own over total; leverage — theirs over ours.`), mistake: t(`Путать знаменатели.`, `Mixing up the denominators.`), takeaway: t(`Оба показателя описывают одну структуру с разных сторон.`, `Both describe the same structure from different angles.`)
    })); } });

  /* ── Break-even ─────────────────────────────────────────────────────── */
  const be = (r) => { const v = r.int(5, 60), m = r.int(5, 40), p = v + m, Qb = r.int(5, 80) * 1000, FC = Qb * m / 1000; return { v, m, p, Qb, FC }; };

  def({ id: `be-units`, module: `breakeven`, diff: `easy`, type: `calc`, time: 60, make(r) {
    const { v, m, p, Qb, FC } = be(r);
    return bi((f, t) => ({
      q: t(`Постоянные затраты — ${f.n(FC)} млн сум, цена — ${p} тыс. сум, переменные затраты — ${v} тыс. сум на изделие. Какова точка безубыточности?`, `Fixed costs ${f.n(FC)} m soums, price ${p} thousand, variable cost ${v} thousand per unit. What is the break-even point?`),
      o: [Qb, FC * 1000 / p, FC * 1000 / v, FC * 1000 / (p + v)].map((x) => `${f.n(Math.round(x))} ${t(`изделий`, `units`)}`),
      ex: t(`Маржа на единицу = ${p} − ${v} = ${m} тыс. сум. Q* = ${f.n(FC * 1000)} тыс. / ${m} тыс. = ${f.n(Qb)} изделий.`, `Unit margin = ${p} − ${v} = ${m} thousand. Q* = ${f.n(FC * 1000)} thousand / ${m} thousand = ${f.n(Qb)} units.`),
      why: [t(`Верно.`, `Correct.`), t(`Деление на цену вместо маржи.`, `Divided by price instead of margin.`), t(`Деление на переменные затраты.`, `Divided by variable cost.`), t(`Цена и переменные затраты сложены.`, `Price and variable cost were added.`)],
      trick: t(`Сколько «кирпичиков маржи» нужно на стену постоянных затрат.`, `How many bricks of margin build the wall of fixed costs.`), mistake: t(`Делить на цену.`, `Dividing by price.`), takeaway: t(`Q* = FC / (p − v).`, `Q* = FC / (p − v).`)
    })); } });

  def({ id: `be-mos`, module: `breakeven`, diff: `medium`, type: `calc`, time: 75, make(r) {
    const { m, p, Qb } = be(r), Q = round(Qb * (1 + r.int(10, 80) / 100), 100), rev = Q * p / 1000, rb = Qb * p / 1000, mos = (rev - rb) / rev * 100;
    return bi((f, t) => ({
      q: t(`Цена — ${p} тыс. сум, маржа на единицу — ${m} тыс. сум, точка безубыточности — ${f.n(Qb)} изделий. Продано ${f.n(Q)} изделий. Каков запас финансовой прочности?`, `Price ${p} thousand, unit margin ${m} thousand, break-even ${f.n(Qb)} units. ${f.n(Q)} units were sold. What is the margin of safety?`),
      o: [mos, (rev - rb) / rb * 100, rb / rev * 100, m / p * 100].map((v) => f.p(v)),
      ex: t(`Выручка = ${f.n(Q)} × ${p} тыс. = ${f.n(rev)} млн; в точке безубыточности = ${f.n(rb)} млн. ЗФП = (${f.n(rev)} − ${f.n(rb)}) / ${f.n(rev)} = ${f.p(mos)}.`, `Revenue = ${f.n(Q)} × ${p} thousand = ${f.n(rev)} m; at break-even = ${f.n(rb)} m. MS = (${f.n(rev)} − ${f.n(rb)}) / ${f.n(rev)} = ${f.p(mos)}.`),
      why: [t(`Верно.`, `Correct.`), t(`База — выручка в точке безубыточности вместо фактической.`, `The base is break-even revenue instead of actual.`), t(`Это доля порога в выручке.`, `That is break-even as a share of revenue.`), t(`Это коэффициент маржинального дохода.`, `That is the contribution margin ratio.`)],
      trick: t(`Запас — «сколько можно потерять» от текущей выручки.`, `Margin of safety — how much you can lose from current revenue.`), mistake: t(`Делить на пороговую выручку.`, `Dividing by break-even revenue.`), takeaway: t(`Больше запас — ниже риск.`, `Larger margin — lower risk.`)
    })); } });

  def({ id: `be-dol`, module: `breakeven`, diff: `medium`, type: `calc`, time: 90, make(r) {
    const { m, Qb, FC } = be(r), Q = round(Qb * (1 + r.int(15, 120) / 100), 100), CM = Q * m / 1000, P = CM - FC, dol = CM / P, x = r.pick([5, 10, 15, 20]);
    return bi((f, t) => ({
      q: t(`Маржинальный доход — ${f.n(CM)} млн сум, постоянные затраты — ${f.n(FC)} млн сум. На сколько процентов изменится прибыль, если выручка вырастет на ${x}%?`, `Contribution margin is ${f.n(CM)} m soums and fixed costs ${f.n(FC)} m soums. By what percentage will profit change if revenue rises ${x}%?`),
      o: [dol * x, x, x / dol, dol].map((v) => f.p(v)),
      ex: t(`Прибыль = ${f.n(CM)} − ${f.n(FC)} = ${f.n(P)}. ОР = ${f.n(CM)} / ${f.n(P)} = ${f.n(dol, 2)}. ΔПрибыли = ${f.n(dol, 2)} × ${x}% = ${f.p(dol * x)}.`, `Profit = ${f.n(CM)} − ${f.n(FC)} = ${f.n(P)}. DOL = ${f.n(CM)} / ${f.n(P)} = ${f.n(dol, 2)}. ΔProfit = ${f.n(dol, 2)} × ${x}% = ${f.p(dol * x)}.`),
      why: [t(`Верно.`, `Correct.`), t(`Рычаг не учтён.`, `Leverage was ignored.`), t(`Деление вместо умножения.`, `Division instead of multiplication.`), t(`Это сам операционный рычаг, а не изменение прибыли.`, `That is the leverage itself, not the change in profit.`)],
      trick: t(`Рычаг умножает процент изменения выручки.`, `Leverage multiplies the revenue change.`), mistake: t(`Считать, что прибыль меняется как выручка.`, `Assuming profit moves like revenue.`), takeaway: t(`Чем ближе к точке безубыточности, тем сильнее рычаг.`, `The closer to break-even, the stronger the leverage.`)
    })); } });

  /* ── Results ────────────────────────────────────────────────────────── */
  def({ id: `res-ros`, module: `results`, diff: `medium`, type: `calc`, time: 75, make(r) {
    const rev = r.int(4000, 20000, 100), cogs = round(rev * r.int(50, 78) / 100, 100), opex = round(rev * r.int(5, 18) / 100, 100), op = rev - cogs - opex;
    if (op <= 0) return null;
    return bi((f, t) => ({
      q: t(`Выручка — ${f.n(rev)}, себестоимость реализованной продукции — ${f.n(cogs)}, расходы периода — ${f.n(opex)} млн сум. Какова рентабельность продаж по операционной прибыли?`, `Revenue ${f.n(rev)}, cost of goods sold ${f.n(cogs)}, period expenses ${f.n(opex)} m soums. What is return on sales based on operating profit?`),
      o: [op / rev, (rev - cogs) / rev, op / cogs, op / (cogs + opex)].map((v) => f.p(v * 100)),
      ex: t(`Валовая прибыль = ${f.n(rev - cogs)}; операционная = ${f.n(op)}. ROS = ${f.n(op)} / ${f.n(rev)} = ${f.p(op / rev * 100)}.`, `Gross profit = ${f.n(rev - cogs)}; operating profit = ${f.n(op)}. ROS = ${f.n(op)} / ${f.n(rev)} = ${f.p(op / rev * 100)}.`),
      why: [t(`Верно.`, `Correct.`), t(`Это валовая рентабельность.`, `That is gross margin.`), t(`Прибыль к производственной себестоимости.`, `Profit over production cost.`), t(`Рентабельность продукции к полной себестоимости.`, `Return on total cost.`)],
      trick: t(`Сначала лестница прибыли, потом деление на выручку.`, `Walk the ladder first, then divide by revenue.`), mistake: t(`Брать валовую прибыль.`, `Using gross profit.`), takeaway: t(`ROS — прибыль от продаж на сум выручки.`, `ROS — operating profit per soum of revenue.`)
    })); } });

  def({ id: `res-price`, module: `results`, diff: `easy`, type: `calc`, time: 60, make(r) {
    const q1 = r.int(200, 5000, 50), q0 = q1 + r.nz(-300, 300, 50), p0 = r.int(20, 200), dp = r.nz(-15, 25, 1), p1 = p0 + dp;
    return bi((f, t) => ({
      q: t(`Продано ${f.n(q1)} изделий (в прошлом году — ${f.n(q0)}). Цена изменилась с ${p0} до ${p1} тыс. сум. Каково влияние изменения цены на прибыль от продаж?`, `${f.n(q1)} units were sold (last year ${f.n(q0)}). The price changed from ${p0} to ${p1} thousand soums. What is the price effect on operating profit?`),
      o: [dp * q1, dp * q0, p1 * q1, dp].map((v) => `${f.s(v)} ${t(`тыс. сум`, `thousand soums`)}`),
      ex: t(`ΔП(цена) = (${p1} − ${p0}) × ${f.n(q1)} = ${f.s(dp * q1)} тыс. сум — по фактическому объёму продаж.`, `ΔP(price) = (${p1} − ${p0}) × ${f.n(q1)} = ${f.s(dp * q1)} thousand soums — at actual volume.`),
      why: [t(`Верно.`, `Correct.`), t(`Использован объём прошлого года.`, `Last year’s volume was used.`), t(`Это вся выручка по новой цене.`, `That is total revenue at the new price.`), t(`Не умножено на количество.`, `Not multiplied by quantity.`)],
      trick: t(`Цена — по фактическому объёму.`, `Price — at actual volume.`), mistake: t(`Брать базисный объём.`, `Using base volume.`), takeaway: t(`Рост цены целиком переходит в прибыль.`, `A price rise goes straight to profit.`)
    })); } });

  /** Seeded random helpers handed to each generator. */
  const helpers = (rnd) => ({
    int: (a, b, step = 1) => a + Math.floor(rnd() * (Math.floor((b - a) / step) + 1)) * step,
    nz(a, b, step = 1) { let v = 0; for (let k = 0; k < 20 && v === 0; k++) v = this.int(a, b, step); return v || step; },
    pick: (arr) => arr[Math.floor(rnd() * arr.length)],
    chance: (p) => rnd() < p
  });

  const cache = new Map();
  return {
    list,
    byId: Object.fromEntries(list.map((g) => [g.id, g])),
    /** Builds (or rebuilds) a generated question. Retries seeds until options are distinct. */
    build(genId, seed) {
      const key = `${genId}:${seed}`;
      if (cache.has(key)) return cache.get(key);
      const g = this.byId[genId]; if (!g) return null;
      let s = seed, out = null;
      for (let attempt = 0; attempt < 40 && !out; attempt++, s += 7919) {
        let res = null;
        try { res = g.make(helpers(mulberry32(s))); } catch (e) { res = null; }
        if (!res) continue;
        const ok = [`ru`, `en`].every((l) => new Set(res[l].o).size === 4 && res[l].o.every((x) => !/NaN|Infinity/.test(x)));
        if (ok) out = res;
      }
      if (!out) return null;
      const q = { id: `g:${genId}:${seed}`, gen: genId, module: g.module, topic: g.topic || g.module, diff: g.diff, type: g.type, time: g.time, correct: 0, ru: out.ru, en: out.en };
      cache.set(key, q);
      return q;
    }
  };
})();
