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
      <div className="card" key={key}>
        <div className="card-header">
          <br></br>
          <h5 className="card-title text-xl">Question {key}</h5>
          <p className="card-text text-lg mb-3">{questions[key].question}</p>
        </div>
        <div className="card-body mt-3">
          {questions[key].options.map((option, index) => (
            <div className="form-check mt-1" key={index}>
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
          <hr className="mt-3" />
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
      <div className="w-[65%]">
        <h1 className="title text-center mb-3">Dietary Preferences</h1>
        <form className="bg-[#121212] rounded-xl ml-7 py-5 px-10">
          <h4 className="card-title text-center font-semibold text-[1.8rem] mb-2">STEP 2 OF 5</h4>
          <hr />
          <div>{renderQuestions()}</div>
        </form>
      </div>
    </div>
  </div>
  );
}

export default DietaryPreferences;
