let subjects = [];
let chartInstance = null;

document.getElementById('startDate').valueAsDate = new Date();

document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.getElementById('themeToggle').textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    if(chartInstance) updateChartTheme(isDark);
});

document.getElementById('subjectForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('subjectName').value;
    const diff = document.getElementById('difficulty').value;
    const date = document.getElementById('examDate').value;

    subjects.push({ name, difficulty: parseInt(diff), exam_date: date });
    renderSubjects();
    document.getElementById('subjectForm').reset();
    document.getElementById('difficulty').value = 3;
});

function renderSubjects() {
    const list = document.getElementById('subjectList');
    list.innerHTML = '';
    subjects.forEach((sub, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${sub.name}</strong> (Diff: ${sub.difficulty})</span>
            <span>${sub.exam_date} <button onclick="removeSubject(${idx})" style="background:none; border:none; color:red; cursor:pointer;">❌</button></span>
        `;
        list.appendChild(li);
    });
}

function removeSubject(idx) {
    subjects.splice(idx, 1);
    renderSubjects();
}

document.getElementById('generateBtn').addEventListener('click', async () => {
    if (subjects.length === 0) {
        alert("Please add at least one subject.");
        return;
    }

    const generateBtn = document.getElementById('generateBtn');
    generateBtn.textContent = 'Generating...';
    generateBtn.disabled = true;

    const payload = {
        subjects,
        daily_limit: parseFloat(document.getElementById('dailyLimit').value),
        start_date: document.getElementById('startDate').value
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/api/schedule', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        
        const data = await response.json();
        renderSchedule(data.schedule);
        document.getElementById('resultsSection').style.display = 'block';
        
        // scroll to results
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
        console.error(err);
        alert('Failed to connect to backend server. Ensure Flask is running on port 5000.');
    } finally {
        generateBtn.textContent = '✨ Generate Smart Schedule';
        generateBtn.disabled = false;
    }
});

function renderSchedule(schedule) {
    const grid = document.getElementById('scheduleGrid');
    grid.innerHTML = '';
    
    // For Chart
    const breakdown = {};
    
    Object.keys(schedule).forEach(date => {
        const dayCard = document.createElement('div');
        dayCard.className = 'day-card';
        
        const plan = schedule[date];
        let tasksHtml = '';
        
        plan.forEach(task => {
            if (task.type !== 'Break') {
                breakdown[task.subject] = (breakdown[task.subject] || 0) + task.hours;
            }
            
            tasksHtml += `
                <div class="task-item">
                    <div class="task-left">
                        <input type="checkbox" class="custom-checkbox">
                        <span class="task-label">${task.subject}</span>
                        <span class="task-type type-${task.type}">${task.type}</span>
                    </div>
                    <div class="task-right">
                        ${task.hours} hr${task.hours !== 1 ? 's' : ''}
                    </div>
                </div>
            `;
        });
        
        dayCard.innerHTML = `
            <h4>📅 ${new Date(date).toDateString()}</h4>
            <div class="task-list">${tasksHtml}</div>
        `;
        grid.appendChild(dayCard);
    });
    
    renderChart(breakdown);
}

function renderChart(breakdown) {
    const ctx = document.getElementById('studyChart').getContext('2d');
    const isDark = document.body.classList.contains('dark-mode');
    
    if (chartInstance) chartInstance.destroy();
    
    const labels = Object.keys(breakdown);
    const data = Object.values(breakdown);
    
    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: [
                    '#6c5ce7', '#00cec9', '#fdcb6e', '#e17055', '#d63031', '#e84393'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: isDark ? '#fff' : '#333' } }
            }
        }
    });
}

function updateChartTheme(isDark) {
    if(chartInstance) {
        chartInstance.options.plugins.legend.labels.color = isDark ? '#fff' : '#333';
        chartInstance.update();
    }
}

document.getElementById('downloadPdf').addEventListener('click', () => {
    // Basic PDF export using html2canvas & jsPDF
    const element = document.getElementById('scheduleGrid');
    html2canvas(element, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.text("Smart Study Schedule", 10, 10);
        pdf.addImage(imgData, 'PNG', 0, 20, pdfWidth, pdfHeight);
        pdf.save('study_schedule.pdf');
    });
});
