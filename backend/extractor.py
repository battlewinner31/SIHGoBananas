import os

from dotenv import load_dotenv
from google import genai

from models import ProblemSpecification


load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def structure_government_problem(
    raw_statement: str
) -> ProblemSpecification:

    response = client.models.generate_content(
        model="gemini-3.6-flash",

        contents=(
            "Extract a structured municipal procurement "
            "specification from this government problem statement.\n\n"
            f"{raw_statement}"
        ),

        config={
            "response_mime_type": "application/json",
            "response_schema": ProblemSpecification,
        },
    )

    if response.parsed is not None:
        return response.parsed

    if response.text:
        return ProblemSpecification.model_validate_json(
            response.text
        )

    raise ValueError(
        "Gemini returned an empty structured problem response."
    )