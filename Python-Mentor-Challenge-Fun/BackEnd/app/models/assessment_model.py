# models/assessment_model.py

from dataclasses import dataclass
from datetime import date, datetime
from typing import Optional


@dataclass
class Assessment:
    id: int
    student_id: Optional[str]
    python_topic: str
    evaluating_mentor: str
    assessment_date: date
    depth_of_understanding: int
    practical_demonstration: int
    problem_solving_ability: int
    content_composition: int
    storytelling_ability: int
    communication_skills: int
    presentation_confidence: int
    visual_video_quality: int
    ai_literacy_independent_thinking: int
    professionalism_audience_engagement: int
    total_score: int
    feedback: Optional[str]
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None