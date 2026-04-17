const STORAGE_KEY = "talentscope-ai-state-v1";

const jobInput = document.getElementById("jobInput");
const resumeInput = document.getElementById("resumeInput");
const candidateNameInput = document.getElementById("candidateNameInput");
const candidateRoleInput = document.getElementById("candidateRoleInput");
const jobFileInput = document.getElementById("jobFileInput");
const resumeFileInput = document.getElementById("resumeFileInput");
const loadDemoBtn = document.getElementById("loadDemoBtn");
const analyzeAllBtn = document.getElementById("analyzeAllBtn");
const exportBtn = document.getElementById("exportBtn");
const addCandidateBtn = document.getElementById("addCandidateBtn");
const clearResumeBtn = document.getElementById("clearResumeBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

const heroApplicantCount = document.getElementById("heroApplicantCount");
const heroTopScore = document.getElementById("heroTopScore");
const heroShortlistCount = document.getElementById("heroShortlistCount");
const jobStats = document.getElementById("jobStats");
const jobSkillCount = document.getElementById("jobSkillCount");
const resumeStats = document.getElementById("resumeStats");
const leaderboard = document.getElementById("leaderboard");
const selectedPill = document.getElementById("selectedPill");
const emptyState = document.getElementById("emptyState");
const detailView = document.getElementById("detailView");
const scoreRing = document.getElementById("scoreRing");
const overallScore = document.getElementById("overallScore");
const scoreSummary = document.getElementById("scoreSummary");
const snapshotGrid = document.getElementById("snapshotGrid");
const breakdownList = document.getElementById("breakdownList");
const recruiterBrief = document.getElementById("recruiterBrief");
const matchedSkills = document.getElementById("matchedSkills");
const missingSkills = document.getElementById("missingSkills");
const strengthList = document.getElementById("strengthList");
const riskList = document.getElementById("riskList");
const recommendationList = document.getElementById("recommendationList");
const questionList = document.getElementById("questionList");

const STOPWORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "in",
  "into",
  "is",
  "it",
  "of",
  "on",
  "or",
  "our",
  "that",
  "the",
  "their",
  "this",
  "to",
  "with",
  "you",
  "your",
  "we",
  "will",
  "have",
  "has",
  "using",
  "use",
  "through",
  "across",
  "role",
  "team",
  "teams"
]);

const ACTION_VERBS = [
  "built",
  "launched",
  "delivered",
  "improved",
  "optimized",
  "scaled",
  "designed",
  "led",
  "implemented",
  "reduced",
  "increased",
  "owned",
  "shipped",
  "automated",
  "collaborated"
];

