import React, { useState, useEffect } from 'react';
import './GoalForm.css';

function GoalForm({ onSubmit, initialData = null, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    category: '',
    deadline: '',
    savedAmount: '', // Include savedAmount for editing, though typically only set on creation
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        targetAmount: initialData.targetAmount,
        category: initialData.category,
        deadline: initialData.deadline,
        savedAmount: initialData.savedAmount,
      });
    } else {
      setFormData({
        name: '',
        targetAmount: '',
        category: '',
        deadline: '',
        savedAmount: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === 'targetAmount' || name === 'savedAmount' ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, id: initialData ? initialData.id : null });
    setFormData({ // Reset form after submission
      name: '',
      targetAmount: '',
      category: '',
      deadline: '',
      savedAmount: '',
    });
    if (onCancel) onCancel(); // Call onCancel to clear editing state
  };

  return (
    <div className="goal-form-container">
      <h2>{initialData ? 'Edit Goal' : 'Add New Goal'}</h2>
      <form onSubmit={handleSubmit} className="goal-form">
        <div className="form-group">
          <label htmlFor="name">Goal Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="targetAmount">Target Amount:</label>
          <input
            type="number"
            id="targetAmount"
            name="targetAmount"
            value={formData.targetAmount}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        {initialData && (
          <div className="form-group">
            <label htmlFor="savedAmount">Saved Amount:</label>
            <input
              type="number"
              id="savedAmount"
              name="savedAmount"
              value={formData.savedAmount}
              onChange={handleChange}
              min="0"
            />
          </div>
        )}
        <div className="form-actions">
          <button type="submit">{initialData ? 'Update Goal' : 'Add Goal'}</button>
          {initialData && (
            <button type="button" onClick={onCancel} className="cancel-button">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default GoalForm;