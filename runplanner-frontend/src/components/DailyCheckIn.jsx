import { useState } from "react";

function DailyCheckIn() {
  const [energy, setEnergy] = useState("MEDIUM");
  const [soreness, setSoreness] = useState("MEDIUM");
  const [motivation, setMotivation] = useState("MEDIUM");
  const [suggestion, seSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch("http://localhost:8080/api/suggestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          energy,
          soreness,
          motivation,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Backend Error");
      }
  
      const data = await response.json();
      setSuggestion(data);

    } catch (err) {
      setError("Backend not running. Please start the server.");
      setSuggestion(null);

    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div>
      <h2>Daily Check-In</h2>
  
      <label>
        Energy:
        <select value={energy} onChange={(e) => setEnergy(e.target.value)}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </label>
  
      <br></br>
      <label>
        Soreness:
        <select value={soreness} onChange={(e) => setSoreness(e.target.value)}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </label>
  
     
    
     <br></br>
      <label>
        Motivation:
        <select value={motivation} onChange={(e) => setMotivation(e.target.value)}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </label>

    <br></br>
    <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Loading...": "Get Suggestion"}
    </button>

    {error && <p style={{ color: "red" }}>{error}</p>}

    {suggestion && (
        <div style={{ marginTop: "20px" }}>
            <h3>Today's Run</h3>
            
            {suggestion.primary && (
              <div>
                <h4>Primary Recommendation</h4>
                <p><strong>Type:</strong>{suggestion.primary.runType}</p>
                <p>{suggestion.primary.reason}</p>
              </div>
            )}

           {suggestion.alternative && (
             <div style={{marginTop: "10px"}}>
               <h4>Alternative Run</h4>
               <p><strong>Type:</strong>{suggestion.alternative.runType}</p>
               <p>{suggestion.alternative.reason}</p>
             </div>
           )}   

        </div>
    )}



    </div>
  );

}

export default DailyCheckIn;