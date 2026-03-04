import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {

const navigate = useNavigate();

return (
<div className="landing">

{/* Navbar */}

<nav className="navbar">
<h2>RiskGuard AI</h2>
<button onClick={() => navigate("/analyzer")}>
Try Tool
</button>
</nav>


{/* Hero Section */}

<section className="hero">

<h1 className="heroTitle">
Don't just survive.
<br />
<span>Own your career path.</span>
</h1>

<p>
RiskGuard AI provides data-driven layoff risk assessments and
career strategies for tech professionals in the AI-driven job market.
</p>

<button onClick={() => navigate("/analyzer")} className="startBtn">
Start Risk Analysis
</button>

</section>


{/* Features */}

<section className="features">

<h2>Key Features</h2>

<div className="featureGrid">

<div className="card">
<h3>AI Risk Prediction</h3>
<p>Analyze the risk of layoffs based on role and market trends.</p>
</div>

<div className="card">
<h3>Skill Analysis</h3>
<p>Understand which skills increase or decrease job security.</p>
</div>

<div className="card">
<h3>Career Shift Suggestions</h3>
<p>Get recommendations for safer career paths.</p>
</div>

</div>

</section>


{/* HOW IT WORKS SECTION */}

<section className="howWorks">

<h2 className="howTitle">How RiskGuard AI Works</h2>

<div className="howContainer">

<div className="stepsLeft">

<div className="step">
<span className="stepNumber">01</span>
<div>
<h3>Input Your Context</h3>
<p>
Provide details about your role, industry, experience, and skills.
</p>
</div>
</div>

<div className="step">
<span className="stepNumber">02</span>
<div>
<h3>AI Market Analysis</h3>
<p>
Our AI engine analyzes tech market trends and automation risk.
</p>
</div>
</div>

<div className="step">
<span className="stepNumber">03</span>
<div>
<h3>Actionable Strategy</h3>
<p>
Receive a personalized roadmap to improve career stability.
</p>
</div>
</div>

<button className="startNowBtn">
Get Started Now
</button>

</div>


{/* RIGHT CARD */}

<div className="riskCard">

<div className="riskHeader">
<span className="riskIcon">⚠️</span>
<p>RISK LEVEL</p>
</div>

<div className="riskBar">

<div className="riskProgress"></div>

</div>

<p className="riskText">
Updated based on latest AI market analysis
</p>

</div>

</div>

</section>


{/* Footer */}

<footer className="footer">
<p>© 2026 RiskGuard AI | Smart Layoff Risk Predictor</p>
</footer>

</div>
);
}