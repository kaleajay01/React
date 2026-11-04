//scoringguide.jsx
import React from "react";

function ScoringGuide() {
  // Define the scoring levels
  const levels = [
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

  return (
    <section className="card scoring-guide">
      <h2>Scoring Guide</h2>

      {/* Display each scoring level */}
      <div className="scoring-grid">
        {levels.map((level) => (
          <div className="scoring-level" key={level.score}>
            <strong>
              {level.score} - {level.label}
            </strong>

            <p>{level.description}</p>
          </div>
        ))}
      </div>

      {/* Explain the overall readiness bands */}
      <p className="readiness-bands">
        Suggested readiness bands:
        90–100 Mentor-ready ·
        75–89 Workplace-ready potential ·
        60–74 Developing ·
        40–59 Needs guided practice ·
        0–39 Rebuild fundamentals.

        These are internal guidance bands, not universal hiring standards.
      </p>
    </section>
  );
}

export default ScoringGuide;
