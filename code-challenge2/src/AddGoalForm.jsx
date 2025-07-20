import React, { useState } from "react";
import { addGoal } from "../services/goalService";

function AddGoalForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    category: "",
    deadline: "",
  });
}
export default AddGoalForm;