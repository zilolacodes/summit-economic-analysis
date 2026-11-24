"""Assemble src/* into one self-contained interactive_book_quiz.html."""
from pathlib import Path
src = Path(__file__).parent / "src"
tpl = (src / "template.html").read_text()
css = (src / "styles.css").read_text()
js = "\n\n".join((src / f).read_text() for f in ("modules-a.js", "modules-b.js", "data.js", "bank-a.js", "bank-b.js", "generators.js", "core.js", "learning.js", "views.js", "results.js"))
out = tpl.replace("/*__STYLES__*/", css).replace("/*__SCRIPTS__*/", js)
Path(__file__).parent.joinpath("interactive_book_quiz.html").write_text(out)
print(f"{len(out)/1024:.0f} KB")
