import React, { useEffect, useRef, useState } from "react";

function DietaryPreferences() {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = {
    1: {
      question: "Do you follow any specific diet?",
      options: ["Yes", "No"],
    },
    2: {
      question: "How many meals do you eat per day?",
      options: ["1-2 meals", "3 meals", "More than 3 meals"],
    },
    3: {
      question: "Do you have any food allergies?",
      options: ["Yes", "No"],
    },
    4: {
      question: "How often do you eat out?",
      options: ["Rarely", "Occasionally", "Frequently"],
    },
    5: {
      question: "Do you take any dietary supplements?",
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
          <h1 className="title text-center mb-3">Dietary Preferences</h1>
          <form className="card w-100 max-w-lg">
            <h4 className="card-title text-center mt-4">STEP 1 OF 5</h4>
            <div>{renderQuestions()}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DietaryPreferences;
