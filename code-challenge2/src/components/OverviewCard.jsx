import React from 'react';
import './OverviewCard.css';

function OverviewCard({ totalGoals, totalMoneySaved, completedGoals, goals }) {
  const now = new Date();

  const goalsWithStatus = goals.map((goal) => {
    const deadlineDate = new Date(goal.deadline);
    const timeLeftMs = deadlineDate - now;
    const daysLeft = Math.ceil(timeLeftMs / (1000 * 60 * 60 * 24));
    const isCompleted = goal.savedAmount >= goal.targetAmount;
    const isOverdue = !isCompleted && daysLeft <= 0;
    const isWarning = !isCompleted && daysLeft > 0 && daysLeft <= 30;

    let timeLeftMessage;
    if (isCompleted) {
      timeLeftMessage = 'Completed!';
    } else if (isOverdue) {
      timeLeftMessage = 'Overdue';
    } else if (daysLeft > 0) {
      timeLeftMessage = `${daysLeft} days left`;
    } else {
      timeLeftMessage = 'Deadline passed'; // Should ideally be caught by overdue
    }

    return {
      ...goal,
      isCompleted,
      isOverdue,
      isWarning,
      timeLeftMessage,
    };
  });

  return (
    <div className="overview-card">
      <h2>Savings Overview</h2>
      <div className="overview-stats">
        <div className="stat-item">
          <h3>Total Goals</h3>
          <p>{totalGoals}</p>
        </div>
        <div className="stat-item">
          <h3>Total Money Saved</h3>
          <p>KES{totalMoneySaved.toLocaleString()}</p>
        </div>
        <div className="stat-item">
          <h3>Goals Completed</h3>
          <p>{completedGoals}</p>
        </div>
      </div>

      <div className="goal-status-list">
        <h3>Individual Goal Status:</h3>
        {goalsWithStatus.length > 0 ? (
          <ul>
            {goalsWithStatus.map((goal) => (
              <li
                key={goal.id}
                className={`${goal.isOverdue ? 'overdue' : ''} ${
                  goal.isWarning ? 'warning' : ''
                } ${goal.isCompleted ? 'completed' : ''}`}
              >
                <strong>{goal.name}:</strong> {goal.timeLeftMessage}
              </li>
            ))}
          </ul>
        ) : (
          <p>No goals to display status.</p>
        )}
      </div>
    </div>
  );
}

export default OverviewCard;