import React, { Component } from "react";

class ScoringGuide extends Component {
  render() {
    const scoringLevels = [
      {
        title: "9–10 · Excellent",
        description:
          "Independent explanation, strong demonstration and real-world connection.",
      },
      {
        title: "7–8 · Good",
        description:
          "Correct and clear, with minor gaps or occasional reliance on notes.",
      },
      {
        title: "5–6 · Developing",
        description:
          "Understands basics but needs more depth, clarity or troubleshooting.",
      },
      {
        title: "3–4 · Weak",
        description:
          "Mostly memorized; limited understanding or incomplete demonstration.",
      },
      {
        title: "0–2 · Insufficient evidence",
        description:
          "Cannot explain the core idea or provide meaningful evidence.",
      },
    ];

    return (
      <section className="card">
        <h2>Scoring Guide</h2>

        <div className="rubric">
          {scoringLevels.map((item) => (
            <div key={item.title}>
              <strong>{item.title}</strong>
              {item.description}
            </div>
          ))}
        </div>

        <p className="intro guide-note">
          Suggested readiness bands: 90–100 Mentor-ready ·
          75–89 Workplace-ready potential · 60–74 Developing ·
          40–59 Needs guided practice · 0–39 Rebuild fundamentals.
          These are internal guidance bands, not universal hiring standards.
        </p>
      </section>
    );
  }
}

export default ScoringGuide;