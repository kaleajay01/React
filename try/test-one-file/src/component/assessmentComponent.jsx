
import React, { useState } from "react";

const assessmentCriteria = [
  {
    title: "Depth of understanding",
    description:
      "Explains the concept in their own words and why it works.",
  },
  {
    title: "Practical demonstration",
    description:
      "Runs working Python code and explains important lines and output.",
  },
  {
    title: "Problem-solving ability",
    description:
      "Covers a real use case, edge cases, errors or limitations.",
  },
  {
    title: "Content composition",
    description:
      "Uses a logical structure: introduction, explanation, demo and conclusion.",
  },
  {
    title: "Storytelling ability",
    description:
      "Uses a relatable scenario, analogy or example to teach the concept.",
  },
  {
    title: "Communication skills",
    description:
      "Speaks clearly and uses technical vocabulary appropriately.",
  },
  {
    title: "Presentation and confidence",
    description:
      "Appears prepared, composed and comfortable explaining the topic.",
  },
  {
    title: "Visual and video quality",
    description:
      "Audio, code, slides, diagrams and screen recording are clear and useful.",
  },
  {
    title: "AI literacy and independent thinking",
    description:
      "Validates AI-assisted content and can explain and modify their solution.",
  },
  {
    title: "Professionalism and audience engagement",
    description:
      "Respects the time limit, acknowledges sources and ends professionally.",
  },
];

const scoringLevels = [
  {
    score: "9–10",
    label: "Excellent",
    description:
      "Independent explanation, strong demonstration and real-world connection.",
  },
  {
    score: "7–8",
    label: "Good",
    description:
      "Correct and clear, with minor gaps or occasional reliance on notes.",
  },
  {
    score: "5–6",
    label: "Developing",
    description:
      "Understands basics but needs more depth, clarity or troubleshooting.",
  },
  {
    score: "3–4",
    label: "Weak",
    description:
      "Mostly memorized; limited understanding or incomplete demonstration.",
  },
  {
    score: "0–2",
    label: "Insufficient evidence",
    description:
      "Cannot explain the core idea or provide meaningful evidence.",
  },
];

function getReadiness(total) {
  if (total >= 90) {
    return {
      title: "Mentor-ready",
      description:
        "Strong independent explanation, demonstration and communication.",
    };
  }

  if (total >= 75) {
    return {
      title: "Workplace-ready potential",
      description: "Good foundation with a few areas to strengthen.",
    };
  }

  if (total >= 60) {
    return {
      title: "Developing",
      description:
        "More practice needed in applying and explaining concepts.",
    };
  }

  if (total >= 40) {
    return {
      title: "Needs guided practice",
      description:
        "Targeted support needed in understanding or communication.",
    };
  }

  return {
    title: "Rebuild fundamentals",
    description:
      "Revisit the concept and submit a fresh demonstration.",
  };
}

const inputClass =
  "mt-1.5 block w-full rounded-lg border border-[#cfd2d8] bg-white px-3 py-[11px] text-sm text-[#242424] outline-none transition focus:border-[#8b0000] focus:ring-2 focus:ring-red-100";

