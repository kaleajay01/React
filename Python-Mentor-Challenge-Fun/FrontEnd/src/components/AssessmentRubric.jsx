//assessmentrubric.jsx
import React from "react";
import { assessmentCriteria } from "../../../../try/test-one-file/src/data/assessmentCriteria";

function AssessmentRubric({ scores, setScores }) {
  function handleScoreChange(index, value) {
    const newScores = [...scores];
    newScores[index] = Number(value);
    setScores(newScores);
  }

  return (
    <section className="card">
      <h2 style={{ color: "black", fontWeight: "bold" }}>
        Assessment Rubric
      </h2>

      {assessmentCriteria.map((criterion, index) => (
        <div className="criterion" key={criterion.title}>
          <h3>
            {index + 1}. {criterion.title}
          </h3>

          <p>{criterion.description}</p>

          <div className="score">
            <label htmlFor={`score-${index}`}>
              Score: {scores[index]}/10
            </label>

            <input
              id={`score-${index}`}
              type="range"
              min="0"
              max="10"
              value={scores[index]}
              onChange={(event) =>
                handleScoreChange(index, event.target.value)
              }
            />
          </div>
        </div>
      ))}
    </section>
  );
}

export default AssessmentRubric;
