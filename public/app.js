const resumeInput = document.getElementById("resumeInput");
const jobInput = document.getElementById("jobInput");
const analyzeBtn = document.getElementById("analyzeBtn");
const analyzeTopBtn = document.getElementById("analyzeTopBtn");
const loadSampleBtn = document.getElementById("loadSampleBtn");
const resumeFileInput = document.getElementById("resumeFileInput");
const jobFileInput = document.getElementById("jobFileInput");
const clearResumeBtn = document.getElementById("clearResumeBtn");
const clearJobBtn = document.getElementById("clearJobBtn");
const resumeStats = document.getElementById("resumeStats");
const jobStats = document.getElementById("jobStats");

const overallScore = document.getElementById("overallScore");
const scoreRing = document.getElementById("scoreRing");
const scoreSummary = document.getElementById("scoreSummary");
const breakdownList = document.getElementById("breakdownList");
const matchedSkills = document.getElementById("matchedSkills");
const missingSkills = document.getElementById("missingSkills");
const strengthList = document.getElementById("strengthList");
const riskList = document.getElementById("riskList");
const recommendationList = document.getElementById("recommendationList");
const snapshot = document.getElementById("snapshot");
const heroSkillMatch = document.getElementById("heroSkillMatch");
const heroAtsScore = document.getElementById("heroAtsScore");
const heroMissingCount = document.getElementById("heroMissingCount");

const SKILL_LIBRARY = [
  { name: "JavaScript", aliases: ["javascript", "js"] },
  { name: "TypeScript", aliases: ["typescript", "ts"] },
  { name: "React", aliases: ["react", "react.js", "reactjs"] },
  { name: "Next.js", aliases: ["next.js", "nextjs"] },
  { name: "Node.js", aliases: ["node", "node.js"] },
  { name: "Express", aliases: ["express", "express.js"] },
  { name: "HTML", aliases: ["html"] },
  { name: "CSS", aliases: ["css", "scss", "sass"] },
  { name: "Tailwind", aliases: ["tailwind", "tailwind css"] },
  { name: "Python", aliases: ["python"] },
  { name: "Java", aliases: ["java"] },
  { name: "C++", aliases: ["c++"] },
  { name: "SQL", aliases: ["sql"] },
  { name: "PostgreSQL", aliases: ["postgresql", "postgres"] },
  { name: "MySQL", aliases: ["mysql"] },
  { name: "MongoDB", aliases: ["mongodb", "mongo"] },
  { name: "REST APIs", aliases: ["rest api", "restful api", "api integration"] },
  { name: "GraphQL", aliases: ["graphql"] },
  { name: "Git", aliases: ["git", "github", "gitlab"] },
  { name: "Docker", aliases: ["docker", "containerization"] },
  { name: "AWS", aliases: ["aws", "amazon web services"] },
  { name: "Azure", aliases: ["azure"] },
  { name: "CI/CD", aliases: ["ci/cd", "continuous integration", "continuous deployment"] },
  { name: "Testing", aliases: ["jest", "cypress", "testing", "unit test"] },
  { name: "Agile", aliases: ["agile", "scrum", "kanban"] },
  { name: "Machine Learning", aliases: ["machine learning", "ml"] },
  { name: "Deep Learning", aliases: ["deep learning"] },
  { name: "NLP", aliases: ["nlp", "natural language processing"] },
  { name: "TensorFlow", aliases: ["tensorflow"] },
  { name: "PyTorch", aliases: ["pytorch"] },
  { name: "Pandas", aliases: ["pandas"] },
  { name: "NumPy", aliases: ["numpy"] },
  { name: "Excel", aliases: ["excel", "spreadsheets"] },
  { name: "Power BI", aliases: ["power bi"] },
  { name: "Tableau", aliases: ["tableau"] },
  { name: "Figma", aliases: ["figma"] },
  { name: "Product Sense", aliases: ["product", "roadmap", "stakeholder"] },
  { name: "Communication", aliases: ["communication", "collaboration", "cross-functional"] }
];