const SKILL_LIBRARY = [
  { name: "JavaScript", aliases: ["javascript", "js"], weight: 1 },
  { name: "TypeScript", aliases: ["typescript", "ts"], weight: 1.2 },
  { name: "React", aliases: ["react", "reactjs", "react.js"], weight: 1.2 },
  { name: "Next.js", aliases: ["nextjs", "next.js"], weight: 1.1 },
  { name: "Node.js", aliases: ["node.js", "node"], weight: 1.1 },
  { name: "Express", aliases: ["express", "express.js"], weight: 0.8 },
  { name: "HTML", aliases: ["html"], weight: 0.8 },
  { name: "CSS", aliases: ["css", "scss", "sass"], weight: 0.8 },
  { name: "Tailwind", aliases: ["tailwind", "tailwind css"], weight: 0.8 },
  { name: "Python", aliases: ["python"], weight: 1 },
  { name: "Java", aliases: ["java"], weight: 1 },
  { name: "SQL", aliases: ["sql"], weight: 1 },
  { name: "PostgreSQL", aliases: ["postgresql", "postgres"], weight: 0.8 },
  { name: "MongoDB", aliases: ["mongodb", "mongo"], weight: 0.8 },
  { name: "REST APIs", aliases: ["rest api", "restful api", "apis"], weight: 1 },
  { name: "GraphQL", aliases: ["graphql"], weight: 0.8 },
  { name: "Git", aliases: ["git", "github", "gitlab"], weight: 0.7 },
  { name: "Docker", aliases: ["docker", "containerization"], weight: 0.9 },
  { name: "AWS", aliases: ["aws", "amazon web services"], weight: 1 },
  { name: "CI/CD", aliases: ["ci/cd", "continuous integration", "continuous deployment"], weight: 0.8 },
  { name: "Testing", aliases: ["testing", "jest", "cypress", "unit test"], weight: 1 },
  { name: "Accessibility", aliases: ["accessibility", "a11y"], weight: 0.9 },
  { name: "Performance", aliases: ["performance", "optimization", "latency"], weight: 0.9 },
  { name: "Figma", aliases: ["figma"], weight: 0.6 },
  { name: "Agile", aliases: ["agile", "scrum", "kanban"], weight: 0.7 },
  { name: "Leadership", aliases: ["mentored", "led", "ownership", "stakeholder"], weight: 0.9 },
  { name: "Communication", aliases: ["communication", "collaboration", "cross-functional"], weight: 0.8 },
  { name: "Machine Learning", aliases: ["machine learning", "ml"], weight: 1 },
  { name: "NLP", aliases: ["natural language processing", "nlp"], weight: 0.9 },
  { name: "TensorFlow", aliases: ["tensorflow"], weight: 0.8 },
  { name: "PyTorch", aliases: ["pytorch"], weight: 0.8 },
  { name: "Pandas", aliases: ["pandas"], weight: 0.7 },
  { name: "Power BI", aliases: ["power bi"], weight: 0.7 },
  { name: "Tableau", aliases: ["tableau"], weight: 0.7 }
];

const SAMPLE_JOB = `Senior Frontend Engineer

We are hiring a Senior Frontend Engineer to build high-quality user experiences for a fast-growing SaaS platform.

Requirements:
- 4+ years of frontend engineering experience
- Expert with React, TypeScript, JavaScript, HTML, CSS, and REST APIs
- Strong knowledge of testing, accessibility, performance optimization, and Git workflows
- Experience collaborating with product, design, and backend teams
- Comfort owning features end to end and mentoring teammates

Preferred:
- Next.js experience
- Exposure to CI/CD, Docker, and AWS
- Familiarity with Figma and product thinking`;

const SAMPLE_CANDIDATES = [
  {
    name: "Aarav Patel",
    role: "Frontend Engineer",
    resumeText: `Aarav Patel
aarav.patel@email.com | linkedin.com/in/aaravpatel | github.com/aaravcodes

SUMMARY
Frontend engineer with 5 years of experience building responsive SaaS products using React, TypeScript, JavaScript, HTML, CSS, REST APIs, and testing tools. Known for improving performance and partnering closely with product and design teams.

EXPERIENCE
Senior Frontend Engineer | NovaStack | 2023 - Present
- Led React and TypeScript dashboard modernization for 14,000 monthly users.
- Improved load performance by 37% through bundle optimization and lazy loading.
- Added accessibility fixes that reduced key audit issues by 62%.
- Collaborated with product, design, and backend engineers to ship roadmap features.
- Mentored 2 junior engineers and introduced better testing coverage with Jest.

Frontend Developer | BrightPixel | 2020 - 2023
- Built reusable component systems with JavaScript, HTML, CSS, and Git workflows.
- Integrated REST APIs and improved release quality through regression testing.

SKILLS
React, TypeScript, JavaScript, HTML, CSS, REST APIs, Testing, Accessibility, Performance, Git, Agile, Figma

EDUCATION
B.Tech in Computer Science`
  },
  {
    name: "Nisha Mehta",
    role: "UI Developer",
    resumeText: `Nisha Mehta
nisha.mehta@email.com | linkedin.com/in/nishamehta

PROFILE
UI developer with 3 years of experience building landing pages and internal tools. Strong in HTML, CSS, JavaScript, and Figma collaboration.

EXPERIENCE
UI Developer | PixelBridge | 2022 - Present
- Designed and built marketing pages and admin panels.
- Worked closely with designers and handled responsive implementation.
- Helped improve page quality and visual consistency.

SKILLS
HTML, CSS, JavaScript, Figma, Communication

EDUCATION
B.Sc in Information Technology`
  },
  {
    name: "Rohan Singh",
    role: "Frontend Platform Engineer",
    resumeText: `Rohan Singh
rohan.singh@email.com | linkedin.com/in/rohansingh | github.com/rohans-platform

SUMMARY
Frontend platform engineer with 6 years of experience across React, Next.js, TypeScript, Node.js, Docker, AWS, CI/CD, and performance engineering. Strong ownership mindset with experience driving engineering quality.

EXPERIENCE
Frontend Platform Engineer | OrbitCloud | 2021 - Present
- Owned shared React and Next.js platform architecture across 6 product squads.
- Improved lighthouse performance from 68 to 91 and cut build time by 29%.
- Introduced CI/CD checks, Docker-based preview environments, and release guardrails.
- Partnered with stakeholders to prioritize developer experience and customer impact.
- Ran accessibility reviews and coached teams on resilient frontend patterns.

Software Engineer | GridLine | 2018 - 2021
- Built TypeScript and Node.js tooling for internal workflows.
- Wrote test automation and supported cloud deployments on AWS.

SKILLS
React, Next.js, TypeScript, JavaScript, Node.js, REST APIs, Testing, Accessibility, Performance, Git, Docker, AWS, CI/CD, Leadership, Communication

EDUCATION
B.E. in Software Engineering`
  }
];

