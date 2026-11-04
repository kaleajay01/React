from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.assessment_routes import router as assessment_router
from app.repositories.assessment_repository import AssessmentRepository
from app.services.assessment_service import AssessmentService


app = FastAPI(
    title="Transflower Assessment API",
    description="Python Mentor Challenge - Video-Based Employability Assessment API",
    version="1.0"
)

# Allow requests from the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create shared application dependencies
repository = AssessmentRepository()

app.state.assessment_service = AssessmentService(repository)

# Register API routes
app.include_router(assessment_router)


@app.get("/")
def home():
    return {
        "application": "Transflower Assessment",
        "message": "Welcome to Transflower Assessment REST API",
        "docs": "/docs"
    }
