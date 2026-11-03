import React, { Component } from "react";
import {
  assessmentCriteria,
  getReadiness,
} from "../../../Python-Mentor-Challenge/src/data/assessmentCriteria";

class OverallResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: "",
    };
  }

  buildReport = () => {
    const { student, scores, feedback } = this.props;

    const total = scores.reduce((sum, score) => sum + score, 0);
    const readiness = getReadiness(total);

    return [
      "TRANSFLOWER LEARNING — PYTHON MENTOR CHALLENGE",
      "VIDEO-BASED EMPLOYABILITY ASSESSMENT",
      "",
      `Student: ${student.studentName || "Not entered"}`,
      `Python topic: ${student.topic || "Not entered"}`,
      `Evaluating mentor: ${student.mentor || "Not entered"}`,
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
  };

  copyReport = async () => {
    try {
      await navigator.clipboard.writeText(this.buildReport());

      this.setState({
        message: "Assessment report copied.",
      });
    } catch {
      try {
        const textarea = document.createElement("textarea");
        textarea.value = this.buildReport();
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";

        document.body.appendChild(textarea);
        textarea.select();

        const copied = document.execCommand("copy");
        textarea.remove();

        this.setState({
          message: copied
            ? "Assessment report copied."
            : "Copy failed. Use Print / Save as PDF.",
        });
      } catch {
        this.setState({
          message: "Copy failed. Use Print / Save as PDF.",
        });
      }
    }
  };

  handleReset = () => {
    const confirmed = window.confirm(
      "Clear all student details, scores and feedback?"
    );

    if (confirmed) {
      this.props.onReset();
      this.setState({ message: "" });
    }
  };

  render() {
    const { scores, feedback, setFeedback } = this.props;

    const total = scores.reduce((sum, score) => sum + score, 0);
    const readiness = getReadiness(total);

    return (
      <section className="card">
        <h2>Overall Result</h2>

        <div className="summary" aria-live="polite">
          <div>
            <small>TOTAL SCORE</small>
            <div className="total">
              {total}
              <span className="total-max"> / 100</span>
            </div>
          </div>

          <div>
            <div className="level">{readiness.title}</div>
            <div className="level-description">
              {readiness.description}
            </div>
          </div>
        </div>

        <div className="feedback-field">
          <label htmlFor="feedback">
            Mentor feedback — evidence, strengths and next steps
          </label>

          <textarea
            id="feedback"
            rows="5"
            placeholder="Enter mentor feedback..."
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
          />
        </div>

        <div className="actions">
          <button
            className="primary"
            type="button"
            onClick={this.copyReport}
          >
            Copy Assessment Report
          </button>

          <button
            className="secondary"
            type="button"
            onClick={() => {
              this.setState({ message: "" });
              window.print();
            }}
          >
            Print / Save as PDF
          </button>

          <button
            className="neutral"
            type="button"
            onClick={this.handleReset}
          >
            Reset Form
          </button>
        </div>

        <div className="message" role="status">
          {this.state.message}
        </div>
      </section>
    );
  }
}

export default OverallResult;