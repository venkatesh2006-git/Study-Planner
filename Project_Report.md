# Project Report: AI-Based Smart Study Planner 📄

## 1. Problem Statement
Students often struggle with creating effective study schedules, resulting in poor time management, procrastination, and severe stress before exams. Traditional, static schedules are inflexible and fail to adjust to individual learning curves, changing priorities, and looming deadlines. There is a clear need for a dynamic tool that adapts to a student's workload.

## 2. Why It Matters
Academic stress and last-minute cramming lead to poor information retention, compromised mental health, and academic burnout. By providing a smart, adaptable scheduling tool, students can break down their coursework into manageable, prioritized daily tasks. This proactive approach fosters better study habits, reduces anxiety, and ultimately improves academic performance.

## 3. Approach to Solving the Problem
I developed the **Smart Study Planner**, a web-based application designed to take input parameters such as subjects, difficulty levels (1-10), and exam dates, and dynamically generate an optimized daily study plan.

The core of the solution is an AI-inspired scheduling algorithm. We formulated the study scheduling problem mathematically and implemented a **Greedy + Heuristic approach**. Every day, the algorithm evaluates all active subjects and assigns study slots starting with the highest-priority subject based on a custom heuristic function:
`Priority = Difficulty × (1 / Days Left) = Difficulty / Days Left`

This ensures that subjects with high difficulty and fewer days left get immediate priority, while those with lower difficulty or more time are deferred or given fewer hours.

## 4. Key Decisions Made
Throughout the development cycle, several critical decisions shaped the final product:
- **Algorithm Choice:** Rather than using a pure Breadth-First Search (BFS) which is computationally expensive for large schedules, I chose a greedy heuristic approach. This provides a computationally efficient near-optimal schedule that generates instantly.
- **Proportional Allocation:** Instead of allocating all available time to just the top priority subject, I distributed the daily hours proportionally among all active subjects based on their relative priority scores, ensuring steady progress across all fronts.
- **Built-in Constraints:** I implemented strict daily study limits (e.g., 4 hours/day) to prevent the algorithm from generating unrealistic, burnout-inducing schedules.
- **Cognitive Recovery:** The algorithm implicitly inserts 15-minute breaks between study sessions to encourage the Pomodoro technique and prevent fatigue.
- **Revision Mode:** A dynamic switch was added so that when a subject is 2 days or fewer away from the exam, the study type automatically changes from "Study" to "Revision".
- **Tech Stack:** I opted for a lightweight stack (Vanilla HTML/CSS/JS for the frontend and Python/Flask for the backend) rather than bulky frameworks. This minimized overhead and allowed me to focus heavily on the core logic and clean aesthetics.

## 5. Challenges Faced
- **Heuristic Balancing:** Designing a heuristic function that accurately balances urgency (days left) and importance (difficulty) required several iterations and testing to get right. Early versions either ignored difficult but distant exams or panicked and allocated too much time to easy exams that were soon.
- **Handling Edge Cases:** When multiple subjects have colliding exam dates, the algorithm initially struggled to fit everything within the daily hour limit. This was resolved by implementing the proportional allocation logic.
- **State Management without Frameworks:** Dynamically updating the DOM elements, managing state, and rendering the schedule table without a reactive framework like React required careful event listener management and DOM manipulation.
- **Integration:** Ensuring seamless communication between the frontend and the Python backend, particularly handling date parsing, format conversions, and dealing with timezone differences (`datetime` objects).

## 6. What I Learned
- **Practical Algorithm Design:** I gained hands-on experience in applying theoretical search algorithms to solve a practical, real-world constraint satisfaction problem.
- **Full-Stack Development:** I learned how to build a complete application from scratch, bridging a Python (Flask) backend API with a functional frontend interface.
- **API Integration:** I improved my skills in handling RESTful APIs, parsing JSON requests, and structuring JSON responses for the frontend.
- **Third-Party Libraries:** I successfully integrated and utilized `Chart.js` for visual analytics (study distribution donut charts) and `jsPDF` for immediate PDF exports of generated schedules, enhancing my ability to read documentation and use external tools.
- **Project Structuring:** I learned the importance of separating concerns—keeping the core algorithm logic (`scheduler.py`) separate from the API routing (`app.py`), resulting in cleaner, more maintainable code.
