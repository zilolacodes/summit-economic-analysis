/* ==========================================================================
   04 · COURSE CONTENT
   --------------------------------------------------------------------------
   The question bank is pure data. The interface derives every count, topic
   statistic, navigator cell and chart from this block, so questions can be
   added or removed without touching any other part of the application.

   Question shape:
     id, topic (key of TOPICS), diff (easy|medium|hard|expert),
     time (seconds), type (key of I18N.types), correct (0–3),
     ru / en: {
       q        – question text
       ctx      – optional data table { head?: [...], rows: [[...], ...] }
       o        – four options
       ex       – explanation (why the correct answer is right)
       why      – four notes, one per option (the correct option's note
                  says what makes it right)
       trick    – memory device
       mistake  – common exam mistake
       example  – real-world application
       related  – related concept
       takeaway – key takeaway
     }
   ========================================================================== */


const TOPICS = {
  basics:  { ru: `Сущность и классификация`, en: `Concepts & classification`,
             tip: { ru: `Повторите разницу между прибылью и денежным потоком и признаки трёх видов деятельности: операционной, инвестиционной и финансовой.`,
                    en: `Revisit the difference between profit and cash flow, and the defining features of operating, investing and financing activities.` } },
  methods: { ru: `Прямой и косвенный методы`, en: `Direct & indirect methods`,
             tip: { ru: `Потренируйтесь строить операционный поток косвенным методом: проговаривайте знак каждой корректировки и его причину.`,
                    en: `Practise building operating cash flow with the indirect method — say aloud the sign of every adjustment and why.` } },
  method:  { ru: `Методика анализа`, en: `Analysis methodology`,
             tip: { ru: `Разберите несколько отчётов о движении денежных средств, оценивая не итог, а источники денег по видам деятельности.`,
                    en: `Read several cash flow statements focusing on where the money came from by activity, not on the bottom line.` } },
  ratios:  { ru: `Коэффициентный анализ`, en: `Ratio analysis`,
             tip: { ru: `Выпишите формулы коэффициентов ликвидности, достаточности и качества прибыли и для каждого сформулируйте, что значит «меньше 1».`,
                    en: `Write down the liquidity, sufficiency and earnings-quality ratios and state for each what a value below 1 means.` } },
  cycle:   { ru: `Операционный и финансовый циклы`, en: `Operating & cash cycles`,
             tip: { ru: `Нарисуйте временную шкалу «закупка → склад → продажа → оплата» и отметьте на ней операционный и финансовый циклы.`,
                    en: `Draw the timeline “purchase → stock → sale → collection” and mark the operating and cash conversion cycles on it.` } },
  balance: { ru: `Сбалансированность и оптимизация`, en: `Balance & optimisation`,
             tip: { ru: `Составьте две колонки мер — для дефицита и для избытка денежных средств — и объясните, почему они зеркальны.`,
                    en: `Make two columns of measures — for a cash deficit and for a cash surplus — and explain why they mirror each other.` } },
  models:  { ru: `Модели управления остатком`, en: `Cash balance models`,
             tip: { ru: `Решите 2–3 задачи по модели Баумоля и нарисуйте коридор Миллера–Орра с точкой возврата.`,
                    en: `Solve two or three Baumol problems and sketch the Miller–Orr corridor with its return point.` } },
  value:   { ru: `Свободный поток и оценка`, en: `Free cash flow & valuation`,
             tip: { ru: `Повторите дисконтирование и разберите, из каких составляющих складывается свободный денежный поток.`,
                    en: `Review discounting and break free cash flow down into its components.` } }
};

