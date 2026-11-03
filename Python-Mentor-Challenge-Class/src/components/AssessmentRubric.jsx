import React, { Component } from "react";
import { assessmentCriteria } from "../../../Python-Mentor-Challenge/src/data/assessmentCriteria";

class AssessmentRubric extends Component {
  handleScoreChange = (index, value) => {
    const scores = [...this.props.scores];
    scores[index] = Number(value);

    this.props.setScores(scores);
  };

  render() {
    const { scores } = this.props;

    return (
      <section className="card">
        <h2>Assessment Rubric — 100 Marks</h2>

        <p className="intro">
          Choose a score from 0 to 10 for each parameter.
          Evaluate observable evidence, not just video polish.
        </p>

        {assessmentCriteria.map((criterion, index) => (
          <article className="criterion" key={criterion.title}>
            <div className="criterion-top">
              <div>
                <h3>
                  {index + 1}. {criterion.title}
                </h3>
                <p>{criterion.detail}</p>
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
                this.handleScoreChange(index, event.target.value)
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
    );
  }
}

export default AssessmentRubric;