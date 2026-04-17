# TalentScope AI

TalentScope AI is a local-first recruiter dashboard for resume screening and job matching.

## What it does

- analyze one job description against multiple candidate resumes
- rank candidates on a live leaderboard
- show ATS readiness, keyword overlap, evidence strength, and role alignment
- generate recruiter notes, shortlist tiers, recommendations, and interview questions
- export the full screening report as JSON
- save the current session locally in the browser

## Run it

1. Open PowerShell in this folder.
2. Run `node server.js`
3. Open `http://localhost:3000`

No dependencies are required.

## Demo flow

1. Click `Load demo candidates`
2. Review the sample job description and the 3 example applicants
3. Click `Analyze all candidates`
4. Open any ranked candidate card to inspect the detailed breakdown
5. Click `Export report` to download the screening results

## Why this version is stronger

This is more than a single resume checker. It behaves like a lightweight applicant review tool with:

- multi-candidate ranking
- recruiter-style shortlist decisions
- weighted scoring categories
- interview question generation
- downloadable reports
- local persistence

## Next upgrades

- PDF and DOCX parsing
- OpenAI or Gemini feedback generation
- authentication and saved job pipelines
- deploy to Vercel or Render
