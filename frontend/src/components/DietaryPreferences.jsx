import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../context";

function DietaryPreferences() {
  const quest = [
    { 1: "Do you follow any specific diet?", options: ["Yes", "No"] },
    {
      2: "How many meals do you eat per day?",
      options: ["1-2 meals", "3 meals", "More than 3 meals"],
    },
    { 3: "Do you have any food allergies?", options: ["Yes", "No"] },
    {
      4: "How often do you eat out?",
      options: ["Rarely", "Occasionally", "Frequently"],
    },
    { 5: "Do you take any dietary supplements?", options: ["Yes", "No"] },
  ];

  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    if (!domain.DietaryPreferences) {
      setDomain((prev) => ({ ...prev, DietaryPreferences: {} }));
    }
  }, []);

  let { domain, setDomain } = useContext(context);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const addQuestion = (questionId, answer) => {
    setDomain((prev) => {
      const updatedDietaryPreferences = {
        ...prev.DietaryPreferences,
        [questionId]: answer,
      };

      console.log("Updated DietaryPreferences:", updatedDietaryPreferences);

      return {
        ...prev,
        DietaryPreferences: updatedDietaryPreferences,
      };
    });
  };

  useEffect(() => {
    console.log(domain);
  }, [domain]);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
    addQuestion(questionId, answer);
  };

  return (
    <div ref={ref} className="container-fluid flex justify-center align-center">
      <div className="row w-100 justify-center">
        <h1 className="title text-center mb-3 lg:text-4xl md:text-4xl text-3xl">Dietary Preferences</h1>
        <div className="  ">
          <form className="bg-[#121212] rounded-xl pt-5 pb-10 px-10">
            <h4 className="card-title text-center font-semibold text-[1.8rem] mb-2">
              STEP 2 OF 5
            </h4>
            <hr />
            {quest.map((question, index) => {
              const [questionId, questionText] = Object.entries(question)[0];
              return (
                <div key={index}>
                  <div className="card">
                    <div className="card-header">
                      <br></br>
                      <h5 className="card-title text-xl">
                        Question {index + 1}
                      </h5>
                      <p className="card-text text-lg mb-3">{questionText}</p>
                    </div>
                    <div className="card-body mt-3">
                      {question.options.map((option, i) => (
                        <div className="form-check mt-1" key={i}>
                          <input
                            className="form-check-input border-2 border-dark"
                            type="radio"
                            name={`q${questionId}`}
                            id={`q${questionId}a${i}`}
                            value={option}
                            onChange={(e) =>
                              handleAnswerChange(questionId, e.target.value)
                            }
                            checked={selectedAnswers[questionId] === option}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`q${questionId}a${i}`}
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                    <hr className="mt-3" />
                  </div>
                </div>
              );
            })}
          </form>
          <br></br>
        </div>
      </div>
    </div>
  );
}

export default DietaryPreferences;
