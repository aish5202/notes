import { useEffect, useState } from "react";
import "./App.css";
import Voice from "./Voice.jsx";

const API = "http://localhost:8000";

async function getPieces() {
  const res = await fetch(`${API}/`);
  if (!res.ok) throw new Error("Could not load notes");
  const data = await res.json();
  return data.pieces;
}

// Turns the sources into short text, like "rules.pdf p.2"
function showSources(sources) {
  const names = sources.map((s) => `${s.source} p.${s.page}`);
  return [...new Set(names)].join(" · ");
}
function App() {
  // The app's memory
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [agentMode, setAgentMode] = useState(false);
  const [pieces, setPieces] = useState(null);
  const [notesError, setNotesError] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  async function loadPieces() {
    try {
      setPieces(await getPieces());
      setNotesError(false);
    } catch {
      setNotesError(true);
    }
  }

  useEffect(() => {
    let active = true;
    getPieces()
      .then((count) => {
        if (active) setPieces(count);
      })
      .catch(() => {
        if (active) setNotesError(true);
      });
    return () => {
      active = false;
    };
  }, []);

  // Adds one message to the chat
  function addMessage(msg) {
    setMessages((old) => [...old, msg]);
  }
  // Runs when you press Ask
  async function askQuestion() {
    if (!question.trim()) return;
    const myQuestion = question;
    addMessage({ role: "user", text: myQuestion });
    setQuestion("");
    setLoading(true);
    try {
      const res = await fetch(`${API}/${agentMode ? "agent" : "ask"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: myQuestion }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      addMessage({ role: "bot", text: data.answer, sources: data.sources, steps: data.steps });
    } catch {
      addMessage({ role: "bot", text: "Oops! Is the backend running?" });
    }
    setLoading(false);
  }
  async function uploadPdf(e) {
    const file = e.target.files[0];
    if (!file) return;
    const form = new FormData();
    form.append("file", file);
    setLoading(true);
    try {
      const res = await fetch(`${API}/upload`, { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload error");
      const data = await res.json();
      addMessage({ role: "bot", text: data.message });
      await loadPieces();
    } catch {
      addMessage({ role: "bot", text: "Upload failed. Try again." });
    }
    setLoading(false);
  }

  // What you see on the screen
  return (
    <div className={`app${darkMode ? " dark" : ""}`}>
      <header className="app-header">
        <div>
      <h1>📚 Ask My Notes</h1>
      <div className="top">
        <label className="mode">
          <input type="checkbox" checked={agentMode}
            onChange={(e) => setAgentMode(e.target.checked)} />
          🤖 Agent mode
         </label>
        <Voice />
      </div>

          <p className="piece-count">
            {pieces !== null
              ? `📄 ${pieces} pieces in your notes`
              : notesError
                ? "Notes count unavailable."
                : "Loading notes…"}
          </p>
        </div>
        <button
          className="theme-toggle"
          onClick={() => setDarkMode((dark) => !dark)}
        >
          {darkMode ? "Light mode" : "Dark mode"}
        </button>
      </header>
      <div className="chat">
        {messages.length === 0 && (
          <p className="hint">Ask anything about your notes 👇</p>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}>
            <p>{m.text}</p>
            {m.sources && <small>📄 {showSources(m.sources)}</small>}
            {m.steps?.length > 0 && <small>🛠 {m.steps.join(" → ")}</small>}
          </div>
        ))}
        {loading && <div className="msg bot">Thinking… 🤔</div>}
      </div>
      <div className="ask-box">
        <label className="upload">
          📎 PDF
          <input type="file" accept=".pdf" hidden onChange={uploadPdf} />
        </label>

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && askQuestion()}
          placeholder="Type your question…"
        />
        <button onClick={askQuestion} disabled={loading}>
          Ask
        </button>
        <button className="clear" onClick={() => setMessages([])}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;