const QUESTIONS = [
/* ───────────────────────────── EASY ───────────────────────────── */
{
  id: `q01`, topic: `basics`, module: `cashflow`, diff: `easy`, time: 45, type: `scenario`, correct: 1,
  ru: {
    q: `По итогам года компания «Север» отразила чистую прибыль 5 млн сум, однако остаток денежных средств на её счетах за тот же год уменьшился. Какое объяснение наиболее вероятно?`,
    o: [`В расчёте прибыли допущена ошибка: при правильном учёте прибыль и прирост денег совпадают`,
        `Значительная часть выручки признана в доходах, но ещё не оплачена покупателями — выросла дебиторская задолженность`,
        `Компания начислила крупную амортизацию, и эта сумма была списана с расчётного счёта`,
        `Компания получила банковский кредит, а полученные средства уменьшили остаток денег`],
    ex: `Прибыль рассчитывается по принципу начисления: выручка признаётся в момент отгрузки, а не в момент оплаты. Денежный поток, напротив, фиксирует только фактическое движение денег. Если покупатели ещё не заплатили, прибыль в отчёте уже есть, а денег на счёте — нет. Рост дебиторской задолженности — самая частая причина такого разрыва; к ней же относятся рост запасов, капитальные вложения и погашение долгов.`,
    why: [`Прибыль и денежный поток и не должны совпадать: они построены на разных принципах — начисления и кассовом.`,
          `Верно. Рост дебиторской задолженности «замораживает» прибыль в расчётах с покупателями: доход признан, деньги не получены.`,
          `Амортизация — неденежный расход: она уменьшает прибыль, но никаких денег со счёта не списывает.`,
          `Получение кредита — приток денег по финансовой деятельности; остаток бы вырос, а не уменьшился.`],
    trick: `«Прибыль — это мнение, деньги — это факт». Прибыль зависит от правил учёта, остаток на счёте — нет.`,
    mistake: `Отождествлять прибыль с деньгами и считать прибыльную компанию автоматически платёжеспособной.`,
    example: `Строительная компания сдала объект и признала выручку, но заказчик платит через 90 дней. По отчёту она прибыльна, а платить зарплату нечем.`,
    related: `Принцип начисления и кассовый метод; дебиторская задолженность.`,
    takeaway: `Прибыль показывает результат, денежный поток — способность платить. Компании становятся неплатёжеспособными не из-за убытков, а из-за отсутствия денег.`
  },
  en: {
    q: `At year end, Sever Ltd reported a net profit of 5 million soums, yet the cash on its accounts fell over the same year. What is the most likely explanation?`,
    o: [`The profit figure contains an error: with correct accounting, profit and the increase in cash are always equal`,
        `A large share of revenue was recognised but not yet paid by customers — accounts receivable grew`,
        `The company charged heavy depreciation, and that amount was debited from its bank account`,
        `The company took out a bank loan, and the proceeds reduced its cash balance`],
    ex: `Profit is measured on the accrual basis: revenue is recognised when goods are delivered, not when they are paid for. Cash flow records only the actual movement of money. If customers have not paid yet, the profit is already in the report but the cash is not in the bank. Growing receivables are the most common cause of this gap; rising inventory, capital spending and debt repayment are others.`,
    why: [`Profit and cash flow are not supposed to match: they rest on different principles — accrual versus cash.`,
          `Correct. Growing receivables “freeze” profit in customer balances: income is recognised, the money is not yet received.`,
          `Depreciation is a non-cash expense: it reduces profit but takes no money out of the account.`,
          `A loan is a financing inflow; the cash balance would rise, not fall.`],
    trick: `“Profit is an opinion, cash is a fact.” Profit depends on accounting rules; the bank balance does not.`,
    mistake: `Treating profit as cash and assuming a profitable company is automatically solvent.`,
    example: `A construction firm hands over a building and books the revenue, but the client pays in 90 days. On paper it is profitable — yet it cannot pay wages.`,
    related: `Accrual versus cash basis; accounts receivable.`,
    takeaway: `Profit shows the result; cash flow shows the ability to pay. Companies fail not from losses but from running out of cash.`
  }
},
{
  id: `q02`, topic: `basics`, module: `cashflow`, diff: `easy`, time: 45, type: `match`, correct: 2,
  ru: {
    q: `Сопоставьте операции с видами деятельности в отчёте о движении денежных средств: (1) выплата заработной платы персоналу; (2) оплата нового производственного станка; (3) получение долгосрочного банковского кредита.`,
    o: [`1 — операционная, 2 — операционная, 3 — финансовая`,
        `1 — операционная, 2 — финансовая, 3 — инвестиционная`,
        `1 — операционная, 2 — инвестиционная, 3 — финансовая`,
        `1 — финансовая, 2 — инвестиционная, 3 — операционная`],
    ex: `Операционная деятельность — это основная, приносящая выручку работа: расчёты с покупателями, поставщиками, персоналом, бюджетом. Инвестиционная — приобретение и продажа внеоборотных активов и долгосрочных финансовых вложений. Финансовая — привлечение и возврат капитала: кредиты, займы, эмиссия акций, дивиденды. Полезный вопрос: на что эти деньги — на текущую работу, на долгосрочные активы или на расчёты с кредиторами и собственниками?`,
    why: [`Станок служит много лет — это внеоборотный актив, и его покупка является инвестицией, а не текущим расходом.`,
          `Покупка станка не меняет структуру капитала, поэтому это не финансовая операция; кредит же не является инвестицией.`,
          `Верно. Зарплата — текущая операция, станок — долгосрочный актив, кредит — привлечение капитала.`,
          `Зарплата — типичная текущая операция, а получение кредита — классический пример финансовой деятельности.`],
    trick: `«Работаем — строим — занимаем»: операционная (работаем), инвестиционная (строим будущее), финансовая (занимаем и возвращаем).`,
    mistake: `Путать покупку основных средств (инвестиционная) с покупкой сырья (операционная): и то и другое — «покупки», но горизонт разный.`,
    example: `Пекарня: оплата муки — операционная деятельность, покупка новой печи — инвестиционная, кредит на эту печь — финансовая.`,
    related: `Структура отчёта о денежных потоках (НСБУ № 9, МСФО (IAS) 7).`,
    takeaway: `Классификацию определяет экономический смысл операции, а не то, кому уходят деньги.`
  },
  en: {
    q: `Match the transactions to activities in the cash flow statement: (1) paying staff wages; (2) paying for a new production machine; (3) receiving a long-term bank loan.`,
    o: [`1 — operating, 2 — operating, 3 — financing`,
        `1 — operating, 2 — financing, 3 — investing`,
        `1 — operating, 2 — investing, 3 — financing`,
        `1 — financing, 2 — investing, 3 — operating`],
    ex: `Operating activities are the core revenue-generating work: settlements with customers, suppliers, staff and the tax authorities. Investing activities are purchases and disposals of non-current assets and long-term financial investments. Financing activities raise and return capital: loans, borrowings, share issues, dividends. A useful question: is this money for day-to-day work, for long-term assets, or for settling with lenders and owners?`,
    why: [`A machine serves for many years — it is a non-current asset, so buying it is an investment, not a running expense.`,
          `Buying a machine does not change the capital structure, so it is not financing; and a loan is not an investment.`,
          `Correct. Wages are a current transaction, the machine is a long-term asset, the loan raises capital.`,
          `Wages are a typical current transaction, and receiving a loan is the textbook example of financing.`],
    trick: `“Run — build — borrow”: operating (run the business), investing (build the future), financing (borrow and repay).`,
    mistake: `Confusing the purchase of fixed assets (investing) with the purchase of raw materials (operating): both are “purchases”, but the horizon differs.`,
    example: `A bakery: paying for flour is operating, buying a new oven is investing, the loan for that oven is financing.`,
    related: `Structure of the cash flow statement (Uzbek NAS No. 9, IAS 7).`,
    takeaway: `Classification follows the economic substance of a transaction, not who receives the money.`
  }
},
{
  id: `q03`, topic: `methods`, module: `cashflow`, diff: `easy`, time: 45, type: `compare`, correct: 0,
  ru: {
    q: `Чем прямой метод анализа денежных потоков принципиально отличается от косвенного?`,
    o: [`Прямой метод показывает валовые поступления и платежи по статьям, а косвенный выводит операционный поток из чистой прибыли через корректировки`,
        `Прямой метод начинается с чистой прибыли, а косвенный — с выручки от продаж и поступлений от покупателей`,
        `Прямой метод применяется только к инвестиционной деятельности, а косвенный — только к операционной`,
        `Методы дают разную величину чистого операционного потока, поэтому в отчёте указывают, какой из них применён`],
    ex: `Прямой метод отвечает на вопрос «откуда пришли и куда ушли деньги»: поступления от покупателей, платежи поставщикам, персоналу, в бюджет. Он удобен для оперативного управления и прогноза платежей. Косвенный метод отвечает на вопрос «почему прибыль не равна деньгам»: он начинается с чистой прибыли и корректирует её на неденежные статьи и изменения оборотного капитала, связывая отчёт о финансовых результатах с балансом. Итоговый чистый операционный поток у обоих методов одинаков — это два пути к одному числу.`,
    why: [`Верно. Прямой метод раскрывает валовые потоки, косвенный объясняет разрыв между прибылью и деньгами.`,
          `Наоборот: именно косвенный метод начинается с чистой прибыли.`,
          `Оба метода относятся прежде всего к операционной деятельности; инвестиционные и финансовые потоки обычно раскрываются прямо.`,
          `Результат обоих методов совпадает. Если он различается — в расчёте ошибка.`],
    trick: `«Прямой — по кассе, косвенный — по прибыли».`,
    mistake: `Думать, что методы дают разный итоговый операционный поток.`,
    example: `Финансовый директор строит недельный платёжный календарь прямым методом, а кредитный аналитик банка проверяет качество прибыли заёмщика косвенным.`,
    related: `Корректировки косвенного метода; качество прибыли.`,
    takeaway: `Два метода — два взгляда на одну величину: прямой объясняет движение денег, косвенный — разрыв между прибылью и деньгами.`
  },
  en: {
    q: `What is the fundamental difference between the direct and the indirect method of cash flow analysis?`,
    o: [`The direct method shows gross receipts and payments by line item, while the indirect method derives operating cash flow from net profit through adjustments`,
        `The direct method starts from net profit, while the indirect method starts from sales revenue and customer receipts`,
        `The direct method applies only to investing activities, the indirect method only to operating activities`,
        `The two methods give different net operating cash flow, so the report must state which one was used`],
    ex: `The direct method answers “where did the money come from and where did it go”: receipts from customers, payments to suppliers, staff and the budget. It suits day-to-day management and payment forecasting. The indirect method answers “why profit is not cash”: it starts from net profit and adjusts it for non-cash items and changes in working capital, linking the income statement to the balance sheet. Both methods arrive at the same net operating cash flow — two roads to one number.`,
    why: [`Correct. The direct method reveals gross flows; the indirect method explains the gap between profit and cash.`,
          `It is the other way round: the indirect method starts from net profit.`,
          `Both methods concern operating activities first of all; investing and financing flows are usually shown directly.`,
          `Both methods give the same result. If they differ, there is a calculation error.`],
    trick: `“Direct follows the till, indirect follows the profit.”`,
    mistake: `Believing the two methods produce different operating cash flow.`,
    example: `A CFO builds a weekly payment calendar with the direct method, while a bank’s credit analyst tests a borrower’s earnings quality with the indirect one.`,
    related: `Indirect-method adjustments; earnings quality.`,
    takeaway: `Two methods, two views of one figure: the direct explains the movement of cash, the indirect explains the gap between profit and cash.`
  }
},
{
  id: `q04`, topic: `methods`, module: `cashflow`, diff: `easy`, time: 45, type: `concept`, correct: 3,
  ru: {
    q: `Почему при расчёте операционного денежного потока косвенным методом амортизацию прибавляют к чистой прибыли?`,
    o: [`Потому что амортизация — это поступление денег от продажи изношенного оборудования`,
        `Чтобы заранее учесть будущие платежи на замену изношенного оборудования`,
        `Потому что начисление амортизации увеличивает выручку предприятия за период`,
        `Потому что это неденежный расход: он уменьшил прибыль, но деньги в этом периоде не уходили`],
    ex: `Деньги за основное средство уходят один раз — в момент покупки, и это отражается в инвестиционной деятельности. Затем стоимость актива постепенно переносится на расходы через амортизацию: прибыль уменьшается, а оттока денег нет. Поэтому амортизацию «возвращают» к прибыли. Важно: сама амортизация денег не создаёт — она лишь не забирает их. Реальный денежный эффект у неё косвенный — через уменьшение налога на прибыль (налоговый щит).`,
    why: [`Продажа основных средств — операция инвестиционной деятельности, она отражается отдельно и с амортизацией не связана.`,
          `Будущая замена оборудования здесь ни при чём: корректировка устраняет неденежный характер уже признанного расхода.`,
          `Амортизация — расход, а не доход; на выручку она не влияет.`,
          `Верно. Расход признан в прибыли, но денежного оттока в периоде не было, поэтому его прибавляют обратно.`],
    trick: `«Амортизация — расход на бумаге, а не из кошелька».`,
    mistake: `Говорить, что «амортизация — источник денег». Она увеличивает поток только в расчёте; реальный эффект — налоговая экономия.`,
    example: `Таксопарк купил автомобиль за 150 млн сум и списывает по 30 млн сум в год. Прибыль каждый год меньше на 30 млн, но со счёта эти деньги не уходят.`,
    related: `Налоговый щит амортизации; показатель EBITDA.`,
    takeaway: `В косвенном методе к прибыли прибавляют все неденежные расходы и вычитают неденежные доходы — так от прибыли переходят к деньгам.`
  },
  en: {
    q: `Why is depreciation added back to net profit when operating cash flow is calculated with the indirect method?`,
    o: [`Because depreciation is cash received from selling worn-out equipment`,
        `To provide in advance for future payments to replace worn-out equipment`,
        `Because charging depreciation increases the company’s revenue for the period`,
        `Because it is a non-cash expense: it reduced profit, but no cash left the business in the period`],
    ex: `Cash for a fixed asset leaves once — at purchase — and that is shown under investing activities. The asset’s cost is then spread over expenses through depreciation: profit falls, but no cash flows out. So depreciation is “added back” to profit. Note: depreciation itself creates no cash — it simply takes none away. Its only real cash effect is indirect, through lower income tax (the tax shield).`,
    why: [`Selling fixed assets is an investing transaction, shown separately and unrelated to depreciation.`,
          `Future replacement is irrelevant: the adjustment removes the non-cash nature of an expense already recognised.`,
          `Depreciation is an expense, not income; it does not affect revenue.`,
          `Correct. The expense was recognised in profit, but no cash left in the period, so it is added back.`],
    trick: `“Depreciation is spent on paper, not from the wallet.”`,
    mistake: `Saying that “depreciation is a source of cash”. It raises cash flow only in the calculation; the real effect is the tax saving.`,
    example: `A taxi fleet buys a car for 150 million soums and depreciates it by 30 million a year. Each year profit is 30 million lower, but that money never leaves the account.`,
    related: `Depreciation tax shield; EBITDA.`,
    takeaway: `In the indirect method, all non-cash expenses are added to profit and all non-cash income is subtracted — that is how profit becomes cash.`
  }
},
{
  id: `q05`, topic: `value`, module: `cashflow`, diff: `easy`, time: 45, type: `concept`, correct: 1,
  ru: {
    q: `Что показывает свободный денежный поток (Free Cash Flow, FCF) компании?`,
    o: [`Весь остаток денежных средств на расчётных счетах и в кассе на конец периода`,
        `Деньги, которые остаются от операционной деятельности после капитальных вложений, необходимых для поддержания и развития бизнеса`,
        `Чистую прибыль, которая остаётся в распоряжении компании после выплаты дивидендов`,
        `Сумму всех поступлений денежных средств по всем видам деятельности за период`],
    ex: `В упрощённом виде FCF = операционный денежный поток − капитальные вложения. Это деньги, которыми компания может распоряжаться свободно: выплатить дивиденды, погасить долг, выкупить акции или накопить резерв. Именно свободный денежный поток лежит в основе оценки бизнеса методом дисконтированных денежных потоков (DCF).`,
    why: [`Остаток — моментная величина (запас), а FCF — поток за период. Это разные по природе показатели.`,
          `Верно. «Свободный» означает: после того, как бизнес профинансировал необходимые инвестиции в себя.`,
          `Прибыль — не деньги, а дивиденды как раз выплачиваются из свободного денежного потока.`,
          `Валовые поступления без учёта оттоков ничего не говорят о том, сколько денег свободно.`],
    trick: `«Свободный — значит, после всех обязательных инвестиций».`,
    mistake: `Путать остаток денежных средств (величину на дату) с денежным потоком (величиной за период).`,
    example: `Розничная сеть: операционный поток 10 млрд сум, вложения в новые магазины 7 млрд → FCF = 3 млрд, из них можно выплачивать дивиденды.`,
    related: `Оценка бизнеса методом дисконтированных денежных потоков (DCF).`,
    takeaway: `Не все деньги от операций свободны: сначала бизнес должен инвестировать в себя.`
  },
  en: {
    q: `What does a company’s free cash flow (FCF) show?`,
    o: [`The entire balance of cash in bank accounts and on hand at the end of the period`,
        `The cash left from operating activities after the capital expenditure needed to maintain and grow the business`,
        `Net profit remaining at the company’s disposal after dividends have been paid`,
        `The sum of all cash receipts across all activities for the period`],
    ex: `In simplified form, FCF = operating cash flow − capital expenditure. It is money the company can use freely: pay dividends, repay debt, buy back shares or build a reserve. Free cash flow is the foundation of business valuation by the discounted cash flow (DCF) method.`,
    why: [`A balance is a point-in-time stock; FCF is a flow over a period. They are different in nature.`,
          `Correct. “Free” means after the business has funded the investment it needs in itself.`,
          `Profit is not cash, and dividends are actually paid out of free cash flow.`,
          `Gross receipts without outflows say nothing about how much cash is free.`],
    trick: `“Free means after all the necessary investment.”`,
    mistake: `Confusing a cash balance (a value at a date) with a cash flow (a value over a period).`,
    example: `A retailer: operating cash flow 10 billion soums, new-store spending 7 billion → FCF = 3 billion, from which dividends can be paid.`,
    related: `Discounted cash flow (DCF) valuation.`,
    takeaway: `Not all operating cash is free: the business must invest in itself first.`
  }
},

/* ──────────────────────────── MEDIUM ──────────────────────────── */
{
  id: `q06`, topic: `methods`, module: `cashflow`, diff: `medium`, time: 90, type: `calc`, correct: 2,
  ru: {
    q: `Рассчитайте чистый денежный поток от операционной деятельности косвенным методом по данным за год.`,
    ctx: { head: [`Показатель`, `тыс. сум`], rows: [[`Чистая прибыль`, `800`], [`Амортизация`, `200`], [`Прирост дебиторской задолженности`, `150`], [`Прирост запасов`, `50`], [`Прирост кредиторской задолженности`, `100`]] },
    o: [`1 300 тыс. сум`, `700 тыс. сум`, `900 тыс. сум`, `1 000 тыс. сум`],
    ex: `800 + 200 − 150 − 50 + 100 = 900 тыс. сум Логика знаков: рост активов (дебиторской задолженности, запасов) поглощает деньги — его вычитают; рост пассивов (кредиторской задолженности) означает, что мы ещё не заплатили и деньги остались у нас, — его прибавляют. Амортизация прибавляется как неденежный расход.`,
    why: [`Все изменения просто прибавлены. Но рост дебиторки и запасов поглощает деньги и должен вычитаться.`,
          `Рост кредиторской задолженности вычтен — знак неверный: отсрочка платежа поставщикам сохраняет деньги.`,
          `Верно: 800 + 200 − 150 − 50 + 100 = 900.`,
          `Учтены только прибыль и амортизация, а изменение оборотного капитала проигнорировано — хотя именно оно чаще всего объясняет разрыв.`],
    trick: `«Актив растёт — деньги уходят; пассив растёт — деньги приходят».`,
    mistake: `Перепутать знак изменения кредиторской задолженности.`,
    example: `Дистрибьютор, наращивающий продажи с отсрочкой платежа, может показывать растущую прибыль и падающий операционный поток — банк видит это именно через косвенный метод.`,
    related: `Чистый оборотный капитал; финансовый цикл.`,
    takeaway: `Косвенный метод — это мост: прибыль ± неденежные статьи ± изменение оборотного капитала = операционный денежный поток.`
  },
  en: {
    q: `Calculate net cash flow from operating activities using the indirect method for the year.`,
    ctx: { head: [`Item`, `UZS thousand`], rows: [[`Net profit`, `800`], [`Depreciation`, `200`], [`Increase in accounts receivable`, `150`], [`Increase in inventory`, `50`], [`Increase in accounts payable`, `100`]] },
    o: [`UZS 1,300 thousand`, `UZS 700 thousand`, `UZS 900 thousand`, `UZS 1,000 thousand`],
    ex: `800 + 200 − 150 − 50 + 100 = 900 thousand. The logic of signs: an increase in assets (receivables, inventory) absorbs cash — subtract it; an increase in liabilities (payables) means we have not paid yet and kept the cash — add it. Depreciation is added back as a non-cash expense.`,
    why: [`Every change was simply added. But rising receivables and inventory absorb cash and must be subtracted.`,
          `The increase in payables was subtracted — wrong sign: delaying payment to suppliers keeps cash in the business.`,
          `Correct: 800 + 200 − 150 − 50 + 100 = 900.`,
          `Only profit and depreciation were used; the change in working capital was ignored — yet it usually explains the gap.`],
    trick: `“Asset up — cash out; liability up — cash in.”`,
    mistake: `Getting the sign of the change in accounts payable wrong.`,
    example: `A distributor growing credit sales can show rising profit and falling operating cash flow — a bank sees this precisely through the indirect method.`,
    related: `Net working capital; cash conversion cycle.`,
    takeaway: `The indirect method is a bridge: profit ± non-cash items ± change in working capital = operating cash flow.`
  }
},
{
  id: `q07`, topic: `method`, module: `cashflow`, diff: `medium`, time: 75, type: `order`, correct: 3,
  ru: {
    q: `Расположите этапы анализа денежных потоков предприятия в логической последовательности: (1) расчёт коэффициентов эффективности и достаточности; (2) анализ объёма и структуры потоков по видам деятельности; (3) разработка мер по оптимизации; (4) оценка сбалансированности и синхронности положительного и отрицательного потоков.`,
    o: [`1 → 2 → 3 → 4`, `3 → 2 → 4 → 1`, `4 → 1 → 3 → 2`, `2 → 4 → 1 → 3`],
    ex: `Анализ движется от описания к оценке, а от оценки — к решениям. Сначала изучают, сколько денег пришло и ушло и по каким видам деятельности (структура). Затем проверяют, сбалансированы ли притоки и оттоки по объёму и во времени. После этого рассчитывают коэффициенты, которые дают количественную оценку эффективности и достаточности. И только на основе поставленного «диагноза» разрабатывают меры по оптимизации.`,
    why: [`Коэффициенты без понимания структуры потоков — числа без контекста; а оценка сбалансированности после разработки мер теряет смысл.`,
          `Меры по оптимизации предлагаются до анализа — это «лечение до постановки диагноза».`,
          `Оптимизация оказывается раньше изучения структуры потоков, на которой строится весь анализ.`,
          `Верно: структура → сбалансированность → коэффициенты → оптимизация.`],
    trick: `«Сначала смотрим, потом измеряем, потом лечим».`,
    mistake: `Сразу считать коэффициенты и делать выводы, не изучив, за счёт каких видов деятельности сформирован поток.`,
    example: `Аудитор сначала видит, что 70% поступлений — кредиты, и только потом понимает, что «хороший» коэффициент ликвидности держится на заёмных деньгах.`,
    related: `Отчёт о движении денежных средств как информационная база анализа.`,
    takeaway: `Анализ денежных потоков идёт от описания к оценке и от оценки к управленческим решениям.`
  },
  en: {
    q: `Put the stages of a company’s cash flow analysis in logical order: (1) calculating efficiency and sufficiency ratios; (2) analysing the volume and structure of flows by activity; (3) developing optimisation measures; (4) assessing the balance and synchronisation of inflows and outflows.`,
    o: [`1 → 2 → 3 → 4`, `3 → 2 → 4 → 1`, `4 → 1 → 3 → 2`, `2 → 4 → 1 → 3`],
    ex: `Analysis moves from description to assessment, and from assessment to decisions. First you study how much cash came in and went out and through which activities (structure). Then you check whether inflows and outflows are balanced in volume and in time. Next come the ratios that quantify efficiency and sufficiency. Only once the “diagnosis” is made do you design optimisation measures.`,
    why: [`Ratios without understanding the structure are numbers without context, and assessing balance after the measures are designed is pointless.`,
          `Optimisation measures come before any analysis — “treatment before diagnosis”.`,
          `Optimisation comes before the structural analysis on which everything else rests.`,
          `Correct: structure → balance → ratios → optimisation.`],
    trick: `“Look first, then measure, then treat.”`,
    mistake: `Jumping straight to ratios and conclusions without studying which activities generated the flow.`,
    example: `An auditor first notices that 70% of inflows are loans — and only then realises that a “healthy” liquidity ratio rests on borrowed money.`,
    related: `The cash flow statement as the information base for analysis.`,
    takeaway: `Cash flow analysis moves from description to assessment, and from assessment to management decisions.`
  }
},
{
  id: `q08`, topic: `ratios`, module: `cashflow`, diff: `medium`, time: 75, type: `calc`, correct: 1,
  ru: {
    q: `За квартал положительный денежный поток предприятия составил 12 млн сум, отрицательный — 15 млн сум Чему равен коэффициент ликвидности денежного потока и как его интерпретировать?`,
    o: [`1,25 — поступлений достаточно, чтобы покрыть все выплаты, и у предприятия остаётся запас`,
        `0,80 — поступления покрыли лишь 80% выплат; разница профинансирована за счёт остатка денежных средств на начало периода`,
        `0,80 — предприятие получило за квартал убыток в размере 3 млн сум`,
        `−3 — коэффициент отрицательный, следовательно, предприятие неплатёжеспособно`],
    ex: `Коэффициент ликвидности денежного потока = ПДП / ОДП = 12 / 15 = 0,8. Значение меньше 1 означает дефицитный поток: остаток денежных средств за квартал уменьшился на 3 млн сум Ориентир — не ниже 1. Разовое значение меньше 1 ещё не катастрофа (например, при плановых инвестициях), но устойчивая тенденция — тревожный сигнал.`,
    why: [`Перепутаны числитель и знаменатель: делить нужно поступления на выплаты.`,
          `Верно. 12 / 15 = 0,8: каждый ушедший сум покрыт лишь 0,8 сума поступлений, дефицит закрыт накопленными деньгами.`,
          `Дефицит денег — не убыток. Убыток считается по принципу начисления и может не совпадать с денежным разрывом.`,
          `Коэффициент — отношение двух положительных величин и не может быть отрицательным; −3 млн сум — это чистый денежный поток.`],
    trick: `«Ликвидность потока — сколько сумов пришло на каждый ушедший сум».`,
    mistake: `Делить отток на приток и путать денежный дефицит с убытком.`,
    example: `Агрохолдинг весной, в посевную, имеет коэффициент меньше 1, а осенью, после продажи урожая, — больше 1. Это сезонность, а не кризис.`,
    related: `Коэффициент достаточности чистого денежного потока; коэффициент эффективности (ЧДП / ОДП).`,
    takeaway: `Коэффициент ликвидности денежного потока ниже 1 означает, что предприятие расходует накопленные деньги или должно привлекать финансирование.`
  },
  en: {
    q: `Over a quarter, a company’s cash inflows were 12 million soums and its cash outflows 15 million. What is the cash flow liquidity ratio and how should it be read?`,
    o: [`1.25 — receipts cover all payments, leaving the company a cushion`,
        `0.80 — receipts covered only 80% of payments; the gap was funded from the opening cash balance`,
        `0.80 — the company made a loss of 3 million soums for the quarter`,
        `−3 — the ratio is negative, therefore the company is insolvent`],
    ex: `Cash flow liquidity ratio = inflows / outflows = 12 / 15 = 0.8. A value below 1 means a deficit flow: the cash balance fell by 3 million over the quarter. The benchmark is at least 1. A single value below 1 is not a disaster (planned investment, for instance), but a persistent trend is a warning sign.`,
    why: [`Numerator and denominator are swapped: divide inflows by outflows.`,
          `Correct. 12 / 15 = 0.8: each soum paid out was covered by only 0.8 soums received; accumulated cash closed the gap.`,
          `A cash deficit is not a loss. Loss is measured on an accrual basis and need not match the cash gap.`,
          `The ratio divides two positive quantities and cannot be negative; −3 million is the net cash flow.`],
    trick: `“Flow liquidity: how many soums came in for every soum that went out.”`,
    mistake: `Dividing outflows by inflows, and confusing a cash deficit with a loss.`,
    example: `An agricultural holding has a ratio below 1 in spring (sowing season) and above 1 in autumn after selling the harvest. That is seasonality, not a crisis.`,
    related: `Net cash flow sufficiency ratio; efficiency ratio (net cash flow / outflows).`,
    takeaway: `A cash flow liquidity ratio below 1 means the company is spending accumulated cash or must raise financing.`
  }
},
{
  id: `q09`, topic: `cycle`, module: `cashflow`, diff: `medium`, time: 75, type: `calc`, correct: 0,
  ru: {
    q: `По данным таблицы определите продолжительность финансового (денежного) цикла предприятия.`,
    ctx: { head: [`Показатель`, `дней`], rows: [[`Период оборота запасов`, `45`], [`Период оборота дебиторской задолженности`, `30`], [`Период оборота кредиторской задолженности`, `40`]] },
    o: [`35 дней`, `75 дней`, `115 дней`, `5 дней`],
    ex: `Операционный цикл = 45 + 30 = 75 дней — время от закупки сырья до получения денег от покупателя. Финансовый цикл = операционный цикл − период оборота кредиторской задолженности = 75 − 40 = 35 дней. Это время, на которое собственные деньги компании «заморожены» и которое нужно финансировать собственным капиталом или кредитами. Чем короче финансовый цикл, тем меньше потребность в оборотном капитале.`,
    why: [`Верно: 45 + 30 − 40 = 35 дней.`,
          `Это операционный цикл: не учтена отсрочка, которую дают поставщики.`,
          `Кредиторская задолженность сокращает цикл, а не удлиняет его.`,
          `Пропущен период оборота дебиторской задолженности: деньги заморожены и пока долг у покупателя.`],
    trick: `«Деньги заморожены, пока товар на складе и пока долг у покупателя; поставщик часть этой заморозки оплачивает за нас».`,
    mistake: `Путать операционный и финансовый циклы.`,
    example: `У сетевых супермаркетов финансовый цикл часто отрицательный: товар продаётся за 20 дней за наличные, а поставщикам платят через 45 дней — магазин работает на деньгах поставщиков.`,
    related: `Оборачиваемость оборотных активов; потребность в оборотном капитале.`,
    takeaway: `Сокращение финансового цикла высвобождает деньги без привлечения кредитов.`
  },
  en: {
    q: `Using the table, determine the length of the company’s cash conversion (financial) cycle.`,
    ctx: { head: [`Item`, `days`], rows: [[`Inventory period`, `45`], [`Receivables collection period`, `30`], [`Payables payment period`, `40`]] },
    o: [`35 days`, `75 days`, `115 days`, `5 days`],
    ex: `Operating cycle = 45 + 30 = 75 days — the time from buying materials to collecting cash from the customer. Cash conversion cycle = operating cycle − payables period = 75 − 40 = 35 days. This is how long the company’s own money is “frozen” and must be funded by equity or loans. The shorter the cycle, the less working capital is needed.`,
    why: [`Correct: 45 + 30 − 40 = 35 days.`,
          `That is the operating cycle: the credit granted by suppliers was ignored.`,
          `Payables shorten the cycle; they do not lengthen it.`,
          `The receivables period was left out: cash is also frozen while the customer owes it.`],
    trick: `“Cash is frozen while goods sit in stock and while the customer owes; the supplier pays for part of that freeze.”`,
    mistake: `Confusing the operating cycle with the cash conversion cycle.`,
    example: `Supermarket chains often have a negative cycle: goods sell for cash within 20 days while suppliers are paid after 45 — the store runs on its suppliers’ money.`,
    related: `Current asset turnover; working capital requirement.`,
    takeaway: `Shortening the cash conversion cycle releases cash without borrowing.`
  }
},
{
  id: `q10`, topic: `basics`, module: `cashflow`, diff: `medium`, time: 90, type: `case`, correct: 2,
  ru: {
    q: `Отчёты о движении денежных средств четырёх компаний показали разные знаки чистых потоков. Какая компания, скорее всего, является зрелой и финансово устойчивой?`,
    ctx: { head: [`Компания`, `Операционная`, `Инвестиционная`, `Финансовая`], rows: [[`«Альфа»`, `−`, `−`, `+`], [`«Бета»`, `−`, `+`, `−`], [`«Гамма»`, `+`, `−`, `−`], [`«Дельта»`, `+`, `+`, `+`]] },
    o: [`«Альфа»: активно инвестирует и привлекает внешнее финансирование`,
        `«Бета»: продаёт активы и сокращает долговую нагрузку`,
        `«Гамма»: зарабатывает на основной деятельности, инвестирует и рассчитывается с кредиторами и собственниками`,
        `«Дельта»: все три потока положительны, деньги поступают отовсюду`],
    ex: `«Гамма» генерирует деньги основной деятельностью и за счёт них одновременно инвестирует (−) и возвращает капитал кредиторам или собственникам (−) — это профиль зрелого устойчивого бизнеса. «Альфа» — типичная молодая или быстрорастущая компания: операции пока не приносят денег, инвестиции финансируются извне. «Бета» — тревожный профиль: операции «съедают» деньги, компания распродаёт активы и при этом вынуждена гасить долги. «Дельта» накапливает деньги из всех источников, включая продажу активов и займы, — без понятной стратегии это скорее вопрос, чем сила.`,
    why: [`Профиль молодой компании: операционный поток отрицателен, бизнес зависит от внешнего финансирования.`,
          `Кризисный профиль: продажа имущества используется, чтобы платить по долгам при отрицательных операциях.`,
          `Верно. Сочетание «+ / − / −» означает, что основная деятельность сама финансирует и развитие, и расчёты по капиталу.`,
          `Положительный инвестиционный поток означает продажу активов, а финансовый — новые займы. Одновременное накопление из всех источников устойчивость не доказывает.`],
    trick: `«Здоровая компания: зарабатывает (+), строит (−), рассчитывается (−)».`,
    mistake: `Считать положительные потоки по всем видам деятельности лучшим вариантом. Положительный инвестиционный поток часто означает продажу имущества.`,
    example: `Многие крупные зрелые компании годами показывают профиль «+ / − / −»: операционный поток покрывает и капитальные вложения, и дивиденды.`,
    related: `Жизненный цикл компании; структурный анализ денежных потоков.`,
    takeaway: `Знак потока сам по себе не хорош и не плох — смысл имеет сочетание знаков по трём видам деятельности.`
  },
  en: {
    q: `The cash flow statements of four companies show different signs of net flows. Which company is most likely mature and financially sound?`,
    ctx: { head: [`Company`, `Operating`, `Investing`, `Financing`], rows: [[`Alpha`, `−`, `−`, `+`], [`Beta`, `−`, `+`, `−`], [`Gamma`, `+`, `−`, `−`], [`Delta`, `+`, `+`, `+`]] },
    o: [`Alpha: investing actively and raising external finance`,
        `Beta: selling assets and reducing its debt burden`,
        `Gamma: earning from its core business, investing, and paying lenders and owners`,
        `Delta: all three flows are positive — cash is coming in from everywhere`],
    ex: `Gamma generates cash from operations and uses it both to invest (−) and to return capital to lenders or owners (−) — the profile of a mature, stable business. Alpha is a typical young or fast-growing company: operations do not yet produce cash, and investment is funded externally. Beta is a warning profile: operations consume cash, the company sells assets and still has to repay debt. Delta accumulates cash from every source, including asset sales and borrowing — without a clear strategy that raises a question rather than showing strength.`,
    why: [`A young company profile: negative operating flow, dependent on outside financing.`,
          `A crisis profile: asset sales are used to service debt while operations lose cash.`,
          `Correct. The “+ / − / −” pattern means core operations fund both growth and capital settlements.`,
          `A positive investing flow means selling assets; a positive financing flow means new borrowing. Hoarding from all sources does not prove stability.`],
    trick: `“A healthy company earns (+), builds (−), and settles up (−).”`,
    mistake: `Assuming that positive flows in every activity are best. A positive investing flow often means selling off property.`,
    example: `Many large, mature companies show “+ / − / −” for years: operating cash covers both capital spending and dividends.`,
    related: `Company life cycle; structural analysis of cash flows.`,
    takeaway: `The sign of a flow is neither good nor bad by itself — what matters is the combination across the three activities.`
  }
},
{
  id: `q11`, topic: `balance`, module: `cashflow`, diff: `medium`, time: 75, type: `concept`, correct: 3,
  ru: {
    q: `Аналитик оценивает синхронность положительного и отрицательного денежных потоков по месяцам года с помощью коэффициента корреляции. Какое значение говорит о наилучшей синхронизации?`,
    o: [`Близкое к 0 — потоки не зависят друг от друга, а значит, не мешают друг другу`,
        `Близкое к −1 — поступления увеличиваются именно тогда, когда выплаты снижаются`,
        `Любое значение, если годовой чистый денежный поток положителен`,
        `Близкое к +1 — поступления и выплаты растут и снижаются в одни и те же периоды`],
    ex: `Даже при положительном годовом итоге внутри года возможны кассовые разрывы, если деньги приходят в одни месяцы, а платить нужно в другие. Синхронность оценивают коэффициентом корреляции между помесячными рядами поступлений и выплат. Значение, близкое к +1, означает, что колебания притоков и оттоков совпадают во времени, — потребность в резервах и краткосрочных кредитах минимальна.`,
    why: [`Отсутствие связи означает, что притоки и оттоки «живут своей жизнью» — кассовые разрывы вполне вероятны.`,
          `Противофаза — худший случай: денег больше всего тогда, когда платить нечего, и меньше всего, когда платежи максимальны.`,
          `Годовой итог не показывает внутригодовых разрывов — именно поэтому синхронность анализируют отдельно.`,
          `Верно. Чем ближе корреляция к +1, тем точнее поступления совпадают по времени с потребностью в выплатах.`],
    trick: `«Синхронно — значит в такт: деньги приходят тогда, когда нужно платить».`,
    mistake: `Делать вывод о платёжеспособности только по годовому чистому потоку, игнорируя распределение денег во времени.`,
    example: `Туроператор получает предоплаты весной, а платит отелям летом — потоки рассинхронизированы, и без резерва не обойтись.`,
    related: `Кассовый разрыв; платёжный календарь; сбалансированность потоков по объёму.`,
    takeaway: `Сбалансированность по объёму не гарантирует отсутствия кассовых разрывов — важна синхронность во времени.`
  },
  en: {
    q: `An analyst assesses how well monthly cash inflows and outflows are synchronised using a correlation coefficient. Which value indicates the best synchronisation?`,
    o: [`Close to 0 — the flows are independent of each other and therefore do not interfere`,
        `Close to −1 — receipts rise exactly when payments fall`,
        `Any value, as long as the annual net cash flow is positive`,
        `Close to +1 — receipts and payments rise and fall in the same periods`],
    ex: `Even with a positive annual total, cash gaps can occur within the year if money arrives in some months and must be paid out in others. Synchronisation is measured by correlating the monthly series of inflows and outflows. A value close to +1 means the fluctuations coincide in time, so the need for reserves and short-term loans is minimal.`,
    why: [`No relationship means inflows and outflows “live their own lives” — cash gaps are quite likely.`,
          `Opposite phase is the worst case: the most cash arrives when least is due, and the least when payments peak.`,
          `The annual total hides gaps within the year — that is exactly why synchronisation is analysed separately.`,
          `Correct. The closer the correlation to +1, the better receipts match the timing of payment needs.`],
    trick: `“In sync means in rhythm: cash arrives when it is time to pay.”`,
    mistake: `Judging solvency only by the annual net flow and ignoring the timing of cash.`,
    example: `A tour operator collects prepayments in spring but pays hotels in summer — the flows are out of sync, and a reserve is essential.`,
    related: `Cash gap; payment calendar; balance of flows by volume.`,
    takeaway: `Balance in volume does not rule out cash gaps — synchronisation in time matters too.`
  }
},
{
  id: `q12`, topic: `balance`, module: `cashflow`, diff: `medium`, time: 75, type: `scenario`, correct: 0,
  ru: {
    q: `У предприятия прогнозируется краткосрочный дефицит денежных средств. Какая мера ускоряет поступление денег и поэтому помогает устранить дефицит?`,
    o: [`Продажа дебиторской задолженности банку по договору факторинга`,
        `Увеличение отсрочки платежа для покупателей с 30 до 60 дней, чтобы стимулировать продажи`,
        `Досрочная оплата счетов поставщиков ради получения скидки`,
        `Закупка сырья на квартал вперёд, пока цены не выросли`],
    ex: `Дефицит устраняют двумя группами мер: ускорением притока (факторинг, предоплата, скидки покупателям за досрочную оплату, продажа неиспользуемых активов) и замедлением оттока (отсрочка платежей поставщикам, перенос капитальных вложений, реструктуризация долга). Факторинг превращает дебиторскую задолженность в деньги сразу; вознаграждение фактора — это цена скорости.`,
    why: [`Верно. Факторинг немедленно превращает дебиторскую задолженность в деньги.`,
          `Более длинная отсрочка замедляет приток — дефицит только вырастет.`,
          `Досрочная оплата ускоряет отток. Это разумно при избытке денег, но не при дефиците.`,
          `Закупка впрок замораживает деньги в запасах и усиливает дефицит.`],
    trick: `«При дефиците: притоки — ускорить, оттоки — замедлить».`,
    mistake: `Предлагать при дефиците меры, уместные при избытке денег: досрочные платежи, закупки впрок.`,
    example: `Мебельная фабрика передаёт фактору счета торговой сети с отсрочкой 90 дней и получает большую часть суммы сразу.`,
    related: `Избыточный денежный поток — его, наоборот, направляют в инвестиции и досрочное погашение долга.`,
    takeaway: `Дефицит и избыток денег — обе проблемы, и у каждой свой набор инструментов.`
  },
  en: {
    q: `A company forecasts a short-term cash deficit. Which measure speeds up cash inflows and therefore helps close the deficit?`,
    o: [`Selling receivables to a bank under a factoring agreement`,
        `Extending customer payment terms from 30 to 60 days to stimulate sales`,
        `Paying supplier invoices early to obtain a discount`,
        `Buying a quarter’s raw materials in advance before prices rise`],
    ex: `A deficit is tackled by two groups of measures: speeding up inflows (factoring, prepayments, early-payment discounts for customers, selling idle assets) and slowing down outflows (deferring supplier payments, postponing capital spending, restructuring debt). Factoring turns receivables into cash immediately; the factor’s fee is the price of speed.`,
    why: [`Correct. Factoring converts receivables into cash immediately.`,
          `Longer terms slow inflows — the deficit would only grow.`,
          `Early payment speeds up outflows. Sensible with surplus cash, not with a deficit.`,
          `Buying ahead freezes cash in inventory and deepens the deficit.`],
    trick: `“In a deficit: speed up inflows, slow down outflows.”`,
    mistake: `Proposing surplus-cash measures during a deficit: early payments, stockpiling.`,
    example: `A furniture factory passes a retail chain’s 90-day invoices to a factor and receives most of the amount at once.`,
    related: `Surplus cash flow — which, conversely, is directed to investments and early debt repayment.`,
    takeaway: `Both deficit and surplus are problems, and each has its own toolkit.`
  }
},
{
  id: `q13`, topic: `method`, module: `cashflow`, diff: `medium`, time: 90, type: `case`, correct: 1,
  ru: {
    q: `Руководство компании заявляет: «Чистый денежный поток за год положительный — с деньгами всё в порядке». Как оценит это заявление аналитик?`,
    ctx: { head: [`Вид деятельности`, `млн сум`], rows: [[`Операционная`, `−4,0`], [`Инвестиционная`, `+9,0`], [`в т. ч. продажа складского комплекса`, `+10,0`], [`Финансовая`, `−2,0`], [`Чистый денежный поток`, `+3,0`]] },
    o: [`Согласится: положительный итоговый поток — главный признак финансовой устойчивости`,
        `Не согласится: положительный итог обеспечен разовой продажей имущества, а основная деятельность генерирует отток`,
        `Не согласится: инвестиционный поток всегда должен быть отрицательным, значит, отчёт составлен с ошибкой`,
        `Согласится: финансовый поток отрицателен, а значит, компания уверенно гасит свои долги`],
    ex: `Качество денежного потока важнее его величины. Структура показывает, что основная деятельность забирает 4 млн сум, а источник денег — продажа склада, которую нельзя повторять каждый год. Без неё чистый поток составил бы −7 млн сум Устойчивость определяется способностью операционной деятельности генерировать деньги, а не разовыми поступлениями.`,
    why: [`Итоговая строка без анализа структуры обманчива.`,
          `Верно. Источник денег — разовый и неповторяемый, а операционный поток отрицателен.`,
          `Положительный инвестиционный поток допустим (продажа активов, возврат займов). Вопрос не в знаке, а в повторяемости.`,
          `Погашение долга за счёт распродажи имущества — не признак силы.`],
    trick: `«Смотри не сколько денег, а откуда они».`,
    mistake: `Оценивать только итоговую строку отчёта о движении денежных средств.`,
    example: `Компании в трудном положении нередко продают здания с обратной арендой: разово получают деньги, но маскируют слабость основной деятельности.`,
    related: `Разовые (нерегулярные) потоки; качество денежного потока.`,
    takeaway: `Устойчивый денежный поток создаётся основной деятельностью; разовые поступления не решают системных проблем.`
  },
  en: {
    q: `Management says: “Net cash flow for the year is positive — our cash position is fine.” How would an analyst assess this claim?`,
    ctx: { head: [`Activity`, `UZS million`], rows: [[`Operating`, `−4.0`], [`Investing`, `+9.0`], [`incl. sale of a warehouse complex`, `+10.0`], [`Financing`, `−2.0`], [`Net cash flow`, `+3.0`]] },
    o: [`Agree: a positive bottom line is the main sign of financial stability`,
        `Disagree: the positive total comes from a one-off asset sale, while core operations generate an outflow`,
        `Disagree: investing flow must always be negative, so the statement contains an error`,
        `Agree: the financing flow is negative, which shows the company is confidently repaying its debts`],
    ex: `The quality of cash flow matters more than its size. The structure shows core operations consumed 4 million, and the cash came from selling a warehouse — something that cannot be repeated every year. Without it, net cash flow would be −7 million. Stability is defined by the ability of operations to generate cash, not by one-off receipts.`,
    why: [`A bottom line without structural analysis is misleading.`,
          `Correct. The source of cash is one-off and non-recurring, while operating flow is negative.`,
          `A positive investing flow is legitimate (asset sales, loans repaid to us). The issue is not the sign but whether it recurs.`,
          `Repaying debt by selling off property is not a sign of strength.`],
    trick: `“Ask not how much cash, but where it came from.”`,
    mistake: `Judging only the bottom line of the cash flow statement.`,
    example: `Struggling companies often sell buildings and lease them back: they get cash once but mask weak core operations.`,
    related: `One-off (non-recurring) flows; cash flow quality.`,
    takeaway: `Sustainable cash flow comes from core operations; one-off receipts do not fix systemic problems.`
  }
},

/* ───────────────────────────── HARD ───────────────────────────── */
{
  id: `q14`, topic: `models`, module: `cashflow`, diff: `hard`, time: 120, type: `calc`, correct: 2,
  ru: {
    q: `Используя модель Баумоля, определите оптимальную сумму пополнения денежных средств и количество операций пополнения в год.`,
    ctx: { head: [`Показатель`, `Значение`], rows: [[`Годовая потребность в денежных средствах (T)`, `1 200 000 сум`], [`Расходы на одну операцию пополнения (F)`, `120 сум`], [`Доходность краткосрочных ценных бумаг (r)`, `8% годовых`]] },
    o: [`42 426 сум; около 28 операций`, `30 000 сум; 40 операций`, `60 000 сум; 20 операций`, `120 000 сум; 10 операций`],
    ex: `Q* = √(2·F·T / r) = √(2 · 120 · 1 200 000 / 0,08) = √3 600 000 000 = 60 000 сум Количество операций = T / Q* = 1 200 000 / 60 000 = 20. Средний остаток = Q* / 2 = 30 000 сум Модель балансирует две противоположные издержки: транзакционные (чем чаще пополняем, тем они выше) и упущенную выгоду (чем больше денег держим, тем больше теряем дохода). В оптимуме они равны: 20 · 120 = 2 400 сум и 30 000 · 0,08 = 2 400 сум`,
    why: [`Пропущен множитель 2 в формуле: √(120 · 1 200 000 / 0,08) ≈ 42 426.`,
          `30 000 сум — это средний остаток (Q / 2), а не сумма разового пополнения.`,
          `Верно. Транзакционные издержки (2 400 сум) равны упущенной выгоде (2 400 сум) — признак оптимума.`,
          `При 120 000 сум упущенная выгода (4 800 сум) вчетверо превышает транзакционные издержки (1 200 сум) — баланс нарушен.`],
    trick: `«Модель Баумоля — это формула EOQ для денег; двойку в числителе не забывай».`,
    mistake: `Путать оптимальную сумму пополнения Q с средним остатком Q / 2.`,
    example: `Предприятие с равномерными расходами держит свободные средства в краткосрочных облигациях и продаёт их порциями по 60 тыс. сум 20 раз в год.`,
    related: `Модель Миллера–Орра (для нерегулярных потоков); модель оптимального размера заказа (EOQ).`,
    takeaway: `Оптимальный остаток — компромисс между стоимостью транзакций и упущенной доходностью; оптимум там, где эти издержки равны.`
  },
  en: {
    q: `Using the Baumol model, find the optimal cash replenishment amount and the number of replenishments per year.`,
    ctx: { head: [`Item`, `Value`], rows: [[`Annual cash requirement (T)`, `UZS 1,200,000`], [`Cost per replenishment (F)`, `UZS 120`], [`Yield on short-term securities (r)`, `8% per year`]] },
    o: [`UZS 42,426; about 28 transfers`, `UZS 30,000; 40 transfers`, `UZS 60,000; 20 transfers`, `UZS 120,000; 10 transfers`],
    ex: `Q* = √(2·F·T / r) = √(2 · 120 · 1,200,000 / 0.08) = √3,600,000,000 = 60,000. Number of transfers = T / Q* = 1,200,000 / 60,000 = 20. Average balance = Q* / 2 = 30,000. The model balances two opposing costs: transaction costs (higher the more often we replenish) and opportunity cost (higher the more cash we hold). At the optimum they are equal: 20 · 120 = 2,400 and 30,000 · 0.08 = 2,400.`,
    why: [`The factor 2 was dropped: √(120 · 1,200,000 / 0.08) ≈ 42,426.`,
          `30,000 is the average balance (Q / 2), not the size of each replenishment.`,
          `Correct. Transaction cost (2,400) equals opportunity cost (2,400) — the mark of the optimum.`,
          `At 120,000 the opportunity cost (4,800) is four times the transaction cost (1,200) — the balance is broken.`],
    trick: `“Baumol is EOQ for cash — don’t forget the 2 in the numerator.”`,
    mistake: `Confusing the optimal replenishment Q with the average balance Q / 2.`,
    example: `A company with even spending keeps spare funds in short-term bonds and sells them in 60,000-soum lots twenty times a year.`,
    related: `Miller–Orr model (for irregular flows); economic order quantity (EOQ).`,
    takeaway: `The optimal balance trades off transaction cost against lost yield; the optimum is where the two costs are equal.`
  }
},
{
  id: `q15`, topic: `models`, module: `cashflow`, diff: `hard`, time: 105, type: `scenario`, correct: 3,
  ru: {
    q: `Компания управляет остатком денежных средств по модели Миллера–Орра. Остаток достиг верхней границы коридора. Что должен сделать финансовый менеджер?`,
    o: [`Перевести в ценные бумаги весь остаток сверх нижней границы, чтобы максимизировать доход`,
        `Ничего не делать: модель требует действий только при достижении нижней границы`,
        `Купить ценные бумаги на сумму, которая вернёт остаток точно в середину коридора`,
        `Купить ценные бумаги на сумму, которая вернёт остаток к точке возврата, расположенной на треть коридора выше нижней границы`],
    ex: `Модель Миллера–Орра предназначена для непредсказуемых, случайно колеблющихся потоков. Задаются нижняя граница L (страховой запас) и ширина коридора S = 3 · ∛(3Fσ² / 4r). Верхняя граница H = L + S, точка возврата Z = L + S / 3. Пока остаток внутри коридора, ничего не делают. На верхней границе покупают ценные бумаги на сумму H − Z, на нижней — продают их на сумму Z − L. Точка возврата смещена к нижней границе, потому что хранить деньги дорого: это упущенная доходность.`,
    why: [`Если опустить остаток до нижней границы, первый же отток вызовет нехватку и новую транзакцию.`,
          `Обе границы — сигналы к действию: верхняя к покупке ценных бумаг, нижняя к их продаже.`,
          `Точка возврата лежит не в середине, а на трети коридора: асимметрия отражает стоимость хранения денег.`,
          `Верно. Излишек сверх точки возврата Z = L + S / 3 переводится в ценные бумаги.`],
    trick: `«Ушёл вверх — купи бумаги, упал вниз — продай; возвращайся в Z — на треть от дна».`,
    mistake: `Считать, что точка возврата находится посередине коридора.`,
    example: `Казначейство дистрибьютора с непредсказуемыми поступлениями от сотен клиентов вмешивается только при выходе остатка за границы коридора.`,
    related: `Модель Баумоля; модель Стоуна.`,
    takeaway: `Модель Миллера–Орра управляет случайными потоками через коридор и точку возврата; чем выше волатильность потоков (σ), тем шире коридор.`
  },
  en: {
    q: `A company manages its cash balance with the Miller–Orr model. The balance has reached the upper limit of the corridor. What should the financial manager do?`,
    o: [`Move everything above the lower limit into securities to maximise income`,
        `Do nothing: the model calls for action only at the lower limit`,
        `Buy securities in an amount that returns the balance exactly to the middle of the corridor`,
        `Buy securities in an amount that returns the balance to the return point, one third of the corridor above the lower limit`],
    ex: `The Miller–Orr model is designed for unpredictable, randomly fluctuating flows. A lower limit L (safety stock) and a spread S = 3 · ∛(3Fσ² / 4r) are set. The upper limit is H = L + S, the return point Z = L + S / 3. While the balance stays inside the corridor, nothing is done. At the upper limit, securities worth H − Z are bought; at the lower limit, securities worth Z − L are sold. The return point sits closer to the floor because holding cash is costly — it means lost yield.`,
    why: [`Dropping the balance to the floor means the very next outflow causes a shortfall and another transaction.`,
          `Both limits trigger action: the upper one to buy securities, the lower one to sell them.`,
          `The return point is not in the middle but one third up: the asymmetry reflects the cost of holding cash.`,
          `Correct. The excess above the return point Z = L + S / 3 is moved into securities.`],
    trick: `“Hit the top — buy paper; hit the floor — sell; return to Z, a third from the floor.”`,
    mistake: `Assuming the return point lies in the middle of the corridor.`,
    example: `The treasury of a distributor with unpredictable receipts from hundreds of clients steps in only when the balance leaves the corridor.`,
    related: `Baumol model; Stone model.`,
    takeaway: `Miller–Orr manages random flows with a corridor and a return point; the higher the volatility (σ), the wider the corridor.`
  }
},
{
  id: `q16`, topic: `methods`, module: `cashflow`, diff: `hard`, time: 105, type: `incorrect`, correct: 1,
  ru: {
    q: `Найдите НЕВЕРНОЕ утверждение о корректировках чистой прибыли при расчёте операционного денежного потока косвенным методом.`,
    o: [`Уменьшение запасов за период прибавляется к чистой прибыли`,
        `Прибыль от продажи основного средства прибавляется к чистой прибыли, так как она увеличивает поступления денег`,
        `Прирост задолженности по оплате труда (начислено, но не выплачено) прибавляется к чистой прибыли`,
        `Убыток от обесценения актива прибавляется к чистой прибыли`],
    ex: `Прибыль от продажи основного средства уже включена в чистую прибыль, но вся выручка от продажи — а не только прибыль — отражается в инвестиционной деятельности. Поэтому из операционного потока такую прибыль вычитают, иначе она будет учтена дважды и в неверном виде деятельности. Остальные утверждения верны: снижение запасов высвобождает деньги; начисленная, но не выплаченная зарплата оставляет деньги в компании; обесценение — неденежный расход.`,
    why: [`Утверждение верно: запасы сократились — товар продан без новых закупок, деньги высвободились.`,
          `Это и есть неверное утверждение. Прибыль от продажи ОС вычитают: поступления от продажи отражаются в инвестиционной деятельности.`,
          `Утверждение верно: расход признан, но деньги ещё не ушли.`,
          `Утверждение верно: обесценение — неденежный расход, его прибавляют обратно.`],
    trick: `«Прибыль от продажи актива — в инвестиционный "карман"; из операционного её убираем».`,
    mistake: `Двойной счёт: оставить прибыль от продажи ОС в операционном потоке и одновременно показать выручку от продажи в инвестиционном.`,
    example: `Компания продала здание балансовой стоимостью 6 млн сум за 10 млн: 4 млн прибыли вычитают из операционного потока, а 10 млн показывают в инвестиционном.`,
    related: `Неденежные доходы и расходы; классификация потоков по видам деятельности.`,
    takeaway: `Каждая денежная операция должна попасть ровно в один вид деятельности — корректировки исключают двойной счёт.`
  },
  en: {
    q: `Find the INCORRECT statement about adjustments to net profit when operating cash flow is calculated using the indirect method.`,
    o: [`A decrease in inventory during the period is added to net profit`,
        `A gain on the sale of a fixed asset is added to net profit because it increases cash receipts`,
        `An increase in wages payable (accrued but not yet paid) is added to net profit`,
        `An impairment loss on an asset is added to net profit`],
    ex: `A gain on selling a fixed asset is already inside net profit, but the entire sale proceeds — not just the gain — are shown under investing activities. So the gain is subtracted from operating cash flow; otherwise it would be counted twice and in the wrong activity. The other statements are true: lower inventory releases cash; accrued but unpaid wages keep cash in the company; impairment is a non-cash expense.`,
    why: [`True: inventory fell — goods were sold without restocking, so cash was released.`,
          `This is the incorrect statement. The gain is subtracted: the sale proceeds belong to investing activities.`,
          `True: the expense is recognised, but the cash has not left yet.`,
          `True: impairment is a non-cash expense and is added back.`],
    trick: `“A gain on selling an asset belongs in the investing pocket — take it out of operating.”`,
    mistake: `Double counting: leaving the gain in operating cash flow while also showing the sale proceeds under investing.`,
    example: `A company sells a building carried at 6 million for 10 million: the 4 million gain is subtracted from operating flow, and the 10 million appears under investing.`,
    related: `Non-cash income and expenses; classification of flows by activity.`,
    takeaway: `Each cash transaction must land in exactly one activity — adjustments prevent double counting.`
  }
},
{
  id: `q17`, topic: `ratios`, module: `cashflow`, diff: `hard`, time: 120, type: `compare`, correct: 0,
  ru: {
    q: `Две компании одной отрасли показали одинаковую чистую прибыль. Какой вывод следует из сравнения отношения операционного денежного потока к чистой прибыли?`,
    ctx: { head: [`Показатель, млн сум`, `«Восток»`, `«Запад»`], rows: [[`Чистая прибыль`, `100`, `100`], [`Операционный денежный поток`, `130`, `40`], [`Прирост дебиторской задолженности за год`, `+5%`, `+60%`]] },
    o: [`Качество прибыли «Востока» выше; у «Запада» большая часть прибыли «застряла» в дебиторской задолженности, что требует проверки политики продаж и риска неплатежей`,
        `Компании равноценны, поскольку инвесторы и кредиторы оценивают бизнес прежде всего по чистой прибыли`,
        `«Запад» эффективнее: он направляет деньги на расширение продаж, а рост дебиторской задолженности — признак роста бизнеса`,
        `Отношение выше 1 у «Востока» говорит о завышенном операционном потоке, поэтому его положение хуже`],
    ex: `Отношение операционного потока к чистой прибыли (коэффициент качества прибыли): у «Востока» 1,3, у «Запада» 0,4. Устойчивое значение около 1 и выше означает, что прибыль конвертируется в деньги (с учётом амортизации). Значение заметно ниже 1 на фоне быстрого роста дебиторской задолженности может указывать на агрессивное признание выручки, ухудшение платёжной дисциплины покупателей или даже на искажение отчётности. Многие известные бухгалтерские скандалы проявлялись именно как разрыв между растущей прибылью и слабым операционным потоком.`,
    why: [`Верно. 1,3 против 0,4: у «Запада» прибыль плохо подкреплена деньгами — это повод для углублённой проверки.`,
          `Прибыль одинакова, но риски разные: прибыль без денежного подкрепления менее надёжна.`,
          `Рост дебиторки может сопровождать расширение, но +60% при той же прибыли требует анализа, а не автоматического одобрения.`,
          `Операционный поток выше прибыли — нормальная ситуация, особенно у компаний со значительной амортизацией.`],
    trick: `«Прибыль без денег — обещание, а не результат».`,
    mistake: `Сравнивать компании только по прибыли, не проверяя её денежного подкрепления.`,
    example: `Кредитные аналитики и рейтинговые агентства при оценке заёмщиков обязательно сопоставляют прибыль с операционным денежным потоком.`,
    related: `Коэффициент качества прибыли; оборачиваемость дебиторской задолженности.`,
    takeaway: `Устойчивый разрыв между прибылью и операционным денежным потоком — один из главных «красных флагов» финансового анализа.`
  },
  en: {
    q: `Two companies in the same industry reported identical net profit. What follows from comparing their ratio of operating cash flow to net profit?`,
    ctx: { head: [`UZS million`, `Vostok`, `Zapad`], rows: [[`Net profit`, `100`, `100`], [`Operating cash flow`, `130`, `40`], [`Growth in receivables over the year`, `+5%`, `+60%`]] },
    o: [`Vostok’s earnings quality is higher; most of Zapad’s profit is “stuck” in receivables, which calls for a review of its sales policy and default risk`,
        `The companies are equivalent, since investors and lenders judge a business primarily by net profit`,
        `Zapad is more efficient: it directs cash into growing sales, and rising receivables are a sign of business growth`,
        `Vostok’s ratio above 1 signals overstated operating cash flow, so its position is worse`],
    ex: `Operating cash flow to net profit (the earnings quality ratio): Vostok 1.3, Zapad 0.4. A stable value around 1 or higher means profit converts into cash (allowing for depreciation). A value well below 1 alongside fast-growing receivables may point to aggressive revenue recognition, worsening customer payment discipline or even distorted reporting. Many well-known accounting scandals showed up precisely as a gap between rising profit and weak operating cash flow.`,
    why: [`Correct. 1.3 versus 0.4: Zapad’s profit is poorly backed by cash — grounds for a deeper review.`,
          `Profit is the same, but the risks differ: profit without cash backing is less reliable.`,
          `Rising receivables can accompany expansion, but +60% with flat profit demands analysis, not automatic approval.`,
          `Operating cash flow above profit is normal, especially for companies with significant depreciation.`],
    trick: `“Profit without cash is a promise, not a result.”`,
    mistake: `Comparing companies on profit alone without checking its cash backing.`,
    example: `Credit analysts and rating agencies always compare a borrower’s profit with its operating cash flow.`,
    related: `Earnings quality ratio; receivables turnover.`,
    takeaway: `A persistent gap between profit and operating cash flow is one of the main red flags in financial analysis.`
  }
},
{
  id: `q18`, topic: `value`, module: `cashflow`, diff: `hard`, time: 120, type: `calc`, correct: 2,
  ru: {
    q: `Рассчитайте чистую приведённую стоимость (NPV) инвестиционного проекта.`,
    ctx: { head: [`Показатель`, `Значение`], rows: [[`Инвестиции сегодня`, `1 000 тыс. сум`], [`Поступление в конце 1-го года`, `600 тыс. сум`], [`Поступление в конце 2-го года`, `600 тыс. сум`], [`Ставка дисконтирования`, `10% годовых`]] },
    o: [`200,0 тыс. сум`, `45,5 тыс. сум`, `41,3 тыс. сум`, `−8,3 тыс. сум`],
    ex: `PV₁ = 600 / 1,1 = 545,45; PV₂ = 600 / 1,1² = 600 / 1,21 = 495,87. Сумма = 1 041,32; NPV = 1 041,32 − 1 000 = 41,32 тыс. сум > 0 — проект увеличивает ценность компании. Деньги имеют временную стоимость: сум сегодня дороже сума через год, потому что его можно инвестировать.`,
    why: [`Потоки просто сложены без дисконтирования — временная стоимость денег проигнорирована.`,
          `Второй поток разделён на 1,2 (простой процент) вместо 1,21 (сложный процент).`,
          `Верно: 545,45 + 495,87 − 1 000 = 41,32.`,
          `Оба потока продисконтированы по множителю второго года (1,21); каждый поток дисконтируется на свой срок.`],
    trick: `«Каждый поток — в свою степень: год n → (1 + r)ⁿ».`,
    mistake: `Делить поток второго года на (1 + 2r) вместо (1 + r)².`,
    example: `Компания решает, покупать ли оборудование, которое даст экономию 600 тыс. сум в год в течение двух лет.`,
    related: `Дисконтирование; внутренняя норма доходности (IRR); дисконтированный срок окупаемости.`,
    takeaway: `Сравнивать денежные потоки разных периодов можно, только приведя их к одному моменту времени.`
  },
  en: {
    q: `Calculate the net present value (NPV) of the investment project.`,
    ctx: { head: [`Item`, `Value`], rows: [[`Investment today`, `UZS 1,000 thousand`], [`Inflow at end of year 1`, `UZS 600 thousand`], [`Inflow at end of year 2`, `UZS 600 thousand`], [`Discount rate`, `10% per year`]] },
    o: [`UZS 200.0 thousand`, `UZS 45.5 thousand`, `UZS 41.3 thousand`, `UZS −8.3 thousand`],
    ex: `PV₁ = 600 / 1.1 = 545.45; PV₂ = 600 / 1.1² = 600 / 1.21 = 495.87. Total = 1,041.32; NPV = 1,041.32 − 1,000 = 41.32 thousand > 0 — the project adds value. Money has a time value: a soum today is worth more than a soum in a year, because it can be invested.`,
    why: [`The flows were simply added without discounting — the time value of money was ignored.`,
          `The second flow was divided by 1.2 (simple interest) instead of 1.21 (compound interest).`,
          `Correct: 545.45 + 495.87 − 1,000 = 41.32.`,
          `Both flows were discounted with the year-2 factor (1.21); each flow must be discounted for its own period.`],
    trick: `“Each flow to its own power: year n → (1 + r)ⁿ.”`,
    mistake: `Dividing the year-2 flow by (1 + 2r) instead of (1 + r)².`,
    example: `A company decides whether to buy equipment that will save 600 thousand soums a year for two years.`,
    related: `Discounting; internal rate of return (IRR); discounted payback period.`,
    takeaway: `Cash flows from different periods can be compared only after bringing them to a single point in time.`
  }
},

/* ──────────────────────────── EXPERT ──────────────────────────── */
{
  id: `q19`, topic: `value`, module: `cashflow`, diff: `expert`, time: 150, type: `case`, correct: 3,
  ru: {
    q: `Инвестор видит у компании отрицательный свободный денежный поток и делает вывод, что она «сжигает деньги» и от инвестиций в неё стоит отказаться. Какая оценка этого вывода наиболее обоснована?`,
    ctx: { head: [`Показатель за год`, `Значение`], rows: [[`Рост выручки`, `+35%`], [`Операционный денежный поток`, `+1 200 млн сум`], [`Капитальные вложения`, `−2 000 млн сум`], [`Свободный денежный поток`, `−800 млн сум`], [`Привлечено кредитов`, `+900 млн сум`], [`Ожидаемая доходность новых проектов / стоимость капитала`, `18% / 11%`]] },
    o: [`Вывод верен: отрицательный свободный денежный поток всегда означает, что бизнес разрушает стоимость`,
        `Вывод верен: компания привлекла кредиты, а значит, не способна существовать на собственные средства`,
        `Вывод неверен: свободный денежный поток для оценки роста не важен — значение имеет только динамика выручки`,
        `Вывод преждевременен: поток отрицателен из-за инвестиций при положительном операционном потоке; если доходность проектов выше стоимости капитала, вложения создают стоимость, а главный риск — обслуживание нового долга`],
    ex: `Отрицательный свободный поток бывает двух принципиально разных типов. Первый — слабая основная деятельность (операционный поток около нуля или отрицателен): это тревожно. Второй — активные инвестиции при здоровом операционном потоке: это нормально для растущей компании. Здесь операционный поток положителен, выручка растёт на 35%, а проекты обещают 18% при стоимости капитала 11%, то есть имеют положительную NPV. Однако аналитик обязан проверить долговую нагрузку: если рост замедлится, а проекты не дадут отдачи, долг станет проблемой. Полезно также разделять капитальные вложения на поддерживающие и развивающие.`,
    why: [`Слово «всегда» игнорирует причину отрицательного потока — инвестиции в рост могут создавать стоимость.`,
          `Заимствование под проекты с доходностью выше стоимости капитала — разумное финансовое решение, а не признак слабости.`,
          `Выручка без денег — ловушка; свободный денежный поток остаётся ключевым показателем, вопрос лишь в его интерпретации.`,
          `Верно. Оценка учитывает источник отрицательного потока, качество инвестиций и риск долговой нагрузки.`],
    trick: `«Отрицательный FCF: сначала спроси — от слабости или от роста?»`,
    mistake: `Оценивать знак свободного денежного потока, не разложив его на операционный поток и капитальные вложения.`,
    example: `Многие технологические и инфраструктурные компании годами имели отрицательный свободный поток в фазе экспансии, прежде чем выйти на устойчиво положительные значения.`,
    related: `Поддерживающие и развивающие капитальные вложения; средневзвешенная стоимость капитала (WACC); NPV.`,
    takeaway: `Свободный денежный поток оценивается в контексте: стадии развития компании, качества её инвестиций и способности обслуживать долг.`
  },
  en: {
    q: `An investor sees negative free cash flow and concludes the company is “burning cash” and should be avoided. Which assessment of this conclusion is best supported?`,
    ctx: { head: [`Item for the year`, `Value`], rows: [[`Revenue growth`, `+35%`], [`Operating cash flow`, `+UZS 1,200 million`], [`Capital expenditure`, `−UZS 2,000 million`], [`Free cash flow`, `−UZS 800 million`], [`New borrowing`, `+UZS 900 million`], [`Expected project return / cost of capital`, `18% / 11%`]] },
    o: [`The conclusion is right: negative free cash flow always means the business is destroying value`,
        `The conclusion is right: the company borrowed, so it cannot survive on its own funds`,
        `The conclusion is wrong: free cash flow does not matter for growth valuation — only revenue growth does`,
        `The conclusion is premature: FCF is negative because of investment while operating cash flow is positive; if project returns exceed the cost of capital, the spending creates value, and the main risk is servicing the new debt`],
    ex: `Negative free cash flow comes in two fundamentally different kinds. One is weak core operations (operating cash flow near zero or negative): that is alarming. The other is heavy investment on top of healthy operating cash flow: normal for a growing company. Here operating cash flow is positive, revenue is up 35%, and the projects promise 18% against an 11% cost of capital — a positive NPV. Still, the analyst must check leverage: if growth slows and projects underdeliver, the debt becomes a problem. It also helps to split capital spending into maintenance and growth.`,
    why: [`“Always” ignores why the flow is negative — investment in growth can create value.`,
          `Borrowing for projects that earn more than the cost of capital is a sound financial decision, not a sign of weakness.`,
          `Revenue without cash is a trap; free cash flow remains a key measure — the question is how to interpret it.`,
          `Correct. The assessment weighs the source of the negative flow, the quality of the investment and the debt risk.`],
    trick: `“Negative FCF: first ask — from weakness or from growth?”`,
    mistake: `Judging the sign of free cash flow without splitting it into operating cash flow and capital spending.`,
    example: `Many technology and infrastructure companies ran negative free cash flow for years during expansion before turning steadily positive.`,
    related: `Maintenance versus growth capex; weighted average cost of capital (WACC); NPV.`,
    takeaway: `Free cash flow is judged in context: the company’s stage of development, the quality of its investments and its ability to service debt.`
  }
},
{
  id: `q20`, topic: `cycle`, module: `cashflow`, diff: `expert`, time: 150, type: `cause`, correct: 1,
  ru: {
    q: `Компания одновременно увеличила отсрочку платежа покупателям на 30 дней и добилась от поставщиков дополнительной отсрочки на те же 30 дней. Как это повлияет на финансовый цикл и потребность в финансировании?`,
    ctx: { head: [`Показатель`, `Значение`], rows: [[`Выручка`, `3 650 млн сум в год (10 млн в день)`], [`Закупки`, `2 190 млн сум в год (6 млн в день)`], [`Изменение отсрочки покупателям`, `+30 дней`], [`Изменение отсрочки поставщикам`, `+30 дней`]] },
    o: [`Ничего не изменится: дни взаимно компенсируются, а значит, компенсируются и деньги`,
        `Финансовый цикл в днях не изменится, но потребность в финансировании вырастет примерно на 120 млн сум: дебиторка растёт от выручки (300 млн), а кредиторка — от закупок (180 млн)`,
        `Финансовый цикл сократится на 30 дней, потому что отсрочка от поставщиков всегда выгоднее отсрочки покупателям`,
        `Финансовый цикл увеличится на 60 дней, поскольку изменились оба периода оборота`],
    ex: `Финансовый цикл = период оборота запасов + период оборота дебиторской задолженности − период оборота кредиторской задолженности. Изменения: +30 − 30 = 0 дней. Но дни — относительная мера, а деньги — абсолютная. Дебиторская задолженность «привязана» к выручке (30 × 10 = 300 млн сум), кредиторская — к закупкам (30 × 6 = 180 млн сум), которые меньше выручки на величину наценки. Поэтому в денежном выражении дебиторка вырастет сильнее, и компании придётся профинансировать около 120 млн сум Вывод: цикл нужно анализировать и в днях, и в деньгах.`,
    why: [`Равенство дней не означает равенства денег: базы расчёта у дебиторской и кредиторской задолженности разные.`,
          `Верно. Цикл в днях не изменился, а оборотный капитал вырос на 300 − 180 = 120 млн сум`,
          `Изменение цикла: +30 − 30 = 0, сокращения не будет.`,
          `Увеличение отсрочки поставщикам сокращает цикл, а не удлиняет его.`],
    trick: `«Дни равны — суммы нет: дебиторка считается от выручки, кредиторка — от закупок».`,
    mistake: `Делать вывод о деньгах по одним только показателям в днях.`,
    example: `Дистрибьютор, выигравший тендер с длинной отсрочкой платежа, «уравнял» её отсрочкой у своих поставщиков — и всё равно столкнулся с кассовым разрывом.`,
    related: `Потребность в оборотном капитале; финансовый цикл.`,
    takeaway: `Показатели в днях отражают скорость, но для оценки потребности в деньгах нужно учитывать базу, к которой эти дни применяются.`
  },
  en: {
    q: `A company extended customer payment terms by 30 days and, at the same time, won an extra 30 days of credit from its suppliers. How will this affect the cash conversion cycle and the need for financing?`,
    ctx: { head: [`Item`, `Value`], rows: [[`Revenue`, `UZS 3,650 million a year (10 million a day)`], [`Purchases`, `UZS 2,190 million a year (6 million a day)`], [`Change in customer terms`, `+30 days`], [`Change in supplier terms`, `+30 days`]] },
    o: [`Nothing changes: the days offset each other, so the money offsets too`,
        `The cycle in days stays the same, but the financing need rises by about UZS 120 million: receivables grow with revenue (300 million), payables with purchases (180 million)`,
        `The cycle shortens by 30 days, because supplier credit is always worth more than customer credit`,
        `The cycle lengthens by 60 days, because both turnover periods changed`],
    ex: `Cash conversion cycle = inventory period + receivables period − payables period. The change: +30 − 30 = 0 days. But days are a relative measure; money is absolute. Receivables are tied to revenue (30 × 10 = 300 million), payables to purchases (30 × 6 = 180 million), which are smaller than revenue by the margin. So receivables grow more in money terms, and the company must fund about 120 million. Lesson: analyse the cycle both in days and in money.`,
    why: [`Equal days do not mean equal money: receivables and payables are measured against different bases.`,
          `Correct. The cycle in days is unchanged, while working capital rises by 300 − 180 = 120 million.`,
          `The change is +30 − 30 = 0; there is no shortening.`,
          `Longer supplier credit shortens the cycle; it does not lengthen it.`],
    trick: `“Equal days, unequal money: receivables run on revenue, payables on purchases.”`,
    mistake: `Drawing conclusions about cash from day-based measures alone.`,
    example: `A distributor that won a tender with long payment terms “matched” them with longer supplier terms — and still hit a cash gap.`,
    related: `Working capital requirement; cash conversion cycle.`,
    takeaway: `Day-based measures show speed, but to judge the cash needed you must account for the base those days apply to.`
  }
}
];
