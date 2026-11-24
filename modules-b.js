MODULES.push(
/* 9 ─────────────────────────────────────────────────────────────────────── */
{
  id: `labour`, n: 9, icon: `user`, lectures: [[9, `2026-10-21`], [10, `2026-10-28`]], practices: [[9, `2026-11-10`]],
  ru: {
    title: `Трудовой потенциал предприятия`,
    lead: `Обеспеченность персоналом, его движение, использование рабочего времени, производительность труда и фонд оплаты труда.`,
    tip: `Выпишите коэффициенты движения кадров и отдельно — что именно входит в текучесть; потренируйтесь в факторной модели выработки.`,
    concepts: [
      [`Трудовой потенциал`, `Совокупность работников, их квалификации, опыта и времени, которое они могут отработать, — способность персонала производить результат.`],
      [`Структура персонала`, `Промышленно-производственный и непромышленный персонал; категории — рабочие, руководители, специалисты, служащие.`],
      [`Движение кадров`, `Приём и выбытие работников; текучесть — выбытие по собственному желанию и за нарушения дисциплины (а не все увольнения).`],
      [`Фонд рабочего времени`, `Время, которое персонал может отработать: численность × дни × продолжительность дня. Потери показывают резервы.`],
      [`Производительность труда`, `Выработка — продукция на одного работника (или за час); трудоёмкость — затраты времени на единицу продукции.`],
      [`Опережение`, `Темп роста производительности труда должен опережать темп роста средней заработной платы — иначе растёт себестоимость.`]
    ],
    formulas: [
      [`Оборот по приёму и выбытию`, `Kпр = Принятые / Среднесписочная численность;  Kвыб = Выбывшие / Среднесписочная`, ``],
      [`Коэффициент текучести`, `Kтек = (Уволенные по собственному желанию + за нарушения) / Среднесписочная`, ``],
      [`Постоянство состава`, `Kпост = Проработавшие весь год / Среднесписочная`, ``],
      [`Фонд рабочего времени`, `ФРВ = Ч × Д × П`, `Ч — численность, Д — дни на одного работника, П — часы в день.`],
      [`Выработка`, `ГВ = Выпуск / Численность;  ГВ = Уд × Д × П × ЧВ`, `Уд — доля рабочих, ЧВ — среднечасовая выработка.`],
      [`Коэффициент опережения`, `Kоп = I выработки / I средней зарплаты`, `Больше 1 — производительность растёт быстрее оплаты.`]
    ],
    example: { title: `Движение кадров`, steps: [
      `Среднесписочная численность 200 человек; принято 30; выбыло 24, из них по собственному желанию 14 и за нарушения 2.`,
      `Kпр = 30 / 200 = 15%; Kвыб = 24 / 200 = 12%.`,
      `Kтек = (14 + 2) / 200 = 8% — остальные 8 человек ушли по объективным причинам (пенсия, призыв, окончание договора).`],
      result: `Текучесть 8% — сигнал для анализа условий труда и мотивации.` },
    pitfalls: [`Включать в текучесть все увольнения.`, `Делить на численность на конец года вместо среднесписочной.`, `Радоваться росту зарплаты, если выработка растёт медленнее.`],
    summary: `Персонал — потенциал, а производительность — его реализация.`
  },
  en: {
    title: `Labour potential`,
    lead: `Staffing levels, staff movement, use of working time, labour productivity and the payroll fund.`,
    tip: `List the staff-movement ratios and, separately, what exactly counts as turnover; practise the output-per-worker factor model.`,
    concepts: [
      [`Labour potential`, `The company’s employees, their skills, experience and available working time — the workforce’s capacity to produce results.`],
      [`Staff structure`, `Production and non-production staff; categories — workers, managers, specialists, clerical staff.`],
      [`Staff movement`, `Hiring and leaving; turnover (attrition) means voluntary leavers and dismissals for misconduct — not all leavers.`],
      [`Working-time fund`, `The time staff can work: headcount × days × hours per day. Losses reveal reserves.`],
      [`Labour productivity`, `Output per worker (or per hour); labour intensity — time spent per unit of output.`],
      [`Outpacing rule`, `Productivity should grow faster than the average wage — otherwise unit costs rise.`]
    ],
    formulas: [
      [`Hiring and leaving rates`, `Kh = Hired / Average headcount;  Kl = Leavers / Average headcount`, ``],
      [`Turnover (attrition) rate`, `Kt = (Voluntary leavers + Dismissed for misconduct) / Average headcount`, ``],
      [`Stability rate`, `Ks = Employed all year / Average headcount`, ``],
      [`Working-time fund`, `WTF = H × D × h`, `H — headcount, D — days per worker, h — hours per day.`],
      [`Output per worker`, `OW = Output / Headcount;  OW = Sh × D × h × HO`, `Sh — share of workers, HO — hourly output.`],
      [`Outpacing ratio`, `Ko = Productivity index / Average-wage index`, `Above 1 — productivity grows faster than pay.`]
    ],
    example: { title: `Staff movement`, steps: [
      `Average headcount 200; hired 30; left 24, of whom 14 voluntarily and 2 dismissed for misconduct.`,
      `Kh = 30 / 200 = 15%; Kl = 24 / 200 = 12%.`,
      `Kt = (14 + 2) / 200 = 8% — the other 8 left for objective reasons (retirement, conscription, end of contract).`],
      result: `8% turnover calls for a look at working conditions and motivation.` },
    pitfalls: [`Counting every leaver as turnover.`, `Dividing by closing headcount instead of the average.`, `Welcoming wage growth when productivity grows more slowly.`],
    summary: `Staff are the potential; productivity is how it is realised.`
  }
},
/* 10 ────────────────────────────────────────────────────────────────────── */
{
  id: `finpot`, n: 10, icon: `chart`, lectures: [[11, `2026-11-02`], [12, `2026-11-04`]], practices: [[10, `2026-11-17`]],
  ru: {
    title: `Финансовый потенциал предприятия`,
    lead: `Капитал предприятия, его структура и отдача: рентабельность собственного капитала, эффект финансового рычага и модель Дюпона.`,
    tip: `Разберите, при каком условии заёмный капитал повышает рентабельность собственного, и разложите ROE по модели Дюпона.`,
    concepts: [
      [`Финансовый потенциал`, `Совокупность собственных и привлечённых финансовых ресурсов и способность использовать их для роста, платёжеспособности и устойчивости.`],
      [`Структура капитала`, `Соотношение собственного и заёмного капитала; определяет риск и цену финансирования.`],
      [`Рентабельность собственного капитала (ROE)`, `Чистая прибыль на сум собственного капитала — главный показатель для собственников.`],
      [`Эффект финансового рычага`, `Прирост ROE за счёт заёмных средств. Возникает, если экономическая рентабельность активов выше ставки по кредитам.`],
      [`Дифференциал рычага`, `Разница между экономической рентабельностью и средней ставкой процента. Отрицательный дифференциал превращает рычаг в «гирю».`],
      [`Модель Дюпона`, `Разложение ROE на рентабельность продаж, оборачиваемость активов и мультипликатор капитала — показывает источник доходности.`]
    ],
    formulas: [
      [`ROE и ROA`, `ROE = ЧП / СК × 100%;  ROA = ЧП / Активы × 100%`, `Используются средние за период величины.`],
      [`Экономическая рентабельность`, `ЭР = Прибыль до процентов и налогов / Активы × 100%`, ``],
      [`Эффект финансового рычага`, `ЭФР = (1 − Т) × (ЭР − СРСП) × ЗК / СК`, `Т — ставка налога на прибыль, СРСП — средняя ставка процента.`],
      [`Модель Дюпона`, `ROE = ЧП / Выручка × Выручка / Активы × Активы / СК`, `Рентабельность продаж × оборачиваемость × мультипликатор.`]
    ],
    example: { title: `Выгоден ли кредит?`, steps: [
      `ЭР = 20%, средняя ставка по кредитам 14%, ЗК / СК = 0,5, ставка налога 15%.`,
      `Дифференциал: 20 − 14 = 6 п.п. — положительный.`,
      `ЭФР = 0,85 × 6% × 0,5 = 2,55% — заём повышает ROE на 2,55 п.п.`],
      result: `Пока активы зарабатывают больше, чем стоит долг, заёмные средства работают на собственников.` },
    pitfalls: [`Считать, что любой кредит повышает ROE.`, `Игнорировать рост риска при увеличении плеча ЗК / СК.`, `Путать ROA и ROE.`],
    summary: `Финансовый потенциал — это не размер капитала, а его способность приносить доход при приемлемом риске.`
  },
  en: {
    title: `Financial potential`,
    lead: `The company’s capital, its structure and return: return on equity, financial leverage and the DuPont model.`,
    tip: `Work out when borrowed capital raises return on equity, and break ROE down with the DuPont model.`,
    concepts: [
      [`Financial potential`, `The company’s own and borrowed financial resources and its ability to use them for growth, solvency and stability.`],
      [`Capital structure`, `The mix of equity and debt; it sets the risk and the cost of financing.`],
      [`Return on equity (ROE)`, `Net profit per soum of equity — the owners’ key indicator.`],
      [`Financial leverage effect`, `The increase in ROE thanks to borrowing. It arises when the return on assets exceeds the interest rate.`],
      [`Leverage differential`, `Return on assets minus the average interest rate. A negative differential turns leverage into a burden.`],
      [`DuPont model`, `ROE broken into profit margin, asset turnover and the equity multiplier — shows where returns come from.`]
    ],
    formulas: [
      [`ROE and ROA`, `ROE = NP / Equity × 100%;  ROA = NP / Assets × 100%`, `Use period averages.`],
      [`Economic return on assets`, `ER = EBIT / Assets × 100%`, ``],
      [`Financial leverage effect`, `FLE = (1 − t) × (ER − i) × D / E`, `t — profit tax rate, i — average interest rate.`],
      [`DuPont model`, `ROE = NP / Revenue × Revenue / Assets × Assets / Equity`, `Margin × turnover × multiplier.`]
    ],
    example: { title: `Is the loan worth it?`, steps: [
      `ER = 20%, average interest 14%, D / E = 0.5, tax rate 15%.`,
      `Differential: 20 − 14 = 6 p.p. — positive.`,
      `FLE = 0.85 × 6% × 0.5 = 2.55% — borrowing lifts ROE by 2.55 p.p.`],
      result: `As long as assets earn more than the debt costs, borrowed money works for the owners.` },
    pitfalls: [`Assuming any loan raises ROE.`, `Ignoring rising risk as D / E grows.`, `Confusing ROA with ROE.`],
    summary: `Financial potential is not the size of capital but its ability to earn at acceptable risk.`
  }
},
/* 11 ────────────────────────────────────────────────────────────────────── */
{
  id: `cashflow`, n: 11, icon: `wave`, lectures: [[13, `2026-11-11`], [14, `2026-11-16`]], practices: [[11, `2026-11-24`]],
  ru: {
    title: `Анализ денежных потоков`,
    lead: `Чем денежный поток отличается от прибыли, как классифицировать потоки, рассчитывать их прямым и косвенным методом, оценивать коэффициентами и управлять остатком денег.`,
    tip: `Отработайте косвенный метод, финансовый цикл и модель Баумоля — это основа практики.`,
    concepts: [
      [`Денежный поток`, `Движение денежных средств за период: поступления (положительный поток) и выплаты (отрицательный). Чистый поток — их разница.`],
      [`Прибыль и деньги`, `Прибыль считается по принципу начисления, денежный поток — по кассовому. Рост дебиторки, запасов, капвложения и погашение долга создают разрыв между ними.`],
      [`Виды деятельности`, `Операционная (основная: покупатели, поставщики, персонал, налоги), инвестиционная (внеоборотные активы, долгосрочные вложения), финансовая (кредиты, займы, эмиссия, дивиденды).`],
      [`Прямой метод`, `Показывает валовые поступления и платежи по статьям — удобен для оперативного управления.`],
      [`Косвенный метод`, `Выводит операционный поток из чистой прибыли через корректировки на неденежные статьи и изменение оборотного капитала.`],
      [`Сбалансированность и синхронность`, `Притоки и оттоки должны совпадать по объёму и во времени — иначе возникают кассовые разрывы.`],
      [`Операционный и финансовый цикл`, `ОЦ = оборот запасов + оборот дебиторки; ФЦ = ОЦ − оборот кредиторки — время, на которое «заморожены» деньги.`],
      [`Модели управления остатком`, `Баумоля — для равномерных расходов; Миллера–Орра — для случайных колебаний с коридором и точкой возврата.`],
      [`Свободный денежный поток`, `Операционный поток минус капитальные вложения — деньги, доступные собственникам и кредиторам.`]
    ],
    formulas: [
      [`Косвенный метод`, `ОДП = ЧП + Амортизация − ΔДЗ − ΔЗапасов + ΔКЗ ± прочие корректировки`, `Рост активов — минус, рост пассивов — плюс.`],
      [`Коэффициент ликвидности потока`, `Kл = ПДП / ОДП`, `ПДП — положительный, ОДП — отрицательный поток. Ориентир ≥ 1.`],
      [`Финансовый цикл`, `ФЦ = Оборот запасов + Оборот ДЗ − Оборот КЗ`, ``],
      [`Модель Баумоля`, `Q* = √(2 · F · T / r)`, `F — расходы на операцию, T — годовая потребность, r — доходность ценных бумаг. Средний остаток Q*/2.`],
      [`Миллер–Орр`, `S = 3 · ∛(3Fσ² / 4r);  H = L + S;  Z = L + S / 3`, `L — нижняя граница, Z — точка возврата.`],
      [`Свободный поток и NPV`, `FCF = ОДП − CAPEX;  NPV = Σ CFₜ / (1 + r)ᵗ − I₀`, ``]
    ],
    example: { title: `Косвенный метод`, steps: [
      `Чистая прибыль 800, амортизация 200, прирост дебиторки 150, прирост запасов 50, прирост кредиторки 100 (млн сум).`,
      `ОДП = 800 + 200 − 150 − 50 + 100 = 900 млн сум.`,
      `Разрыв с прибылью (+100) объясняется амортизацией и изменением оборотного капитала.`],
      result: `Прибыль — мнение, деньги — факт: косвенный метод показывает, как одно превращается в другое.` },
    pitfalls: [`Отождествлять прибыль и деньги.`, `Путать знак изменения кредиторской задолженности.`, `Оценивать только итоговый поток без структуры по видам деятельности.`],
    summary: `Компании становятся неплатёжеспособными не из-за убытков, а из-за отсутствия денег.`
  },
  en: {
    title: `Cash flow analysis`,
    lead: `How cash flow differs from profit, how flows are classified and calculated by the direct and indirect methods, assessed with ratios, and how the cash balance is managed.`,
    tip: `Practise the indirect method, the cash conversion cycle and the Baumol model — they are the core of the practical class.`,
    concepts: [
      [`Cash flow`, `The movement of cash over a period: receipts (inflow) and payments (outflow). Net cash flow is the difference.`],
      [`Profit vs cash`, `Profit is measured on an accrual basis, cash flow on a cash basis. Growing receivables and inventory, capital spending and debt repayment open a gap between them.`],
      [`Activities`, `Operating (customers, suppliers, staff, taxes), investing (non-current assets, long-term investments), financing (loans, share issues, dividends).`],
      [`Direct method`, `Shows gross receipts and payments by line — useful for day-to-day management.`],
      [`Indirect method`, `Derives operating cash flow from net profit by adjusting for non-cash items and changes in working capital.`],
      [`Balance and synchronisation`, `Inflows and outflows must match in volume and in timing — otherwise cash gaps appear.`],
      [`Operating and cash cycles`, `OC = inventory days + receivable days; CCC = OC − payable days — how long cash is “frozen”.`],
      [`Cash balance models`, `Baumol for even spending; Miller–Orr for random fluctuations, with a corridor and a return point.`],
      [`Free cash flow`, `Operating cash flow minus capital expenditure — cash available to owners and lenders.`]
    ],
    formulas: [
      [`Indirect method`, `OCF = NP + Depreciation − ΔAR − ΔInventory + ΔAP ± other adjustments`, `Assets up — minus; liabilities up — plus.`],
      [`Cash flow liquidity ratio`, `Kl = Inflows / Outflows`, `Benchmark ≥ 1.`],
      [`Cash conversion cycle`, `CCC = Inventory days + Receivable days − Payable days`, ``],
      [`Baumol model`, `Q* = √(2 · F · T / r)`, `F — cost per transfer, T — annual need, r — securities yield. Average balance Q*/2.`],
      [`Miller–Orr`, `S = 3 · ∛(3Fσ² / 4r);  H = L + S;  Z = L + S / 3`, `L — lower limit, Z — return point.`],
      [`Free cash flow and NPV`, `FCF = OCF − CAPEX;  NPV = Σ CFₜ / (1 + r)ᵗ − I₀`, ``]
    ],
    example: { title: `Indirect method`, steps: [
      `Net profit 800, depreciation 200, increase in receivables 150, in inventory 50, in payables 100 (m soums).`,
      `OCF = 800 + 200 − 150 − 50 + 100 = 900 m soums.`,
      `The gap with profit (+100) is explained by depreciation and working-capital changes.`],
      result: `Profit is an opinion, cash is a fact: the indirect method shows how one becomes the other.` },
    pitfalls: [`Treating profit as cash.`, `Getting the sign of the change in payables wrong.`, `Judging only the bottom line without the activity structure.`],
    summary: `Companies fail not from losses but from running out of cash.`
  }
},
/* 12 ────────────────────────────────────────────────────────────────────── */
{
  id: `output`, n: 12, icon: `box`, lectures: [[15, `2026-11-18`], [16, `2026-11-25`]], practices: [[12, `2026-12-01`]],
  ru: {
    title: `Производимая и реализуемая продукция`,
    lead: `Объём производства и реализации, выполнение плана по ассортименту, структура, качество и ритмичность выпуска.`,
    tip: `Отработайте коэффициент ритмичности и выполнение плана по ассортименту способом наименьшего числа — в обоих сверхплан не засчитывается.`,
    concepts: [
      [`Объём продукции`, `Валовая продукция (всё произведённое, включая НЗП), товарная (готовая к продаже), реализованная (отгруженная и оплаченная или признанная).`],
      [`Измерители`, `Натуральные (штуки, тонны), стоимостные (сумы) и трудовые (нормо-часы).`],
      [`Ассортимент`, `Перечень наименований продукции. Выполнение плана по ассортименту оценивают способом наименьшего числа: по каждой позиции засчитывается факт, но не выше плана.`],
      [`Структура`, `Соотношение видов продукции. Сдвиг в сторону дорогих изделий увеличивает выручку даже при том же количестве.`],
      [`Качество`, `Сортность, доля брака, рекламации, соответствие стандартам.`],
      [`Ритмичность`, `Равномерность выпуска по периодам согласно графику. Неритмичность ведёт к штурмовщине, браку, сверхурочным и штрафам.`]
    ],
    formulas: [
      [`Баланс товарной продукции`, `РП = ГП на начало + ТП − ГП на конец`, `РП — реализация, ГП — остатки готовой продукции, ТП — выпуск.`],
      [`Выполнение плана по ассортименту`, `Kасс = Σ min(Факт, План) / Σ План`, `Сверхплановый выпуск одних позиций не компенсирует недовыпуск других.`],
      [`Коэффициент ритмичности`, `Kритм = Σ min(Факт, План) по периодам / План периода`, `Чем ближе к 1, тем ритмичнее.`],
      [`Темп выполнения плана`, `% = Факт / План × 100%`, ``]
    ],
    example: { title: `Ритмичность по декадам`, steps: [
      `План по декадам: 100 / 100 / 100 изделий. Факт: 80 / 110 / 120.`,
      `Засчитываем не выше плана: 80 + 100 + 100 = 280.`,
      `Kритм = 280 / 300 = 0,933, хотя общий план выполнен на 103%.`],
      result: `План в целом выполнен, но выпуск был неритмичным — работа «рывками» в конце месяца.` },
    pitfalls: [`Засчитывать сверхплановый выпуск в коэффициенте ритмичности.`, `Путать товарную и реализованную продукцию.`, `Оценивать рост выручки без учёта структурных сдвигов и цен.`],
    summary: `Важно не только сколько произведено, но и что, какого качества и как равномерно.`
  },
  en: {
    title: `Output and sales`,
    lead: `Production and sales volume, assortment plan fulfilment, product mix, quality and rhythm of output.`,
    tip: `Practise the rhythm ratio and the “lowest number” method for the assortment plan — over-fulfilment is not counted in either.`,
    concepts: [
      [`Output volume`, `Gross output (everything produced, including WIP), marketable output (ready for sale), sold output (shipped and recognised).`],
      [`Measures`, `Physical (units, tonnes), value (soums) and labour (standard hours).`],
      [`Assortment`, `The list of products. Plan fulfilment is assessed by the lowest-number method: each item counts actual output, but no more than plan.`],
      [`Product mix`, `The proportions of products. A shift towards pricier items raises revenue even at the same quantity.`],
      [`Quality`, `Grade, defect rate, complaints, compliance with standards.`],
      [`Rhythm`, `Even output across periods according to schedule. Irregular output leads to end-of-month rush, defects, overtime and penalties.`]
    ],
    formulas: [
      [`Finished-goods balance`, `Sales = Opening FG + Output − Closing FG`, `FG — finished goods inventory.`],
      [`Assortment plan fulfilment`, `Ka = Σ min(Actual, Plan) / Σ Plan`, `Over-production of one item does not offset under-production of another.`],
      [`Rhythm ratio`, `Kr = Σ min(Actual, Plan) by period / Plan`, `The closer to 1, the more even.`],
      [`Plan fulfilment`, `% = Actual / Plan × 100%`, ``]
    ],
    example: { title: `Rhythm by ten-day periods`, steps: [
      `Plan: 100 / 100 / 100 units. Actual: 80 / 110 / 120.`,
      `Count no more than plan: 80 + 100 + 100 = 280.`,
      `Kr = 280 / 300 = 0.933, though the overall plan is 103% fulfilled.`],
      result: `The plan was met overall, but output came in bursts at the end of the month.` },
    pitfalls: [`Counting over-fulfilment in the rhythm ratio.`, `Confusing marketable and sold output.`, `Judging revenue growth without allowing for mix shifts and prices.`],
    summary: `What matters is not only how much was produced, but what, of what quality and how evenly.`
  }
},
/* 13 ────────────────────────────────────────────────────────────────────── */
{
  id: `stability`, n: 13, icon: `shield`, lectures: [[17, `2026-11-30`], [18, `2026-12-02`]], practices: [[13, `2026-12-08`]],
  ru: {
    title: `Финансовая устойчивость`,
    lead: `Независимость предприятия от заёмных средств и его платёжеспособность: коэффициенты устойчивости, ликвидности и типы финансовой устойчивости.`,
    tip: `Сведите в таблицу формулы и ориентиры коэффициентов автономии, капитализации, маневренности и трёх коэффициентов ликвидности.`,
    concepts: [
      [`Финансовая устойчивость`, `Такое состояние ресурсов, при котором предприятие развивается в основном за счёт собственных средств и сохраняет платёжеспособность при допустимом риске.`],
      [`Ликвидность и платёжеспособность`, `Ликвидность — способность активов превращаться в деньги; платёжеспособность — способность вовремя погашать обязательства.`],
      [`Коэффициенты структуры капитала`, `Автономии, финансовой зависимости, капитализации (плечо), финансовой устойчивости.`],
      [`Собственные оборотные средства`, `Основа маневренности и обеспеченности оборотных активов собственными источниками.`],
      [`Типы устойчивости`, `Абсолютная, нормальная, неустойчивое и кризисное состояние — по тому, какими источниками покрыты запасы (трёхкомпонентный показатель).`],
      [`Нормативы условны`, `Рекомендуемые значения зависят от отрасли; важнее динамика и сравнение с конкурентами.`]
    ],
    formulas: [
      [`Коэффициент автономии`, `Kа = СК / Валюта баланса`, `Ориентир ≥ 0,5.`],
      [`Коэффициент капитализации`, `Kк = ЗК / СК`, `Ориентир ≤ 1.`],
      [`Финансовой устойчивости`, `Kфу = (СК + Долгосрочные обязательства) / Валюта баланса`, `Чем ближе к 1, тем устойчивее; часто ориентир — не ниже 0,7.`],
      [`Маневренности`, `Kм = СОС / СК`, `СОС = СК + ДО − Внеоборотные активы.`],
      [`Обеспеченности СОС`, `Kо = СОС / Оборотные активы`, `Ориентир ≥ 0,1.`],
      [`Ликвидность`, `Текущая = ОА / КО;  Быстрая = (ОА − Запасы) / КО;  Абсолютная = (ДС + КФВ) / КО`, `Ориентиры: 1,5–2,5; 0,7–1; 0,2 и выше.`]
    ],
    example: { title: `Экспресс-оценка`, steps: [
      `Валюта баланса 10 000; СК 4 500; ДО 1 500; КО 4 000; ОА 6 000, из них запасы 2 400 и деньги 600 (млн сум).`,
      `Kа = 0,45 (ниже 0,5); Kк = 5 500 / 4 500 = 1,22 (выше 1).`,
      `Текущая ликвидность 1,5; быстрая (6 000 − 2 400) / 4 000 = 0,9; абсолютная 0,15.`],
      result: `Ликвидность приемлемая, но структура капитала смещена к заёмным средствам — риск растёт.` },
    pitfalls: [`Путать коэффициент автономии (СК / ВБ) с капитализацией (ЗК / СК).`, `Включать запасы в быструю ликвидность.`, `Применять нормативы механически, без учёта отрасли.`],
    summary: `Устойчивость — это свобода: чем меньше зависимость от кредиторов, тем больше пространство для решений.`
  },
  en: {
    title: `Financial stability`,
    lead: `How independent the company is from borrowing, and its solvency: stability ratios, liquidity ratios and types of financial stability.`,
    tip: `Put the formulas and benchmarks for autonomy, leverage, manoeuvrability and the three liquidity ratios into one table.`,
    concepts: [
      [`Financial stability`, `A state in which the company grows mainly on its own funds and remains solvent at acceptable risk.`],
      [`Liquidity and solvency`, `Liquidity — how readily assets turn into cash; solvency — the ability to meet obligations on time.`],
      [`Capital-structure ratios`, `Autonomy (equity ratio), dependency, leverage (debt-to-equity), financial stability.`],
      [`Own working capital`, `The basis of manoeuvrability and of financing current assets from own sources.`],
      [`Types of stability`, `Absolute, normal, unstable and crisis — depending on which sources cover inventory (the three-component indicator).`],
      [`Benchmarks are relative`, `Recommended values depend on the industry; trends and peer comparison matter more.`]
    ],
    formulas: [
      [`Autonomy ratio`, `Ka = Equity / Total assets`, `Benchmark ≥ 0.5.`],
      [`Leverage (capitalisation)`, `Kl = Debt / Equity`, `Benchmark ≤ 1.`],
      [`Financial stability ratio`, `Kfs = (Equity + Long-term liabilities) / Total assets`, `The closer to 1 the better; often at least 0.7.`],
      [`Manoeuvrability`, `Km = OWC / Equity`, `OWC = Equity + LTL − Non-current assets.`],
      [`Own working capital cover`, `Kc = OWC / Current assets`, `Benchmark ≥ 0.1.`],
      [`Liquidity`, `Current = CA / CL;  Quick = (CA − Inventory) / CL;  Cash = (Cash + ST securities) / CL`, `Benchmarks: 1.5–2.5; 0.7–1; 0.2 and above.`]
    ],
    example: { title: `Quick assessment`, steps: [
      `Total assets 10,000; equity 4,500; LTL 1,500; CL 4,000; CA 6,000 incl. inventory 2,400 and cash 600 (m soums).`,
      `Ka = 0.45 (below 0.5); Kl = 5,500 / 4,500 = 1.22 (above 1).`,
      `Current ratio 1.5; quick (6,000 − 2,400) / 4,000 = 0.9; cash ratio 0.15.`],
      result: `Liquidity is acceptable, but the capital structure leans on debt — risk is rising.` },
    pitfalls: [`Confusing autonomy (E / TA) with leverage (D / E).`, `Including inventory in the quick ratio.`, `Applying benchmarks mechanically, ignoring the industry.`],
    summary: `Stability is freedom: the less you depend on lenders, the more room you have to decide.`
  }
},
/* 14 ────────────────────────────────────────────────────────────────────── */
{
  id: `breakeven`, n: 14, icon: `target`, lectures: [[19, `2026-12-09`], [20, `2026-12-14`]], practices: [[14, `2026-12-15`]],
  ru: {
    title: `Точка безубыточности (порог рентабельности)`,
    lead: `Маржинальный анализ «затраты — объём — прибыль»: точка безубыточности, запас финансовой прочности и операционный рычаг.`,
    tip: `Решите задачи на точку безубыточности в штуках и в деньгах, затем рассчитайте запас прочности и операционный рычаг для той же фирмы.`,
    concepts: [
      [`Постоянные и переменные затраты`, `Постоянные (аренда, оклады управленцев, амортизация) не зависят от объёма; переменные (сырьё, сдельная оплата) меняются пропорционально объёму.`],
      [`Маржинальный доход`, `Выручка минус переменные затраты — сумма, которая покрывает постоянные затраты и формирует прибыль.`],
      [`Точка безубыточности`, `Объём продаж, при котором выручка равна совокупным затратам и прибыль равна нулю.`],
      [`Запас финансовой прочности`, `На сколько может упасть выручка, прежде чем предприятие станет убыточным.`],
      [`Операционный рычаг`, `Чувствительность прибыли к изменению выручки: чем выше доля постоянных затрат, тем сильнее рычаг и выше риск.`]
    ],
    formulas: [
      [`Точка безубыточности в натуре`, `Q* = FC / (p − v)`, `p — цена, v — переменные затраты на единицу.`],
      [`В стоимостном выражении`, `В* = FC / Kмд;  Kмд = МД / Выручка`, ``],
      [`Объём для целевой прибыли`, `Q = (FC + Прибыль) / (p − v)`, ``],
      [`Запас финансовой прочности`, `ЗФП = (Выручка − В*) / Выручка × 100%`, ``],
      [`Операционный рычаг`, `ОР = МД / Прибыль;  ΔПрибыли % = ОР × ΔВыручки %`, ``]
    ],
    example: { title: `Маленькая мастерская`, steps: [
      `Постоянные затраты 600 млн сум; цена 50 тыс. сум, переменные затраты 30 тыс. сум на изделие.`,
      `Q* = 600 000 / (50 − 30) = 30 000 изделий; В* = 1 500 млн сум.`,
      `При продажах 50 000 изделий: выручка 2 500, МД 1 000, прибыль 400; ЗФП = 40%; ОР = 2,5.`],
      result: `Рост выручки на 10% даст рост прибыли на 25%, а падение — такое же сокращение.` },
    pitfalls: [`Вычитать постоянные затраты при расчёте маржи на единицу.`, `Путать запас прочности в процентах и в деньгах.`, `Считать операционный рычаг постоянным — он падает по мере удаления от точки безубыточности.`],
    summary: `Безубыточность — это граница; всё, что продано сверх неё, работает на прибыль.`
  },
  en: {
    title: `Break-even point`,
    lead: `Cost–volume–profit analysis: the break-even point, the margin of safety and operating leverage.`,
    tip: `Solve break-even problems in units and in money, then calculate the margin of safety and operating leverage for the same firm.`,
    concepts: [
      [`Fixed and variable costs`, `Fixed costs (rent, managers’ salaries, depreciation) do not depend on volume; variable costs (materials, piece-rate pay) move in proportion to it.`],
      [`Contribution margin`, `Revenue minus variable costs — the amount that covers fixed costs and forms profit.`],
      [`Break-even point`, `The sales volume at which revenue equals total costs and profit is zero.`],
      [`Margin of safety`, `How far revenue can fall before the company makes a loss.`],
      [`Operating leverage`, `How sensitive profit is to revenue: the higher the share of fixed costs, the stronger the leverage and the risk.`]
    ],
    formulas: [
      [`Break-even in units`, `Q* = FC / (p − v)`, `p — price, v — variable cost per unit.`],
      [`Break-even in money`, `R* = FC / CMR;  CMR = CM / Revenue`, ``],
      [`Volume for target profit`, `Q = (FC + Profit) / (p − v)`, ``],
      [`Margin of safety`, `MS = (Revenue − R*) / Revenue × 100%`, ``],
      [`Operating leverage`, `DOL = CM / Profit;  ΔProfit % = DOL × ΔRevenue %`, ``]
    ],
    example: { title: `A small workshop`, steps: [
      `Fixed costs 600 m soums; price 50 thousand, variable cost 30 thousand per unit.`,
      `Q* = 600,000 / (50 − 30) = 30,000 units; R* = 1,500 m soums.`,
      `Selling 50,000 units: revenue 2,500, CM 1,000, profit 400; MS = 40%; DOL = 2.5.`],
      result: `A 10% rise in revenue lifts profit by 25% — and a fall cuts it just as hard.` },
    pitfalls: [`Deducting fixed costs when calculating unit margin.`, `Confusing the margin of safety in per cent and in money.`, `Treating operating leverage as constant — it falls as you move away from break-even.`],
    summary: `Break-even is the boundary; everything sold beyond it works for profit.`
  }
},
/* 15 ────────────────────────────────────────────────────────────────────── */
{
  id: `results`, n: 15, icon: `award`, lectures: [[21, `2026-12-16`], [22, `2026-12-23`]], practices: [[15, null]],
  ru: {
    title: `Финансовые результаты`,
    lead: `Формирование прибыли по отчёту о финансовых результатах, показатели рентабельности и факторный анализ прибыли от продаж.`,
    tip: `Пройдите «лестницу» прибыли от выручки до чистой прибыли и сравните рентабельность продаж, продукции, активов и собственного капитала.`,
    concepts: [
      [`Лестница прибыли`, `Выручка → валовая прибыль → прибыль от основной (операционной) деятельности → прибыль до налогообложения → чистая прибыль.`],
      [`Валовая прибыль`, `Чистая выручка минус себестоимость реализованной продукции.`],
      [`Операционная прибыль`, `Валовая прибыль минус расходы периода (реализационные, административные, прочие операционные) плюс прочие операционные доходы.`],
      [`Чистая прибыль`, `Прибыль до налогообложения минус налог на прибыль; источник дивидендов и развития.`],
      [`Рентабельность`, `Относительная доходность: продаж (прибыль / выручка), продукции (прибыль / себестоимость), активов, собственного капитала.`],
      [`Факторы прибыли от продаж`, `Объём продаж, структура (ассортимент), цены и себестоимость единицы продукции.`]
    ],
    formulas: [
      [`Валовая прибыль`, `ВП = Выручка − Себестоимость реализованной продукции`, ``],
      [`Рентабельность продаж`, `ROS = Прибыль от продаж / Выручка × 100%`, ``],
      [`Рентабельность продукции`, `Rпр = Прибыль от продаж / Полная себестоимость × 100%`, `База — затраты, а не выручка.`],
      [`ROA по Дюпону`, `ROA = ROS × Выручка / Активы`, `Рентабельность продаж × оборачиваемость активов.`],
      [`Влияние цены на прибыль`, `ΔП(цена) = Σ (p₁ − p₀) × q₁`, `Изменение цен по фактическому объёму продаж.`]
    ],
    example: { title: `Лестница прибыли`, steps: [
      `Выручка 10 000, себестоимость 7 000 → валовая прибыль 3 000 (млн сум).`,
      `Расходы периода 1 800 → операционная прибыль 1 200; ROS = 12%.`,
      `Финансовые расходы 200 → до налогообложения 1 000; налог 15% → чистая прибыль 850.`],
      result: `Каждая ступень показывает, где теряется доход: в себестоимости, в расходах периода или на процентах.` },
    pitfalls: [`Путать рентабельность продаж (к выручке) и продукции (к себестоимости).`, `Сравнивать прибыль разных лет без учёта изменения цен.`, `Оценивать только чистую прибыль, не разбирая её формирование.`],
    summary: `Прибыль — итог всего курса: она показывает, насколько эффективно использованы все ресурсы.`
  },
  en: {
    title: `Financial results`,
    lead: `How profit is formed in the income statement, profitability ratios and factor analysis of operating profit.`,
    tip: `Walk the profit “ladder” from revenue to net profit and compare return on sales, on costs, on assets and on equity.`,
    concepts: [
      [`Profit ladder`, `Revenue → gross profit → operating profit → profit before tax → net profit.`],
      [`Gross profit`, `Net revenue minus cost of goods sold.`],
      [`Operating profit`, `Gross profit minus period expenses (selling, administrative, other operating) plus other operating income.`],
      [`Net profit`, `Profit before tax minus profit tax; the source of dividends and development.`],
      [`Profitability`, `Relative return: on sales (profit / revenue), on products (profit / cost), on assets, on equity.`],
      [`Drivers of operating profit`, `Sales volume, product mix, prices and unit cost.`]
    ],
    formulas: [
      [`Gross profit`, `GP = Revenue − Cost of goods sold`, ``],
      [`Return on sales`, `ROS = Operating profit / Revenue × 100%`, ``],
      [`Return on costs`, `Rc = Operating profit / Total cost × 100%`, `The base is cost, not revenue.`],
      [`ROA via DuPont`, `ROA = ROS × Revenue / Assets`, `Margin × asset turnover.`],
      [`Price effect on profit`, `ΔP(price) = Σ (p₁ − p₀) × q₁`, `Price change applied to actual volume.`]
    ],
    example: { title: `The profit ladder`, steps: [
      `Revenue 10,000, cost of sales 7,000 → gross profit 3,000 (m soums).`,
      `Period expenses 1,800 → operating profit 1,200; ROS = 12%.`,
      `Finance costs 200 → profit before tax 1,000; 15% tax → net profit 850.`],
      result: `Each step shows where income leaks away: in cost of sales, period expenses or interest.` },
    pitfalls: [`Confusing return on sales (to revenue) with return on costs (to cost).`, `Comparing profit across years without allowing for price changes.`, `Looking only at net profit without studying how it was formed.`],
    summary: `Profit is the final exam of the whole course: it shows how efficiently every resource was used.`
  }
}
);
