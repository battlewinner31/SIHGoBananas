from db.database import SessionLocal
from db.models import Challenge

db = SessionLocal()

challenge = Challenge(
    title="Smart Waste Management",
    description="Improve municipal waste collection using AI and route optimization.",
    domain="Solid Waste Management",
    budget_inr=500000,
    duration_days=90
)

db.add(challenge)
db.commit()

print("CHALLENGE SAVED!")

db.close()