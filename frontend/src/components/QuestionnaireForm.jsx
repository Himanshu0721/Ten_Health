import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionnaireForm = ({ onSubmitData }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    symptoms: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitData(formData);
    navigate("/summary"); // Navigate to summary page
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Health Questionnaire</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter your age"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Symptoms</label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Describe your symptoms"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default QuestionnaireForm;