const SAMPLE_RESUME = `Aarav Patel
aarav.patel@email.com | +91 98765 43210 | linkedin.com/in/aaravpatel | github.com/aaravcodes

SUMMARY
Frontend engineer with 3+ years of experience building responsive web products using React, TypeScript, JavaScript, HTML, CSS, and REST APIs. Strong collaborator with experience working in Agile teams and shipping customer-facing features.

EXPERIENCE
Frontend Developer | NovaStack | Jan 2023 - Present
- Built React and TypeScript dashboards used by 12,000+ monthly users.
- Improved page load speed by 34% through code splitting and asset optimization.
- Integrated REST APIs and reduced failed requests by 18%.
- Partnered with design and backend teams in Agile sprints.

Software Engineer | BrightPixel | Jul 2021 - Dec 2022
- Developed reusable UI components with JavaScript, HTML, CSS, and Git-based workflows.
- Wrote unit tests and raised feature reliability across critical user journeys.

SKILLS
React, TypeScript, JavaScript, HTML, CSS, REST APIs, Git, Agile, Testing

EDUCATION
B.Tech in Computer Science | Gujarat Technological University | 2021`;

const SAMPLE_JOB = `Frontend Engineer

We are looking for a Frontend Engineer with strong experience in React, TypeScript, JavaScript, HTML, CSS, and modern component architecture.

Requirements:
- 3+ years of frontend engineering experience
- Strong experience with React, TypeScript, HTML, CSS, and REST APIs
- Familiarity with Next.js, testing, Git, and Agile product teams
- Ability to collaborate with designers and backend engineers
- Experience optimizing performance and accessibility

Preferred:
- Exposure to CI/CD pipelines
- Knowledge of Figma and product thinking`;

function normalizeText(text) {
  return text.toLowerCase().replace(/\s+/g, " ").trim();
}

