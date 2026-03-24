import datetime

def generate_schedule(subjects, daily_limit, start_date_str):
    start_date = datetime.datetime.strptime(start_date_str, "%Y-%m-%d").date()
    schedule = {}
    
    max_days = 0
    parsed_subjects = []
    for s in subjects:
        exam_date = datetime.datetime.strptime(s["exam_date"], "%Y-%m-%d").date()
        days_left = (exam_date - start_date).days
        if days_left > 0:
            parsed_subjects.append({
                "name": s["name"],
                "difficulty": int(s["difficulty"]),
                "exam_date": exam_date
            })
            if days_left > max_days:
                max_days = days_left
                
    if not parsed_subjects:
        return {}

    # limit to max 60 days to avoid huge schedules
    max_days = min(max_days, 60)
    
    for day_offset in range(max_days):
        current_date = start_date + datetime.timedelta(days=day_offset)
        daily_plan = []
        
        active_subjects = []
        for s in parsed_subjects:
            days_left = (s["exam_date"] - current_date).days
            if days_left > 0:
                # Priority = Difficulty * (1 / Days Left)
                priority = s["difficulty"] / days_left
                active_subjects.append((priority, s, days_left))
            elif days_left == 0:
                # day of exam, no study allocated before exam (or just revision)
                pass
                
        if not active_subjects:
            continue
            
        # Greedy: sort by priority descending
        active_subjects.sort(key=lambda x: x[0], reverse=True)
        
        hours_available = daily_limit
        total_priority = sum(x[0] for x in active_subjects)
        
        for priority, s, days_left in active_subjects:
            if hours_available <= 0:
                break
            
            # allocate proportionally
            alloc = round((priority / total_priority) * daily_limit)
            if alloc < 1:
                alloc = 1
            if alloc > hours_available:
                alloc = hours_available
                
            if alloc > 0:
                is_revision = (days_left <= 2)
                daily_plan.append({
                    "subject": s["name"], 
                    "hours": alloc, 
                    "type": "Revision" if is_revision else "Study"
                })
                hours_available -= alloc
                
        # add breaks if daily plan has items
        if daily_plan:
            # Add short break entries between study sessions
            with_breaks = []
            for i, session in enumerate(daily_plan):
                with_breaks.append(session)
                if i < len(daily_plan) - 1:
                    with_breaks.append({"subject": "Break", "hours": 0.25, "type": "Break"})
            daily_plan = with_breaks

        schedule[current_date.strftime("%Y-%m-%d")] = daily_plan
        
    return schedule
