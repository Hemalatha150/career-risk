import pandas as pd
import random

# =====================================================
# STEP 1: LOAD DATASET
# =====================================================

freelancer = pd.read_csv(
    r"D:\layoff-risk-ai\dataset\IT_Career_Risk_Dataset.csv"
)

print("Initial Rows:", len(freelancer))


# =====================================================
# STEP 2: REQUIRED COLUMNS
# =====================================================

freelancer = freelancer[
    ["category","primary_skills",
     "years_experience","experience_level"]
]


# =====================================================
# STEP 3: CLEAN CATEGORY
# =====================================================

freelancer["category"] = (
    freelancer["category"]
    .astype(str).str.lower().str.strip()
)


# =====================================================
# STEP 4: FILTER IT DOMAINS
# =====================================================

it_keywords = [
"web","software","data","ai",
"machine","cloud","devops",
"mobile","blockchain",
"crypto","web3",
"security","cyber"
]

freelancer = freelancer[
    freelancer["category"].str.contains(
        "|".join(it_keywords),
        na=False
    )
]


# =====================================================
# STEP 5: SKILL NORMALIZATION
# =====================================================

def normalize_skills(text):

    text=str(text).lower()

    replacements={
        "node.js":"node",
        "nodejs":"node",
        "node js":"node",
        "react.js":"react",
        "vue.js":"vue",
        "spring boot":"springboot",
        "mongo db":"mongodb"
    }

    for k,v in replacements.items():
        text=text.replace(k,v)

    text=text.replace("."," ")
    text=text.replace("-"," ")
    text=text.replace("/"," ")

    return text


# =====================================================
# STEP 6: ROLE DETECTION
# =====================================================

def map_role(row):

    skills = normalize_skills(row["primary_skills"])

    # CYBER
    if any(x in skills for x in
        ["cyber","penetration","firewall",
         "network security","cryptography","soc"]):
        return "Cybersecurity Engineer"

    # BLOCKCHAIN
    if any(x in skills for x in [
        "blockchain","solidity","ethereum",
        "web3","smart contract","crypto"
    ]):
        return "Blockchain Developer"

    # ML
    if any(x in skills for x in
        ["machine learning","tensorflow",
         "pytorch","nlp"]):
        return "ML Engineer"

    # DATA
    if any(x in skills for x in
        ["spark","etl","bigquery"]):
        return "Data Analyst"

    # DEVOPS
    if any(x in skills for x in
        ["docker","kubernetes","terraform"]):
        return "DevOps Engineer"

    # CLOUD
    if any(x in skills for x in
        ["aws","azure","gcp"]):
        return "Cloud Engineer"

    # QA
    if any(x in skills for x in
        ["selenium","testing","cypress",
         "jmeter","appium","sdet"]):
        return "QA/Test Engineer"

    # MOBILE
    if any(x in skills for x in
        ["android","ios","flutter"]):
        return "App Developer"

    frontend=[
        "html","css","javascript",
        "react","angular","vue",
        "bootstrap","tailwind"
    ]

    backend=[
        "node","express",
        "spring","springboot",
        "django","flask","fastapi",
        "laravel","aspnet",
        "mysql","postgresql","mongodb"
    ]

    has_frontend=any(f in skills for f in frontend)
    has_backend=any(b in skills for b in backend)

    if has_frontend and has_backend:
        return "Full Stack Developer"
    elif has_frontend:
        return "Frontend Developer"
    elif has_backend:
        return "Backend Developer"

    return None


freelancer["role"]=freelancer.apply(map_role,axis=1)


# =====================================================
# STEP 7: EXPERIENCE SCORE
# =====================================================

exp_map={"junior":1,"mid":2,"senior":3}

freelancer["experience_score"]=(
freelancer["experience_level"]
.str.lower().map(exp_map)
)


# =====================================================
# STEP 8: BACKEND AUGMENTATION
# =====================================================

backend_rows=pd.DataFrame({
"category":["software development"]*27,
"primary_skills":[
"node, express, mongodb",
"node, nestjs, mysql",
"java, springboot, mysql",
"django, postgresql, api",
"flask, mysql, api",
"fastapi, redis, api",
"laravel, mysql, api",
"dotnet, aspnet, sqlserver",
"golang, microservices, mongodb"
]*3,
"years_experience":[3]*27,
"experience_level":["mid"]*27
})

backend_rows["role"]="Backend Developer"
backend_rows["experience_score"]=2

freelancer=pd.concat([freelancer,backend_rows],
ignore_index=True)


# =====================================================
# STEP 9: QA AUGMENTATION (20 ROWS)
# =====================================================

qa_skills=[
"selenium, java",
"automation testing, python",
"manual testing, stlc",
"cypress, javascript",
"api testing, postman",
"jmeter, performance testing",
"appium, mobile testing",
"sdet automation framework"
]

qa_rows=[]

for i in range(20):

    level=random.choice(["junior","mid","senior"])

    qa_rows.append({
        "category":"software testing",
        "primary_skills":random.choice(qa_skills),
        "years_experience":random.randint(1,7),
        "experience_level":level,
        "role":"QA/Test Engineer",
        "experience_score":
            1 if level=="junior"
            else 2 if level=="mid"
            else 3
    })

qa_df=pd.DataFrame(qa_rows)

freelancer=pd.concat(
[freelancer,qa_df],
ignore_index=True)


# =====================================================
# STEP 10: CLOUD AUGMENTATION (20 ROWS)
# =====================================================

cloud_skills=[
"aws, ec2, s3",
"azure, cloud deployment",
"gcp, cloud storage",
"terraform, aws",
"kubernetes, cloud",
"docker, ecs",
"cloud monitoring, prometheus"
]

cloud_rows=[]

for i in range(20):

    level=random.choice(["junior","mid","senior"])

    cloud_rows.append({
        "category":"cloud engineering",
        "primary_skills":random.choice(cloud_skills),
        "years_experience":random.randint(1,8),
        "experience_level":level,
        "role":"Cloud Engineer",
        "experience_score":
            1 if level=="junior"
            else 2 if level=="mid"
            else 3
    })

cloud_df=pd.DataFrame(cloud_rows)

freelancer=pd.concat(
[freelancer,cloud_df],
ignore_index=True)


# =====================================================
# STEP 11: FINAL CLEAN
# =====================================================

final_df=freelancer.dropna(subset=["role"])


# =====================================================
# STEP 12: RISK + INTELLIGENT FEATURES
# =====================================================

risk={
"Cybersecurity Engineer":15,
"DevOps Engineer":20,
"Cloud Engineer":25,
"ML Engineer":20,
"Data Analyst":30,
"Full Stack Developer":35,
"App Developer":45,
"Backend Developer":55,
"Frontend Developer":75,
"Blockchain Developer":70,
"QA/Test Engineer":80
}

final_df["layoff_risk"]=final_df.role.map(risk)


# =====================================================
# STEP 13: SAVE AS NEW FILE
# =====================================================

print("\nFinal Role Distribution:")
print(final_df["role"].value_counts())

final_df.to_csv(
r"D:\layoff-risk-ai\dataset\IT_Career_Risk_Dataset.csv",
index=False
)

print("\n✅ NEW DATASET SAVED SUCCESSFULLY")