function countWords(text) {
  const words = text.trim().match(/\b[\w+#./-]+\b/g);
  return words ? words.length : 0;
}

function updateWordStats() {
  resumeStats.textContent = `${countWords(resumeInput.value)} words`;
  jobStats.textContent = `${countWords(jobInput.value)} words`;
}

function readTextFile(file, target) {
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    target.value = reader.result;
    updateWordStats();
  };
  reader.readAsText(file);
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

function extractSections(text) {
  const normalized = normalizeText(text);
  return {
    summary: /(summary|profile|objective)/.test(normalized),
    experience: /(experience|work history|employment)/.test(normalized),
    skills: /(skills|technical skills|toolkit)/.test(normalized),
    education: /(education|academic)/.test(normalized),
    projects: /(projects|personal projects)/.test(normalized)
  };
}

function analyzeResume(text) {
  const normalized = normalizeText(text);
  const words = countWords(text);
  const sections = extractSections(text);
  const skills = extractSkills(text);
  const bullets = (text.match(/^\s*[-*•]/gm) || []).length;
  const quantifiedBullets = (
    text.match(/(\d+%|\d+\+|\$\d+|\d{1,3},\d{3}|\d+\s*(users|customers|projects|clients|days|months))/gi) || []
  ).length;

  return {
    words,
    skills,
    sections,
    bullets,
    quantifiedBullets,
    hasEmail: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(text),
    hasPhone: /(\+\d{1,3}[\s-]?)?(\d[\s-]?){10,}/.test(text),
    hasLinkedIn: normalized.includes("linkedin"),
    hasGithub: normalized.includes("github"),
    mentionsAccessibility: normalized.includes("accessibility"),
    mentionsPerformance: /(performance|optimization|optimized|latency|speed)/.test(normalized),
    mentionsLeadership: /(lead|mentored|ownership|owned|stakeholder)/.test(normalized),
    experienceYearsMatch: normalized.match(/(\d+)\+?\s+years/)
  };
}

function analyzeJob(text) {
  const normalized = normalizeText(text);
  const skills = extractSkills(text);
  const seniorityMatch = normalized.match(/(\d+)\+?\s+years/);
  return {
    skills,
    yearsRequired: seniorityMatch ? Number.parseInt(seniorityMatch[1], 10) : null,
    wantsAccessibility: normalized.includes("accessibility"),
    wantsPerformance: /(performance|optimization|optimize)/.test(normalized),
    wantsLeadership: /(lead|ownership|stakeholder|mentor)/.test(normalized)
  };
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function scoreCandidate(resumeText, jobText) {
  const resume = analyzeResume(resumeText);
  const job = analyzeJob(jobText);

  const matchedSkills = job.skills.filter((skill) => resume.skills.includes(skill));
  const missingSkills = job.skills.filter((skill) => !resume.skills.includes(skill));

  const skillCoverageRaw = job.skills.length
    ? matchedSkills.length / job.skills.length
    : 0.5;
  const skillCoverage = Math.round(skillCoverageRaw * 55);

  const sectionsPresent = Object.values(resume.sections).filter(Boolean).length;
  const structureScore = Math.round((sectionsPresent / 5) * 12);
  const contactScore = [resume.hasEmail, resume.hasPhone, resume.hasLinkedIn].filter(Boolean).length;
  const atsScore = clamp(structureScore + contactScore, 0, 15);

  const achievementScore = clamp(resume.quantifiedBullets * 3, 0, 10);

  let alignmentScore = 0;
  if (job.wantsPerformance && resume.mentionsPerformance) {
    alignmentScore += 3;
  }
  if (job.wantsAccessibility && resume.mentionsAccessibility) {
    alignmentScore += 3;
  }
  if (job.wantsLeadership && resume.mentionsLeadership) {
    alignmentScore += 2;
  }
  if (resume.bullets >= 4) {
    alignmentScore += 2;
  }
  alignmentScore = clamp(alignmentScore, 0, 10);

  let readabilityScore = 0;
  if (resume.words >= 180 && resume.words <= 900) {
    readabilityScore += 5;
  } else if (resume.words > 0) {
    readabilityScore += 2;
  }
  if (resume.sections.summary) {
    readabilityScore += 2;
  }
  if (resume.sections.skills) {
    readabilityScore += 2;
  }
  if (resume.sections.experience) {
    readabilityScore += 1;
  }
  readabilityScore = clamp(readabilityScore, 0, 10);

  const total = clamp(
    skillCoverage + atsScore + achievementScore + alignmentScore + readabilityScore,
    0,
    100
  );

  const strengths = [];
  const risks = [];
  const recommendations = [];

  if (matchedSkills.length >= 5) {
    strengths.push("Strong overlap with the role's core technical requirements.");
  }
  if (resume.quantifiedBullets >= 2) {
    strengths.push("Resume includes measurable impact, which helps recruiter confidence.");
  }
  if (resume.hasLinkedIn && resume.hasGithub) {
    strengths.push("Profile includes portfolio-style links that strengthen credibility.");
  }
  if (resume.mentionsPerformance && job.wantsPerformance) {
    strengths.push("Performance optimization experience aligns directly with the job ask.");
  }

  if (!resume.sections.summary) {
    risks.push("No summary section found, which makes first-pass screening harder.");
    recommendations.push("Add a 2-3 line summary tailored to the job title and main stack.");
  }
  if (!resume.sections.skills) {
    risks.push("No dedicated skills section found for ATS keyword scanning.");
    recommendations.push("Create a skills section listing the exact technologies from the job description.");
  }
  if (missingSkills.length > 0) {
    risks.push(`Missing keywords: ${missingSkills.slice(0, 5).join(", ")}${missingSkills.length > 5 ? "..." : ""}`);
    recommendations.push("Mirror the most relevant missing job keywords where you have real experience, especially in the summary, skills, and latest role.");
  }
  if (resume.quantifiedBullets === 0) {
    risks.push("Few or no quantified achievements found.");
    recommendations.push("Rewrite experience bullets to include metrics like %, revenue, users, speed, or delivery impact.");
  }
  if (!resume.hasLinkedIn) {
    risks.push("LinkedIn profile was not detected.");
    recommendations.push("Add a LinkedIn URL near your contact details to improve recruiter trust.");
  }
  if (resume.words > 950) {
    risks.push("Resume appears long, which may reduce scanability.");
    recommendations.push("Trim older or lower-impact bullets and keep the strongest role evidence.");
  }
  if (job.yearsRequired && resume.experienceYearsMatch) {
    const years = Number.parseInt(resume.experienceYearsMatch[1], 10);
    if (years < job.yearsRequired) {
      risks.push(`Role asks for ${job.yearsRequired}+ years, but the resume signals ${years}+ years.`);
      recommendations.push("Emphasize ownership, shipped outcomes, and scope to offset the experience gap.");
    }
  }

  if (recommendations.length === 0) {
    recommendations.push("Tighten the top summary and reorder bullets so the most role-relevant evidence appears first.");
  }

  const scoreSummary =
    total >= 80
      ? "Strong fit. This resume already aligns well with the target role."
      : total >= 60
        ? "Promising fit. A few targeted keyword and impact edits could raise the score."
        : "Moderate fit. The resume needs sharper alignment with the job requirements.";

  return {
    total,
    matchedSkills,
    missingSkills,
    strengths,
    risks,
    recommendations,
    scoreSummary,
    breakdown: [
      { label: "Skill coverage", score: skillCoverage, max: 55 },
      { label: "ATS structure", score: atsScore, max: 15 },
      { label: "Impact evidence", score: achievementScore, max: 10 },
      { label: "Role alignment", score: alignmentScore, max: 10 },
      { label: "Readability", score: readabilityScore, max: 10 }
    ],
    snapshot: [
      { label: "Resume words", value: String(resume.words) },
      { label: "Matched skills", value: String(matchedSkills.length) },
      { label: "Job skills detected", value: String(job.skills.length) },
      { label: "Quantified wins", value: String(resume.quantifiedBullets) },
      {
        label: "Core sections",
        value: `${Object.values(resume.sections).filter(Boolean).length}/5`
      }
    ],
    hero: {
      skillMatch: Math.round(skillCoverageRaw * 100),
      atsReadiness: Math.round((atsScore / 15) * 100),
      missingCount: missingSkills.length
    }
  };
}

function renderChips(container, items, tone) {
  container.innerHTML = "";
  if (!items.length) {
    const empty = document.createElement("span");
    empty.className = "chip";
    empty.textContent = "None";
    container.appendChild(empty);
    return;
  }

  items.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = `chip ${tone}`;
    chip.textContent = item;
    container.appendChild(chip);
  });
}

function renderList(container, items, fallback) {
  container.innerHTML = "";
  const values = items.length ? items : [fallback];
  values.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    container.appendChild(li);
  });
}

