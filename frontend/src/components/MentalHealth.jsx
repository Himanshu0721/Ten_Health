import React, { useEffect, useRef, useState } from "react";

function MentalHealth() {
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const questions = {
    1: {
      question: "How often do you feel stressed?",
      options: ["Rarely", "Occasionally", "Frequently"],
    },
    2: {
      question: "Do you have any coping mechanisms for stress?",
      options: ["Yes", "No"],
    },
    3: {
      question: "How often do you feel anxious?",
      options: ["Rarely", "Occasionally", "Frequently"],
    },
    4: {
      question: "Do you have any mental health conditions?",
      options: ["Yes", "No"],
    },
    5: {
      question: "Do you seek professional help for mental health?",
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
          <h1 className="title text-center mb-3">Mental Health</h1>
          <form className="card w-100 max-w-lg">
            <h4 className="card-title text-center mt-4">STEP 1 OF 5</h4>
            <div>{renderQuestions()}</div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default MentalHealth;
