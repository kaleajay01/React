
import React, { useState } from "react";

import AssessmentHeader from "./components/AssessmentHeader";
import StudentInformation from "./components/StudentInformation";
import AssessmentRubric from "./components/AssessmentRubric";
import OverallResult from "./components/OverallResult";
import ScoringGuide from "./components/ScoringGuide";
import { saveAssessment } from "./routes/api";
import "./App.css";

// Initial student information
const initialStudent = {
  studentId: "",
  pythonTopic: "",
  mentor: "",
  assessmentDate: "",
};

// Database score field names
const scoreFields = [
  "depth_of_understanding",
  "practical_demonstration",
  "problem_solving_ability",
  "content_composition",
  "storytelling_ability",
  "communication_skills",
  "presentation_confidence",
  "visual_video_quality",
  "ai_literacy_independent_thinking",
  "professionalism_audience_engagement",
];

function App() {
  const [student, setStudent] = useState(initialStudent);
  const [scores, setScores] = useState(Array(10).fill(0));
  const [feedback, setFeedback] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);

  // Save assessment to the backend
  async function handleSaveAssessment() {
    setSaveMessage("");

    // Validate required fields
    if (
      !student.pythonTopic.trim() ||
      !student.mentor.trim() ||
      !student.assessmentDate
    ) {
      setSaveMessage(
        "Please enter the Python topic, evaluating mentor, and assessment date."
      );
      return;
    }

    // Calculate total score
    const totalScore = scores.reduce(
      (total, score) => total + Number(score),
      0
    );

    // Prepare data for the database
    const assessmentData = {
      student_id: student.studentId.trim() || null,
      python_topic: student.pythonTopic.trim(),
      evaluating_mentor: student.mentor.trim(),
      assessment_date: student.assessmentDate,
      total_score: totalScore,
      feedback: feedback.trim() || null,
    };

    // Add all ten criterion scores
    scoreFields.forEach((field, index) => {
      assessmentData[field] = Number(scores[index]);
    });

    try {
      setSaving(true);

      await saveAssessment(assessmentData);

      setSaveMessage("Assessment saved successfully.");
    } catch (error) {
      console.error("Error saving assessment:", error);
      setSaveMessage(`Unable to save assessment. ${error.message}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="assessment-app">
      <AssessmentHeader />

      <main className="assessment-main">
        <StudentInformation
          student={student}
          setStudent={setStudent}
        />

        <AssessmentRubric
          scores={scores}
          setScores={setScores}
        />

        <OverallResult
          scores={scores}
          feedback={feedback}
          setFeedback={setFeedback}
          onSave={handleSaveAssessment}
          saving={saving}
          saveMessage={saveMessage}
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

export default App;
