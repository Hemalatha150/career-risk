from fastapi import FastAPI, HTTPException, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import re
import fitz  # PyMuPDF
from model.predict import predict_risk 
from typing import List, Optional

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RiskInput(BaseModel):
    role: str
    skills: str
    years_experience: float

class ChatRequest(BaseModel):
    message: str
    risk_level: str
    role: str
    skills: str

@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        doc = fitz.open(stream=contents, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        
        # Basic Extraction Logic
        # 1. Detect Role
        detected_role = "Full Stack Developer" # Default
        roles = ["Frontend Developer", "Backend Developer", "Full Stack Developer", "ML Engineer", 
                 "Cloud Engineer", "DevOps Engineer", "Data Analyst", "Cybersecurity Analyst", "Blockchain Developer"]
        
        for r in roles:
            if re.search(r.replace(" ", r"\s*"), text, re.IGNORECASE):
                detected_role = r
                break
        
        # 2. Detect Experience
        exp_match = re.search(r"(\d+)\+?\s*(years|yrs|experience)", text, re.IGNORECASE)
        detected_exp = float(exp_match.group(1)) if exp_match else 2.0
        
        # 3. Detect Skills (Simple keyword matching)
        potential_skills = ["React", "Node.js", "Python", "AWS", "Docker", "Kubernetes", "Java", "SQL", "MongoDB", "TypeScript"]
        found_skills = [s for s in potential_skills if re.search(s, text, re.IGNORECASE)]
        
        return {
            "status": "success",
            "extracted_data": {
                "role": detected_role,
                "years_experience": detected_exp,
                "skills": ", ".join(found_skills)
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume parsing error: {str(e)}")

@app.post("/chat")
async def chat_advice(data: ChatRequest):
    # Simple rule-based logic for the "AI Counselor"
    advice = ""
    if data.risk_level == "High":
        advice = f"Don't worry! Your role as {data.role} is evolving. I recommend focusing on emerging tech like GenAI or Cloud Architecture. Consider getting a 'Certified Solutions Architect' or 'AWS Machine Learning' certification to future-proof your career."
    elif data.risk_level == "Moderate":
        advice = f"You are in a good spot, but staying updated is key. Since you already know {data.skills.split(',')[0]}, adding a certification in Deep Learning or Advanced DevOps would really make your profile stand out."
    else:
        advice = "Your risk is low! Keep doing what you're doing. To stay at the top, maybe explore some leadership or system design courses."
    
    return {"reply": advice}

@app.post("/predict")
def predict(data: RiskInput):
    try:
        # 1. ADVANCED NORMALIZATION (Fix for "M L Engineer", "MLEngineer", etc.)
        raw_role = data.role.strip()
        no_space_role = raw_role.replace(" ", "").lower()
        
        # 2. MARKET-DRIVEN ROLE BOUNDARIES
        role_rules = {
            'Cybersecurity Analyst': {
                'min': 5, 'max': 30, 'ai': 0.15, 'demand': 0.98, 
                'market_reason': 'Cybersecurity is a high-demand human-centric role. Human intuition is mandatory for security.'
            },
            'ML Engineer': {
                'min': 8, 'max': 35, 'ai': 0.20, 'demand': 0.95,
                'market_reason': 'Core role driving the AI revolution; high demand for building and maintaining AI models.'
            },
            'Cloud Engineer': {
                'min': 15, 'max': 45, 'ai': 0.35, 'demand': 0.88,
                'market_reason': 'Cloud infrastructure is essential; however, automated provisioning (IaC) slightly impacts manual tasks.'
            },
            'DevOps Engineer': {
                'min': 12, 'max': 40, 'ai': 0.35, 'demand': 0.88,
                'market_reason': 'Critical for CICD, but AI is starting to automate standard deployment scripts.'
            },
            'Full Stack Developer': {
                'min': 40, 'max': 80, 'ai': 0.60, 'demand': 0.75,
                'market_reason': 'Versatility helps, but generic development is increasingly being handled by AI co-pilots.'
            },
            'App Developer': {
                'min': 35, 'max': 75, 'ai': 0.60, 'demand': 0.70,
                'market_reason': 'Mobile dev is stable, but low-code platforms are reducing the need for basic app builders.'
            },
            'Data Analyst': {
                'min': 50, 'max': 85, 'ai': 0.80, 'demand': 0.65,
                'market_reason': 'High risk as GenAI can now perform complex data cleaning and visualization.'
            },
            'Backend Developer': {
                'min': 60, 'max': 95, 'ai': 0.85, 'demand': 0.60,
                'market_reason': 'High risk due to AI ability to generate server-side logic and database schemas instantly.'
            },
            'Blockchain Developer': {
                'min': 65, 'max': 98, 'ai': 0.70, 'demand': 0.40,
                'market_reason': 'Market volatility and high specialization make this role highly unstable during downturns.'
            },
            'Frontend Developer': {
                'min': 70, 'max': 98, 'ai': 0.95, 'demand': 0.50,
                'market_reason': 'Very high risk; AI can now convert UI designs directly into high-quality code.'
            }
        }

        # ROLE MATCHING LOGIC
        normalized_role = raw_role # Default
        rule = None

        # Check for direct match or fuzzy match (ignoring spaces/case)
        for key in role_rules.keys():
            if key.replace(" ", "").lower() == no_space_role:
                rule = role_rules[key]
                normalized_role = key
                break
        
        # If no match found, use a safe default instead of crashing
        if not rule:
            rule = {
                'min': 30, 'max': 70, 'ai': 0.5, 'demand': 0.6, 
                'market_reason': 'Standard industry competition based on general market trends.'
            }
            normalized_role = raw_role

        # 3. Dynamic Explanation Builder
        reasons = []
        reasons.append(f"Role Impact: {rule['market_reason']}")

        # 4. Adjustment Logic - DYNAMIC SKILL EVALUATION (DIVERSITY + IMPACT)
        user_skills_raw = [s.strip().lower() for s in data.skills.split(',') if s.strip()]
        user_skills = set()
        
        # Simple plural/synonym normalization mapping for core skills
        normalization_map = {
            "node.js": "nodejs", "node": "nodejs", "reactjs": "react", 
            "amazon web services": "aws", "gcp": "google cloud", "ml": "machine learning",
            "ai": "artificial intelligence", "genai": "generative ai", 
            "javascript": "js", "typescript": "ts", "k8s": "kubernetes",
            "golang": "go", "postgres": "postgresql"
        }

        for s in user_skills_raw:
            normalized = normalization_map.get(s, s)
            user_skills.add(normalized)

        volume = len(user_skills)

        # A. DOMAIN KNOWLEDGE MAP
        domain_mapping = {
            "frontend": {"react", "vue", "angular", "svelte", "html", "css", "js", "ts", "tailwind", "bootstrap", "nextjs", "nuxt", "ui", "ux"},
            "backend": {"nodejs", "python", "java", "c#", "go", "rust", "php", "ruby", "django", "spring", "express", "fastapi"},
            "database": {"sql", "mysql", "postgresql", "mongodb", "redis", "cassandra", "dynamodb", "neo4j", "oracle"},
            "cloud_platform": {"aws", "azure", "google cloud", "heroku", "vercel", "cloudflare"},
            "devops_infra": {"docker", "kubernetes", "jenkins", "gitlab ci", "terraform", "ansible", "linux", "bash", "linux/unix", "ci/cd"},
            "data_ai": {"machine learning", "artificial intelligence", "data science", "pandas", "numpy", "tensorflow", "pytorch", "generative ai", "nlp", "llm", "data engineering", "spark"},
            "security": {"cybersecurity", "penetration testing", "ethical hacking", "owasp", "cryptography", "iam", "network security"}
        }

        # B. TRENDING & HIGH IMPACT TECHNOLOGIES (Outcome Creating)
        trending_tech = {"cloud", "aws", "azure", "google cloud", "kubernetes", "docker", "generative ai", "machine learning", "artificial intelligence", "devops", "go", "rust", "react", "nextjs", "terraform"}
        high_impact_tech = {"machine learning", "artificial intelligence", "generative ai", "data engineering", "cybersecurity", "cloud architecture", "kubernetes", "devsecops"}
        legacy_tech = {"jquery", "manual testing", "php 5", "html only", "css only", "vbscript", "cobol", "svn", "waterfall", "flash", "actionscript", "coldfusion"}

        # Tracking variables
        domains_covered = set()
        trending_count = 0
        impact_count = 0
        legacy_count = 0

        # Evaluate constraints
        for skill in user_skills:
            # 1. Check Domains
            for domain_name, domain_skills in domain_mapping.items():
                if any(ds in skill.split(' ') or ds == skill for ds in domain_skills):
                    domains_covered.add(domain_name)
            
            # 2. Check Trending
            if any(t in skill for t in trending_tech):
                trending_count += 1
                
            # 3. Check High Impact
            if any(i in skill for i in high_impact_tech):
                impact_count += 1
                
            # 4. Check Legacy
            if any(l in skill for l in legacy_tech):
                legacy_count += 1

        domain_count = len(domains_covered)
        adjustment = 0

        # Calculate logical weights (Max deduction combinations approx -35%)
        # Cross-Domain Diversity Bonus
        if domain_count >= 4:
            domain_bonus = -15
            reasons.append(f"Strong Cross-Domain Expertise: You span {domain_count} distinct tech domains (e.g. Frontend, DB, Cloud), significantly boosting your career stability (-15% risk).")
        elif domain_count >= 2:
            domain_bonus = -8
            reasons.append(f"Skill Diversity: You cover {domain_count} tech domains, showing good flexibility (-8% risk).")
        else:
            domain_bonus = 0
            if volume > 4:
                # Weak Diversity Penalty: High skill count but only 1 domain.
                domain_bonus = +5
                reasons.append(f"Weak Diversity: You listed {volume} skills, but they are concentrated in only 1 tech domain. Diverse teams prefer cross-functional engineers (+5% risk).")

        adjustment += domain_bonus

        # Trending Market Presence Bonus
        if trending_count >= 3:
            impact_mod = -10
            reasons.append(f"Trending Technologies: You use {trending_count} highly sought-after tools (like Cloud/AI/DevOps), making you extremely marketable (-10% risk).")
            adjustment += impact_mod
        elif trending_count > 0:
            impact_mod = -5
            reasons.append(f"Trending Knowledge: You possess {trending_count} trending tech skills (-5% risk).")
            adjustment += impact_mod
            
        # Outcome Impact / Hardcore Engineering Power Bonus
        if impact_count >= 2:
            outcome_mod = -10
            reasons.append(f"High Business Impact: Skills like AI, Data Eng, or Security directly protect or generate enterprise revenue. Excellent future-proofing (-10% risk).")
            adjustment += outcome_mod
        elif impact_count == 1:
            outcome_mod = -5
            reasons.append(f"Valuable Specialty: You possess a high-impact outcome skill (+1 Security/AI/Data), providing strong job security (-5% risk).")
            adjustment += outcome_mod

        # Legacy Penalty
        legacy_impact = min(legacy_count * 5.0, 20.0)
        adjustment += legacy_impact

        if legacy_count > 0:
            reasons.append(f"Legacy Tech Warning: Relying on {legacy_count} outdated technologies increases your risk of technological redundancy (+{legacy_impact}% risk).")
            
        if volume == 0:
            reasons.append("Skill Warning: No skills provided. Career stability requires an active toolkit.")

        # Experience Calculation (Safety check for NoneType)
        exp = data.years_experience if data.years_experience is not None else 0
        if exp > 8:
            adjustment -= 10
            reasons.append("Experience Factor: Seniority provides architectural depth that AI cannot easily replicate.")
        elif exp <= 2:
            adjustment += 15
            reasons.append("Experience Factor: Entry-level roles are currently more vulnerable to market shifts.")

        # 5. Final Score Calculation (With Error Handling)
        try:
            base_ai_risk = predict_risk(
                role=normalized_role, 
                experience_level="mid", 
                years_experience=exp, 
                ai_impact_score=rule['ai'], 
                automation_risk=rule['ai'], 
                market_demand=rule['demand'], 
                skill_adaptability=0.8
            )
            # If predict_risk returns None, handle it
            if base_ai_risk is None:
                base_ai_risk = (rule['min'] + rule['max']) / 2
        except Exception:
            # Fallback score if ML model fails
            base_ai_risk = (rule['min'] + rule['max']) / 2
        
        final_risk = max(rule['min'], min(base_ai_risk + adjustment, rule['max']))
        risk_level = "Low" if final_risk <= 35 else "Moderate" if final_risk <= 65 else "High"

        # 6. Simulated Risk for Target Roles (Comparative Risk Filtering)
        stable_target_role_keys = ['ML Engineer', 'Cybersecurity Analyst', 'DevOps Engineer', 'Data Analyst', 'Backend Developer']
        target_role_risks = {}

        for key in stable_target_role_keys:
            # Skip calculating if the user is already this role
            if key.replace(" ", "").lower() == normalized_role.replace(" ", "").lower() or role_rules[key] == rule:
                continue

            sim_rule = role_rules[key]
            try:
                # Calculate base risk for this theoretical role, keeping user's real experience constant
                sim_base = predict_risk(
                    role=key,
                    experience_level="mid",
                    years_experience=exp,
                    ai_impact_score=sim_rule['ai'],
                    automation_risk=sim_rule['ai'],
                    market_demand=sim_rule['demand'],
                    skill_adaptability=0.8
                )
                if sim_base is None:
                    sim_base = (sim_rule['min'] + sim_rule['max']) / 2
            except Exception:
                sim_base = (sim_rule['min'] + sim_rule['max']) / 2
            
            # Apply exactly the same skill deduction logic they earned in step 4
            sim_final = max(sim_rule['min'], min(sim_base + adjustment, sim_rule['max']))
            
            # Normalize key back to frontend expected ID (e.g. Cybersecurity Analyst -> CybersecurityEngineer)
            front_id = key.replace(" ", "")
            if front_id == 'CybersecurityAnalyst': front_id = 'CybersecurityEngineer'
            if front_id == 'DataAnalyst': front_id = 'Database'

            target_role_risks[front_id] = round(sim_final, 2)

        return {
            "status": "success",
            "role": normalized_role,
            "layoff_risk": round(final_risk, 2),
            "risk_level": risk_level,
            "explanations": reasons,
            "meter_config": {
                "min": rule['min'],
                "max": rule['max'],
                "color": "green" if risk_level == "Low" else "orange" if risk_level == "Moderate" else "red"
            },
            "target_role_risks": target_role_risks
        }

    except Exception as e:
        # Provide a clear error message in English to the Frontend
        print(f"Server Error: {str(e)}")
        raise HTTPException(
            status_code=500, 
            detail=f"Prediction Error: {str(e)}. Please check your input and try again."
        )
