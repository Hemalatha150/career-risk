import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import * as Lucide from 'lucide-react';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { roleSkills, careerShifts, learningResources } from "./data";

export default function VantageAI() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [activeTab, setActiveTab] = useState("risk");
    const [uploading, setUploading] = useState(false);

    // Chatbot States
    const [chatOpen, setChatOpen] = useState(false);
    const [chatMessage, setChatMessage] = useState("");
    const [uploadHover, setUploadHover] = useState(false);
    const [chatHistory, setChatHistory] = useState([
        { role: 'bot', text: "Hi! I'm your Career Counselor. Need advice based on your risk score?" }
    ]);

    const [form, setForm] = useState({
        role: "",
        skills: "",
        years_experience: ""
    });

    // --- Input UI States ---
    const [roleInput, setRoleInput] = useState("");
    const [roleSuggestions, setRoleSuggestions] = useState([]);
    const [activeRoleIdx, setActiveRoleIdx] = useState(-1);

    const [skillInput, setSkillInput] = useState("");
    const [skillSuggestions, setSkillSuggestions] = useState([]);
    const [activeSkillIdx, setActiveSkillIdx] = useState(-1);

    const skillInputRef = useRef(null);
    const fileInputRef = useRef(null);
    const formatWord = (text) => text ? text.replace(/([A-Z])/g, " $1").trim() : "";

    // --- Risk Level Info Logic ---
    const getRiskInfo = (score) => {
        if (score <= 35) return { label: "LOW RISK", color: "#22c55e" };
        if (score <= 65) return { label: "MODERATE RISK", color: "#f59e0b" };
        return { label: "HIGH RISK", color: "#ef4444" };
    };

    // --- Handlers ---
    const handleRoleChange = (e) => {
        const val = e.target.value;
        setRoleInput(val);
        setForm(prev => ({ ...prev, role: val }));
        const filtered = Object.keys(roleSkills || {}).filter(r => r.toLowerCase().includes(val.toLowerCase()));
        setRoleSuggestions(val ? filtered : []);
        setActiveRoleIdx(-1);
    };

    const selectRole = (role) => {
        setForm(prev => ({ ...prev, role: role }));
        setRoleInput(formatWord(role));
        setRoleSuggestions([]);
        setActiveRoleIdx(-1);
        setTimeout(() => skillInputRef.current?.focus(), 50);
    };

    const handleSkillChange = (e) => {
        const val = e.target.value;
        setSkillInput(val);
        setForm(prev => ({ ...prev, skills: val }));
        if (!form.role) return;
        const parts = val.split(",");
        const lastPart = parts[parts.length - 1].trim().toLowerCase();
        const available = roleSkills[form.role] || [];
        const filtered = lastPart ? available.filter(s => s.toLowerCase().includes(lastPart) && !val.toLowerCase().includes(s.toLowerCase())) : [];
        setSkillSuggestions(filtered);
        setActiveSkillIdx(-1);
    };

    const selectSkill = (skill) => {
        const parts = skillInput.split(",");
        parts[parts.length - 1] = ` ${skill} `;
        const finalStr = parts.join(", ").trim().replace(/^,/, "");
        setSkillInput(finalStr + ", ");
        setForm(prev => ({ ...prev, skills: finalStr }));
        setSkillSuggestions([]);
        setActiveSkillIdx(-1);
        setTimeout(() => skillInputRef.current?.focus(), 50);
    };

    const handleKeyDown = (e, suggestions, activeIdx, setActiveIdx, onSelect) => {
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIdx(p => (p < suggestions.length - 1 ? p + 1 : p));
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIdx(p => (p > 0 ? p - 1 : p));
        } else if (e.key === "Enter") {
            if (activeIdx >= 0 && suggestions[activeIdx]) {
                e.preventDefault();
                onSelect(suggestions[activeIdx]);
            }
        }
    };

    const handleResumeUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setUploading(true);
        try {
            const resp = await axios.post('http://127.0.0.1:8005/upload-resume', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            const data = resp.data.extracted_data;
            setForm({
                role: data.role,
                skills: data.skills,
                years_experience: data.years_experience
            });
            setRoleInput(formatWord(data.role));
            setSkillInput(data.skills);
        } catch (err) {
            console.error("Upload failed", err);
            alert("Resume parsing failed. Please try again or fill manually.");
        } finally {
            setUploading(false);
        }
    };

    const handleChatRequest = async () => {
        if (!chatMessage) return;

        if (!result) {
            setChatHistory(prev => [
                ...prev,
                { role: 'user', text: chatMessage },
                { role: 'bot', text: "Please use the 'Predict Risk' button on the left first so I understand your career profile!" }
            ]);
            setChatMessage("");
            return;
        }

        const newUserMsg = { role: 'user', text: chatMessage };
        setChatHistory(prev => [...prev, newUserMsg]);
        setChatMessage("");

        try {
            const resp = await axios.post('http://127.0.0.1:8005/chat', {
                message: chatMessage,
                risk_level: result.risk_level,
                role: result.role,
                skills: form.skills
            });
            setChatHistory(prev => [...prev, { role: 'bot', text: resp.data.reply }]);
        } catch (err) {
            setChatHistory(prev => [...prev, { role: 'bot', text: "Sorry, I'm having trouble connecting right now." }]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.role) return alert("Please select a role from suggestions.");
        setLoading(true);
        try {
            const cleanedForm = {
                ...form,
                role: form.role.replace(/\s+/g, ''),
                years_experience: parseFloat(form.years_experience) || 0
            };
            const res = await axios.post("http://127.0.0.1:8005/predict", cleanedForm);
            setResult({
                ...res.data,
                meter_config: getRiskInfo(res.data.layoff_risk)
            });
            setActiveTab("risk");
        } catch (err) {
            alert("Analysis failed. Backend error.");
        }
        setLoading(false);
    };

    return (
        <div style={styles.page}>
            <div style={{ ...styles.blob, background: "#bae6fd", top: "5%", left: "10%" }} />
            <div style={{ ...styles.blob, background: "#bbf7d0", bottom: "5%", right: "10%" }} />

            <div style={styles.container}>
                {/* LEFT: FORM CARD */}
                <div style={styles.card}>
                    <div style={styles.header}>
                        <Lucide.ShieldCheck color="#2563eb" size={32} strokeWidth={2.5} />
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <h2 style={styles.title}>RiskGuard <span style={styles.titleAi}>AI</span></h2>
                            <span style={styles.subtitle}>Smart Layoff Risk Predictor</span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
                        {uploading && (
                            <div style={styles.loaderOverlay}>
                                <Lucide.Loader2 className="animate-spin" size={32} color="#2563eb" />
                                <span style={{ marginTop: '10px', fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Analyzing Resume...</span>
                            </div>
                        )}

                        <div style={styles.inputGroup}>
                            <label style={styles.label}><Lucide.Briefcase size={14} /> DESIGNATION</label>
                            <input style={styles.input} value={roleInput} onChange={handleRoleChange} onKeyDown={(e) => handleKeyDown(e, roleSuggestions, activeRoleIdx, setActiveRoleIdx, selectRole)} placeholder="Search Role..." />
                            {roleSuggestions.length > 0 && (
                                <div style={styles.suggestBox}>
                                    {roleSuggestions.map((r, i) => (
                                        <div key={r} onMouseEnter={() => setActiveRoleIdx(i)} onClick={() => selectRole(r)} style={i === activeRoleIdx ? styles.activeItem : styles.suggestItem}>{formatWord(r)}</div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={{ ...styles.inputGroup, marginTop: '15px' }}>
                            <label style={styles.label}><Lucide.FileUp size={14} /> OR AUTO-FILL</label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                accept=".pdf"
                                onChange={handleResumeUpload}
                                style={{ display: 'none' }}
                            />
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && fileInputRef.current?.click()}
                                onMouseEnter={() => setUploadHover(true)}
                                onMouseLeave={() => setUploadHover(false)}
                                tabIndex={0}
                                role="button"
                                style={{
                                    ...styles.uploadLabel,
                                    borderColor: uploadHover ? '#2563eb' : '#cbd5e1',
                                    background: uploadHover ? '#eff6ff' : '#f8fafc',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <Lucide.UploadCloud size={18} color={uploadHover ? '#2563eb' : '#64748b'} />
                                <span style={{ fontSize: '12px', fontWeight: '600', color: uploadHover ? '#2563eb' : '#64748b' }}>Upload Resume (PDF)</span>
                            </div>
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}><Lucide.Zap size={14} /> SKILLS</label>
                            <input ref={skillInputRef} style={styles.input} value={skillInput} onChange={handleSkillChange} onKeyDown={(e) => handleKeyDown(e, skillSuggestions, activeSkillIdx, setActiveSkillIdx, selectSkill)} placeholder="React, Python..." />
                            {skillSuggestions.length > 0 && (
                                <div style={styles.suggestBox}>
                                    {skillSuggestions.map((s, i) => (
                                        <div key={s} onMouseEnter={() => setActiveSkillIdx(i)} onClick={() => selectSkill(s)} style={i === activeSkillIdx ? styles.activeItem : styles.suggestItem}>{s}</div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div style={styles.inputGroup}>
                            <label style={styles.label}><Lucide.Target size={14} /> EXPERIENCE (YEARS)</label>
                            <input style={styles.input} type="number" value={form.years_experience} onChange={(e) => setForm({ ...form, years_experience: e.target.value })} placeholder="E.g. 5" />
                        </div>

                        <button type="submit" style={styles.button} disabled={loading}>
                            {loading ? <Lucide.Loader2 className="animate-spin" size={20} /> : "Predict Risk"}
                        </button>
                    </form>
                </div>

                {/* RIGHT: TABS CARD */}
                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            style={{ ...styles.card, width: "450px", minHeight: "550px" }}
                        >
                            <div style={styles.tabHeader}>
                                <button onClick={() => setActiveTab("risk")} style={activeTab === "risk" ? styles.activeTab : styles.tab}>
                                    <Lucide.LayoutDashboard size={16} /> Analysis
                                </button>
                                <button onClick={() => setActiveTab("career")} style={activeTab === "career" ? styles.activeTab : styles.tab}>
                                    <Lucide.Lightbulb size={16} /> Roadmap
                                </button>
                            </div>

                            <div style={{ padding: '10px', flex: 1, overflowY: 'auto' }}>
                                <AnimatePresence mode="wait">
                                    {activeTab === "risk" && (
                                        <motion.div key="risk" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <div style={styles.gaugeArea}>
                                                <svg width="240" height="130" viewBox="0 0 200 110">
                                                    <path d="M20,100 A80,80 0 0,1 180,100" fill="none" stroke="#f1f5f9" strokeWidth="12" strokeLinecap="round" />
                                                    <path d="M20,100 A80,80 0 0,1 180,100" fill="none" stroke={result.meter_config.color} strokeWidth="12" strokeLinecap="round" strokeDasharray="251" strokeDashoffset={251 - (251 * result.layoff_risk) / 100} style={{ transition: 'stroke-dashoffset 1.5s ease-out, stroke 0.5s' }} />
                                                </svg>
                                                <div style={styles.riskScoreContainer}>
                                                    <div style={styles.riskScore}>{result.layoff_risk}%</div>
                                                    <div style={{ ...styles.riskLevelLabel, color: result.meter_config.color }}>
                                                        {result.meter_config.label}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={styles.expContainer}>
                                                {result.explanations.map((text, i) => (
                                                    <div key={i} style={{ ...styles.expItem, borderLeft: `4px solid ${result.meter_config.color}` }}>
                                                        <Lucide.Info size={14} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
                                                        <span>{text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {activeTab === "career" && (
                                        <motion.div key="career" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                            <h4 style={styles.tabTitle}>Dynamic Career Shift Strategy</h4>

                                            {(() => {
                                                // 1. Get user skills array (lowercased & trimmed)
                                                const userSkillsList = (form.skills || "").split(',').map(s => s.trim().toLowerCase()).filter(s => s);

                                                // 2. Define High-Stability "Safe Haven" Roles
                                                const targetRoles = [
                                                    { id: 'MLEngineer', name: 'ML Engineer', category: 'AI/ML' },
                                                    { id: 'CybersecurityEngineer', name: 'Cybersecurity Engineer', category: 'Security' },
                                                    { id: 'DevOpsEngineer', name: 'DevOps Engineer', category: 'Infrastructure' },
                                                    { id: 'Database', name: 'Data Engineer', category: 'Data' },
                                                    { id: 'BackendDeveloper', name: 'Backend Engineer', category: 'Core Tech' }
                                                ];

                                                // 3. Prevent recommending their exact current role, AND Apply Comparative Risk Filtering
                                                const currentRoleLower = form.role.replace(/[^a-zA-Z]/g, '').toLowerCase();
                                                const availableRoles = [];

                                                for (const targetRole of targetRoles) {
                                                    // Skip their current role
                                                    if (targetRole.id.toLowerCase() === currentRoleLower) continue;

                                                    // Comparative Risk Filtering (Pillar 1)
                                                    // Ensure a move to this role ACTUALLY lowers their risk according to the backend
                                                    if (result.target_role_risks) {
                                                        const simulatedRisk = result.target_role_risks[targetRole.id];
                                                        // Only suggest if the simulated risk is strictly lower than their current risk
                                                        if (simulatedRisk === undefined || simulatedRisk >= result.layoff_risk) {
                                                            continue;
                                                        }
                                                    }
                                                    availableRoles.push(targetRole);
                                                }

                                                // 4. Calculate matches
                                                let suggestions = [];

                                                for (const roleDef of availableRoles) {
                                                    const requiredSkillsRaw = roleSkills[roleDef.id] || [];
                                                    const requiredSkills = requiredSkillsRaw.map(s => s.toLowerCase());

                                                    if (requiredSkills.length === 0) continue;

                                                    // Find Overlap
                                                    const matched = [];
                                                    const missing = [];

                                                    requiredSkillsRaw.forEach(rawSkill => {
                                                        const reqSkillLow = rawSkill.toLowerCase();
                                                        // Check if user has this skill (partial match allowed e.g. "react" in "reactjs")
                                                        const hasSkill = userSkillsList.some(userSkill =>
                                                            userSkill.includes(reqSkillLow) || reqSkillLow.includes(userSkill)
                                                        );

                                                        if (hasSkill) matched.push(rawSkill);
                                                        else missing.push(rawSkill);
                                                    });

                                                    const matchPercentage = Math.round((matched.length / requiredSkills.length) * 100);

                                                    suggestions.push({
                                                        ...roleDef,
                                                        matchPercentage,
                                                        matched,
                                                        missing
                                                    });
                                                }

                                                // 5. Sort by Match Percentage DESC and take top 2
                                                suggestions.sort((a, b) => b.matchPercentage - a.matchPercentage);
                                                const topSuggestions = suggestions.slice(0, 2).filter(s => s.matchPercentage > 0);

                                                // NEW: Categorize Experience Level
                                                const expYears = parseFloat(form.years_experience) || 0;
                                                let expLevel = "Junior";
                                                if (expYears >= 3 && expYears < 7) expLevel = "Mid-Level";
                                                else if (expYears >= 7) expLevel = "Senior";

                                                // NEW: Tailored Advice Map
                                                const expAdvice = {
                                                    'MLEngineer': {
                                                        'Junior': ['Master Python basics (Pandas, NumPy)', 'Complete Andrew Ng\'s ML Course', 'Build 2-3 end-to-end classification models'],
                                                        'Mid-Level': ['Focus on deep learning frameworks (PyTorch)', 'Understand MLOps principles', 'Deploy a model to AWS SageMaker'],
                                                        'Senior': ['Design scalable ML systems architecture', 'Lead data science initiatives', 'Align AI strategy with business outcomes']
                                                    },
                                                    'CybersecurityEngineer': {
                                                        'Junior': ['Get CompTIA Security+ certified', 'Learn basic threat modeling', 'Master network fundamentals (TCP/IP)'],
                                                        'Mid-Level': ['Focus on Penetration Testing or Cloud Security', 'Learn SIEM tools (Splunk)', 'Automate security checks (Python)'],
                                                        'Senior': ['Define enterprise security architecture', 'Lead incident response plans', 'Ensure compliance (SOC2/ISO27001)']
                                                    },
                                                    'DevOpsEngineer': {
                                                        'Junior': ['Master basic Linux administration', 'Learn Git and basic CI/CD (GitHub Actions)', 'Understand Docker fundamentals'],
                                                        'Mid-Level': ['Become proficient in Kubernetes', 'Write Infrastructure as Code (Terraform)', 'Implement advanced observability'],
                                                        'Senior': ['Design multi-regional cloud architectures', 'Manage platform engineering teams', 'Define enterprise-wide release strategies']
                                                    },
                                                    'Database': {
                                                        'Junior': ['Master Advanced SQL querying', 'Learn data modeling basics', 'Build simple ETL pipelines'],
                                                        'Mid-Level': ['Focus on distributed data processing (Spark)', 'Understand real-time streaming (Kafka)', 'Optimize complex database queries'],
                                                        'Senior': ['Design enterprise data lakes/warehouses', 'Implement data governance policies', 'Evaluate emerging database technologies']
                                                    },
                                                    'BackendDeveloper': {
                                                        'Junior': ['Master basic REST API design', 'Learn SQL and basic database interactions', 'Write robust unit tests'],
                                                        'Mid-Level': ['Understand microservices vs monoliths', 'Implement caching strategies (Redis)', 'Focus on application security and rate limiting'],
                                                        'Senior': ['Design high-availability distributed systems', 'Lead backend architectural decisions', 'Mentorship and technical leadership']
                                                    }
                                                };

                                                // 6. Render Logic
                                                if (topSuggestions.length > 0) {
                                                    return topSuggestions.map((shift, idx) => (
                                                        <div key={idx} style={styles.shiftCard}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                                                <span style={{ fontWeight: '700', color: '#1e293b' }}>{shift.name} <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'normal' }}>({shift.category})</span></span>
                                                                <span style={{ color: shift.matchPercentage > 40 ? '#22c55e' : '#f59e0b', fontSize: '11px', fontWeight: '800' }}>
                                                                    {shift.matchPercentage}% Ready
                                                                </span>
                                                            </div>
                                                            <div style={{ height: '6px', background: '#f1f5f9', borderRadius: '3px', marginBottom: '15px' }}>
                                                                <div style={{
                                                                    width: `${shift.matchPercentage}%`,
                                                                    height: '100%',
                                                                    background: shift.matchPercentage > 40 ? '#22c55e' : '#f59e0b',
                                                                    borderRadius: '3px',
                                                                    transition: 'width 1s ease-in-out'
                                                                }} />
                                                            </div>

                                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                                {/* Matched Skills */}
                                                                <div>
                                                                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                                                                        <Lucide.CheckCircle2 size={10} color="#22c55e" style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                                                        Skills You Already Have
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                                        {shift.matched.map((s, i) => (
                                                                            <span key={i} style={{ background: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '4px', fontSize: '9.5px', fontWeight: '600' }}>{s}</span>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                {/* Missing Skills */}
                                                                <div>
                                                                    <div style={{ fontSize: '10px', fontWeight: '700', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase' }}>
                                                                        <Lucide.ArrowUpRight size={10} color="#f59e0b" style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                                                                        Skills to Learn (Gap Analysis)
                                                                    </div>
                                                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                                        {shift.missing.slice(0, 8).map((s, i) => (
                                                                            <span key={i} style={{ background: '#fffbeb', color: '#b45309', padding: '2px 6px', borderRadius: '4px', fontSize: '9.5px', fontWeight: '600', border: '1px solid #fef3c7' }}>{s}</span>
                                                                        ))}
                                                                        {shift.missing.length > 8 && <span style={{ fontSize: '9px', color: '#94a3b8', padding: '2px' }}>+{shift.missing.length - 8} more</span>}
                                                                    </div>
                                                                </div>

                                                                {/* NEW: Experience-Tailored Action Plan */}
                                                                <div style={{ marginTop: '5px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                                                                    <div style={{ fontSize: '10px', fontWeight: '800', color: '#3b82f6', marginBottom: '6px', textTransform: 'uppercase' }}>
                                                                        🎯 Tailored Action Plan ({expLevel})
                                                                    </div>
                                                                    <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '11.5px', color: '#475569', lineHeight: '1.6' }}>
                                                                        {(expAdvice[shift.id]?.[expLevel] || []).map((tip, i) => (
                                                                            <li key={i}>{tip}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>

                                                                {/* NEW: Learning Resources Recommendation Section */}
                                                                {shift.missing.length > 0 && (
                                                                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px solid #f1f5f9' }}>
                                                                        <div style={{ fontSize: '10px', fontWeight: '800', color: '#2563eb', marginBottom: '8px', textTransform: 'uppercase' }}>
                                                                            📚 Recommended Learning Resources
                                                                        </div>
                                                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                                                            {shift.missing.slice(0, 3).map((missingSkill, index) => {
                                                                                // Find matching resource key (case-insensitive, partial match)
                                                                                const searchKey = missingSkill.toLowerCase();
                                                                                let resourceData = null;
                                                                                let matchedKey = null;

                                                                                // Try exact match first
                                                                                if (learningResources[searchKey]) {
                                                                                    resourceData = learningResources[searchKey];
                                                                                    matchedKey = searchKey;
                                                                                } else {
                                                                                    // Try partial match
                                                                                    const keys = Object.keys(learningResources);
                                                                                    for (let key of keys) {
                                                                                        if (searchKey.includes(key) || key.includes(searchKey)) {
                                                                                            resourceData = learningResources[key];
                                                                                            matchedKey = key;
                                                                                            break;
                                                                                        }
                                                                                    }
                                                                                }

                                                                                if (!resourceData) return null; // No resource data for this skill

                                                                                const skillResources = resourceData.levels[expLevel] || [];

                                                                                return (
                                                                                    <div key={index} style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                                                                                        <div style={{ fontSize: '11.5px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                                                                                            Skill: <span style={{ color: '#2563eb' }}>{missingSkill}</span>
                                                                                        </div>
                                                                                        <div style={{ fontSize: '10.5px', color: '#475569', marginBottom: '8px', fontStyle: 'italic' }}>
                                                                                            <span style={{ fontWeight: '600' }}>Why Learn:</span> {resourceData.why}
                                                                                        </div>
                                                                                        <div style={{ fontSize: '10.5px', fontWeight: '600', color: '#334155', marginBottom: '4px' }}>
                                                                                            Resources:
                                                                                        </div>
                                                                                        <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '11px' }}>
                                                                                            {skillResources.map((res, i) => (
                                                                                                <li key={i} style={{ marginBottom: '4px' }}>
                                                                                                    <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
                                                                                                        {res.title}
                                                                                                    </a>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    </div>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                )}

                                                            </div>
                                                        </div>
                                                    ));
                                                } else {
                                                    // FALLBACK: High Demand Skills
                                                    const expFallback = {
                                                        'Junior': 'Focus on building strong foundational knowledge and a proven portfolio in these high-demand areas to quickly launch your career:',
                                                        'Mid-Level': 'Your experience is valuable. Focus on strategically specializing in one of these emerging core technologies to pivot safely:',
                                                        'Senior': 'Leverage your senior experience by understanding how these high-demand technologies shape enterprise architecture and technical strategy:'
                                                    };

                                                    return (
                                                        <div style={{ ...styles.shiftCard, borderLeft: '4px solid #3b82f6' }}>
                                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                                                <Lucide.TrendingUp size={20} color="#2563eb" />
                                                                <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '14px' }}>Future-Proof Your Profile ({expLevel})</span>
                                                            </div>
                                                            <p style={{ fontSize: '11px', color: '#475569', marginBottom: '15px', lineHeight: '1.5' }}>
                                                                Your current skills don't currently match highly stable roles directly. {expFallback[expLevel]}
                                                            </p>
                                                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                                                {['AWS / Azure Cloud', 'Machine Learning (Python)', 'Generative AI Prompts', 'Docker / Kubernetes', 'Cybersecurity Basics'].map((skill, i) => (
                                                                    <span key={i} style={{ background: '#eff6ff', color: '#1d4ed8', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '700' }}>
                                                                        {skill}
                                                                    </span>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    );
                                                }
                                            })()}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Floating Chatbot */}
            <div style={styles.chatWrapper}>
                <button onClick={() => setChatOpen(!chatOpen)} style={styles.chatToggle}>
                    {chatOpen ? <Lucide.X /> : <Lucide.MessageSquare />}
                </button>

                <AnimatePresence>
                    {chatOpen && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            style={styles.chatWindow}
                        >
                            <div style={styles.chatHeader}>
                                <Lucide.Bot size={18} /> Career Counselor
                            </div>
                            <div style={styles.chatBody}>
                                {chatHistory.map((msg, i) => (
                                    <div key={i} style={{
                                        display: 'flex',
                                        justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                        marginBottom: '10px'
                                    }}>
                                        <div style={{
                                            padding: '8px 12px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            maxWidth: '80%',
                                            background: msg.role === 'user' ? '#2563eb' : '#f1f5f9',
                                            color: msg.role === 'user' ? 'white' : '#1e293b'
                                        }}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div style={styles.chatInputArea}>
                                <input
                                    style={styles.chatInput}
                                    value={chatMessage}
                                    onChange={(e) => setChatMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleChatRequest()}
                                    placeholder="Ask for advice..."
                                />
                                <button onClick={handleChatRequest} style={styles.chatSend}>
                                    <Lucide.Send size={14} />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

const styles = {
    page: { width: "100vw", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #f0fdf4, #f0f9ff, #eff6ff)", overflow: "hidden", fontFamily: "'Inter', sans-serif" },
    blob: { position: "absolute", width: "400px", height: "400px", borderRadius: "50%", opacity: 0.4, filter: "blur(90px)", zIndex: 1 },
    container: { display: "flex", gap: "25px", zIndex: 5, alignItems: "stretch" },
    card: { background: "rgba(255,255,255,0.96)", padding: "30px", borderRadius: "24px", width: "380px", boxShadow: "0 10px 40px rgba(0,0,0,0.06)", border: "1px solid #fff", display: 'flex', flexDirection: 'column' },
    header: { display: "flex", gap: "12px", marginBottom: "30px" },
    title: { fontSize: "24px", fontWeight: "800", color: "#1e293b", margin: 0, lineHeight: '1.1' },
    titleAi: { color: "#2563eb", fontWeight: "400" },
    subtitle: { fontSize: "12px", color: "#64748b", fontWeight: "500" },
    inputGroup: { position: "relative", marginBottom: "12px" },
    label: { display: "flex", alignItems: "center", gap: "6px", fontSize: "10px", fontWeight: "800", color: "#94a3b8", marginBottom: "6px", letterSpacing: '0.5px' },
    input: { width: "100%", padding: "12px 14px", borderRadius: "10px", border: "1.5px solid #f1f5f9", fontSize: "13px", outline: "none", boxSizing: "border-box" },
    suggestBox: { position: "absolute", top: "70px", left: 0, right: 0, background: "white", borderRadius: "10px", boxShadow: "0 10px 20px rgba(0,0,0,0.1)", zIndex: 100, border: "1px solid #f1f5f9", maxHeight: '150px', overflowY: 'auto' },
    suggestItem: { padding: "10px 15px", fontSize: "12.5px", color: "#475569", cursor: "pointer" },
    activeItem: { padding: "10px 15px", fontSize: "12.5px", color: "#2563eb", background: "#f0f7ff", cursor: "pointer", fontWeight: "600" },
    button: { width: "100%", padding: "14px", borderRadius: "12px", border: "none", background: "linear-gradient(90deg, #2563eb, #06b6d4)", color: "white", fontWeight: "700", cursor: "pointer", marginTop: '10px' },
    uploadLabel: { width: "100%", height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', border: '1.5px dashed #cbd5e1', background: '#f8fafc', borderRadius: '10px', color: '#64748b' },
    loaderOverlay: { position: 'absolute', inset: -5, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 100, borderRadius: '24px' },
    tabHeader: { display: 'flex', gap: '6px', background: '#f1f5f9', padding: '5px', borderRadius: '15px', marginBottom: '15px' },
    tab: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 4px', border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer', fontSize: '12px', fontWeight: '600', borderRadius: '10px' },
    activeTab: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '8px 4px', border: 'none', background: '#fff', color: '#2563eb', cursor: 'pointer', fontSize: '12px', fontWeight: '700', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' },
    gaugeArea: { position: "relative", display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '15px', marginBottom: '10px' },
    riskScoreContainer: { position: 'absolute', top: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' },
    riskScore: { fontSize: "42px", fontWeight: "900", color: "#1e293b", lineHeight: '0.8' },
    riskLevelLabel: { fontSize: "11px", fontWeight: "800", letterSpacing: '1px', marginTop: '6px', textTransform: 'uppercase' },
    expContainer: { display: "flex", flexDirection: "column", gap: "8px", marginTop: '10px' },
    expItem: { display: "flex", gap: "10px", background: "#f8fafc", padding: "12px", borderRadius: "10px", fontSize: "12px", color: "#475569", border: "1px solid #f1f5f9", lineHeight: '1.4' },
    tabTitle: { color: '#1e293b', marginBottom: '12px', fontSize: '15px', fontWeight: '700' },
    shiftCard: { background: "#fff", border: "1px solid #f1f5f9", borderRadius: "14px", padding: "15px", marginBottom: "15px", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" },
    adviceBox: { marginTop: '10px', padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #eef2f6' },
    learningLink: { display: 'flex', alignItems: 'center', gap: '4px', background: '#fff', border: '1px solid #e2e8f0', padding: '4px 8px', borderRadius: '6px', fontSize: '10px', color: '#2563eb', textDecoration: 'none', fontWeight: '600' },
    positiveMsgCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '30px', background: '#f0f9ff', borderRadius: '15px', border: '1px dashed #0ea5e9', marginTop: '20px' },
    chatWrapper: { position: 'fixed', bottom: '25px', right: '25px', zIndex: 1000 },
    chatToggle: { width: '56px', height: '56px', background: '#2563eb', color: 'white', borderRadius: '28px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 30px rgba(37, 99, 235, 0.3)', transition: 'transform 0.2s' },
    chatWindow: { position: 'absolute', bottom: '70px', right: 0, width: '320px', height: '400px', background: 'white', borderRadius: '20px', boxShadow: '0 15px 50px rgba(0,0,0,0.15)', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', overflow: 'hidden' },
    chatHeader: { padding: '15px', background: '#2563eb', color: 'white', fontSize: '14px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '8px' },
    chatBody: { flex: 1, padding: '15px', overflowY: 'auto' },
    chatInputArea: { padding: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', gap: '8px' },
    chatInput: { flex: 1, border: '1.5px solid #f1f5f9', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', outline: 'none' },
    chatSend: { background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', padding: '8px 12px', cursor: 'pointer' }
};