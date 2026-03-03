export default function ResultCard({ result }) {

  if (!result) return null;

  const color =
    result.risk_level === "Low"
      ? "#22c55e"
      : result.risk_level === "Medium"
      ? "#f59e0b"
      : "#ef4444";

  const card = {
    marginTop: "25px",
    background: "#0f172a",
    padding: "30px",
    borderRadius: "16px",
    textAlign: "center",
    color: "white",
    boxShadow:"0 10px 30px rgba(0,0,0,0.3)"
  };

  return (
    <div style={card}>
      <h3>Layoff Risk Score</h3>

      <h1 style={{
        fontSize:"42px",
        margin:"10px 0"
      }}>
        {result.layoff_risk}%
      </h1>

      <h2 style={{color}}>
        {result.risk_level} Risk
      </h2>
    </div>
  );
}