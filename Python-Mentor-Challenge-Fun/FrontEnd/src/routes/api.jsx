
const API_BASE_URL = "http://127.0.0.1:8000";

// Check FastAPI connection
export async function checkBackend() {
  const response = await fetch(`${API_BASE_URL}/`);

  if (!response.ok) {
    throw new Error("FastAPI server is not responding");
  }

  return response.json();
}


// Save a complete assessment
export async function saveAssessment(assessment) {
  const response = await fetch(
    `${API_BASE_URL}/api/assessments/addassessment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(assessment),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}
