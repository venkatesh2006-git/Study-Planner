# Smart Study Planner 🎓

An AI-Based Smart Study Planner to help students create effective, optimized daily study schedules based on subject priority, difficulty, and time remaining before exams.

## Features ✨
- **AI-Powered Scheduling**: Uses a Greedy Search + Heuristic approach to optimize study sessions.
- **Daily Constraints**: Respects your daily study hour limit.
- **Micro-management**: Includes regular breaks & dedicated revision slots close to the exam.
- **Premium UI**: Modern dark/light mode toggle, smooth gradients, and glassmorphism.
- **Progress Tracking**: Checkboxes for daily tasks to manage progress.
- **Analytics & Export**: Visual breakdown with Chart.js and one-click export to PDF.

## Tech Stack 🛠️
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (Chart.js, jsPDF)
- **Backend**: Python 3, Flask, Flask-CORS
- **Algorithm**: State-space heuristic scheduler prioritizing difficulty & time remaining.

## Quick Start 🚀

### 1. Start the Backend API
You will need Python installed on your system.

```bash
cd backend
pip install -r requirements.txt
python app.py
```
The Flask server will start on `http://127.0.0.1:5000`.

### 2. Launch the Frontend
Simply open the `index.html` file located in the `frontend` folder in your preferred modern web browser:

```bash
# Example on Windows
start frontend/index.html
```

Or use a local development server like VS Code Live Server.

## How Priority is Calculated 🧠
The core of the planner uses this heuristic formula:
`Priority = Difficulty / Days Left`
- Hard subjects with fewer days left receive *High Priority* and max study limits.
- Revision slots are automatically triggered within 2 days of an exam.

Designed with ❤️ for better study habits.
