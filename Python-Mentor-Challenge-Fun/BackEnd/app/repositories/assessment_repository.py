# app/repositories/assessment_repository.py

from app.models.assessment_model import Assessment
from app.core.config import getconnection


class AssessmentRepository:

    def add_assessment(self, assessment: Assessment):
        connection = getconnection()
        cursor = connection.cursor()

        try:
            total_score = (
                assessment.depth_of_understanding
                + assessment.practical_demonstration
                + assessment.problem_solving_ability
                + assessment.content_composition
                + assessment.storytelling_ability
                + assessment.communication_skills
                + assessment.presentation_confidence
                + assessment.visual_video_quality
                + assessment.ai_literacy_independent_thinking
                + assessment.professionalism_audience_engagement
            )

            cursor.execute(
                """
                INSERT INTO assessments (
                    student_id,
                    python_topic,
                    evaluating_mentor,
                    assessment_date,
                    depth_of_understanding,
                    practical_demonstration,
                    problem_solving_ability,
                    content_composition,
                    storytelling_ability,
                    communication_skills,
                    presentation_confidence,
                    visual_video_quality,
                    ai_literacy_independent_thinking,
                    professionalism_audience_engagement,
                    total_score,
                    feedback
                )
                VALUES (
                    %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s,
                    %s, %s, %s, %s, %s, %s
                )
                """,
                (
                    assessment.student_id,
                    assessment.python_topic,
                    assessment.evaluating_mentor,
                    assessment.assessment_date,
                    assessment.depth_of_understanding,
                    assessment.practical_demonstration,
                    assessment.problem_solving_ability,
                    assessment.content_composition,
                    assessment.storytelling_ability,
                    assessment.communication_skills,
                    assessment.presentation_confidence,
                    assessment.visual_video_quality,
                    assessment.ai_literacy_independent_thinking,
                    assessment.professionalism_audience_engagement,
                    total_score,
                    assessment.feedback
                )
            )

            connection.commit()
            return cursor.lastrowid

        except Exception:
            connection.rollback()
            raise

        finally:
            cursor.close()
            connection.close()