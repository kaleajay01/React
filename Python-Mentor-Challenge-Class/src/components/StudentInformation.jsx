import React, { Component } from "react";

class StudentInformation extends Component {
  handleChange = (event) => {
    const { name, value } = event.target;

    this.props.setStudent({
      ...this.props.student,
      [name]: value,
    });
  };

  render() {
    const { student } = this.props;

    return (
      <section className="card">
        <h2>Student Information</h2>
        <p className="intro">
          Record the student details before evaluating the video.
        </p>

        <div className="fields">
          <div>
            <label htmlFor="studentName">Student name / ID</label>
            <input
              id="studentName"
              name="studentName"
              type="text"
              placeholder="Enter student name or ID"
              value={student.studentName}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="topic">Python topic</label>
            <input
              id="topic"
              name="topic"
              type="text"
              placeholder="e.g. Decorators, Generators, Exceptions"
              value={student.topic}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="mentor">Evaluating mentor</label>
            <input
              id="mentor"
              name="mentor"
              type="text"
              placeholder="Mentor name"
              value={student.mentor}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <label htmlFor="assessmentDate">Assessment date</label>
            <input
              id="assessmentDate"
              name="assessmentDate"
              type="text"
              placeholder="DD-MM-YYYY"
              value={student.assessmentDate}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </section>
    );
  }
}

export default StudentInformation;