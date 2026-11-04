# app/api/routes/assessment_routes.py

from fastapi import APIRouter, Depends, HTTPException, Request, status

from app.schemas.assessment_schema import Assessment, AssessmentResponse
from app.services.assessment_service import AssessmentService
from app.models.assessment_model import Assessment as AssessmentModel


router = APIRouter(prefix="/api/assessments", tags=["Assessments"])


def get_assessment_service(request: Request) -> AssessmentService:
    return request.app.state.assessment_service

@router.post("/addassessment", status_code=status.HTTP_201_CREATED)
def create_assessment_new(
    assessment: Assessment,
    service: AssessmentService = Depends(get_assessment_service)
):
    assessment_model = AssessmentModel(
        id=0,
        student_id=assessment.student_id,
        python_topic=assessment.python_topic,
        evaluating_mentor=assessment.evaluating_mentor,
        assessment_date=assessment.assessment_date,
        depth_of_understanding=assessment.depth_of_understanding,
        practical_demonstration=assessment.practical_demonstration,
        problem_solving_ability=assessment.problem_solving_ability,
        content_composition=assessment.content_composition,
        storytelling_ability=assessment.storytelling_ability,
        communication_skills=assessment.communication_skills,
        presentation_confidence=assessment.presentation_confidence,
        visual_video_quality=assessment.visual_video_quality,
        ai_literacy_independent_thinking=assessment.ai_literacy_independent_thinking,
        professionalism_audience_engagement=assessment.professionalism_audience_engagement,
        total_score=assessment.total_score,
        feedback=assessment.feedback
    )

    new_id = service.create_new_assessment(assessment_model)

    return {
        "message": "Assessment added successfully",
        "new_assessment_id": new_id
    }