const state = {
  jobText: "",
  candidates: [],
  selectedId: null
};

function normalizeText(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function countWords(text) {
  const words = text.trim().match(/\b[\w+#./-]+\b/g);
  return words ? words.length : 0;
}

function tokenize(text) {
  const tokens = normalizeText(text).match(/[a-z0-9+#.]+/g) || [];
  return tokens.filter((token) => token.length > 2 && !STOPWORDS.has(token));
}

function unique(items) {
  return [...new Set(items)];
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function hasAny(text, phrases) {
  return phrases.some((phrase) => text.includes(phrase));
}

function extractSkills(text) {
  const normalized = normalizeText(text);
  return SKILL_LIBRARY.filter((skill) => hasAny(normalized, skill.aliases)).map(
    (skill) => skill.name
  );
}

function getSkillWeight(skillName) {
  const skill = SKILL_LIBRARY.find((item) => item.name === skillName);
  return skill ? skill.weight : 1;
}

function extractSections(text) {
  const normalized = normalizeText(text);
  return {
    summary: /(summary|profile|objective)/.test(normalized),
    experience: /(experience|work history|employment)/.test(normalized),
    skills: /(skills|technical skills|toolkit)/.test(normalized),
    education: /(education|academic)/.test(normalized),
    projects: /(projects|portfolio)/.test(normalized)
  };
}

function extractYears(text) {
  const normalized = normalizeText(text);
  const explicitMatch = normalized.match(/(\d+)\+?\s+years/);
  if (explicitMatch) {
    return Number.parseInt(explicitMatch[1], 10);
  }

  const yearMatches = normalized.match(/\b(20\d{2})\b/g);
  if (yearMatches && yearMatches.length >= 2) {
    const values = yearMatches.map((value) => Number.parseInt(value, 10)).sort();
    return clamp(values[values.length - 1] - values[0], 0, 12);
  }

  return 0;
}

function analyzeJob(text) {
  const normalized = normalizeText(text);
  const skills = extractSkills(text);
  const tokens = tokenize(text);
  const frequencies = tokens.reduce((accumulator, token) => {
    accumulator[token] = (accumulator[token] || 0) + 1;
    return accumulator;
  }, {});
  const keywords = Object.entries(frequencies)
    .sort((a, b) => b[1] - a[1])
    .map(([token]) => token)
    .filter((token) => !skills.some((skill) => normalizeText(skill).includes(token)))
    .slice(0, 15);

  const preferredSection = normalized.split("preferred:")[1] || "";
  const preferredSkills = extractSkills(preferredSection);
  const requiredSkills = skills.filter((skill) => !preferredSkills.includes(skill));

  return {
    skills,
    requiredSkills: requiredSkills.length ? requiredSkills : skills,
    preferredSkills,
    keywords,
    yearsRequired: extractYears(text),
    wantsLeadership: /(lead|mentor|stakeholder|own features)/.test(normalized),
    wantsAccessibility: /(accessibility|a11y)/.test(normalized),
    wantsPerformance: /(performance|optimi[sz]ation|latency)/.test(normalized)
  };
}

function analyzeResume(text) {
  const normalized = normalizeText(text);
  const tokens = unique(tokenize(text));
  const skills = extractSkills(text);
  const sections = extractSections(text);
  const bulletCount = (text.match(/^\s*[-*]/gm) || []).length;
  const quantifiedBullets = (
    text.match(/(\d+%|\d+\+|\$\d+|\d{1,3},\d{3}|\d+\s*(users|teams|customers|engineers|projects|releases|months))/gi) ||
    []
  ).length;
  const actionVerbCount = ACTION_VERBS.reduce((total, verb) => {
    const matches = normalized.match(new RegExp(`\\b${verb}\\b`, "g")) || [];
    return total + matches.length;
  }, 0);

  return {
    skills,
    sections,
    words: countWords(text),
    tokens,
    years: extractYears(text),
    bulletCount,
    quantifiedBullets,
    actionVerbCount,
    hasEmail: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(text),
    hasPhone: /(\+\d{1,3}[\s-]?)?(\d[\s-]?){10,}/.test(text),
    hasLinkedIn: normalized.includes("linkedin"),
    hasGithub: normalized.includes("github"),
    mentionsLeadership: /(mentored|led|ownership|owned|stakeholder|coached)/.test(normalized),
    mentionsAccessibility: /(accessibility|a11y)/.test(normalized),
    mentionsPerformance: /(performance|optimized|optimization|latency|bundle)/.test(normalized)
  };
}

function keywordOverlapScore(jobKeywords, resumeTokens) {
  if (!jobKeywords.length) {
    return 12;
  }

  const overlap = jobKeywords.filter((keyword) => resumeTokens.includes(keyword));
  return Math.round((overlap.length / jobKeywords.length) * 12);
}

function scoreCandidate(candidate, jobText) {
  const job = analyzeJob(jobText);
  const resume = analyzeResume(candidate.resumeText);

  const matchedRequired = job.requiredSkills.filter((skill) => resume.skills.includes(skill));
  const missingRequired = job.requiredSkills.filter((skill) => !resume.skills.includes(skill));
  const matchedPreferred = job.preferredSkills.filter((skill) => resume.skills.includes(skill));

  const requiredWeight = job.requiredSkills.reduce((sum, skill) => sum + getSkillWeight(skill), 0) || 1;
  const matchedRequiredWeight = matchedRequired.reduce((sum, skill) => sum + getSkillWeight(skill), 0);
  const preferredWeight = job.preferredSkills.reduce((sum, skill) => sum + getSkillWeight(skill), 0) || 1;
  const matchedPreferredWeight = matchedPreferred.reduce((sum, skill) => sum + getSkillWeight(skill), 0);

  const skillScore = Math.round((matchedRequiredWeight / requiredWeight) * 35);
  const preferredScore = job.preferredSkills.length
    ? Math.round((matchedPreferredWeight / preferredWeight) * 8)
    : 8;

  const sectionsPresent = Object.values(resume.sections).filter(Boolean).length;
  let atsScore = 0;
  atsScore += Math.round((sectionsPresent / 5) * 8);
  atsScore += [resume.hasEmail, resume.hasPhone, resume.hasLinkedIn].filter(Boolean).length;
  atsScore += resume.words >= 180 && resume.words <= 950 ? 2 : 0;
  atsScore = clamp(atsScore, 0, 13);

  const evidenceScore = clamp(resume.quantifiedBullets * 2 + Math.min(resume.actionVerbCount, 3), 0, 12);
  const keywordScore = keywordOverlapScore(job.keywords, resume.tokens);

  let experienceScore = 0;
  if (!job.yearsRequired) {
    experienceScore = 8;
  } else if (resume.years >= job.yearsRequired) {
    experienceScore = 8;
  } else if (resume.years >= job.yearsRequired - 1) {
    experienceScore = 6;
  } else if (resume.years > 0) {
    experienceScore = 4;
  }

  let roleAlignmentScore = 0;
  if (job.wantsLeadership && resume.mentionsLeadership) {
    roleAlignmentScore += 3;
  }
  if (job.wantsAccessibility && resume.mentionsAccessibility) {
    roleAlignmentScore += 3;
  }
  if (job.wantsPerformance && resume.mentionsPerformance) {
    roleAlignmentScore += 3;
  }
  if (resume.bulletCount >= 4) {
    roleAlignmentScore += 2;
  }
  roleAlignmentScore = clamp(roleAlignmentScore, 0, 10);

  const total = clamp(
    skillScore + preferredScore + atsScore + evidenceScore + keywordScore + experienceScore + roleAlignmentScore,
    0,
    100
  );

  let shortlistTier = "Hold";
  if (total >= 82) {
    shortlistTier = "Strong shortlist";
  } else if (total >= 68) {
    shortlistTier = "Interview maybe";
  } else if (total >= 55) {
    shortlistTier = "Borderline";
  }

  const strengths = [];
  const risks = [];
  const recommendations = [];
  const questions = [];

  if (matchedRequired.length >= Math.max(4, Math.ceil(job.requiredSkills.length * 0.65))) {
    strengths.push("Strong overlap with the role's core stack and recruiter keywords.");
  }
  if (resume.quantifiedBullets >= 2) {
    strengths.push("Resume includes measurable outcomes, which makes impact easier to trust.");
  }
  if (resume.mentionsPerformance && job.wantsPerformance) {
    strengths.push("Performance experience aligns directly with one of the stated priorities.");
  }
  if (resume.mentionsAccessibility && job.wantsAccessibility) {
    strengths.push("Accessibility evidence improves fit for mature frontend teams.");
  }
  if (resume.mentionsLeadership && job.wantsLeadership) {
    strengths.push("Leadership or ownership signals strengthen senior-level credibility.");
  }

  if (missingRequired.length > 0) {
    risks.push(`Missing required keywords: ${missingRequired.slice(0, 6).join(", ")}${missingRequired.length > 6 ? "..." : ""}`);
    recommendations.push("Mirror the most relevant missing keywords where you have honest experience, especially in the summary and latest role.");
  }
  if (!resume.sections.summary) {
    risks.push("No summary/profile section was detected.");
    recommendations.push("Add a short summary that matches the target title, years of experience, and primary stack.");
  }
  if (!resume.sections.skills) {
    risks.push("No dedicated skills section was found for ATS scanning.");
    recommendations.push("Create a dedicated skills block with the exact technologies from the job description.");
  }
  if (resume.quantifiedBullets === 0) {
    risks.push("Impact bullets are not quantified.");
    recommendations.push("Rewrite bullets with hard numbers such as %, users, revenue, speed, defects, or delivery scope.");
  }
  if (job.yearsRequired && resume.years < job.yearsRequired) {
    risks.push(`Role asks for ${job.yearsRequired}+ years, but the resume signals about ${resume.years} years.`);
    recommendations.push("Compensate for the experience gap by emphasizing ownership, complexity, and shipped outcomes.");
  }
  if (!resume.hasGithub && /frontend|engineer|developer/i.test(candidate.role || "")) {
    risks.push("No GitHub or portfolio-style signal was detected.");
    recommendations.push("Add a GitHub, portfolio, or live project link to strengthen proof of work.");
  }

  if (!recommendations.length) {
    recommendations.push("Resume is already strong; focus on tailoring the top summary and first three bullets to this job.");
  }

  missingRequired.slice(0, 3).forEach((skill) => {
    questions.push(`Tell me about a real project where you used or learned ${skill}. What problem were you solving?`);
  });
  if (job.wantsPerformance) {
    questions.push("Walk me through a performance bottleneck you identified, how you measured it, and what changed after the fix.");
  }
  if (job.wantsAccessibility) {
    questions.push("Describe how you approach accessibility in your frontend workflow and which checks you rely on.");
  }
  if (job.wantsLeadership) {
    questions.push("Give an example of when you owned a feature end to end or mentored a teammate through delivery.");
  }
  if (!questions.length) {
    questions.push("Which past project is the best proof that you can succeed in this role, and why?");
  }

  const summary =
    total >= 82
      ? "High-confidence match with clear shortlist potential."
      : total >= 68
        ? "Solid candidate with a few gaps worth validating in interview."
        : total >= 55
          ? "Mixed fit. Some signals are promising, but the profile needs verification."
          : "Low alignment for this role based on the current resume evidence.";

  const recruiterBriefText = `${candidate.name} is best positioned as a ${shortlistTier.toLowerCase()} candidate. Primary fit comes from ${
    matchedRequired.length ? matchedRequired.slice(0, 4).join(", ") : "limited direct stack overlap"
  }. ${
    missingRequired.length
      ? `Main risk areas are ${missingRequired.slice(0, 3).join(", ")}.`
      : "No major keyword gaps were detected in the core stack."
  } ${resume.quantifiedBullets ? "The resume contains measurable impact signals." : "Impact is under-quantified and should be probed."}`;

  return {
    total,
    shortlistTier,
    scoreSummary: summary,
    recruiterBriefText,
    matchedSkills: [...matchedRequired, ...matchedPreferred].slice(0, 12),
    missingSkills: missingRequired.slice(0, 12),
    strengths,
    risks,
    recommendations,
    questions: unique(questions).slice(0, 5),
    breakdown: [
      { label: "Core skill match", score: skillScore, max: 35 },
      { label: "Preferred stack", score: preferredScore, max: 8 },
      { label: "ATS readiness", score: atsScore, max: 13 },
      { label: "Impact evidence", score: evidenceScore, max: 12 },
      { label: "Keyword alignment", score: keywordScore, max: 12 },
      { label: "Experience", score: experienceScore, max: 8 },
      { label: "Role alignment", score: roleAlignmentScore, max: 10 }
    ],
    snapshot: [
      { label: "Years signaled", value: String(resume.years || 0) },
      { label: "Matched skills", value: String(matchedRequired.length + matchedPreferred.length) },
      { label: "Missing skills", value: String(missingRequired.length) },
      { label: "Quantified wins", value: String(resume.quantifiedBullets) },
      { label: "Resume words", value: String(resume.words) },
      { label: "Sections found", value: `${Object.values(resume.sections).filter(Boolean).length}/5` }
    ]
  };
}

function getTierClass(tier) {
  if (tier === "Strong shortlist") {
    return "success";
  }
  if (tier === "Interview maybe") {
    return "warning";
  }
  if (tier === "Borderline") {
    return "warning";
  }
  return "danger";
}

function updateTextStats() {
  const jobText = jobInput.value.trim();
  const resumeText = resumeInput.value.trim();
  jobStats.textContent = `${countWords(jobText)} words`;
  resumeStats.textContent = `${countWords(resumeText)} words`;
  jobSkillCount.textContent = `${extractSkills(jobText).length} skills detected`;
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      jobText: state.jobText,
      candidates: state.candidates,
      selectedId: state.selectedId
    })
  );
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return;
  }

  try {
    const saved = JSON.parse(raw);
    state.jobText = saved.jobText || "";
    state.candidates = saved.candidates || [];
    state.selectedId = saved.selectedId || null;
    jobInput.value = state.jobText;
  } catch (error) {
    console.error("Could not load saved state", error);
  }
}

function readTextFile(file, callback) {
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => callback(String(reader.result || ""));
  reader.readAsText(file);
}

function createId() {
  return `candidate-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;
}

function addCandidate(candidate) {
  state.candidates.push({
    id: createId(),
    name: candidate.name || "Unnamed Candidate",
    role: candidate.role || "Candidate",
    resumeText: candidate.resumeText.trim(),
    analysis: null
  });
  state.selectedId = state.candidates[state.candidates.length - 1].id;
  saveState();
  render();
}

function analyzeAllCandidates() {
  const jobText = jobInput.value.trim();
  state.jobText = jobText;

  if (!jobText || !state.candidates.length) {
    render();
    return;
  }

  state.candidates = state.candidates
    .map((candidate) => ({
      ...candidate,
      analysis: scoreCandidate(candidate, jobText)
    }))
    .sort((left, right) => right.analysis.total - left.analysis.total);

  if (!state.selectedId || !state.candidates.some((candidate) => candidate.id === state.selectedId)) {
    state.selectedId = state.candidates[0].id;
  }

  saveState();
  render();
}

function loadDemoData() {
  jobInput.value = SAMPLE_JOB;
  state.jobText = SAMPLE_JOB;
  state.candidates = SAMPLE_CANDIDATES.map((candidate) => ({
    id: createId(),
    name: candidate.name,
    role: candidate.role,
    resumeText: candidate.resumeText,
    analysis: null
  }));
  state.selectedId = state.candidates[0].id;
  analyzeAllCandidates();
  updateTextStats();
}

function exportReport() {
  if (!state.candidates.length) {
    return;
  }

  const report = {
    exportedAt: new Date().toISOString(),
    jobDescription: jobInput.value.trim(),
    candidates: state.candidates.map((candidate, index) => ({
      rank: index + 1,
      name: candidate.name,
      role: candidate.role,
      analysis: candidate.analysis
    }))
  };

  const blob = new Blob([JSON.stringify(report, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "talentscope-report.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function renderLeaderboard() {
  leaderboard.innerHTML = "";

  if (!state.candidates.length) {
    leaderboard.innerHTML = `<div class="empty-state">No candidates yet. Add one manually or load the demo pack.</div>`;
    return;
  }

  state.candidates.forEach((candidate, index) => {
    const card = document.createElement("article");
    const isActive = candidate.id === state.selectedId;
    const score = candidate.analysis ? candidate.analysis.total : 0;
    const tier = candidate.analysis ? candidate.analysis.shortlistTier : "Not analyzed";

    card.className = `candidate-card${isActive ? " is-active" : ""}`;
    card.innerHTML = `
      <div class="candidate-top">
        <div>
          <div class="candidate-name">#${index + 1} ${candidate.name}</div>
          <div class="candidate-role">${candidate.role}</div>
        </div>
        <span class="status-pill ${candidate.analysis ? getTierClass(candidate.analysis.shortlistTier) : ""}">${tier}</span>
      </div>
      <div class="candidate-row">
        <strong>${score}/100</strong>
        <span class="candidate-role">${candidate.analysis ? candidate.analysis.matchedSkills.length : 0} matched skills</span>
      </div>
      <div class="mini-progress">
        <div class="mini-progress-fill" style="width:${score}%"></div>
      </div>
      <div class="candidate-note">${
        candidate.analysis
          ? candidate.analysis.scoreSummary
          : "Candidate added. Run analysis to score this resume."
      }</div>
    `;

    card.addEventListener("click", () => {
      state.selectedId = candidate.id;
      saveState();
      render();
    });

    leaderboard.appendChild(card);
  });
}

function renderHeroMetrics() {
  heroApplicantCount.textContent = String(state.candidates.length);
  const analyzed = state.candidates.filter((candidate) => candidate.analysis);
  heroTopScore.textContent = analyzed.length ? String(analyzed[0].analysis.total) : "0";
  heroShortlistCount.textContent = String(
    analyzed.filter((candidate) => candidate.analysis.shortlistTier === "Strong shortlist").length
  );
}

function renderChips(container, items, tone) {
  container.innerHTML = "";
  const values = items.length ? items : ["None"];
  values.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = `chip${tone ? ` ${tone}` : ""}`;
    chip.textContent = item;
    container.appendChild(chip);
  });
}

function renderBulletList(container, items, fallback) {
  container.innerHTML = "";
  const values = items.length ? items : [fallback];
  values.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    container.appendChild(listItem);
  });
}

function renderDetail() {
  const candidate = state.candidates.find((item) => item.id === state.selectedId);
  if (!candidate || !candidate.analysis) {
    emptyState.classList.remove("hidden");
    detailView.classList.add("hidden");
    selectedPill.textContent = candidate ? `${candidate.name} - not analyzed yet` : "No candidate selected";
    selectedPill.className = "status-pill";
    return;
  }

  const { analysis } = candidate;
  emptyState.classList.add("hidden");
  detailView.classList.remove("hidden");
  selectedPill.textContent = `${candidate.name} - ${analysis.shortlistTier}`;
  selectedPill.className = `status-pill ${getTierClass(analysis.shortlistTier)}`;

  overallScore.textContent = String(analysis.total);
  scoreRing.style.setProperty("--progress", `${analysis.total * 3.6}deg`);
  scoreSummary.textContent = analysis.scoreSummary;
  recruiterBrief.textContent = analysis.recruiterBriefText;

  snapshotGrid.innerHTML = "";
  analysis.snapshot.forEach((item) => {
    const card = document.createElement("div");
    card.className = "snapshot-card";
    card.innerHTML = `<span>${item.label}</span><strong>${item.value}</strong>`;
    snapshotGrid.appendChild(card);
  });

  breakdownList.innerHTML = "";
  analysis.breakdown.forEach((item) => {
    const block = document.createElement("div");
    block.className = "bar-block";
    block.innerHTML = `
      <div class="bar-top">
        <span>${item.label}</span>
        <strong>${item.score}/${item.max}</strong>
      </div>
      <div class="progress-track">
        <div class="progress-fill" style="width:${(item.score / item.max) * 100}%"></div>
      </div>
    `;
    breakdownList.appendChild(block);
  });

  renderChips(matchedSkills, analysis.matchedSkills, "success");
  renderChips(missingSkills, analysis.missingSkills, "warning");
  renderBulletList(strengthList, analysis.strengths, "No standout strengths detected yet.");
  renderBulletList(riskList, analysis.risks, "No major gaps detected for this role.");
  renderBulletList(recommendationList, analysis.recommendations, "No immediate recommendation.");
  renderBulletList(questionList, analysis.questions, "No interview prompts generated.");
}

function render() {
  updateTextStats();
  renderHeroMetrics();
  renderLeaderboard();
  renderDetail();
}

jobInput.addEventListener("input", () => {
  state.jobText = jobInput.value;
  saveState();
  updateTextStats();
});

resumeInput.addEventListener("input", updateTextStats);

jobFileInput.addEventListener("change", (event) => {
  readTextFile(event.target.files[0], (text) => {
    jobInput.value = text;
    state.jobText = text;
    saveState();
    updateTextStats();
  });
});

resumeFileInput.addEventListener("change", (event) => {
  readTextFile(event.target.files[0], (text) => {
    resumeInput.value = text;
    updateTextStats();
  });
});

addCandidateBtn.addEventListener("click", () => {
  const resumeText = resumeInput.value.trim();
  if (!resumeText) {
    return;
  }

  addCandidate({
    name: candidateNameInput.value.trim() || "New Candidate",
    role: candidateRoleInput.value.trim() || "Candidate",
    resumeText
  });

  resumeInput.value = "";
  candidateNameInput.value = "";
  candidateRoleInput.value = "";
  updateTextStats();
});

clearResumeBtn.addEventListener("click", () => {
  resumeInput.value = "";
  candidateNameInput.value = "";
  candidateRoleInput.value = "";
  updateTextStats();
});

clearAllBtn.addEventListener("click", () => {
  state.jobText = "";
  state.candidates = [];
  state.selectedId = null;
  jobInput.value = "";
  resumeInput.value = "";
  candidateNameInput.value = "";
  candidateRoleInput.value = "";
  saveState();
  render();
});

loadDemoBtn.addEventListener("click", loadDemoData);
analyzeAllBtn.addEventListener("click", analyzeAllCandidates);
exportBtn.addEventListener("click", exportReport);

loadState();
render();
