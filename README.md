# 🏔️ Summit

**Reach the peak of understanding.**

Summit is a premium offline learning platform for people who believe education should be as beautiful as it is meaningful. Inspired by mountain landscapes and East Asian watercolour art, it turns studying into a calm, step-by-step climb towards mastery.

Today Summit teaches **Economic Analysis (Экономический анализ)**: the full 15-topic syllabus, with *Cash Flow Analysis* pinned as the current assignment.

## ✦ What's inside
- **One file, zero dependencies.** `interactive_book_quiz.html` contains HTML, CSS, JS, SVG art and all content. No frameworks, CDNs, fonts or images. Works fully offline.
- **15 topics in syllabus order.** Each one has study notes: key concepts, formulas, a worked example, common mistakes and a summary.
- **Endless practice.** 104 written questions plus 29 generators that build new calculation problems with fresh numbers every time. Distractors come from typical student mistakes.
- **Adaptive repetition.** A Leitner-style memory brings weak topics back more often and shows mastery per topic.
- **Four learning modes:** Study · Exam · Practice · Challenge (timer + speed XP).
- **Every answer teaches.** Each one comes with an explanation, why each option is right or wrong, a memory trick, a common exam mistake, a takeaway and a link to the topic notes.
- **Analytics.** Results by topic and difficulty, an accuracy timeline, estimated mastery, recommendations and badges.
- **Printable certificate** and a PDF report via the browser's print dialog.
- **Bilingual (RU / EN)**, keyboard-first, reduced-motion aware, with a separate mobile layout.

## ▶ Use
Download `interactive_book_quiz.html` and double-click it.

## 🛠 Develop
Edit files in `src/`, then rebuild the single file:
```bash
python3 build.py
```
| File | Contents |
|---|---|
| `src/modules-*.js` | Syllabus, dates, study notes |
| `src/data.js` | Cash-flow question set (20) |
| `src/bank-*.js` | Written questions for the other topics |
| `src/generators.js` | Number-based problem generators |
| `src/core.js`, `learning.js`, `views.js`, `results.js` | App engine and screens |
| `src/styles.css`, `template.html` | Design system and page shell |

To add a topic, append an entry to `MODULES`. To add questions, append them to `BANK` or add a generator. The interface adapts automatically.

## ⌨ Shortcuts
`1–4` / `A–D` answer · `←` `→` navigate · `S` skip · `K` bookmark · `R` review later · `N` navigator · `L` notes · `M` sound · `?` help

## 📜 License
MIT
