# app/services/assessment_service.py

from dataclasses import asdict

from app.repositories.assessment_repository import AssessmentRepository
from app.models.assessment_model import Assessment


class AssessmentService:

    def __init__(self, repository: AssessmentRepository):
        self.repository = repository

    def create_new_assessment(self, assessment: Assessment):
        id = self.repository.add_assessment(assessment)
        return id
