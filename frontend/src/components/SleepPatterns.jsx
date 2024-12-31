import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../context";

function SleepPatterns() {
  const quest = [
    {
      1: "How many hours of sleep do you get on average?",
      options: [
        "Less than 5 hours",
        "5-6 hours",
        "7-8 hours",
        "More than 8 hours",
      ],
    },
    { 2: "Do you have a consistent sleep schedule?", options: ["Yes", "No"] },
    { 3: "Do you experience any sleep disturbances?", options: ["Yes", "No"] },
    {
      4: "How do you feel when you wake up?",
      options: [
        "Refreshed and energetic",
        "Tired but functional",
        "Exhausted and groggy",
      ],
    },
    { 5: "Do you take any sleep aids or medications?", options: ["Yes", "No"] },
  ];

  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    if (!domain.SleepPatterns) {
      setDomain((prev) => ({ ...prev, SleepPatterns: {} }));
    }
  }, []);

  let { domain, setDomain } = useContext(context);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const addQuestion = (questionId, answer) => {
    setDomain((prev) => {
      const updatedSleepPatterns = {
        ...prev.SleepPatterns,
        [questionId]: answer,
      };

      console.log("Updated SleepPatterns:", updatedSleepPatterns);

      return {
        ...prev,
        SleepPatterns: updatedSleepPatterns,
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
      <div className="row justify-center">
        <h1 className="title text-center mb-3">Sleep Patterns</h1>
        <div className="flex flex-col align-middle justify-center">
          <form className="bg-[#121212] rounded-xl ml-7 pt-5 pb-10 px-10">
            <h4 className="card-title text-center font-semibold text-[1.8rem] mb-2">
              STEP 4 OF 5
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

export default SleepPatterns;
