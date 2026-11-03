import React, { Component } from "react";

import AssessmentHeader from "../../Python-Mentor-Challenge-Fun/src/components/AssessmentHeader";
import StudentInformation from "../../Python-Mentor-Challenge-Fun/src/components/StudentInformation";
import AssessmentRubric from "../../Python-Mentor-Challenge-Fun/src/components/AssessmentRubric";
import OverallResult from "../../Python-Mentor-Challenge-Fun/src/components/OverallResult";
import ScoringGuide from "../../Python-Mentor-Challenge-Fun/src/components/ScoringGuide";

import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      student: {
        studentName: "",
        topic: "",
        mentor: "",
        assessmentDate: "",
      },
      scores: Array(10).fill(0),
      feedback: "",
    };
  }

  setStudent = (student) => {
    this.setState({ student });
  };

  setScores = (scores) => {
    this.setState({ scores });
  };

  setFeedback = (feedback) => {
    this.setState({ feedback });
  };

  resetAssessment = () => {
    this.setState({
      student: {
        studentName: "",
        topic: "",
        mentor: "",
        assessmentDate: "",
      },
      scores: Array(10).fill(0),
      feedback: "",
    });
  };

  render() {
    const { student, scores, feedback } = this.state;

    return (
      <div className="assessment-app">
        <AssessmentHeader />

        <main className="assessment-main">
          <StudentInformation
            student={student}
            setStudent={this.setStudent}
          />

          <AssessmentRubric
            scores={scores}
            setScores={this.setScores}
          />

          <OverallResult
            student={student}
            scores={scores}
            feedback={feedback}
            setFeedback={this.setFeedback}
            onReset={this.resetAssessment}
          />

          <ScoringGuide />
        </main>

        <footer className="assessment-footer">
          Transflower Learning · Learn deeply. Demonstrate clearly.
          Mentor responsibly.
        </footer>
      </div>
    );
  }
}

export default App;