function renderBreakdown(items) {
  breakdownList.innerHTML = "";
  items.forEach((item) => {
    const wrapper = document.createElement("div");
    wrapper.className = "breakdown-item";
    wrapper.innerHTML = `
      <div class="breakdown-top">
        <span>${item.label}</span>
        <strong>${item.score}/${item.max}</strong>
      </div>
      <div class="bar-track">
        <div class="bar-fill" style="width:${(item.score / item.max) * 100}%"></div>
      </div>
    `;
    breakdownList.appendChild(wrapper);
  });
}

function renderSnapshot(items) {
  snapshot.innerHTML = "";
  items.forEach((item) => {
    const row = document.createElement("div");
    row.className = "snapshot-row";
    row.innerHTML = `
      <div class="snapshot-line">
        <span>${item.label}</span>
        <strong>${item.value}</strong>
      </div>
    `;
    snapshot.appendChild(row);
  });
}

function renderResult(result) {
  overallScore.textContent = result.total;
  scoreRing.style.setProperty("--progress", `${result.total * 3.6}deg`);
  scoreSummary.textContent = result.scoreSummary;
  renderBreakdown(result.breakdown);
  renderSnapshot(result.snapshot);
  renderChips(matchedSkills, result.matchedSkills, "success");
  renderChips(missingSkills, result.missingSkills, "warning");
  renderList(strengthList, result.strengths, "No standout strengths detected yet. Add more quantified and role-specific evidence.");
  renderList(riskList, result.risks, "No major ATS risks detected.");
  renderList(recommendationList, result.recommendations, "Resume is already well aligned.");

  heroSkillMatch.textContent = `${result.hero.skillMatch}%`;
  heroAtsScore.textContent = `${result.hero.atsReadiness}%`;
  heroMissingCount.textContent = String(result.hero.missingCount);
}

function analyze() {
  const resumeText = resumeInput.value.trim();
  const jobText = jobInput.value.trim();

  if (!resumeText || !jobText) {
    scoreSummary.textContent = "Add both the resume and job description to generate a match analysis.";
    return;
  }

  const result = scoreCandidate(resumeText, jobText);
  renderResult(result);
}

resumeInput.addEventListener("input", updateWordStats);
jobInput.addEventListener("input", updateWordStats);
analyzeBtn.addEventListener("click", analyze);
analyzeTopBtn.addEventListener("click", analyze);
loadSampleBtn.addEventListener("click", () => {
  resumeInput.value = SAMPLE_RESUME;
  jobInput.value = SAMPLE_JOB;
  updateWordStats();
  analyze();
});
resumeFileInput.addEventListener("change", (event) => readTextFile(event.target.files[0], resumeInput));
jobFileInput.addEventListener("change", (event) => readTextFile(event.target.files[0], jobInput));
clearResumeBtn.addEventListener("click", () => {
  resumeInput.value = "";
  updateWordStats();
});
clearJobBtn.addEventListener("click", () => {
  jobInput.value = "";
  updateWordStats();
});

updateWordStats();
