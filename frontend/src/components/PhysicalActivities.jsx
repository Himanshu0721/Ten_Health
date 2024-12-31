import React, { useContext, useEffect, useRef, useState } from "react";
import { context } from "../context";

function PhysicalActivities() {
  const quest = [
    {
      1: "How often do you exercise?",
      options: ["Rarely", "Occasionally", "Frequently"],
    },
    {
      2: "What type of physical activities do you engage in?",
      options: [
        "Cardio",
        "Strength Training",
        "Flexibility Exercises",
        "Other",
      ],
    },
    {
      3: "How long is each exercise session?",
      options: [
        "Less than 30 minutes",
        "30-60 minutes",
        "More than 60 minutes",
      ],
    },
    { 4: "Do you have any physical limitations?", options: ["Yes", "No"] },
    { 5: "Do you follow a specific fitness routine?", options: ["Yes", "No"] },
  ];

  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
    if (!domain.PhysicalActivities) {
      setDomain((prev) => ({ ...prev, PhysicalActivities: {} }));
    }
  }, []);

  let { domain, setDomain } = useContext(context);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const addQuestion = (questionId, answer) => {
    setDomain((prev) => {
      const updatedPhysicalActivities = {
        ...prev.PhysicalActivities,
        [questionId]: answer,
      };

      console.log("Updated PhysicalActivities:", updatedPhysicalActivities);

      return {
        ...prev,
        PhysicalActivities: updatedPhysicalActivities,
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
        <h1 className="title text-center mb-3">Physical Activities</h1>
        <div className="flex flex-col justify-center align-center">
          <form className="bg-[#121212] rounded-xl ml-7 pt-5 pb-10 px-10">
            <h4 className="card-title text-center font-semibold text-[1.8rem] mb-2">
              STEP 3 OF 5
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

export default PhysicalActivities;
