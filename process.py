import pandas as pd

# 1. Dataset load cheyandi
df = pd.read_csv('D:\layoff-risk-ai\dataset\IT_Career_Risk_Dataset.csv')

# 2. Base Risk for Roles
role_risk_map = {
    'ML Engineer': 20,
    'Cloud Engineer': 25,
    'DevOps Engineer': 25,
    'Full Stack Developer': 35,
    'Backend Developer': 45,
    'App Developer': 50,
    'Frontend Developer': 65,
    'Data Analyst': 70,
    'Blockchain Developer': 80
}

# 3. Dynamic Calculation Function
def refine_risk(row):
    # Base risk tiskuntundi
    base = role_risk_map.get(row['role'], 50)
    
    # Experience batti change (Senior ki 30% thaggisthundi, Junior ki 20% penchuthundi)
    if row['experience_level'] == 'senior':
        base *= 0.7
    elif row['experience_level'] == 'junior':
        base *= 1.2
        
    # AI Impact and Market Demand calculation (Standardizing to 100 scale)
    # AI Impact Score (0 to 1) and Market Demand (0 to 1) mee dataset lo unnayi
    final_score = base + (row['ai_impact_score'] * 20) - (row['market_demand'] * 15)
    
    return round(clip(final_score, 5, 95), 2) # Score 5 to 95 madhya untundi

def clip(n, min_v, max_v):
    return max(min(n, max_v), min_v)

# 4. Layoff risk column update
df['layoff_risk'] = df.apply(refine_risk, axis=1)

# 5. Save cheyandi
df.to_csv('Final_Updated_Dataset.csv', index=False)
print("Dataset Updated Successfully!")