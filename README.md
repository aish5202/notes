# 📚 Ask My Notes

An AI-powered Study Buddy and PDF Question-Answering application built with **FastAPI**, **ChromaDB**, **Groq LLM**, and **React + Vite**.

---

## 🚀 Features

- **Document Ingestion (RAG)**: Extracts text from PDF files, chunks them with overlap, and stores embeddings in ChromaDB.
- **Fast Search & Retrieval**: Finds the most relevant notes matching a question.
- **AI Synthesis**: Generates clear, friendly answers based strictly on your uploaded notes using Groq.
- **Interactive Agent**: Includes an agent (`agent_scratch.py`) capable of using tools:
  - `search_notes`: Searches PDF notes for answers with exact page references.
  - `calculate`: Safely calculates math expressions.
  - `today`: Returns current date and day.
  - `add_task`: Appends study tasks to `tasks.txt`.
- **Modern Web UI**: React chat interface with light/dark theme and instant PDF upload.

---

## 📂 Project Structure

```text
ask-my-notes/
├── .env.example            # Sample environment variables
├── .gitignore              # Ignored files (venv, node_modules, .env, etc.)
├── backend/
│   ├── docs/               # PDF notes directory
│   ├── ingest.py           # Chunks and embeds PDFs into ChromaDB
│   ├── main.py             # FastAPI backend server
│   ├── tools.py            # AI agent tool definitions
│   ├── agent_scratch.py    # Standalone interactive CLI agent loop
│   ├── test_api.py         # Unit tests for the backend API
│   ├── test_search.py      # CLI test for notes vector search
│   └── requirements.txt    # Python dependencies
└── frontend/
    ├── src/
    │   ├── App.jsx         # Main React component
    │   ├── App.css         # Styling
    │   └── main.jsx        # App entry point
    └── package.json        # Frontend dependencies & scripts
```

---

## 🛠️ Setup Instructions

### 1. Prerequisites
- Python 3.11 or 3.12
- Node.js 18+ and npm
- A Groq API key ([Get one free on Groq Console](https://console.groq.com/keys))

### 2. Configure Environment Variables
Copy the example environment file and add your Groq API key:
```bash
cp .env.example .env
```
Edit `.env`:
```env
GROQ_API_KEY="your_groq_api_key_here"
```

---

## 🏃 How to Run

### Option A: Run the Web App (Frontend + Backend)

1. **Start the Backend**:
   ```powershell
   cd backend
   python -m venv venv
   .\venv\Scripts\activate   # On Mac/Linux: source venv/bin/activate
   pip install -r requirements.txt
   uvicorn main:app --reload --port 8000
   ```
   *Backend will run at: `http://localhost:8000` (Docs at `http://localhost:8000/docs`)*

2. **Start the Frontend**:
   In a separate terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *Frontend will run at: `http://localhost:5173`*

---

### Option B: Run the Interactive CLI Agent

Run the autonomous study agent from the terminal:
```powershell
cd backend
.\venv\Scripts\python.exe agent_scratch.py
```

---

## 🧪 Running Tests

```powershell
cd backend
.\venv\Scripts\python.exe -m unittest test_api.py
```
