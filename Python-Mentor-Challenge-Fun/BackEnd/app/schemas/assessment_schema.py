# app/schemas/assessment_schema.py

from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, Field


class Assessment(BaseModel):
    student_id: Optional[str] = None
    python_topic: str
    evaluating_mentor: str
    assessment_date: date

    depth_of_understanding: int = Field(default=0, ge=0, le=10)
    practical_demonstration: int = Field(default=0, ge=0, le=10)
    problem_solving_ability: int = Field(default=0, ge=0, le=10)
    content_composition: int = Field(default=0, ge=0, le=10)
    storytelling_ability: int = Field(default=0, ge=0, le=10)
    communication_skills: int = Field(default=0, ge=0, le=10)
    presentation_confidence: int = Field(default=0, ge=0, le=10)
    visual_video_quality: int = Field(default=0, ge=0, le=10)
    ai_literacy_independent_thinking: int = Field(default=0, ge=0, le=10)
    professionalism_audience_engagement: int = Field(default=0, ge=0, le=10)

    total_score: int = Field(default=0, ge=0, le=100)
    feedback: Optional[str] = None


class AssessmentResponse(Assessment):
    id: int
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True