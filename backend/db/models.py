from sqlalchemy import Column, Integer, String, Boolean
from .database import Base
from pydantic import BaseModel


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False, index=True)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)

class Startup(Base):
    __tablename__ = "startups"

    id = Column(String, primary_key=True)
    name = Column(String, nullable=False)
    dpiit_registered = Column(Boolean, default=False)
    trl_level = Column(Integer)
    past_deployments = Column(Integer, default=0)
    active_litigation = Column(Boolean, default=False)
    capabilities = Column(String)

class Challenge(Base):
    __tablename__ = "challenges"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    domain = Column(String)
    budget_inr = Column(Integer)
    duration_days = Column(Integer)

class ChallengeRequirement(Base):
    __tablename__ = "challenge_requirements"

    id = Column(Integer, primary_key=True, index=True)
    challenge_id = Column(Integer, nullable=False)
    requirement = Column(String, nullable=False)


class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    challenge_id = Column(Integer, nullable=False)
    startup_id = Column(String, nullable=False)
    match_score = Column(Integer)
    justification = Column(String)


class ReadinessAssessment(Base):
    __tablename__ = "readiness_assessments"

    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, nullable=False)
    overall_score = Column(Integer)
    recommendation = Column(String)
    findings = Column(String)


class Pilot(Base):
    __tablename__ = "pilots"

    id = Column(Integer, primary_key=True, index=True)
    match_id = Column(Integer, nullable=False)
    status = Column(String, default="PLANNED")
    start_date = Column(String)
    end_date = Column(String)


class KPI(Base):
    __tablename__ = "kpis"

    id = Column(Integer, primary_key=True, index=True)
    pilot_id = Column(Integer, nullable=False)
    name = Column(String, nullable=False)
    baseline = Column(String)
    target = Column(String)
    actual = Column(String)


class Milestone(Base):
    __tablename__ = "milestones"

    id = Column(Integer, primary_key=True, index=True)
    pilot_id = Column(Integer, nullable=False)
    title = Column(String, nullable=False)
    status = Column(String, default="PENDING")


class Decision(Base):
    __tablename__ = "decisions"

    id = Column(Integer, primary_key=True, index=True)
    pilot_id = Column(Integer, nullable=False)
    decision = Column(String, nullable=False)
    reason = Column(String)

class InnovationReadinessReport(BaseModel):
    overall_score: int
    recommendation: str
    findings: str