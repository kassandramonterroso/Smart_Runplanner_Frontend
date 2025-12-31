import { useState } from "react";

function App() {
  const [dayOff, setDayOff] = useState(false);
  const [energyLevel, setEnergyLevel] = useState("MEDIUM");
  const [sorenessLevel, setSorenessLevel] = useState("LOW");
  const [result, setResult] = useState(null);

  async function getSuggestion() {
    const response = await fetch(
      "http://localhost:8080/api/availability/suggest",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          dayOff,
          energyLevel,
          sorenessLevel
        })
      }
    );

    const data = await response.json();
    setResult(data);
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Run Planner</h1>

      <label>
        <input
          type="checkbox"
          checked={dayOff}
          onChange={(e) => setDayOff(e.target.checked)}
        />
        Day off
      </label>

      <div>
        <label>Energy level:</label>
        <select
          value={energyLevel}
          onChange={(e) => setEnergyLevel(e.target.value)}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>

      <div>
        <label>Soreness level:</label>
        <select
          value={sorenessLevel}
          onChange={(e) => setSorenessLevel(e.target.value)}
        >
          <option value="LOW">LOW</option>
          <option value="MEDIUM">MEDIUM</option>
          <option value="HIGH">HIGH</option>
        </select>
      </div>

      <br />

      <button onClick={getSuggestion}>Get suggestion</button>

      {result && (
        <div style={{ marginTop: "1rem" }}>
          <h2>{result.suggestion}</h2>
          <p>{result.reason}</p>
        </div>
      )}
    </div>
  );
}

export default App;
