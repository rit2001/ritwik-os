# Resume Source

`ritwik-biswas-resume.tex` is the maintainable source retained for future resume
work. Its claims must remain aligned with `docs/RESUME_RECONCILIATION.md`.

The current public PDF is manually approved and frozen. Do not regenerate,
overwrite, copy over, or otherwise replace
`public/resume/ritwik-biswas-resume.pdf` automatically. Building the source is
permitted only to a temporary path, and replacing the public artifact requires
explicit human approval.

Build a temporary PDF with the repository's existing XeLaTeX toolchain:

```bash
mkdir -p tmp/pdfs
xelatex -interaction=nonstopmode -halt-on-error \
  -output-directory=tmp/pdfs \
  resume/ritwik-biswas-resume.tex
xelatex -interaction=nonstopmode -halt-on-error \
  -output-directory=tmp/pdfs \
  resume/ritwik-biswas-resume.tex
```

If a future replacement is explicitly approved, render, inspect, extract text,
and verify links before replacing:

```text
public/resume/ritwik-biswas-resume.pdf
```

The public PDF must remain one page, text-selectable, ATS-readable, and free of
unsupported project claims.
