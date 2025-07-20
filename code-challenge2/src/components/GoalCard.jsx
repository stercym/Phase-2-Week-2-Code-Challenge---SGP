import React from 'react';
import ProgressBar from './ProgressBar/ProgressBar';
import './GoalCard.css';

function GoalCard({ goal, onEdit, onDelete }) {
  const { id, name, targetAmount, savedAmount, category, deadline } = goal;
  const progress = (savedAmount / targetAmount) * 100;
  const remainingAmount = targetAmount - savedAmount;

  // Calculate time left and status
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const timeLeftMs = deadlineDate - today;
  const daysLeft = Math.ceil(timeLeftMs / (1000 * 60 * 60 * 24));

  let status = '';
  if (savedAmount >= targetAmount) {
    status = 'Completed!';
  } else if (daysLeft <= 0) {
    status = 'Overdue!';
  } else if (daysLeft <= 30) {
    status = `Warning: ${daysLeft} days left!`;
  } else {
    status = `${daysLeft} days left`;
  }

  const isOverdue = daysLeft <= 0 && savedAmount < targetAmount;
  const isCloseToDeadline = daysLeft > 0 && daysLeft <= 30 && savedAmount < targetAmount;
  const isCompleted = savedAmount >= targetAmount;


  return (
    <div className={`goal-card ${isOverdue ? 'overdue' : ''} ${isCloseToDeadline ? 'warning' : ''} ${isCompleted ? 'completed' : ''}`}>
      <h3>{name}</h3>
      <p><strong>Category:</strong> {category}</p>
      <p><strong>Target:</strong> KES{targetAmount.toLocaleString()}</p>
      <p><strong>Saved:</strong> KES{savedAmount.toLocaleString()}</p>
      <p><strong>Remaining:</strong> KES{remainingAmount.toLocaleString()}</p>
      <p className="deadline-status"><strong>Deadline:</strong> {deadline} ({status})</p>

      <ProgressBar progress={progress} />

      <div className="goal-actions">
        <button onClick={() => onEdit(goal)}>Edit</button>
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
}

export default GoalCard;