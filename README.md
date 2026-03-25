# Smart Study Planner 📄

![Smart Study Planner](https://img.shields.io/badge/Status-Completed-success) ![Python](https://img.shields.io/badge/Python-3.8+-blue) ![Flask](https://img.shields.io/badge/Backend-Flask-black) ![Vanilla JS](https://img.shields.io/badge/Frontend-HTML%2FJS%2FCSS-yellow)

## 📝 What the Project Does

The **Smart Study Planner** is an AI-inspired web application designed to help students optimize their study schedules. It eliminates procrastination and last-minute cramming by taking user inputs—subjects, difficulty levels (1-10), and exam dates—and dynamically generating a balanced, prioritized daily study plan.

### Key Features
- **Dynamic Scheduling:** Utilizes a custom heuristic algorithm (`Priority = Difficulty / Days Left`) to allocate study hours dynamically based on urgency and importance.
- **Proportional Time Allocation:** Distributes a daily limit (e.g., 4 hours/day) across active subjects, ensuring no subject is neglected.
- **Smart Modes:** Automatically switches study sessions to "Revision Mode" when an exam is 2 days away.
- **Burnout Prevention:** Implements daily hour constraints and implicit 15-minute breaks (Pomodoro style).
- **PDF Exports & Analytics:** Instantly exports your schedule to a PDF and provides visual data with integrated pie charts.

---

## 💻 Tech Stack

- **Frontend:** Vanilla HTML5, CSS3, JavaScript (Chart.js for analytics, jsPDF for PDF generation)
- **Backend:** Python, Flask, Flask-CORS
- **Algorithm:** Custom Greedy + Heuristic scheduling

---

## 🚀 How to Set It Up

Follow these steps to run the application on your local machine.

### Prerequisites
- **Python 3.8+** installed on your machine.
- Ensure you have **pip** installed for managing Python packages.
- A modern web browser (Chrome, Edge, Firefox).

### 1. Clone or Download the Project
Download and extract the project files to your local machine.

### 2. Set Up the Backend
The backend API is responsible for running the scheduling algorithm.

1. Open your terminal or command prompt and navigate to the `backend` directory:
   ```bash
   cd "project 1/smart-study-planner/backend"
   ```
2. (Optional but Recommended) Create and activate a Virtual Environment:
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   # On Mac/Linux:
   source venv/bin/activate
   ```
3. Install the required backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Start the Flask server:
   ```bash
   python app.py
   ```
   *The backend server should now be running on `http://127.0.0.1:5000` or `http://localhost:5000`.*

### 3. Open the Frontend
The frontend is a static web page that communicates with the Flask server.

1. Open the `frontend` directory in your file explorer (`project 1/smart-study-planner/frontend`).
2. Double-click on `index.html` to open it in your browser, **OR** (recommended) use an extension like "Live Server" in VS Code to serve the frontend.

---

## 🕹️ How to Use It

1. **Open the App:** Navigate to the frontend page (`index.html`) in your browser. Ensure your Flask backend is running in the terminal.
2. **Input General Information:** 
   - Enter the global `Start Date` (when you want your study plan to begin).
   - Set your `Daily Limit` (maximum hours you wish to study per day).
3. **Add Subjects:**
   - Click on the "Add Subject" or input fields to provide details for each course.
   - Enter the **Subject Name**.
   - Dial in the **Difficulty** from 1 (easiest) to 10 (hardest).
   - Select the respective **Exam Date**.
4. **Generate Plan:** Click the "Generate Schedule" button. The app will send the payload to the backend, run the algorithm, and instantly render your personalized plan.
5. **Review & Export:** 
   - View the generated table to see what you need to study, for how long, and when to take breaks.
   - Download the schedule using the **Export to PDF** button.

---

### ✨ Directory Structure Overview
```text
project 1/
└── smart-study-planner/
    ├── algorithm/
    │   └── scheduler.py       # Core scheduling heuristic algorithm
    ├── backend/
    │   ├── app.py             # Flask API endpoints & CORS setup
    │   └── requirements.txt   # Python dependencies lists (Flask, Flask-CORS)
    ├── frontend/
    │   ├── index.html         # User interface
    │   ├── styles.css         # Styling and layout
    │   └── script.js          # DOM manipulation and API calls
    └── Project_Report.md      # Detailed documentation on design decisions
```

