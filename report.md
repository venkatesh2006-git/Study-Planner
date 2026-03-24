# Project Report: AI-Based Smart Study Planner 📄

## 1. Problem Statement
Students often struggle with creating effective study schedules, resulting in poor time management and high stress before exams. A one-size-fits-all schedule is inflexible and fails to adjust to individual learning curves and deadlines.

## 2. Proposed Solution
The Smart Study Planner is a web-based application designed to take in subjects, difficulty levels, and exam dates to dynamically generate an optimized daily study plan. It continuously adjusts the schedule to prioritize the most urgent and challenging subjects based on constraints like daily available hours.

## 3. Core AI Concepts & Algorithm
We formulated the study scheduling problem as a **State Space Search** problem:
- **State**: The current schedule for a given day mapping subjects to hours.
- **Goal**: Allocate sufficient study time to all subjects prior to their respective exams without exceeding daily limits.
- **Action**: Assign daily hour slots to subjects.

### 3.1 Search Algorithm
A pure Breadth-First Search (BFS) explores all possible allocations, which is computationally expensive. Instead, we implemented a **Greedy + Heuristic approach**. Every day, the algorithm evaluates all active subjects and assigns study slots starting with the highest-priority subject.

### 3.2 Heuristic Function
The heuristic function dynamically calculates the urgency of a subject on any given day. 
Formula used:
`Priority = Difficulty × (1 / Days Left) = Difficulty / Days Left`

**Mechanics:**
- **High Difficulty + Less Time**: Yields a high priority score, ensuring this subject gets immediate maximum available hours.
- **Low Difficulty + More Time**: Yields a lower priority score, pushing its study allocation to later or giving it fewer hours today.

This heuristic ensures that students do not cram but rather balance their workload dynamically.

## 4. Advanced Features Implemented
1. **Daily limits**: The greedy algorithm respects max daily caps (e.g., 4 hrs/day).
2. **Breaks**: Implicit 15-minute intervals are placed between long study sessions for cognitive recovery.
3. **Revision Slots**: Automatically triggered when `Days Left <= 2`, changing the study type to ensure final review rather than initial learning.
4. **Progress check-ins**: Interactive checkboxes integrated directly into the DOM.
5. **Analytics**: Study distribution donut chart leveraging `Chart.js`.
6. **Exports**: Immediate PDF dumps of the generated schedule via `jsPDF`.

## 5. Technology Stack
- **Frontend**: HTML, CSS, JavaScript (Vanilla, no bulky frameworks, modern aesthetics).
- **Backend API**: Python via Flask.

## 6. Conclusion
The AI-Based Smart Study Planner effectively combats poor time management. By mathematically capturing urgency and difficulty, the heuristic algorithm ensures a scientifically backed, optimal study routine minimizing pre-exam anxiety.

*Note: Use a Markdown to PDF converter or print this file to PDF to submit as `report.pdf`.*
