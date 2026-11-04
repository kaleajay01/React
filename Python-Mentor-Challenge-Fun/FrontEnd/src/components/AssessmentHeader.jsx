//assessmentheader.jsx
import React, { useEffect, useState } from "react";
import { checkBackend } from "../routes/api";

function AssessmentHeader() {

  return (
    <header className="assessment-header">
      <h1>Transflower Learning</h1>
      <h2>Python Mentor Challenge</h2>
      <p>Video-Based Employability Assessment</p>
      <p>Duration: 20 minutes | Total Marks: 100</p>
    </header>
  );
}

export default AssessmentHeader;
