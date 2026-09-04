import json
from extractor import structure_government_problem
from matcher import rank_startups

sample_complaint = (
    "In Pune ward 4, tipper trucks are mixing dry and wet garbage. "
    "We need edge camera detection on tippers to check contamination before unloading, "
    "and offline tracking because cell network is bad around the river dump site."
)

print("Sending prompt to LLM...")
spec = structure_government_problem(sample_complaint)
print("\n--- EXTRACTED SPECIFICATION ---")
print(json.dumps(spec.model_dump(), indent=2))

ranked = rank_startups(spec)
print("\n--- RANKED MATCH RESULTS ---")
for r in ranked:
    print(f"\n[{r.startup_name}] - Score: {r.scores.overall_match_score}%")
    print(f"Audit Justification: {r.match_justification}")
    print(f"Gaps Flagged: {r.flagged_gaps}")
    