import React, { useState } from 'react';
import './DepositForm.css';

// Define the DepositForm component, which accepts goals and an onMakeDeposit callback as props
function DepositForm({ goals, onMakeDeposit }) {

  // State to track the selected goal's ID
  const [selectedGoalId, setSelectedGoalId] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
 // Handler function to update selectedGoalId when a user selects a goal from the dropdown
  const handleGoalChange = (e) => {
    setSelectedGoalId(e.target.value);
  };

  const handleAmountChange = (e) => {
    setDepositAmount(Number(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedGoalId && depositAmount > 0) {
      onMakeDeposit(selectedGoalId, depositAmount);
       // Reset form fields after successful submission
      setSelectedGoalId('');
      setDepositAmount('');
    } else {
      alert('Please select a goal and enter a valid deposit amount.');
    }
  };

  return (
    <div className="deposit-form-container">
      <h2>Make a Deposit</h2>
       {/* Form element to capture deposit information */}
      <form onSubmit={handleSubmit} className="deposit-form">
        <div className="form-group">
          <label htmlFor="goalSelect">Select Goal:</label>
          <select
            id="goalSelect"
            value={selectedGoalId}
            onChange={handleGoalChange}
            required
          >
            <option value="">-- Select a Goal --</option>
            {goals.map((goal) => (
              <option key={goal.id} value={goal.id}>
                {goal.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="depositAmount">Deposit Amount:</label>
          <input
            type="number"
            id="depositAmount"
            value={depositAmount}
            onChange={handleAmountChange}
            required
            min="1"
          />
        </div>
        <button type="submit">Deposit</button>
      </form>
    </div>
  );
}

export default DepositForm;