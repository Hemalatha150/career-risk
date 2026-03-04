import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import InputForm from "./components/InputForm";
import ResultCard from "./components/ResultCard";
import LandingPage from "./pages/LandingPage";

function Analyzer() {

  const [result, setResult] = useState(null);

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(120deg,#f8fafc,#e0f2fe,#bae6fd,#1e40af)",
    fontFamily: "Arial",
  };

  return (
    <div style={containerStyle}>

      <div
        style={{
          display: "flex",
          gap: "40px",
          alignItems: "center",
        }}
      >
        <InputForm setResult={setResult} />
        <ResultCard result={result} />
      </div>

    </div>
  );
}

function App() {
  return (

    <Router>

      <Routes>

        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Your Existing Tool */}
        <Route path="/analyzer" element={<Analyzer />} />

      </Routes>

    </Router>

  );
}

export default App;