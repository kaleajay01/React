
import React, { useState } from "react";
import axios from "axios";
import "../../../../src/App.css";

const assessmentCriteria = [
  {
    title: "Depth of understanding",
    description: "Explains the concept in their own words and why it works.",
    field: "depth_understanding",
  },
  {
    title: "Practical demonstration",
    description: "Runs working Python code and explains the output.",
    field: "practical_demons",
  },
  {
    title: "Problem-solving ability",
    description: "Covers real use cases, edge cases, and errors.",
    field: "problem_ability",
  },
  {
    title: "Content composition",
    description: "Uses a logical introduction, explanation, demo, and conclusion.",
    field: "content",
  },
  {
    title: "Storytelling ability",
    description: "Uses relatable scenarios, analogies, or examples.",
    field: "storytelling",
  },
  {
    title: "Communication skills",
    description: "Speaks clearly and uses technical vocabulary appropriately.",
    field: "communication",
  },
  {
    title: "Presentation and confidence",
    description: "Appears prepared and explains the topic confidently.",
    field: "presentation",
  },
  {
    title: "Visual and video quality",
    description: "Audio, code, slides, and screen recording are clear.",
    field: "video_quality",
  },
  {
    title: "AI literacy and independent thinking",
    description: "Validates AI-assisted content and explains the solution.",
    field: "ai_literacy",
  },
  {
    title: "Professionalism and audience engagement",
    description: "Respects the time limit and presents professionally.",
    field: "professionalism",
  },
];

function getReadiness(total) {
  if (total >= 90) {
    return {
      title: "Mentor-ready",
      description:
        "Strong independent explanation, demonstration, and communication.",
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
        "More practice is needed in applying and explaining concepts.",
    };
  }

  if (total >= 40) {
    return {
      title: "Needs guided practice",
      description:
        "Targeted support is needed in understanding or communication.",
    };
  }

  return {
    title: "Rebuild fundamentals",
    description:
      "Revisit the concept and submit a fresh demonstration.",
  };
}

