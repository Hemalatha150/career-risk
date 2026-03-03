import joblib
import os


# ===============================
# LOAD MODEL (optional - not dominating logic)
# ===============================

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

print("🔥 PREDICT FILE RUNNING FROM:", __file__)
model = joblib.load(
    os.path.join(BASE_DIR, "risk_model.pkl")
)

vectorizer = joblib.load(
    os.path.join(BASE_DIR, "vectorizer.pkl")
)


# ===============================
# DOMAIN RISK BOUNDARIES
# ===============================

domain_bounds = {
    "Cybersecurity Engineer": (5, 25),
    "ML Engineer": (5, 30),
    "Cloud Engineer": (10, 35),
    "DevOps Engineer": (15, 40),
    "Backend Developer": (30, 65),
    "Full Stack Developer": (35, 70),
    "Frontend Developer": (50, 90),
    "QA/Test Engineer": (60, 95),
    "Blockchain Developer": (55, 85),
    "App Developer": (45, 75),
    "Data Analyst": (35, 70)
}


# ===============================
# DOMAIN VOLATILITY CATEGORIES
# ===============================

high_volatility = [
    "Frontend Developer",
    "QA/Test Engineer",
    "Blockchain Developer"
]

medium_volatility = [
    "Backend Developer",
    "Full Stack Developer",
    "App Developer",
    "Data Analyst"
]

low_volatility = [
    "Cybersecurity Engineer",
    "ML Engineer",
    "Cloud Engineer",
    "DevOps Engineer"
]


# ===============================
# SKILL TREND LOGIC
# ===============================

TRENDING_SKILLS = [
    "react", "next", "typescript", "tailwind",
    "node", "fastapi", "springboot",
    "docker", "kubernetes", "aws", "azure", "gcp",
    "terraform", "microservices",
    "pytorch", "tensorflow", "langchain",
    "solidity", "web3", "blockchain",
    "mongodb", "postgresql", "redis",
    "graphql", "ci/cd"
]

OLD_SKILLS = [
    "jquery", "bootstrap 3", "php 5",
    "manual testing", "waterfall",
    "xml", "soap", "cobol",
    "vb6", "asp classic",
    "flash", "table layout"
]


# ===============================
# MAIN PREDICT FUNCTION
# ===============================

def predict_risk(data):

    print("🔥 FUNCTION CALLED")

    role = data.role.strip()
    years = int(data.years_experience)
    skills_text = data.skills.lower()

    domain_bounds = {
        "Cybersecurity Engineer": (5, 25),
        "ML Engineer": (5, 30),
        "Cloud Engineer": (10, 35),
        "DevOps Engineer": (15, 40),
        "Backend Developer": (30, 65),
        "Full Stack Developer": (35, 70),
        "Frontend Developer": (50, 90),
        "QA/Test Engineer": (60, 95),
        "Blockchain Developer": (55, 85),
        "App Developer": (45, 75),
        "Data Analyst": (35, 70)
    }

    min_risk, max_risk = domain_bounds.get(role, (40, 80))

    # Base risk
    base_map = {
        "Frontend Developer": 85,
        "QA/Test Engineer": 90,
        "Blockchain Developer": 80,
        "Backend Developer": 60,
        "Full Stack Developer": 60,
        "Cybersecurity Engineer": 15,
        "ML Engineer": 15,
        "Cloud Engineer": 25,
        "DevOps Engineer": 25
    }

    risk = base_map.get(role, 50)

    # Experience
    if years <= 1:
        risk += 5
    elif years <= 4:
        risk += 2
    elif years <= 8:
        risk -= 5
    else:
        risk -= 10

    # Trending impact small only
    TRENDING = ["react", "next", "typescript", "tailwind", "node", "docker", "aws"]
    OLD = ["jquery", "manual testing", "soap", "cobol"]

    risk -= sum(skill in skills_text for skill in TRENDING) * 2
    risk += sum(skill in skills_text for skill in OLD) * 3

    # Clamp
    risk = max(min_risk, min(max_risk, risk))

    return round(risk, 2)