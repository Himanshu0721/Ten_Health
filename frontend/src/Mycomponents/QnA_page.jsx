import React, { useEffect } from "react";
import "./QnA_page.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../components/Loader";
import Mobilestepper from "./Mobilestepper";
import { context } from "../context";
import { IoFitnessOutline } from "react-icons/io5";
import { FaLaptopMedical } from "react-icons/fa6";
import { RiMentalHealthLine } from "react-icons/ri";

function QnA_page() {
  const answersEndRef = useRef(null);

  const [idea, setIdea] = useState("");
  const [startup, setStartup] = useState(false);
  const [brand, setBrand] = useState(false);

  const [buttonidea, setButtonidea] = useState("");
  const [buttonstartup, setButtonstartup] = useState("");
  const [buttonbrand, setButtonbrand] = useState("");

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [domain, setDomain] = useState({});
  const [loader, setLoader] = useState(false);

  const messages = { questions };

  const handleDownloadPdf = async () => {};

  let navigate = useNavigate();

  useEffect(() => {
    const cookies = Cookies.get("token");
    if (!cookies) {
      navigate("/login"); // Redirect to the ogin page if no token is found
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    answersEndRef.current?.scrollIntoView();
  }, [answers]);

  const addQuestions = (newQuestion) => {
    setQuestions((questions) => [...questions, newQuestion]);
  };

  const addAnswers = (newAnswer) => {
    setAnswers((answers) => [...answers, newAnswer]);
  };

  const ideaHandler = () => {
    addQuestions("What is your current health goal ?");
    addAnswers("Improving fitness");
    setIdea(true);
    setButtonidea("1px solid #0060d0");
    setButtonstartup(false);
    setButtonbrand(false);
  };

  const startupHandler = () => {
    addQuestions("What is your current health goal ?");
    addAnswers("General wellness");
    setIdea(true);
    setButtonstartup("1px solid #0060d0");
    setButtonbrand(false);
    setButtonidea(false);
  };

  const brandHandler = () => {
    addQuestions("What is your current health goal ?");
    addAnswers("Personalized health plan");
    setIdea(true);
    setButtonbrand("1px solid #0060d0");
    setButtonstartup(false);
    setButtonidea(false);
  };

  // For Question and Answer
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState([]);

  const influencer_ques = [
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 20rem",
        gap: "1.5rem",
      }}
    >
      <div
        className="bussiness mt-4"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="logo">
          <img src="./images/logo.png" alt=""></img>
        </div>
        <span>
          {" "}
          <TypeAnimation
            sequence={[
              // question start
              "Describe your current health status.",
              1000,
              () => {
                addQuestions("health status");
              },
            ]}
            wrapper="span"
            cursor={false}
            speed={70}
            style={{
              fontSize: "1.5rem",
              color: "white",
              flex: "1",
              textAlign: "center",
              gap: "1px",
            }}
          />
        </span>
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          style={{ padding: "1.2rem 1rem", fontSize: "1.1rem", width: "100%" }}
          type="text"
          className="input-field p-2"
          placeholder="Sedentary lifestyle, Active, Recovering from illness, Maintaining wellness, etc."
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              handleResponseSubmit(event.target.value);
              event.target.value = ""; // Clear input field
              event.target.style.display = "none"; // Hide input field
            }
          }}
        />
      </div>
    </div>,

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 20rem",
        gap: "1.5rem",
      }}
    >
      <div
        className="bussiness"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="logo">
          <img src="./images/logo.png" alt=""></img>
        </div>
        <span>
          {" "}
          <TypeAnimation
            sequence={[
              // Influencer q1
              "How many people are part of your wellness plan?",
              1000,
              () => {
                addQuestions("activity members");
              },
            ]}
            wrapper="span"
            cursor={false}
            speed={70}
            style={{
              fontSize: "1.5rem",
              color: "white",
              flex: "1",
              textAlign: "center",
              gap: "1px",
            }}
          />
        </span>
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          style={{ padding: "1.2rem 1rem", fontSize: "1.1rem", width: "100%" }}
          type="text"
          className="input-field p-2"
          placeholder="e.g., Just myself, My family, My team, etc"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              handleResponseSubmit(event.target.value);
              event.target.value = ""; // Clear input field
              event.target.style.display = "none"; // Hide input field
            }
          }}
        />
      </div>
    </div>,

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 20rem",
        gap: "1.5rem",
      }}
    >
      <div
        className="bussiness"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="logo">
          <img src="./images/logo.png" alt=""></img>
        </div>
        <span>
          {" "}
          <TypeAnimation
            sequence={[
              // Influencer q2
              "Are you focusing on a specific aspect of health?",
              1000,
              () => {
                addQuestions("health goal");
              },
            ]}
            wrapper="span"
            cursor={false}
            speed={70}
            style={{
              fontSize: "1.5rem",
              color: "white",
              flex: "1",
              textAlign: "center",
              gap: "1px",
            }}
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          style={{ padding: "1.2rem 1rem", fontSize: "1.1rem", width: "100%" }}
          type="text"
          className="input-field p-2"
          placeholder="e.g., Nutrition, Physical fitness, Mental health, Chronic illness management, etc."
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              handleResponseSubmit(event.target.value);
              event.target.value = ""; // Clear input field
              event.target.style.display = "none"; // Hide input field
            }
          }}
        />
      </div>
    </div>,

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 20rem",
        gap: "1.5rem",
      }}
    >
      <div
        className="bussiness"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="logo">
          <img src="./images/logo.png" alt=""></img>
        </div>
        <span>
          {" "}
          <TypeAnimation
            sequence={[
              // Influencer q3(radio)
              "How would you like to access health recommendations?",
              1000,
              () => {
                addQuestions("health tools");
              },
            ]}
            wrapper="span"
            cursor={false}
            speed={70}
            style={{
              fontSize: "1.5rem",
              color: "white",
              flex: "1",
              textAlign: "center",
              gap: "1px",
            }}
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          style={{ padding: "1.2rem 1rem", fontSize: "1.1rem", width: "100%" }}
          type="text"
          className="input-field p-2"
          placeholder="e.g., Mobile app, PDF blueprint, Weekly health coaching, etc."
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              handleResponseSubmit(event.target.value);
              event.target.value = ""; // Clear input field
              event.target.style.display = "none"; // Hide input field
            }
          }}
        />
      </div>
    </div>,

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 20rem",
        gap: "1.5rem",
      }}
    >
      <div
        className="bussiness"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="logo">
          <img src="./images/logo.png" alt=""></img>
        </div>
        <span>
          {" "}
          <TypeAnimation
            sequence={[
              // Influencer q4(radio)
              "Where do you prefer to follow your wellness plan?",
              1000,
              () => {
                addQuestions("plan preference");
              },
            ]}
            wrapper="span"
            cursor={false}
            speed={70}
            style={{
              fontSize: "1.5rem",
              color: "white",
              flex: "1",
              textAlign: "center",
              gap: "1px",
            }}
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          style={{ padding: "1.2rem 1rem", fontSize: "1.1rem", width: "100%" }}
          type="text"
          className="input-field p-2"
          placeholder="e.g., At home, At the gym, Outdoors, In a healthcare facility, etc"
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              handleResponseSubmit(event.target.value);
              event.target.value = ""; // Clear input field
              event.target.style.display = "none"; // Hide input field
            }
          }}
        />
      </div>
    </div>,

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 20rem",
        gap: "1.5rem",
      }}
    >
      <div
        className="bussiness"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="logo">
          <img src="./images/logo.png" alt=""></img>
        </div>
        <span>
          {" "}
          <TypeAnimation
            sequence={[
              // Influencer q5
              "What is the name of your health goal or initiative?",
              1000,
              () => {
                addQuestions("health goal title");
              },
            ]}
            wrapper="span"
            cursor={false}
            speed={70}
            style={{
              fontSize: "1.5rem",
              color: "white",
              flex: "1",
              textAlign: "center",
              gap: "1px",
            }}
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          style={{ padding: "1.2rem 1rem", fontSize: "1.1rem", width: "100%" }}
          type="text"
          className="input-field p-2"
          placeholder="e.g., 'Healthy Me 2024, 'Family Wellness Program,' etc."
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              handleResponseSubmit(event.target.value);
              event.target.value = ""; // Clear input field
              event.target.style.display = "none"; // Hide input field
            }
          }}
        />
      </div>
    </div>,

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 20rem",
        gap: "1.5rem",
      }}
    >
      <div
        className="bussiness"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="logo">
          <img src="./images/logo.png" alt=""></img>
        </div>
        <span>
          {" "}
          <TypeAnimation
            sequence={[
              // Influencer q8
              "Describe your health goal or initiative in detail.",
              1000,
              () => {
                addQuestions("description about your health");
              },
            ]}
            wrapper="span"
            cursor={false}
            speed={70}
            style={{
              fontSize: "1.5rem",
              color: "white",
              flex: "1",
              textAlign: "center",
              gap: "1px",
            }}
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          style={{ padding: "1.2rem 1rem", fontSize: "1.1rem", width: "100%" }}
          type="text"
          className="input-field p-2"
          placeholder="e.g., 'Lose 10 pounds in 3 months through a mix of cardio and strength training,' 'Implement a vegan diet for 6 months,' etc."
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              handleResponseSubmit(event.target.value);
              event.target.value = ""; // Clear input field
              event.target.style.display = "none"; // Hide input field
            }
          }}
        />
      </div>
    </div>,

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 20rem",
        gap: "1.5rem",
      }}
    >
      <div
        className="bussiness"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="logo">
          <img src="./images/logo.png" alt=""></img>
        </div>
        <span>
          {" "}
          <TypeAnimation
            sequence={[
              // Influencer q9
              "What is your initial investment in this wellness plan?",
              1000,
              () => {
                addQuestions("health investement");
              },
            ]}
            wrapper="span"
            cursor={false}
            speed={70}
            style={{
              fontSize: "1.5rem",
              color: "white",
              flex: "1",
              textAlign: "center",
              gap: "1px",
            }}
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          style={{ padding: "1.2rem 1rem", fontSize: "1.1rem", width: "100%" }}
          type="text"
          className="input-field p-2"
          placeholder="e.g., 500 rupees for gym memberships."
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              handleResponseSubmit(event.target.value);
              event.target.value = ""; // Clear input field
              event.target.style.display = "none"; // Hide input field
            }
          }}
        />
      </div>
    </div>,

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 20rem",
        gap: "1.5rem",
      }}
    >
      <div
        className="bussiness"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="logo">
          <img src="./images/logo.png" alt=""></img>
        </div>
        <span>
          {" "}
          <TypeAnimation
            sequence={[
              // Influencer q12
              "What is your expected improvement or milestone in the first year?",
              1000,
              () => {
                addQuestions("expectations");
              },
            ]}
            wrapper="span"
            cursor={false}
            speed={70}
            style={{
              fontSize: "1.5rem",
              color: "white",
              flex: "1",
              textAlign: "center",
              gap: "1px",
            }}
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          style={{ padding: "1.2rem 1rem", fontSize: "1.1rem", width: "100%" }}
          type="text"
          className="input-field p-2"
          placeholder="e.g., 'Reduce blood sugar levels by 10%,' 'Achieve a BMI within the healthy range,' etc."
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              handleResponseSubmit(event.target.value);
              event.target.value = ""; // Clear input field
              event.target.style.display = "none"; // Hide input field
            }
          }}
        />
      </div>
    </div>,

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 20rem",
        gap: "1.5rem",
      }}
    >
      <div
        className="bussiness"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="logo">
          <img src="./images/logo.png" alt=""></img>
        </div>
        <span>
          {" "}
          <TypeAnimation
            sequence={[
              // Influencer q13
              "How much progress do you expect to make each year?",
              1000,
              () => {
                addQuestions("health progress");
              },
            ]}
            wrapper="span"
            cursor={false}
            speed={70}
            style={{
              fontSize: "1.5rem",
              color: "white",
              flex: "1",
              textAlign: "center",
              gap: "1px",
            }}
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          style={{ padding: "1.2rem 1rem", fontSize: "1.1rem", width: "100%" }}
          type="text"
          className="input-field p-2"
          placeholder="e.g., 'Increase running distance by 20%,' 'Improve mental wellness score by 15%,' etc."
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              handleResponseSubmit(event.target.value);
              event.target.value = ""; // Clear input field
              event.target.style.display = "none"; // Hide input field
            }
          }}
        />
      </div>
    </div>,

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 20rem",
        gap: "1.5rem",
      }}
    >
      <div
        className="bussiness"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="logo">
          <img src="./images/logo.png" alt=""></img>
        </div>
        <span>
          {" "}
          <TypeAnimation
            sequence={[
              // Influencer q14
              "What are your yearly health-related expenses?",
              1000,
              () => {
                addQuestions("health expenses");
              },
            ]}
            wrapper="span"
            cursor={false}
            speed={70}
            style={{
              fontSize: "1.5rem",
              color: "white",
              flex: "1",
              textAlign: "center",
              gap: "1px",
            }}
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          style={{ padding: "1.2rem 1rem", fontSize: "1.1rem", width: "100%" }}
          type="text"
          className="input-field p-2"
          placeholder="e.g., Fitness memberships, healthcare check-ups, nutritional plans, etc."
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              handleResponseSubmit(event.target.value);
              event.target.value = ""; // Clear input field
              event.target.style.display = "none"; // Hide input field
            }
          }}
        />
      </div>
    </div>,

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "20px 20rem",
        gap: "1.5rem",
      }}
    >
      <div
        className="bussiness"
        style={{ display: "flex", alignItems: "center" }}
      >
        <div className="logo">
          <img src="./images/logo.png" alt=""></img>
        </div>
        <span>
          {" "}
          <TypeAnimation
            sequence={[
              // Influencer q15
              "What is the biggest challenge you face in achieving your health goals?",
              1000,
              () => {
                addQuestions("Challenges");
              },
            ]}
            wrapper="span"
            cursor={false}
            speed={70}
            style={{
              fontSize: "1.5rem",
              color: "white",
              flex: "1",
              textAlign: "center",
              gap: "1px",
            }}
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          type="text"
          style={{ padding: "1.2rem 1rem", fontSize: "1.1rem", width: "100%" }}
          className="input-field p-2"
          placeholder="e.g., Lack of time, Motivation issues, Uncertainty about where to start, Financial constraints, Access to resources, etc."
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              if (event.target.value.trim() === "") {
                window.alert("Response can not be empty!");
                return;
              }
              handleResponseSubmit(event.target.value);
              event.target.value = ""; // Clear input field
              event.target.style.display = "none"; // Hide input field
            }
          }}
        />
      </div>
    </div>,
  ];

  const handleResponseSubmit = (response) => {
    setUserResponses([...userResponses, response]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    addAnswers(response);
  };

  return (
    <>
      {loader ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          <div className="container-1">
            <div className="row">
              <div className="fixing">
                <div className="col-lg-9 col-md-8 col-12">
                  <div className="bussiness" style={{ padding: "" }}>
                    <div className="logo">
                      <img src="./images/logo.png" alt=""></img>
                    </div>
                    <span>
                      <TypeAnimation
                        sequence={[
                          // Same substring at the start will only be typed out once, initially
                          "What is your current health goal ?",
                          1000,
                        ]}
                        wrapper="span"
                        cursor={false}
                        speed={70}
                        style={{
                          fontSize: "1.5rem",
                          color: "white",
                          flex: "1",
                          textAlign: "center",
                          gap: "1px",
                        }}
                      />
                    </span>
                  </div>
                </div>

                <div className="row qna-box">
                  <div
                    className="col-lg-4 col-md-6 col-12"
                    style={{ width: "100%" }}
                    onClick={ideaHandler}
                  >
                    <div
                      className="qna-border flex flex-col items-center"
                      style={{ border: buttonidea }}
                    >
                      <IoFitnessOutline size={"4rem"} />
                      <div className="mydivider mt-4"></div>
                      <p className="qna-text">Improving fitness</p>
                    </div>
                  </div>
                  <div
                    className="col-lg-4 col-md-6 col-12"
                    style={{ width: "100%" }}
                    onClick={startupHandler}
                  >
                    <div
                      className="qna-border flex flex-col items-center"
                      style={{ border: buttonstartup }}
                    >
                      <FaLaptopMedical size={"4rem"} />
                      <div className="mydivider mt-4"></div>
                      <p className="qna-text">General wellness</p>
                    </div>
                  </div>
                  <div
                    className="text text-white"
                    style={{ width: "100%" }}
                    onClick={brandHandler}
                  >
                    <div
                      className="qna-border flex flex-col items-center"
                      style={{ border: buttonbrand }}
                    >
                      <RiMentalHealthLine size={"4rem"} />
                      <div className="mydivider mt-4"></div>
                      <p className="qna-text">Personalized health plan</p>
                    </div>
                  </div>
                </div>
              </div>
              <div ref={answersEndRef} />
            </div>

            {/* Idea / Vision */}
            {idea && (
              <div style={{ width: "100%" }}>
                <div
                  className=" input--field p-3"
                  style={{ color: "white", textAlign: "initial" }}
                >
                  {currentQuestionIndex < influencer_ques.length ? (
                    <div style={{ marginTop: "2px", whiteSpace: "normal" }}>
                      <p>{influencer_ques[currentQuestionIndex]}</p>
                      {userResponses.map((response, index) => (
                        <div key={index}>
                          <div className="res">
                            <p
                              style={{
                                marginLeft: "12rem",
                                fontSize: "1.2rem",
                              }}
                            >
                              <strong>Response:</strong> {response}
                            </p>
                            <div ref={answersEndRef} />
                          </div>

                          {index < influencer_ques.length - 1 && (
                            <p>
                              <strong></strong> {influencer_ques[index + 1]}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <div>
                        <context.Provider
                          value={{
                            questions,
                            setQuestions,
                            addQuestions,
                            answers,
                            setAnswers,
                            addAnswers,
                            messages,
                            domain,
                            setDomain,
                          }}
                        >
                          <Mobilestepper />
                        </context.Provider>
                      </div>
                    </div>
                  )}
                </div>
                <div ref={answersEndRef} />
              </div>
            )}
            {/* <footer className="container" style={{marginTop:'30px'}}>
            <div className="bottom-position">
              <p className="bottom-text" style={{ textAlign: '-webkit-center', color:'orange', fontSize:'1.3rem' }}>
                **A PDF will be generated once all the questions has been
                completed.
              </p>
            </div>
          </footer> */}
          </div>
        </>
      )}
    </>
  );
}
export default QnA_page;