function VideoAssessment() {
  const [student, setStudent] = useState({
    studentId: "",
    pythonTopic: "",
    mentor: "",
    assessmentDate: new Date().toISOString().slice(0, 10),
  });

  const [scores, setScores] = useState(Array(10).fill(0));
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const total = scores.reduce((sum, score) => sum + Number(score), 0);
  const readiness = getReadiness(total);

  // Student information
  function handleStudentChange(event) {
    const { name, value } = event.target;

    setStudent((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  // Update assessment scores
  function handleScoreChange(index, value) {
    setScores((previous) =>
      previous.map((score, i) =>
        i === index ? Number(value) : score
      )
    );
  }

  // Convert backend validation errors into readable text
  function getErrorMessage(error) {
    const detail = error.response?.data?.detail;

    if (Array.isArray(detail)) {
      return detail
        .map((item) => {
          const field = Array.isArray(item.loc)
            ? item.loc.join(" -> ")
            : "Field";

          return `${field}: ${item.msg}`;
        })
        .join("\n");
    }

    if (typeof detail === "string") {
      return detail;
    }

    if (error.response?.status === 404) {
      return "API endpoint not found. Check the backend URL.";
    }

    if (error.response?.status === 500) {
      return "Backend database error. Check the FastAPI terminal.";
    }

    return error.message || "Unable to save the assessment.";
  }

  // Save assessment to FastAPI
  async function handleSave(event) {
    event.preventDefault();
    setSaveMessage("");

    const studentId = Number(student.studentId);
    const mentorId = Number(student.mentor);

    if (!Number.isInteger(studentId) || studentId <= 0) {
      setSaveMessage("Enter a valid existing numeric Student ID.");
      return;
    }

    if (!Number.isInteger(mentorId) || mentorId <= 0) {
      setSaveMessage("Enter a valid existing numeric Mentor ID.");
      return;
    }

    if (!student.pythonTopic.trim()) {
      setSaveMessage("Enter the Python topic.");
      return;
    }

    if (!student.assessmentDate) {
      setSaveMessage("Select the assessment date.");
      return;
    }

    const assessmentData = {
      student_id: studentId,
      topic: student.pythonTopic.trim(),
      mentor_id: mentorId,
      assessment_date: student.assessmentDate,

      depth_understanding: scores[0],
      practical_demons: scores[1],
      problem_ability: scores[2],
      content: scores[3],
      storytelling: scores[4],
      communication: scores[5],
      presentation: scores[6],
      video_quality: scores[7],
      ai_literacy: scores[8],
      professionalism: scores[9],

      total_score: total,
      feedback: feedback.trim() || null,
    };

    setSaving(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/assessments/addassessment",
        assessmentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const savedId = response.data.new_assessment_id;

      setSaveMessage(
        `Assessment saved successfully. Assessment ID: ${savedId}`
      );

      // Reset the form after a successful save
      setStudent({
        studentId: "",
        pythonTopic: "",
        mentor: "",
        assessmentDate: new Date().toISOString().slice(0, 10),
      });

      setScores(Array(10).fill(0));
      setFeedback("");
    } catch (error) {
      console.error("Assessment save error:", error);
      console.error("Backend response:", error.response?.data);

      setSaveMessage(getErrorMessage(error));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="assessment-page">
      {/* Assessment Header */}
      <header className="assessment-header">
        <h1>Transflower Learning</h1>
        <h2>Python Mentor Challenge</h2>
        <p>Video-Based Employability Assessment</p>
        <p>Duration: 20 minutes | Total Marks: 100</p>
      </header>

      <main>
        <form onSubmit={handleSave}>
          {/* Student Information */}
          <section className="card">
            <h2>Student Information</h2>
            <p className="intro">
              Enter the student and mentor details before evaluating.
            </p>

            <div className="fields">
              <label>
                Student ID
                <input
                  type="number"
                  name="studentId"
                  value={student.studentId}
                  onChange={handleStudentChange}
                  placeholder="Enter existing Student ID"
                  min="1"
                  required
                />
              </label>

              <label>
                Python Topic
                <input
                  type="text"
                  name="pythonTopic"
                  value={student.pythonTopic}
                  onChange={handleStudentChange}
                  placeholder="e.g. Decorators, Generators"
                  required
                />
              </label>

              <label>
                Mentor ID
                <input
                  type="number"
                  name="mentor"
                  value={student.mentor}
                  onChange={handleStudentChange}
                  placeholder="Enter existing Mentor ID"
                  min="1"
                  required
                />
              </label>

              <label>
                Assessment Date
                <input
                  type="date"
                  name="assessmentDate"
                  value={student.assessmentDate}
                  onChange={handleStudentChange}
                  required
                />
              </label>
            </div>
          </section>

          {/* Assessment Rubric */}
          <section className="card">
            <h2>Assessment Rubric — 100 Marks</h2>
            <p className="intro">
              Score each criterion from 0 to 10.
            </p>

            {assessmentCriteria.map((criterion, index) => (
              <article className="criterion" key={criterion.field}>
                <div className="criterion-top">
                  <div>
                    <h3>
                      {index + 1}. {criterion.title}
                    </h3>
                    <p>{criterion.description}</p>
                  </div>

                  <div className="score">
                    {scores[index]} / 10
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={scores[index]}
                  aria-label={`${criterion.title}, score out of 10`}
                  onChange={(event) =>
                    handleScoreChange(index, event.target.value)
                  }
                />

                <div className="range-labels">
                  <span>0 — Insufficient</span>
                  <span>5 — Developing</span>
                  <span>10 — Excellent</span>
                </div>
              </article>
            ))}
          </section>

          {/* Overall Result */}
          <section className="card">
            <h2>Overall Result</h2>

            <div className="summary">
              <div>
                <small>TOTAL SCORE</small>
                <div className="total">
                  {total}
                  <span className="total-max"> / 100</span>
                </div>
              </div>

              <div>
                <small>READINESS LEVEL</small>
                <div className="level">{readiness.title}</div>
                <p>{readiness.description}</p>
              </div>
            </div>

            <div className="feedback-field">
              <label htmlFor="feedback">Mentor Feedback</label>

              <textarea
                id="feedback"
                rows="5"
                value={feedback}
                onChange={(event) => setFeedback(event.target.value)}
                placeholder="Enter feedback, strengths, and recommendations..."
              />
            </div>

            <div className="actions">
              <button
                type="submit"
                className="primary"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Assessment"}
              </button>
            </div>

            {saveMessage && (
              <p className="message" role="status">
                {saveMessage}
              </p>
            )}
          </section>
        </form>

        {/* Scoring Guide */}
        <section className="card scoring-guide">
          <h2>Scoring Guide</h2>

          <div className="scoring-grid">
            <div className="scoring-level">
              <strong>9–10 — Excellent</strong>
              <p>
                Independent explanation, strong demonstration, and
                real-world connection.
              </p>
            </div>

            <div className="scoring-level">
              <strong>7–8 — Good</strong>
              <p>Correct and clear, with minor gaps.</p>
            </div>

            <div className="scoring-level">
              <strong>5–6 — Developing</strong>
              <p>Understands basics but needs more depth or practice.</p>
            </div>

            <div className="scoring-level">
              <strong>3–4 — Weak</strong>
              <p>Limited understanding or incomplete demonstration.</p>
            </div>

            <div className="scoring-level">
              <strong>0–2 — Insufficient evidence</strong>
              <p>Cannot explain the core concept adequately.</p>
            </div>
          </div>

          <p className="readiness-bands">
            Suggested readiness bands: 90–100 Mentor-ready ·
            75–89 Workplace-ready potential · 60–74 Developing ·
            40–59 Needs guided practice · 0–39 Rebuild fundamentals.
          </p>
        </section>
      </main>

      <footer>
        Transflower Learning · Learn deeply. Demonstrate clearly.
        Mentor responsibly.
      </footer>
    </div>
  );
}

export default VideoAssessment;
