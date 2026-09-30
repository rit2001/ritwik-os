# Resume Source

`ritwik-biswas-resume.tex` is the maintainable source for the public resume.
Its claims must remain aligned with `docs/RESUME_RECONCILIATION.md`.

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

Render, inspect, extract text, and verify links before replacing:

```text
public/resume/ritwik-biswas-resume.pdf
```

The public PDF must remain one page, text-selectable, ATS-readable, and free of
unsupported project claims.
