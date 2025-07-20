import React, { useState, useEffect, useCallback } from 'react';
import {fetchGoals, addGoal, updateGoal, deleteGoal, makeDeposit} from '../api/api';
import GoalCard from '../components/GoalCard';
import GoalForm from '../components/GoalForm';
import DepositForm from '../components/DepositForm';
import OverviewCard from '../components/OverviewCard';

function DashboardPage() {
  const [goals, setGoals] = useState([]);
  const [editingGoal, setEditingGoal] = useState(null); // State to hold goal being edited

  // Fetch goals on component mount
  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = useCallback(async () => {
    try {
      const data = await fetchGoals();
      setGoals(data);
    } catch (error) {
      console.error('Error loading goals:', error);
      // Handle error (e.g., show an error message to the user)
    }
  }, []);

  const handleAddOrUpdateGoal = useCallback(
    async (goalData) => {
      try {
        if (goalData.id) {
          // Update existing goal
          await updateGoal(goalData.id, goalData);
          setGoals((prevGoals) =>
            prevGoals.map((goal) =>
              goal.id === goalData.id ? goalData : goal
            )
          );
          setEditingGoal(null); // Clear editing state
        } else {
          // Add new goal
          const newGoal = await addGoal(goalData);
          setGoals((prevGoals) => [...prevGoals, newGoal]);
        }
      } catch (error) {
        console.error('Error saving goal:', error);
      }
    },
    []
  );

  const handleDeleteGoal = useCallback(
    async (id) => {
      try {
        await deleteGoal(id);
        setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
      } catch (error) {
        console.error('Error deleting goal:', error);
      }
    },
    []
  );

  const handleMakeDeposit = useCallback(
    async (goalId, amount) => {
      try {
        const goalToUpdate = goals.find((goal) => goal.id === goalId);
        if (goalToUpdate) {
          const updatedGoal = {
            ...goalToUpdate,
            savedAmount: goalToUpdate.savedAmount + amount,
          };
          await makeDeposit(goalId, updatedGoal.savedAmount);
          setGoals((prevGoals) =>
            prevGoals.map((goal) =>
              goal.id === goalId ? updatedGoal : goal
            )
          );
        }
      } catch (error) {
        console.error('Error making deposit:', error);
      }
    },
    [goals]
  );

  const handleEditClick = useCallback((goal) => {
    setEditingGoal(goal);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditingGoal(null);
  }, []);

  // Calculate overview statistics
  const totalGoals = goals.length;
  const totalMoneySaved = goals.reduce(
    (acc, goal) => acc + goal.savedAmount,
    0
  );
  const completedGoals = goals.filter(
    (goal) => goal.savedAmount >= goal.targetAmount
  ).length;

  return (
    <div className="dashboard-page">
      <h1>SMART GOAL PLANNER</h1>

      <div className="dashboard-overview">
        <OverviewCard
          totalGoals={totalGoals}
          totalMoneySaved={totalMoneySaved}
          completedGoals={completedGoals}
          goals={goals} // Pass goals to calculate time remaining/overdue
        />
      </div>

      <div className="dashboard-forms">
        <GoalForm
          onSubmit={handleAddOrUpdateGoal}
          initialData={editingGoal}
          onCancel={handleCancelEdit}
        />
        <DepositForm goals={goals} onMakeDeposit={handleMakeDeposit} />
      </div>

      <div className="goals-list">
        {goals.length > 0 ? (
          goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={handleEditClick}
              onDelete={handleDeleteGoal}
            />
          ))
        ) : (
          <p>No goals set yet. Start by adding a new financial goal!</p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;