export default function PythonMentorAssessment() {
  const [student, setStudent] = useState({
    studentName: "",
    topic: "",
    mentor: "",
    assessmentDate: "",
  });

  const [scores, setScores] = useState(
    Array(assessmentCriteria.length).fill(0)
  );

  const [feedback, setFeedback] = useState("");
  const [message, setMessage] = useState("");

  const total = scores.reduce((sum, score) => sum + score, 0);
  const readiness = getReadiness(total);

  function handleStudentChange(event) {
    const { name, value } = event.target;

    setStudent((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleScoreChange(index, value) {
    setScores((previous) =>
      previous.map((score, i) =>
        i === index ? Number(value) : score
      )
    );
  }

  function buildReport() {
    return [
      "TRANSFLOWER LEARNING — PYTHON MENTOR CHALLENGE",
      "VIDEO-BASED EMPLOYABILITY ASSESSMENT",
      "",
      `Student: ${student.studentName.trim() || "Not entered"}`,
      `Python topic: ${student.topic.trim() || "Not entered"}`,
      `Evaluating mentor: ${student.mentor.trim() || "Not entered"}`,
      `Assessment date: ${student.assessmentDate || "Not entered"}`,
      "",
      ...assessmentCriteria.map(
        (criterion, index) =>
          `${index + 1}. ${criterion.title}: ${scores[index]}/10`
      ),
      "",
      `TOTAL: ${total}/100`,
      `READINESS LEVEL: ${readiness.title}`,
      `Interpretation: ${readiness.description}`,
      "",
      "MENTOR FEEDBACK:",
      feedback.trim() || "Not entered",
      "",
      "Note: This is one source of employability evidence, not a standalone hiring decision.",
    ].join("\n");
  }

  async function copyReport() {
    try {
      await navigator.clipboard.writeText(buildReport());
      setMessage(
        "Assessment report copied. Paste it into your document or spreadsheet."
      );
    } catch {
      setMessage(
        "Copy was blocked by the browser. Use Print / Save as PDF instead."
      );
    }
  }

  function printReport() {
    setMessage("");
    window.print();
  }

  function resetForm() {
    const confirmed = window.confirm(
      "Clear all student details, scores and feedback?"
    );

    if (!confirmed) return;

    setStudent({
      studentName: "",
      topic: "",
      mentor: "",
      assessmentDate: "",
    });

    setScores(Array(assessmentCriteria.length).fill(0));
    setFeedback("");
    setMessage("");
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] font-sans leading-6 text-[#242424]">
      {/* Header */}
      <header className="bg-gradient-to-br from-[#5f0000] to-[#8b0000] px-[18px] py-7 text-center text-white print:border-b-2 print:border-[#8b0000] print:bg-white print:text-black">
        <p className="mb-1 text-sm font-bold uppercase tracking-[2px]">
          Transflower Learning
        </p>

        <h1 className="text-2xl font-bold sm:text-4xl">
          Python Mentor Challenge
        </h1>

        <p className="mt-2 text-sm text-[#ffe6e6] print:text-gray-700">
          Video-Based Employability Assessment · 20-Minute Presentation
        </p>
      </header>

      <main className="mx-auto my-6 max-w-[960px] px-4 pb-9">
        {/* Student Information */}
        <section className="mb-[18px] rounded-[14px] border border-[#e5e5e5] bg-white p-4 shadow-[0_3px_12px_rgba(0,0,0,0.035)] sm:p-[22px]">
          <h2 className="mb-3.5 text-xl font-bold">
            Student Information
          </h2>

          <p className="-mt-1.5 mb-4 text-sm text-[#666]">
            Record the student details before evaluating the video.
          </p>

          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <label className="block text-sm font-bold">
              Student name / ID
              <input
                className={inputClass}
                type="text"
                name="studentName"
                value={student.studentName}
                onChange={handleStudentChange}
                placeholder="Enter student name or ID"
              />
            </label>

            <label className="block text-sm font-bold">
              Python topic
              <input
                className={inputClass}
                type="text"
                name="topic"
                value={student.topic}
                onChange={handleStudentChange}
                placeholder="e.g. Decorators, Generators, Exceptions"
              />
            </label>

            <label className="block text-sm font-bold">
              Evaluating mentor
              <input
                className={inputClass}
                type="text"
                name="mentor"
                value={student.mentor}
                onChange={handleStudentChange}
                placeholder="Mentor name"
              />
            </label>

            <label className="block text-sm font-bold">
              Assessment date
              <input
                className={inputClass}
                type="date"
                name="assessmentDate"
                value={student.assessmentDate}
                onChange={handleStudentChange}
              />
            </label>
          </div>
        </section>

        {/* Assessment Rubric */}
        <section className="mb-[18px] rounded-[14px] border border-[#e5e5e5] bg-white p-4 shadow-[0_3px_12px_rgba(0,0,0,0.035)] sm:p-[22px]">
          <h2 className="mb-3.5 text-xl font-bold">
            Assessment Rubric — 100 Marks
          </h2>

          <p className="-mt-1.5 mb-4 text-sm text-[#666]">
            Choose a score from 0 to 10 for each parameter.
            Evaluate observable evidence, not just video polish.
          </p>

          {assessmentCriteria.map((criterion, index) => (
            <article
              key={criterion.title}
              className="mt-3 rounded-[10px] border border-[#e5e5e5] p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="text-base font-bold">
                    {index + 1}. {criterion.title}
                  </h3>

                  <p className="mb-2.5 mt-1 text-[13px] leading-5 text-[#666]">
                    {criterion.description}
                  </p>
                </div>

                <span className="min-w-14 shrink-0 rounded-lg bg-[#fff0f0] px-2 py-[5px] text-center font-bold text-[#8b0000]">
                  {scores[index]} / 10
                </span>
              </div>

              <input
                type="range"
                min="0"
                max="10"
                step="1"
                value={scores[index]}
                onChange={(event) =>
                  handleScoreChange(index, event.target.value)
                }
                aria-label={`${criterion.title}, score out of 10`}
                className="w-full cursor-pointer accent-[#8b0000]"
              />

              <div className="flex justify-between gap-2 text-[11px] text-[#666] sm:text-xs">
                <span>0 — Insufficient</span>
                <span>5 — Developing</span>
                <span>10 — Excellent</span>
              </div>
            </article>
          ))}
        </section>

        {/* Overall Result */}
        <section className="mb-[18px] rounded-[14px] border border-[#e5e5e5] bg-white p-4 shadow-[0_3px_12px_rgba(0,0,0,0.035)] sm:p-[22px]">
          <h2 className="mb-3.5 text-xl font-bold">
            Overall Result
          </h2>

          <div
            className="flex flex-wrap items-center justify-between gap-[18px] rounded-xl border border-[#ecd5d5] bg-[#faf5f5] p-[18px]"
            aria-live="polite"
          >
            <div>
              <small className="font-bold tracking-[0.8px] text-[#666]">
                TOTAL SCORE
              </small>

              <div className="text-4xl font-extrabold leading-tight text-[#8b0000]">
                {total}
                <span className="text-lg font-normal text-[#666]">
                  {" "}/ 100
                </span>
              </div>
            </div>

            <div className="min-w-0 sm:max-w-[55%]">
              <div className="text-[17px] font-bold">
                {readiness.title}
              </div>

              <p className="mt-1 text-[13px] leading-5 text-[#666]">
                {readiness.description}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="feedback"
              className="mb-1.5 block text-sm font-bold"
            >
              Mentor feedback — evidence, strengths and next steps
            </label>

            <textarea
              id="feedback"
              rows={5}
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              placeholder="Example: Explains loops clearly. Next step: demonstrate a boundary case and explain why it occurs."
              className={`${inputClass} min-h-28 resize-y`}
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2.5">
            <button
              type="button"
              onClick={copyReport}
              className="rounded-lg bg-[#8b0000] px-4 py-[11px] font-bold text-white transition hover:bg-[#5f0000] focus:outline-none focus:ring-2 focus:ring-red-300 print:hidden"
            >
              Copy Assessment Report
            </button>

            <button
              type="button"
              onClick={printReport}
              className="rounded-lg border border-[#8b0000] bg-white px-4 py-[11px] font-bold text-[#8b0000] transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200 print:hidden"
            >
              Print / Save as PDF
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="rounded-lg bg-[#eceef1] px-4 py-[11px] font-bold text-[#292929] transition hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 print:hidden"
            >
              Reset Form
            </button>
          </div>

          <p
            className="mt-2 min-h-[22px] text-sm text-[#246b37] print:hidden"
            role="status"
          >
            {message}
          </p>
        </section>

        {/* Scoring Guide */}
        <section className="mb-[18px] rounded-[14px] border border-[#e5e5e5] bg-white p-4 shadow-[0_3px_12px_rgba(0,0,0,0.035)] sm:p-[22px]">
          <h2 className="mb-3.5 text-xl font-bold">
            Scoring Guide
          </h2>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {scoringLevels.map((level) => (
              <div
                key={level.score}
                className="rounded-lg bg-[#f7f7f8] p-3"
              >
                <strong className="mb-1 block">
                  {level.score} · {level.label}
                </strong>

                <p className="text-sm leading-5 text-[#444]">
                  {level.description}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-3.5 text-sm leading-6 text-[#666]">
            Suggested readiness bands: 90–100 Mentor-ready ·
            75–89 Workplace-ready potential · 60–74 Developing ·
            40–59 Needs guided practice · 0–39 Rebuild fundamentals.
            These are internal guidance bands, not universal hiring
            standards.
          </p>
        </section>
      </main>

      <footer className="px-4 pb-6 pt-2 text-center text-[13px] text-[#666] print:hidden">
        Transflower Learning · Learn deeply. Demonstrate clearly.
        Mentor responsibly.
      </footer>

      {/* Print-specific styling */}
      <style>{`
        @media print {
          body {
            background: white !important;
          }

          main {
            max-width: none !important;
            margin: 10px auto !important;
          }

          main section {
            break-inside: avoid;
            box-shadow: none !important;
          }

          input,
          textarea {
            border: 1px solid #aaa !important;
          }

          input[type="range"] {
            print-color-adjust: exact;
          }

          button,
          footer,
          [role="status"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
