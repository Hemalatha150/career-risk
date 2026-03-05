import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import * as Lucide from 'lucide-react';
import { roleSkills, careerShifts } from "../components/data";

const riskData = [
    { name: 'Frontend', risk: 85, demand: 40 },
    { name: 'Backend', risk: 65, demand: 60 },
    { name: 'Full Stack', risk: 45, demand: 80 },
    { name: 'ML/AI', risk: 20, demand: 95 },
    { name: 'Cloud', risk: 30, demand: 90 },
    { name: 'DevOps', risk: 35, demand: 85 },
    { name: 'Cybersec', risk: 15, demand: 98 },
];

const skillDist = [
    { name: 'React', count: 400 },
    { name: 'Node.js', count: 300 },
    { name: 'Python', count: 500 },
    { name: 'AWS', count: 350 },
    { name: 'Docker', count: 280 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function Dashboard() {
    return (
        <div style={styles.dashboard}>
            <header style={styles.header}>
                <div style={styles.headerLeft}>
                    <Lucide.LayoutDashboard size={28} color="#2563eb" />
                    <h1 style={styles.title}>Market <span style={{ fontWeight: '400' }}>Insights</span></h1>
                </div>
                <div style={styles.headerRight}>
                    <span style={styles.date}>Updated: Mar 2026</span>
                </div>
            </header>

            <div style={styles.grid}>
                {/* Risk Distribution */}
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Role Risk vs. Market Demand</h3>
                    <div style={{ height: '300px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={riskData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                                />
                                <Legend verticalAlign="top" height={36} />
                                <Bar dataKey="risk" fill="#ef4444" radius={[4, 4, 0, 0]} name="Layoff Risk %" />
                                <Bar dataKey="demand" fill="#22c55e" radius={[4, 4, 0, 0]} name="Market Demand %" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Skill Popularity */}
                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Skill Demand Distribution</h3>
                    <div style={{ height: '300px', display: 'flex', alignItems: 'center' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={skillDist}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="count"
                                >
                                    {skillDist.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>


            </div>

            <footer style={styles.footer}>
                <div style={styles.statBox}>
                    <Lucide.Zap size={20} color="#f59e0b" />
                    <strong>Trending:</strong> GenAI, MLOps, Rust, Cyber Resilience
                </div>
            </footer>
        </div>
    );
}

const styles = {
    dashboard: {
        minHeight: '100vh',
        padding: '40px',
        background: '#f8fafc',
        fontFamily: "'Inter', sans-serif",
        color: '#1e293b'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
    },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '15px' },
    title: { fontSize: '28px', fontWeight: '800' },
    date: { fontSize: '14px', color: '#64748b', fontWeight: '600', padding: '8px 16px', background: '#fff', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px' },
    card: {
        background: '#fff',
        padding: '25px',
        borderRadius: '24px',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.04)',
        border: '1px solid #f1f5f9'
    },
    cardTitle: { fontSize: '16px', fontWeight: '700', marginBottom: '25px', color: '#334155' },
    footer: { marginTop: '40px' },
    statBox: { display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#fffbeb', color: '#92400e', padding: '12px 20px', borderRadius: '15px', fontSize: '14px', border: '1px solid #fef3c7' }
};
