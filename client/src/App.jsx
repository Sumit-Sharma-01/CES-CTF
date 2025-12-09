import { useState } from "react";

const BACKEND = "https://ces-ctf.onrender.com"; // your Render backend

function App() {
  const [message, setMessage] = useState("");

  const login = async () => {
    const res = await fetch(`${BACKEND}/login`);
    const data = await res.json();

    localStorage.setItem("token", data.token);
    setMessage(data.message);
  };

  const admin = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(`${BACKEND}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const text = await res.text();
    setMessage(text);
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "40px" }}>
      <h1>JWT Breaker CTF</h1>

      <button onClick={login}>Login</button>
      <button onClick={admin} style={{ marginLeft: "10px" }}>
        Admin
      </button>

      <pre style={{ background: "#eee", padding: "20px", marginTop: "20px" }}>
        {message}
      </pre>
    </div>
  );
}

export default App;
