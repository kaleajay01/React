//overallresult.jsx
import React from "react";
import { getReadiness } from "../../../../try/test-one-file/src/data/assessmentCriteria";

function OverallResult({
  scores,
  feedback,
  setFeedback,
  onSave,
  saving,
  saveMessage,
}) {
  // Calculate the total score
  const total = scores.reduce((sum, score) => sum + Number(score), 0);

  // Get the readiness level
  const readiness = getReadiness(total);

  return (
    <section className="card">
      <h2>Overall Result</h2>

      {/* Display total score and readiness */}
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
          <div className="level">{readiness}</div>
        </div>
      </div>

      {/* Mentor feedback */}
      <div className="feedback-field">
        <label htmlFor="feedback">Mentor Feedback</label>

        <textarea
          id="feedback"
          rows="5"
          value={feedback}
          onChange={(event) => setFeedback(event.target.value)}
          placeholder="Enter feedback and recommendations..."
        />
      </div>

      {/* Save assessment */}
      <div className="actions">
        <button
          type="button"
          className="primary"
          onClick={onSave}
          disabled={saving}
        >
          {saving ? "Saving..." : "Save Assessment"}
        </button>
      </div>

      {/* Display save status */}
      {saveMessage && (
        <p className="message" role="status">
          {saveMessage}
        </p>
      )}
    </section>
  );
}

export default OverallResult;
