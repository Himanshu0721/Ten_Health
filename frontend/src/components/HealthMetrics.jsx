import React, { useEffect, useRef, useState } from "react";

function HealthMetrics() {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = {
    1: {
      question: "What is your current weight?",
      options: ["Under 50kg", "50-70kg", "Above 70kg"],
    },
    2: {
      question: "What is your current height?",
      options: ["Under 150cm", "150-170cm", "Above 170cm"],
    },
    3: {
      question: "Do you have any known medical conditions?",
      options: ["Yes", "No"],
    },
    4: {
      question: "What is your blood pressure range?",
      options: ["Low", "Normal", "High"],
    },
    5: {
      question: "What is your BMI?",
      options: ["Underweight", "Normal", "Overweight", "Obese"],
    },
    6: {
      question: "Do you have any allergies?",
      options: ["Yes", "No"],
    },
  };

  const ref = useRef(null);
  const renderQuestions = () => {
    return Object.keys(questions).map((key) => (
      <div className="card w-100 max-w-lg" key={key}>
        <div className="card-header">
          <br></br>
          <h5 className="card-title">Question {key}</h5>
          <p className="card-text">{questions[key].question}</p>
        </div>
        <div className="card-body">
          {questions[key].options.map((option, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input border-2 border-dark"
                type="radio"
                name={`q${key}`}
                id={`q${key}a${index}`}
                value={option}
                onChange={(e) => handleAnswerChange(key, e.target.value)}
                checked={selectedAnswers[key] === option}
              />
              <label className="form-check-label" htmlFor={`q${key}a${index}`}>
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answer,
    });
  };

  return (
    <div ref={ref} className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="title text-center mb-3">Health Metrics</h1>
          <form className="card w-100 max-w-lg">
            <h4 className="card-title text-center mt-4">STEP 1 OF 6</h4>
            <div>{renderQuestions()}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HealthMetrics;
