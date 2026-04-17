# AI Resume Screener + Job Matcher

A polished local MVP that compares a resume against a job description and produces:

- match score
- skill overlap and gaps
- ATS-style quality checks
- tailored improvement suggestions
- quick candidate summary

## Run it

1. Open PowerShell in this folder.
2. Run `node server.js`
3. Open `http://localhost:3000`

No dependencies are required.

## Best results

- Paste resume text directly into the app.
- Paste the target job description into the second panel.
- You can also upload `.txt` or `.md` files for quick testing.

## Notes

This MVP uses transparent heuristic NLP instead of a hosted LLM, so it works fully offline and is easy to extend. If you want, the next version can add:

- OpenAI-powered resume rewriting
- PDF or DOCX parsing
- candidate ranking for multiple resumes
- export to PDF
