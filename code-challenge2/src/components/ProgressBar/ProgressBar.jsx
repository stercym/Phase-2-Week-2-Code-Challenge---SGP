import React from 'react';
import './ProgressBar.css';

function ProgressBar({ progress }) {
  // EnsureS that progress is between 0 and 100
  const clampedProgress = Math.max(0, Math.min(100, progress)); 
  return (
    <div className="progress-bar-container">
      <div className="progress-bar-fill" style={{ width: `${clampedProgress}%` }} >
        {clampedProgress.toFixed(0)}%
      </div>
    </div>
  );
}

export default ProgressBar;