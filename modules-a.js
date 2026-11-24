/* ==========================================================================
   03 · COURSE MAP & STUDY LIBRARY
   --------------------------------------------------------------------------
   Every syllabus topic is a module. A module carries its schedule (lecture
   and practice numbers with dates) and a library entry in both languages:
     lead, tip, concepts [[term, definition]], formulas [[name, expression,
     note]], example { title, steps[], result }, pitfalls[], summary.
   Questions (written and generated) reference modules by `id`.
   ========================================================================== */

const COURSE = {
  ru: { subject: `Экономический анализ`, title: `Экономический анализ`, hero: `Экономический<br><em>анализ</em>`,
        lead: `Полный курс по программе: 15 тем, конспекты с формулами и разобранными примерами, бесконечный поток задач и адаптивное повторение.` },
  en: { subject: `Economic Analysis`, title: `Economic Analysis`, hero: `Economic<br><em>analysis</em>`,
        lead: `The full syllabus: 15 topics, study notes with formulas and worked examples, an endless stream of problems and adaptive review.` }
};

/** The current deadline task, pinned to the top of the home screen. */
const ASSIGNMENT = { module: `cashflow`, kind: `practice`, n: 11, due: `2026-11-24` };

const MODULES = [
/* 1 ─────────────────────────────────────────────────────────────────────── */
{
  id: `org`, n: 1, icon: `compass`, lectures: [[1, `2026-09-16`]], practices: [[1, `2026-09-15`]],
  ru: {
    title: `Организация экономического анализа`,
    lead: `Что изучает экономический анализ, какие задачи решает, на каких принципах строится и как организуется аналитическая работа на предприятии.`,
    tip: `Повторите различия предмета и объекта анализа, а также классификацию видов анализа по времени и по субъектам.`,
    concepts: [
      [`Экономический анализ`, `Система знаний и приёмов исследования хозяйственных процессов: от сбора данных к выявлению факторов, резервов и обоснованию управленческих решений.`],
      [`Предмет анализа`, `Хозяйственные процессы предприятия, их эффективность и конечные финансовые результаты, формирующиеся под действием объективных и субъективных факторов.`],
      [`Объект анализа`, `Хозяйственная деятельность предприятия и её участки: производство, снабжение, сбыт, персонал, финансы.`],
      [`Принципы`, `Научность, комплексность, системность, объективность, действенность (выводы должны вести к решениям), оперативность и эффективность — затраты на анализ должны быть меньше полученного эффекта.`],
      [`Виды по времени`, `Ретроспективный (последующий) — по итогам периода; оперативный — в ходе работы; перспективный (прогнозный) — оценка будущих результатов.`],
      [`Виды по субъектам`, `Внешний (финансовый) — по публичной отчётности для банков, инвесторов, государства; внутренний (управленческий) — по всем данным предприятия для менеджмента.`],
      [`Резервы`, `Неиспользованные возможности роста результатов. Экстенсивные — за счёт привлечения дополнительных ресурсов, интенсивные — за счёт лучшего использования имеющихся.`],
      [`Этапы аналитической работы`, `Планирование (цели, исполнители, сроки) → сбор и проверка информации → аналитическая обработка → выводы и предложения → контроль внедрения.`]
    ],
    formulas: [
      [`Величина резерва`, `Резерв = Возможный уровень − Фактический уровень`, `Возможный уровень — план, норматив, лучший результат отрасли или собственный лучший период.`],
      [`Эффективность анализа`, `Эффект от решений > Затраты на анализ`, `Принцип эффективности: анализ ради анализа не имеет смысла.`]
    ],
    example: { title: `Классификация реальных ситуаций`, steps: [
      `Банк оценивает заёмщика по его опубликованной отчётности — внешний (финансовый) ретроспективный анализ.`,
      `Начальник цеха ежедневно сравнивает выпуск с графиком — внутренний оперативный анализ.`,
      `Финансовый директор строит прогноз денежных потоков на три года — внутренний перспективный анализ.`],
      result: `Один и тот же отчёт может служить разным видам анализа — вид определяется целью, пользователем и временем.` },
    pitfalls: [`Путать предмет (процессы и результаты) с объектом (сама деятельность).`, `Считать, что внешний аналитик видит внутренние данные — у него только публичная отчётность.`, `Сводить анализ к расчёту показателей без выводов и предложений.`],
    summary: `Анализ — мост между учётом и управлением: он превращает данные в решения.`
  },
  en: {
    title: `Organisation of economic analysis`,
    lead: `What economic analysis studies, the tasks it solves, the principles it rests on and how analytical work is organised in a company.`,
    tip: `Revisit the difference between the subject and the object of analysis, and how types of analysis are classified by time and by user.`,
    concepts: [
      [`Economic analysis`, `A body of knowledge and techniques for studying business processes: from data collection to identifying factors and reserves and justifying management decisions.`],
      [`Subject of analysis`, `The company’s business processes, their efficiency and final financial results, shaped by objective and subjective factors.`],
      [`Object of analysis`, `The company’s economic activity and its areas: production, procurement, sales, staff, finance.`],
      [`Principles`, `Scientific rigour, comprehensiveness, a systems view, objectivity, effectiveness (conclusions must lead to decisions), timeliness and efficiency — analysis must cost less than the benefit it brings.`],
      [`Types by time`, `Retrospective — after the period ends; operational — while work is under way; prospective (forecast) — assessing future results.`],
      [`Types by user`, `External (financial) — from published statements for banks, investors, the state; internal (management) — from all company data, for managers.`],
      [`Reserves`, `Untapped opportunities to improve results. Extensive — by adding resources; intensive — by using existing resources better.`],
      [`Stages of analytical work`, `Planning (goals, people, deadlines) → collecting and checking information → analytical processing → conclusions and proposals → monitoring implementation.`]
    ],
    formulas: [
      [`Size of a reserve`, `Reserve = Achievable level − Actual level`, `The achievable level is a plan, a standard, the industry’s best result or the company’s own best period.`],
      [`Efficiency of analysis`, `Benefit of decisions > Cost of analysis`, `The efficiency principle: analysis for its own sake is pointless.`]
    ],
    example: { title: `Classifying real situations`, steps: [
      `A bank assesses a borrower from its published statements — external (financial) retrospective analysis.`,
      `A shop-floor manager compares daily output with the schedule — internal operational analysis.`,
      `The CFO builds a three-year cash flow forecast — internal prospective analysis.`],
      result: `The same report can serve different types of analysis — the type is set by the purpose, the user and the time frame.` },
    pitfalls: [`Confusing the subject (processes and results) with the object (the activity itself).`, `Assuming an external analyst sees internal data — they have only published statements.`, `Reducing analysis to calculating ratios with no conclusions or proposals.`],
    summary: `Analysis is the bridge between accounting and management: it turns data into decisions.`
  }
},
/* 2 ─────────────────────────────────────────────────────────────────────── */
{
  id: `methods`, n: 2, icon: `layers`, lectures: [[2, `2026-09-21`]], practices: [[2, `2026-09-22`]],
  ru: {
    title: `Методы экономического анализа`,
    lead: `Приёмы сравнения, группировки и обработки данных, горизонтальный и вертикальный анализ, а также способы детерминированного факторного анализа.`,
    tip: `Отработайте способ цепных подстановок и абсолютных разниц на двух- и трёхфакторных моделях; проверяйте баланс влияний.`,
    concepts: [
      [`Сравнение`, `Базовый приём анализа: факт сопоставляют с планом, прошлым периодом, нормативом, конкурентами или средним по отрасли.`],
      [`Горизонтальный анализ`, `Изучение динамики: абсолютные изменения статей и темпы их роста за ряд периодов.`],
      [`Вертикальный анализ`, `Изучение структуры: доля каждой статьи в итоговом показателе (например, в валюте баланса).`],
      [`Трендовый и коэффициентный анализ`, `Трендовый — выявление устойчивой тенденции за несколько лет; коэффициентный — расчёт отношений между показателями.`],
      [`Группировка`, `Деление совокупности на однородные группы по признаку — помогает увидеть структуру и связи.`],
      [`Балансовый метод`, `Сопоставление взаимосвязанных показателей, итоги которых должны быть равны (например, ресурсы = их использование).`],
      [`Детерминированный факторный анализ`, `Изучение функциональных связей. Модели: аддитивные (y = a + b), мультипликативные (y = a·b), кратные (y = a / b) и смешанные.`],
      [`Цепные подстановки`, `Последовательная замена базисных значений факторов фактическими; сначала заменяют количественные факторы, затем качественные.`],
      [`Стохастический анализ`, `Изучение вероятностных связей методами корреляции и регрессии.`]
    ],
    formulas: [
      [`Абсолютное отклонение`, `Δ = Показатель₁ − Показатель₀`, `Индекс 1 — отчётный период, 0 — базисный.`],
      [`Темп роста и прироста`, `Tр = П₁ / П₀ × 100%;  Tпр = Tр − 100%`, `Темп прироста показывает изменение, темп роста — соотношение уровней.`],
      [`Удельный вес`, `d = Часть / Целое × 100%`, `Основа вертикального анализа.`],
      [`Цепные подстановки (y = a·b)`, `Δy(a) = a₁·b₀ − a₀·b₀;  Δy(b) = a₁·b₁ − a₁·b₀`, `Сумма влияний равна общему отклонению Δy.`],
      [`Абсолютные разницы (y = a·b)`, `Δy(a) = Δa · b₀;  Δy(b) = a₁ · Δb`, `Сокращённая форма цепных подстановок для мультипликативных моделей.`]
    ],
    example: { title: `Выручка = Численность × Выработка`, steps: [
      `База: 100 чел × 50 млн сум = 5 000 млн сум. Отчёт: 110 чел × 52 млн сум = 5 720 млн сум. Общее отклонение +720.`,
      `Влияние численности: (110 − 100) × 50 = +500 млн сум.`,
      `Влияние выработки: 110 × (52 − 50) = +220 млн сум.`,
      `Проверка: 500 + 220 = 720 — баланс влияний сходится.`],
      result: `Рост выручки на 69% обеспечен расширением штата (экстенсивный фактор) и на 31% — ростом производительности (интенсивный).` },
    pitfalls: [`Нарушать порядок подстановки: сначала количественный фактор, затем качественный.`, `Не проверять, что сумма влияний равна общему отклонению.`, `Путать темп роста (110%) с темпом прироста (10%).`],
    summary: `Метод анализа — это путь от «что изменилось» (сравнение) к «почему изменилось» (факторный анализ).`
  },
  en: {
    title: `Methods of economic analysis`,
    lead: `Comparison, grouping and data processing techniques, horizontal and vertical analysis, and methods of deterministic factor analysis.`,
    tip: `Practise chain substitution and absolute differences on two- and three-factor models; always check that the factor effects add up.`,
    concepts: [
      [`Comparison`, `The basic technique: actuals are compared with plan, the previous period, standards, competitors or the industry average.`],
      [`Horizontal analysis`, `Studying change over time: absolute changes in items and their growth rates across periods.`],
      [`Vertical analysis`, `Studying structure: each item’s share of a total (for example, of total assets).`],
      [`Trend and ratio analysis`, `Trend analysis reveals a stable direction over several years; ratio analysis calculates relationships between indicators.`],
      [`Grouping`, `Splitting a population into homogeneous groups by a feature — reveals structure and relationships.`],
      [`Balance method`, `Comparing linked indicators whose totals must match (e.g. resources = their uses).`],
      [`Deterministic factor analysis`, `Studying functional relationships. Models: additive (y = a + b), multiplicative (y = a·b), ratio (y = a / b) and mixed.`],
      [`Chain substitution`, `Replacing base values of factors with actual ones one by one; quantitative factors first, qualitative ones after.`],
      [`Stochastic analysis`, `Studying probabilistic relationships with correlation and regression.`]
    ],
    formulas: [
      [`Absolute change`, `Δ = Value₁ − Value₀`, `Index 1 is the reporting period, 0 the base period.`],
      [`Growth rate and rate of increase`, `G = V₁ / V₀ × 100%;  ΔG = G − 100%`, `The rate of increase shows the change; the growth rate shows the ratio of levels.`],
      [`Share`, `d = Part / Whole × 100%`, `The basis of vertical analysis.`],
      [`Chain substitution (y = a·b)`, `Δy(a) = a₁·b₀ − a₀·b₀;  Δy(b) = a₁·b₁ − a₁·b₀`, `The effects add up to the total change Δy.`],
      [`Absolute differences (y = a·b)`, `Δy(a) = Δa · b₀;  Δy(b) = a₁ · Δb`, `A shortcut form of chain substitution for multiplicative models.`]
    ],
    example: { title: `Revenue = Headcount × Output per employee`, steps: [
      `Base: 100 people × 50 m soums = 5,000 m soums. Actual: 110 × 52 = 5,720 m soums. Total change +720.`,
      `Effect of headcount: (110 − 100) × 50 = +500 m soums.`,
      `Effect of productivity: 110 × (52 − 50) = +220 m soums.`,
      `Check: 500 + 220 = 720 — the effects balance.`],
      result: `69% of the revenue growth came from more staff (an extensive factor) and 31% from higher productivity (an intensive one).` },
    pitfalls: [`Breaking the substitution order: quantitative factor first, qualitative second.`, `Not checking that the factor effects add up to the total change.`, `Confusing a growth rate (110%) with a rate of increase (10%).`],
    summary: `Analytical method moves from “what changed” (comparison) to “why it changed” (factor analysis).`
  }
},
/* 3 ─────────────────────────────────────────────────────────────────────── */
{
  id: `info`, n: 3, icon: `scroll`, lectures: [[3, `2026-09-23`]], practices: [[3, `2026-09-29`]],
  ru: {
    title: `Информационная система и бухгалтерский баланс`,
    lead: `Источники информации для анализа, требования к ним и роль бухгалтерского баланса как главного источника данных об имуществе и капитале.`,
    tip: `Повторите структуру актива и пассива баланса и потренируйтесь в вертикальном и горизонтальном анализе статей.`,
    concepts: [
      [`Источники информации`, `Нормативно-плановые (планы, нормы, сметы), учётные (бухгалтерский, статистический, оперативный учёт и отчётность) и внеучётные (договоры, аудит, рыночные данные).`],
      [`Требования к информации`, `Достоверность, полнота, своевременность, сопоставимость (единая методика и оценка), аналитичность и экономичность получения.`],
      [`Бухгалтерский баланс`, `Отчёт об имуществе (актив) и источниках его формирования (пассив) на определённую дату — основа анализа финансового состояния.`],
      [`Актив`, `Долгосрочные (внеоборотные) активы — основные средства, НМА, долгосрочные вложения; текущие (оборотные) — запасы, дебиторская задолженность, денежные средства, краткосрочные вложения.`],
      [`Пассив`, `Собственный капитал (уставный, резервный капитал, нераспределённая прибыль) и обязательства — долгосрочные и текущие.`],
      [`Сравнительный аналитический баланс`, `Таблица, объединяющая горизонтальный и вертикальный анализ: суммы на начало и конец, изменения, доли и изменения долей.`],
      [`Признаки «хорошего» баланса`, `Рост валюты баланса, опережающий рост оборотных активов, собственный капитал больше заёмного, сопоставимые темпы роста дебиторской и кредиторской задолженности, отсутствие непокрытого убытка.`]
    ],
    formulas: [
      [`Балансовое равенство`, `Актив = Собственный капитал + Обязательства`, `Валюта баланса — итог актива (он же итог пассива).`],
      [`Доля статьи`, `d = Статья / Валюта баланса × 100%`, `Вертикальный анализ структуры имущества и капитала.`],
      [`Изменение доли`, `Δd = d₁ − d₀ (п.п.)`, `Изменение структуры измеряется в процентных пунктах, а не в процентах.`]
    ],
    example: { title: `Вертикальный анализ актива`, steps: [
      `Валюта баланса 10 000 млн сум; основные средства 6 000; запасы 2 000; дебиторская задолженность 1 500; денежные средства 500.`,
      `Доли: ОС 60%, запасы 20%, дебиторка 15%, деньги 5%.`,
      `Через год ОС 6 200 при валюте 12 400 → доля 50%: снижение на 10 п.п., хотя сумма ОС выросла.`],
      result: `Структура показывает то, чего не видно в абсолютных цифрах: имущество становится мобильнее.` },
    pitfalls: [`Путать актив (во что вложено) и пассив (откуда средства).`, `Измерять изменение доли в процентах вместо процентных пунктов.`, `Сравнивать периоды, оценённые по разной методике, — нарушается сопоставимость.`],
    summary: `Баланс — фотография предприятия на дату; анализ превращает два снимка в историю изменений.`
  },
  en: {
    title: `Information system and the balance sheet`,
    lead: `Sources of information for analysis, the requirements they must meet, and the balance sheet as the main source of data on assets and capital.`,
    tip: `Revisit the structure of assets and equity & liabilities and practise vertical and horizontal analysis of balance-sheet items.`,
    concepts: [
      [`Information sources`, `Planning and normative (plans, standards, budgets), accounting (financial, statistical and operational records and reports) and non-accounting (contracts, audits, market data).`],
      [`Information requirements`, `Reliability, completeness, timeliness, comparability (same methods and valuation), analytical usefulness and cost-efficiency.`],
      [`Balance sheet`, `A statement of what the company owns (assets) and where the funding came from (equity and liabilities) at a given date — the basis of financial-position analysis.`],
      [`Assets`, `Non-current — fixed assets, intangibles, long-term investments; current — inventory, receivables, cash, short-term investments.`],
      [`Equity and liabilities`, `Equity (share capital, reserves, retained earnings) and liabilities — long-term and current.`],
      [`Comparative analytical balance sheet`, `A table combining horizontal and vertical analysis: opening and closing amounts, changes, shares and changes in shares.`],
      [`Signs of a “healthy” balance sheet`, `Growing total assets, current assets growing faster, equity larger than borrowings, receivables and payables growing at similar rates, no uncovered losses.`]
    ],
    formulas: [
      [`Accounting equation`, `Assets = Equity + Liabilities`, `The balance-sheet total is the sum of assets (equal to the sum of equity and liabilities).`],
      [`Item share`, `d = Item / Balance-sheet total × 100%`, `Vertical analysis of the structure of assets and capital.`],
      [`Change in share`, `Δd = d₁ − d₀ (percentage points)`, `Structural change is measured in percentage points, not per cent.`]
    ],
    example: { title: `Vertical analysis of assets`, steps: [
      `Total assets 10,000 m soums; fixed assets 6,000; inventory 2,000; receivables 1,500; cash 500.`,
      `Shares: fixed assets 60%, inventory 20%, receivables 15%, cash 5%.`,
      `A year later fixed assets are 6,200 with a total of 12,400 → 50%: down 10 p.p., even though the amount grew.`],
      result: `Structure reveals what absolute figures hide: the asset base is becoming more liquid.` },
    pitfalls: [`Confusing assets (where money is invested) with equity and liabilities (where it came from).`, `Measuring a change in share in per cent instead of percentage points.`, `Comparing periods valued with different methods — comparability is lost.`],
    summary: `A balance sheet is a snapshot; analysis turns two snapshots into a story of change.`
  }
},
/* 4 ─────────────────────────────────────────────────────────────────────── */
{
  id: `potential`, n: 4, icon: `mountain`, lectures: [[4, `2026-09-30`]], practices: [[4, `2026-10-06`]],
  ru: {
    title: `Экономический потенциал предприятия`,
    lead: `Из каких ресурсов складывается потенциал предприятия, как оценить степень его использования и где искать резервы роста.`,
    tip: `Выпишите составляющие экономического потенциала и для каждой — показатель, которым оценивают её использование.`,
    concepts: [
      [`Экономический потенциал`, `Совокупная способность предприятия производить продукцию и получать доход при имеющихся ресурсах и условиях.`],
      [`Составляющие`, `Производственный (основные средства, мощности), трудовой (персонал), финансовый (капитал), инновационный и интеллектуальный (НМА, НИОКР), природно-ресурсный (земля, недра), рыночный и информационный.`],
      [`Производственная мощность`, `Максимально возможный выпуск продукции за период при полном использовании оборудования и площадей.`],
      [`Использование потенциала`, `Сопоставление фактических результатов с возможными: коэффициент использования мощности, загрузка оборудования, выработка.`],
      [`Экстенсивное и интенсивное развитие`, `Экстенсивное — рост за счёт количества ресурсов; интенсивное — за счёт их эффективности (отдачи).`],
      [`Резервы роста`, `Разрыв между потенциально возможным и фактическим результатом; выявляется по каждой составляющей потенциала.`]
    ],
    formulas: [
      [`Коэффициент использования мощности`, `Kм = Выпуск фактический / Производственная мощность`, `Значение ниже 1 показывает недоиспользование; резерв = Мощность − Выпуск.`],
      [`Экстенсивная и интенсивная загрузка`, `Kэкст = Время фактическое / Время возможное;  Kинт = Выработка фактическая / Выработка возможная`, `Интегральная загрузка = Kэкст × Kинт.`]
    ],
    example: { title: `Резерв по мощности`, steps: [
      `Мощность цеха 12 000 изделий в год; фактический выпуск 9 600.`,
      `Kм = 9 600 / 12 000 = 0,80 — мощность используется на 80%.`,
      `Резерв роста выпуска — 2 400 изделий без новых капитальных вложений.`],
      result: `Прежде чем покупать новое оборудование, нужно загрузить существующее.` },
    pitfalls: [`Оценивать потенциал только стоимостью имущества, без оценки его использования.`, `Путать производственную мощность с фактическим выпуском.`, `Игнорировать нематериальные составляющие — знания, бренд, технологии.`],
    summary: `Потенциал — это «сколько можно», результат — «сколько получилось»; анализ ищет разницу.`
  },
  en: {
    title: `Economic potential of the enterprise`,
    lead: `Which resources make up a company’s potential, how to assess how fully it is used, and where to look for growth reserves.`,
    tip: `List the components of economic potential and, for each, the indicator that measures how well it is used.`,
    concepts: [
      [`Economic potential`, `The company’s overall capacity to produce output and earn income with its resources and conditions.`],
      [`Components`, `Production (fixed assets, capacity), labour (staff), financial (capital), innovation and intellectual (intangibles, R&D), natural resources (land, minerals), market and information.`],
      [`Production capacity`, `The maximum possible output in a period with full use of equipment and floor space.`],
      [`Utilisation of potential`, `Comparing actual results with possible ones: capacity utilisation, equipment loading, output per worker.`],
      [`Extensive vs intensive growth`, `Extensive — growth through more resources; intensive — through better efficiency of resources.`],
      [`Growth reserves`, `The gap between the potential and the actual result, identified for each component.`]
    ],
    formulas: [
      [`Capacity utilisation`, `Ku = Actual output / Production capacity`, `Below 1 means under-use; reserve = Capacity − Output.`],
      [`Extensive and intensive loading`, `Kext = Actual time / Available time;  Kint = Actual rate / Possible rate`, `Integral loading = Kext × Kint.`]
    ],
    example: { title: `Capacity reserve`, steps: [
      `Workshop capacity is 12,000 units a year; actual output 9,600.`,
      `Ku = 9,600 / 12,000 = 0.80 — capacity is 80% used.`,
      `Reserve: 2,400 more units without new capital spending.`],
      result: `Before buying new equipment, load the equipment you already have.` },
    pitfalls: [`Judging potential only by the value of assets, not by how they are used.`, `Confusing production capacity with actual output.`, `Ignoring intangible components — knowledge, brand, technology.`],
    summary: `Potential is “what is possible”, results are “what happened”; analysis studies the gap.`
  }
},
/* 5 ─────────────────────────────────────────────────────────────────────── */
{
  id: `fixed`, n: 5, icon: `cog`, lectures: [[5, `2026-10-05`]], practices: [[5, `2026-10-13`]],
  ru: {
    title: `Основные средства`,
    lead: `Состав, состояние, движение и эффективность использования основных средств — фондоотдача, фондоёмкость, фондовооружённость.`,
    tip: `Запомните базу каждого коэффициента движения: обновление — к ОС на конец года, выбытие — к ОС на начало.`,
    concepts: [
      [`Основные средства`, `Средства труда, используемые дольше года и переносящие стоимость на продукцию частями через амортизацию.`],
      [`Активная и пассивная часть`, `Активная — машины, оборудование, транспорт, непосредственно воздействующие на продукт; пассивная — здания и сооружения, создающие условия.`],
      [`Состояние`, `Оценивается коэффициентами износа и годности: какая часть стоимости уже перенесена на продукцию.`],
      [`Движение`, `Оценивается коэффициентами обновления, выбытия и прироста.`],
      [`Фондоотдача`, `Сколько продукции (выручки) приходится на один сум среднегодовой стоимости основных средств — главный показатель эффективности.`],
      [`Фондоёмкость`, `Обратный показатель: сколько основных средств нужно на один сум продукции.`],
      [`Фондовооружённость`, `Стоимость основных средств на одного работника — техническая оснащённость труда.`]
    ],
    formulas: [
      [`Коэффициент обновления`, `Kобн = ОС поступившие / ОС на конец года`, ``],
      [`Коэффициент выбытия`, `Kвыб = ОС выбывшие / ОС на начало года`, ``],
      [`Коэффициент износа и годности`, `Kизн = Накопленная амортизация / Первоначальная стоимость;  Kгод = 1 − Kизн`, ``],
      [`Фондоотдача и фондоёмкость`, `ФО = Выручка / Среднегодовая стоимость ОС;  ФЕ = 1 / ФО`, `Среднегодовая стоимость упрощённо = (ОС нач + ОС кон) / 2.`],
      [`Фондовооружённость`, `ФВ = Среднегодовая стоимость ОС / Численность`, `Связь: Выработка = ФО × ФВ.`],
      [`Фондорентабельность`, `R = Прибыль / Среднегодовая стоимость ОС × 100%`, ``]
    ],
    example: { title: `Движение и отдача основных средств`, steps: [
      `ОС на начало 5 000, поступило 800, выбыло 300, на конец 5 500 млн сум.`,
      `Kобн = 800 / 5 500 = 14,5%; Kвыб = 300 / 5 000 = 6,0% — парк обновляется быстрее, чем выбывает.`,
      `Выручка 11 000; среднегодовая стоимость (5 000 + 5 500) / 2 = 5 250 → ФО = 2,10 сум на сум ОС.`],
      result: `Обновление опережает выбытие, каждый сум фондов приносит 2,1 сума выручки.` },
    pitfalls: [`Делить поступившие ОС на стоимость на начало года (правильно — на конец).`, `Путать фондоотдачу и фондоёмкость.`, `Считать рост фондовооружённости успехом, если выработка не растёт.`],
    summary: `Не так важно, сколько у предприятия фондов, как то, сколько продукции они приносят.`
  },
  en: {
    title: `Fixed assets`,
    lead: `The composition, condition, movement and efficiency of fixed assets — asset turnover, capital intensity, capital per worker.`,
    tip: `Remember the base of each movement ratio: renewal against the closing value, retirement against the opening value.`,
    concepts: [
      [`Fixed assets`, `Means of labour used for more than a year that transfer their value to products gradually through depreciation.`],
      [`Active and passive part`, `Active — machinery, equipment, vehicles that act on the product directly; passive — buildings and structures that provide conditions.`],
      [`Condition`, `Measured by the wear and serviceability ratios: how much of the value has already been transferred to output.`],
      [`Movement`, `Measured by the renewal, retirement and growth ratios.`],
      [`Asset turnover (fondootdacha)`, `Output (revenue) per soum of average fixed assets — the key efficiency indicator.`],
      [`Capital intensity`, `The inverse: fixed assets needed per soum of output.`],
      [`Capital per worker`, `Fixed assets per employee — the technical equipment of labour.`]
    ],
    formulas: [
      [`Renewal ratio`, `Kren = Assets added / Closing fixed assets`, ``],
      [`Retirement ratio`, `Kret = Assets retired / Opening fixed assets`, ``],
      [`Wear and serviceability`, `Kwear = Accumulated depreciation / Original cost;  Kserv = 1 − Kwear`, ``],
      [`Asset turnover and capital intensity`, `AT = Revenue / Average fixed assets;  CI = 1 / AT`, `Average value, simplified = (Opening + Closing) / 2.`],
      [`Capital per worker`, `CW = Average fixed assets / Headcount`, `Link: Output per worker = AT × CW.`],
      [`Return on fixed assets`, `R = Profit / Average fixed assets × 100%`, ``]
    ],
    example: { title: `Movement and return on fixed assets`, steps: [
      `Opening 5,000, added 800, retired 300, closing 5,500 m soums.`,
      `Kren = 800 / 5,500 = 14.5%; Kret = 300 / 5,000 = 6.0% — the fleet renews faster than it retires.`,
      `Revenue 11,000; average value (5,000 + 5,500) / 2 = 5,250 → AT = 2.10.`],
      result: `Renewal outpaces retirement, and each soum of assets brings 2.1 soums of revenue.` },
    pitfalls: [`Dividing additions by the opening value (it should be the closing value).`, `Confusing asset turnover with capital intensity.`, `Celebrating higher capital per worker when output per worker does not rise.`],
    summary: `What matters is not how many assets a company has, but how much output they generate.`
  }
},
/* 6 ─────────────────────────────────────────────────────────────────────── */
{
  id: `intangible`, n: 6, icon: `sparkle`, lectures: [[6, `2026-10-07`]], practices: [[6, `2026-10-20`]],
  ru: {
    title: `Нематериальные активы`,
    lead: `Что относится к нематериальным активам, как их амортизируют и какими показателями оценивают их состояние и отдачу.`,
    tip: `Проверьте себя на критериях признания НМА и потренируйтесь в расчёте амортизации и отдачи НМА.`,
    concepts: [
      [`Нематериальные активы`, `Объекты без физической формы, используемые дольше 12 месяцев, способные приносить доход, контролируемые предприятием и идентифицируемые.`],
      [`Состав`, `Патенты, лицензии, товарные знаки, программы для ЭВМ и базы данных, авторские права, ноу-хау; деловая репутация (гудвилл) учитывается особо — только при покупке бизнеса.`],
      [`Что не является НМА`, `Квалификация персонала, расходы на подготовку кадров, внутренняя деловая репутация — их нельзя отделить и контролировать.`],
      [`Амортизация НМА`, `Стоимость переносится на расходы в течение срока полезного использования, чаще всего линейным способом.`],
      [`Показатели анализа`, `Доля НМА в активах (инновационность), коэффициенты обновления и износа, отдача и рентабельность НМА.`]
    ],
    formulas: [
      [`Линейная амортизация`, `A = Первоначальная стоимость / Срок полезного использования`, ``],
      [`Коэффициент износа НМА`, `Kизн = Накопленная амортизация / Первоначальная стоимость`, ``],
      [`Отдача НМА`, `О = Выручка / Среднегодовая стоимость НМА`, ``],
      [`Рентабельность НМА`, `R = Прибыль / Среднегодовая стоимость НМА × 100%`, ``],
      [`Доля НМА`, `d = НМА / Внеоборотные (или все) активы × 100%`, `Растущая доля — признак инновационной модели.`]
    ],
    example: { title: `Лицензия на программу`, steps: [
      `Лицензия куплена за 120 млн сум на 5 лет.`,
      `Ежегодная амортизация: 120 / 5 = 24 млн сум.`,
      `Через 2 года: накопленная амортизация 48, остаточная стоимость 72, износ 40%.`],
      result: `Остаточная стоимость показывает, какая часть «будущей пользы» ещё не использована.` },
    pitfalls: [`Относить к НМА квалификацию сотрудников.`, `Забывать про амортизацию и завышать стоимость активов.`, `Оценивать НМА только по стоимости, без отдачи.`],
    summary: `Ценность нематериальных активов — не в балансовой стоимости, а в доходе, который они создают.`
  },
  en: {
    title: `Intangible assets`,
    lead: `What counts as an intangible asset, how intangibles are amortised and which indicators measure their condition and return.`,
    tip: `Test yourself on the recognition criteria and practise calculating amortisation and the return on intangibles.`,
    concepts: [
      [`Intangible assets`, `Items without physical form, used for more than 12 months, able to generate income, controlled by the company and identifiable.`],
      [`Composition`, `Patents, licences, trademarks, software and databases, copyrights, know-how; goodwill is treated separately — only when a business is acquired.`],
      [`What is not an intangible`, `Staff skills, training costs, internally generated reputation — they cannot be separated or controlled.`],
      [`Amortisation`, `The cost is expensed over the useful life, most often on a straight-line basis.`],
      [`Indicators`, `Share of intangibles in assets (innovativeness), renewal and wear ratios, return and profitability of intangibles.`]
    ],
    formulas: [
      [`Straight-line amortisation`, `A = Original cost / Useful life`, ``],
      [`Wear ratio`, `Kwear = Accumulated amortisation / Original cost`, ``],
      [`Return on intangibles`, `T = Revenue / Average intangibles`, ``],
      [`Profitability of intangibles`, `R = Profit / Average intangibles × 100%`, ``],
      [`Share of intangibles`, `d = Intangibles / Non-current (or total) assets × 100%`, `A rising share signals an innovation-led model.`]
    ],
    example: { title: `A software licence`, steps: [
      `A licence costs 120 m soums for 5 years.`,
      `Annual amortisation: 120 / 5 = 24 m soums.`,
      `After 2 years: accumulated amortisation 48, carrying amount 72, wear 40%.`],
      result: `The carrying amount shows how much of the “future benefit” is still unused.` },
    pitfalls: [`Treating employee skills as an intangible asset.`, `Forgetting amortisation and overstating assets.`, `Judging intangibles by their cost alone, ignoring their return.`],
    summary: `The value of intangibles lies not in their carrying amount but in the income they create.`
  }
},
/* 7 ─────────────────────────────────────────────────────────────────────── */
{
  id: `working`, n: 7, icon: `refresh`, lectures: [[7, `2026-10-14`]], practices: [[7, `2026-10-27`]],
  ru: {
    title: `Оборотный капитал`,
    lead: `Состав оборотных активов, их оборачиваемость, высвобождение и вовлечение средств, собственный оборотный капитал.`,
    tip: `Решите несколько задач на оборачиваемость и высвобождение средств — обращайте внимание на знак результата.`,
    concepts: [
      [`Оборотные активы`, `Запасы, незавершённое производство, готовая продукция, дебиторская задолженность, краткосрочные вложения и денежные средства; полностью оборачиваются за один цикл.`],
      [`Кругооборот`, `Деньги → запасы → производство → готовая продукция → дебиторская задолженность → деньги.`],
      [`Оборачиваемость`, `Скорость кругооборота: сколько оборотов совершают оборотные средства за период и сколько дней длится один оборот.`],
      [`Высвобождение и вовлечение`, `Ускорение оборачиваемости высвобождает средства из оборота; замедление требует вовлечь дополнительные средства.`],
      [`Собственный оборотный капитал`, `Часть оборотных активов, профинансированная собственными и долгосрочными источниками; запас прочности по ликвидности.`]
    ],
    formulas: [
      [`Коэффициент оборачиваемости`, `Kоб = Выручка / Средний остаток оборотных активов`, ``],
      [`Длительность оборота`, `T = Д / Kоб = Средний остаток × Д / Выручка`, `Д — число дней периода (год — 360, квартал — 90).`],
      [`Коэффициент загрузки`, `Kз = 1 / Kоб`, `Оборотные средства на один сум выручки.`],
      [`Высвобождение (−) / вовлечение (+)`, `ΔОА = (T₁ − T₀) × Выручка₁ / Д`, `Минус — средства высвобождены, плюс — дополнительно вовлечены.`],
      [`Собственный оборотный капитал`, `СОК = Оборотные активы − Краткосрочные обязательства`, `Эквивалентно: СК + Долгосрочные обязательства − Внеоборотные активы.`]
    ],
    example: { title: `Ускорение оборота`, steps: [
      `Выручка 3 600 млн сум, средний остаток оборотных активов 900 → Kоб = 4, T = 360 / 4 = 90 дней.`,
      `В отчётном году при той же выручке длительность сократилась до 80 дней.`,
      `ΔОА = (80 − 90) × 3 600 / 360 = −100 млн сум — средства высвобождены.`],
      result: `Ускорение оборота на 10 дней освободило 100 млн сум без привлечения кредитов.` },
    pitfalls: [`Брать остаток на конец периода вместо среднего.`, `Путать знак: отрицательная величина — это высвобождение (хорошо).`, `Отождествлять собственный оборотный капитал со всеми оборотными активами.`],
    summary: `Быстрый оборот — это бесплатный источник денег.`
  },
  en: {
    title: `Working capital`,
    lead: `The composition of current assets, their turnover, release and tie-up of funds, and net working capital.`,
    tip: `Solve several turnover and release problems — watch the sign of the result.`,
    concepts: [
      [`Current assets`, `Inventory, work in progress, finished goods, receivables, short-term investments and cash; they turn over fully within one cycle.`],
      [`Cycle`, `Cash → inventory → production → finished goods → receivables → cash.`],
      [`Turnover`, `The speed of the cycle: how many times current assets turn over in a period and how many days one turn takes.`],
      [`Release and tie-up`, `Faster turnover releases funds; slower turnover ties up additional funds.`],
      [`Net working capital`, `The part of current assets financed by equity and long-term sources — a liquidity buffer.`]
    ],
    formulas: [
      [`Turnover ratio`, `Kt = Revenue / Average current assets`, ``],
      [`Days per turnover`, `T = D / Kt = Average balance × D / Revenue`, `D is the number of days (year 360, quarter 90).`],
      [`Loading ratio`, `Kl = 1 / Kt`, `Current assets per soum of revenue.`],
      [`Release (−) / tie-up (+)`, `ΔCA = (T₁ − T₀) × Revenue₁ / D`, `Negative — funds released; positive — additional funds tied up.`],
      [`Net working capital`, `NWC = Current assets − Current liabilities`, `Equivalent: Equity + Long-term liabilities − Non-current assets.`]
    ],
    example: { title: `Faster turnover`, steps: [
      `Revenue 3,600 m soums, average current assets 900 → Kt = 4, T = 360 / 4 = 90 days.`,
      `Next year, with the same revenue, the cycle shortened to 80 days.`,
      `ΔCA = (80 − 90) × 3,600 / 360 = −100 m soums — funds released.`],
      result: `Ten days faster released 100 m soums without borrowing.` },
    pitfalls: [`Using the closing balance instead of the average.`, `Misreading the sign: a negative result is a release (good).`, `Equating net working capital with all current assets.`],
    summary: `Fast turnover is a free source of cash.`
  }
},
/* 8 ─────────────────────────────────────────────────────────────────────── */
{
  id: `cadastre`, n: 8, icon: `map`, lectures: [[8, `2026-10-19`]], practices: [[8, `2026-11-03`]],
  ru: {
    title: `Кадастры и их индикаторы`,
    lead: `Кадастр как систематизированный свод сведений о природных ресурсах и недвижимости; индикаторы кадастра и их использование в анализе.`,
    tip: `Сопоставьте виды кадастров с их объектами и разберитесь, чем кадастровая стоимость отличается от рыночной и балансовой.`,
    concepts: [
      [`Кадастр`, `Систематизированный государственный свод сведений об объектах — количественных, качественных, правовых и стоимостных.`],
      [`Виды кадастров`, `Земельный, недвижимости (градостроительный), водный, лесной, кадастр месторождений полезных ископаемых, кадастр животного мира и др.`],
      [`Индикаторы`, `Площадь и границы, категория и разрешённое использование, качество (бонитет почв), местоположение, кадастровая стоимость, правообладатель и обременения.`],
      [`Бонитет почв`, `Оценка плодородия в баллах (лучшие почвы — 100 баллов); используется для сравнения земель и их оценки.`],
      [`Кадастровая стоимость`, `Стоимость, определённая государственной оценкой по единой методике; служит базой для налогов и платежей. Может отличаться от рыночной (цены сделки) и балансовой (учётной).`],
      [`Значение для анализа`, `Оценка природно-ресурсного потенциала, налоговой нагрузки, залоговой базы и инвестиционной привлекательности объекта.`]
    ],
    formulas: [
      [`Кадастровая стоимость участка`, `КС = Площадь × Удельный показатель кадастровой стоимости`, `УПКС — стоимость единицы площади для данной зоны и вида использования.`],
      [`Платёж от кадастровой стоимости`, `Налог = Налоговая база × Ставка`, `Конкретные ставки и базы устанавливаются законодательством.`],
      [`Относительное качество земли`, `Индекс = Балл бонитета участка / Средний балл по району`, `Выше 1 — земля лучше средней.`]
    ],
    example: { title: `Оценка участка`, steps: [
      `Площадь участка 2,5 га, УПКС 40 млн сум за гектар.`,
      `Кадастровая стоимость: 2,5 × 40 = 100 млн сум.`,
      `При условной ставке 1% годовой платёж — 1 млн сум.`],
      result: `Кадастровые сведения переводят природный ресурс в денежную оценку, пригодную для анализа.` },
    pitfalls: [`Путать кадастровую стоимость с рыночной ценой.`, `Считать кадастр только картой — он включает правовые и стоимостные сведения.`, `Сравнивать участки только по площади без учёта качества.`],
    summary: `Кадастр делает ресурс измеримым: где он, сколько его, какого он качества и сколько стоит.`
  },
  en: {
    title: `Cadastres and their indicators`,
    lead: `The cadastre as a systematic register of natural resources and real estate; cadastral indicators and their use in analysis.`,
    tip: `Match types of cadastre to their objects and make sure you can explain how cadastral value differs from market and book value.`,
    concepts: [
      [`Cadastre`, `A systematic state register of information about objects — quantitative, qualitative, legal and value data.`],
      [`Types`, `Land, real estate (urban planning), water, forest, mineral deposits, wildlife and others.`],
      [`Indicators`, `Area and boundaries, category and permitted use, quality (soil rating), location, cadastral value, owner and encumbrances.`],
      [`Soil rating (bonitet)`, `A fertility score in points (the best soils score 100), used to compare and value land.`],
      [`Cadastral value`, `Value set by state assessment using a single method; the base for taxes and charges. It may differ from market value (transaction price) and book value (accounting).`],
      [`Use in analysis`, `Assessing natural-resource potential, tax burden, collateral and the investment appeal of an object.`]
    ],
    formulas: [
      [`Cadastral value of a plot`, `CV = Area × Unit cadastral value`, `Unit value — the value per unit of area for the zone and type of use.`],
      [`Charge based on cadastral value`, `Tax = Tax base × Rate`, `Actual rates and bases are set by law.`],
      [`Relative land quality`, `Index = Plot soil score / District average score`, `Above 1 — better than average.`]
    ],
    example: { title: `Valuing a plot`, steps: [
      `Plot area 2.5 ha, unit cadastral value 40 m soums per hectare.`,
      `Cadastral value: 2.5 × 40 = 100 m soums.`,
      `At an illustrative rate of 1%, the annual charge is 1 m soums.`],
      result: `Cadastral data turn a natural resource into a monetary value usable in analysis.` },
    pitfalls: [`Confusing cadastral value with market price.`, `Thinking a cadastre is just a map — it includes legal and value data.`, `Comparing plots by area alone, ignoring quality.`],
    summary: `A cadastre makes a resource measurable: where it is, how much there is, its quality and its value.`
  }
}
];
