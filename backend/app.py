from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
import sys
import os

# Ensure the algorithm folder is importable
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from algorithm.scheduler import generate_schedule

app = Flask(__name__)
CORS(app)

@app.route('/api/schedule', methods=['POST'])
def create_schedule():
    data = request.json
    subjects = data.get('subjects', [])
    daily_limit = float(data.get('daily_limit', 4))
    start_date = data.get('start_date', datetime.date.today().strftime("%Y-%m-%d"))
    
    schedule = generate_schedule(subjects, daily_limit, start_date)
    return jsonify({"schedule": schedule})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
