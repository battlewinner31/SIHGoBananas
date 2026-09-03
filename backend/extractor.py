import os
from dotenv import load_dotenv
from google import genai
from models import ProblemSpecification

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def structure_government_problem(raw_statement: str):
    response = client.models.generate_content(
        model="gemini-2.5-flash",  # <--- Change model name here
        contents=f"Extract structured specification from this problem statement: {raw_statement}",
        config={
            'response_mime_type': 'application/json',
            'response_schema': ProblemSpecification,
        },
    )
    return response.parsed