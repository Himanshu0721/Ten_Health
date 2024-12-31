import React, { useEffect } from "react";
import "./QnA_page.css";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const handleDownloadPdf = async () => { };

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
    <div className="flex lg:flex-col lg:pl-[14rem] lg:pr-[7rem] md:pl-[4rem] md:pr-[6rem] lg:gap-[1.5rem] flex-col gap-[1.5rem]">
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
            className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem] text-white flex-1 align-middle gap-[1px]"
          />
        </span>
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          type="text"
          className="input-field py-[1.2rem] px-[1rem] lg:text-[1.1rem] text-[.9rem] w-full"
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
      className="flex lg:flex-col lg:pl-[14rem] lg:pr-[7rem] md:pl-[4rem] md:pr-[6rem] lg:gap-[1.5rem] flex-col gap-[1.5rem]"
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
            className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem] text-white flex-1 align-middle gap-[1px]"
          />
        </span>
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          type="text"
          className="input-field py-[1.2rem] px-[1rem] lg:text-[1.1rem] text-[.9rem] w-full"
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
      className="flex lg:flex-col lg:pl-[14rem] lg:pr-[7rem] md:pl-[4rem] md:pr-[6rem] lg:gap-[1.5rem] flex-col gap-[1.5rem]"
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
            className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem] text-white flex-1 align-middle gap-[1px]"
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          type="text"
          className="input-field py-[1.2rem] px-[1rem] lg:text-[1.1rem] text-[.9rem] w-full"
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
      className="flex lg:flex-col lg:pl-[14rem] lg:pr-[7rem] md:pl-[4rem] md:pr-[6rem] lg:gap-[1.5rem] flex-col gap-[1.5rem]"
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
            className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem] text-white flex-1 align-middle gap-[1px]"
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          type="text"
          className="input-field py-[1.2rem] px-[1rem] lg:text-[1.1rem] text-[.9rem] w-full"
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
      className="flex lg:flex-col lg:pl-[14rem] lg:pr-[7rem] md:pl-[4rem] md:pr-[6rem] lg:gap-[1.5rem] flex-col gap-[1.5rem]"
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
            className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem] text-white flex-1 align-middle gap-[1px]"
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          type="text"
          className="input-field py-[1.2rem] px-[1rem] lg:text-[1.1rem] text-[.9rem] w-full"
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
      className="flex lg:flex-col lg:pl-[14rem] lg:pr-[7rem] md:pl-[4rem] md:pr-[6rem] lg:gap-[1.5rem] flex-col gap-[1.5rem]"
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
            className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem] text-white flex-1 align-middle gap-[1px]"
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          type="text"
          className="input-field py-[1.2rem] px-[1rem] lg:text-[1.1rem] text-[.9rem] w-full"
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
      className="flex lg:flex-col lg:pl-[14rem] lg:pr-[7rem] md:pl-[4rem] md:pr-[6rem] lg:gap-[1.5rem] flex-col gap-[1.5rem]"
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
            className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem] text-white flex-1 align-middle gap-[1px]"
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          type="text"
          className="input-field py-[1.2rem] px-[1rem] lg:text-[1.1rem] text-[.9rem] w-full"
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
      className="flex lg:flex-col lg:pl-[14rem] lg:pr-[7rem] md:pl-[4rem] md:pr-[6rem] lg:gap-[1.5rem] flex-col gap-[1.5rem]"
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
            className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem] text-white flex-1 align-middle gap-[1px]"
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          type="text"
          className="input-field py-[1.2rem] px-[1rem] lg:text-[1.1rem] text-[.9rem] w-full"
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
      className="flex lg:flex-col lg:pl-[14rem] lg:pr-[7rem] md:pl-[4rem] md:pr-[6rem] lg:gap-[1.5rem] flex-col gap-[1.5rem]"
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
            className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem] text-white flex-1 align-middle gap-[1px]"
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          type="text"
          className="input-field py-[1.2rem] px-[1rem] lg:text-[1.1rem] text-[.9rem] w-full"
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
      className="flex lg:flex-col lg:pl-[14rem] lg:pr-[7rem] md:pl-[4rem] md:pr-[6rem] lg:gap-[1.5rem] flex-col gap-[1.5rem]"
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
            className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem] text-white flex-1 align-middle gap-[1px]"
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          type="text"
          className="input-field py-[1.2rem] px-[1rem] lg:text-[1.1rem] text-[.9rem] w-full"
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
      className="flex lg:flex-col lg:pl-[14rem] lg:pr-[7rem] md:pl-[4rem] md:pr-[6rem] lg:gap-[1.5rem] flex-col gap-[1.5rem]"
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
            className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem] text-white flex-1 align-middle gap-[1px]"
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          type="text"
          className="input-field py-[1.2rem] px-[1rem] lg:text-[1.1rem] text-[.9rem] w-full"
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
      className="flex lg:flex-col lg:pl-[14rem] lg:pr-[7rem] md:pl-[4rem] md:pr-[6rem] lg:gap-[1.5rem] flex-col gap-[1.5rem]"
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
            className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem] text-white flex-1 align-middle gap-[1px]"
          />
        </span>
        <div ref={answersEndRef} />
      </div>
      <div id="inputRow" style={{ marginLeft: "1rem" }}>
        <input
          type="text"
          className="input-field py-[1.2rem] px-[1rem] lg:text-[1.1rem] text-[.9rem] w-full"
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
          <div>
            <nav className="text-white shadow-md bg-gradient-to-l from-gray-800 to-gray-900">
              <div className="container mx-auto px-4 py-2.5 flex justify-between items-center">
                <div className="navbar-brand flex items-center space-x-2">
                  <svg
                    width="46"
                    height="46"
                    fill="none"
                    viewBox="0 0 46 46"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M36.4038 13.6038L39.2895 22.3463L38.3949 29.4993L32.0453 37.068L22.1086 39.3891L16.2053 38.211L12.4906 35.3905L9.31851 32.247L6.79594 26.814L6.42313 23.6804L7.33049 16.337L13.5054 8.75958L23.6286 6.29441L29.5244 7.49443L36.3821 13.5983L36.4038 13.6038Z"
                      fill="url(#paint0_linear_924_29279)"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23.9841 12.4467L28.1966 11.5557L20.696 7.44598L19.2587 13.5412L23.9841 12.4467ZM18.9316 13.5937L20.3659 7.5108L13.2035 11.3574L18.9316 13.5937ZM18.6687 13.82L12.8798 11.56L10.7547 19.1439L18.6687 13.82ZM10.4179 19.2103L12.4586 11.9277L8.18319 15.7756L7.64511 16.4359L8.93401 17.7311L8.93445 17.7316L10.4179 19.2103ZM7.33049 16.337L13.5054 8.75958L23.6286 6.29441L29.5244 7.49443L36.3821 13.5983L36.4038 13.6038L39.2895 22.3463L38.3949 29.4993L32.0453 37.068L22.1086 39.3891L16.2053 38.211L12.4906 35.3905L9.31851 32.247L6.79594 26.814L6.42313 23.6804L7.33049 16.337ZM6.85204 22.7079L6.73178 23.6811L6.78119 24.0964L6.85204 22.7079ZM6.99591 25.9012L7.37464 18.4784L7.58126 16.8062L8.71726 17.9477L8.7177 17.9482L10.308 19.5334L7.01307 26.0455L6.99591 25.9012ZM8.34692 29.4268L9.57326 32.0681L11.1154 33.5963L8.34692 29.4268ZM12.1908 34.6621L7.49168 27.5849L7.30484 27.1825L11.8014 28.9803L12.2837 34.7541L12.1908 34.6621ZM14.0935 36.2229L16.3345 37.9243L19.8956 38.635L14.0935 36.2229ZM21.4307 38.9414L13.1275 35.4894L13.0467 35.428L19.6694 34.0085L21.7828 39.0117L21.4307 38.9414ZM23.3419 38.7864L31.3122 36.9246L28.2825 35.6446L23.3419 38.7864ZM28.5746 35.4354L31.8192 36.8062L31.8762 36.7929L32.2133 36.3911L35.1346 30.563L28.5746 35.4354ZM35.6633 30.1921L37.7592 29.7803L33.0648 35.3761L35.6633 30.1921ZM38.102 29.3716L38.0728 29.4064L35.8315 29.8468L38.8137 23.6818L38.102 29.3716ZM38.976 22.3842L38.9324 22.7327L35.6466 29.5254L34.5015 20.5661L38.976 22.3842ZM33.9994 20.1203L28.6776 11.9689L26.3524 18.9124L33.9994 20.1203ZM26.0485 19.2843L27.9281 27.6512L18.8587 23.9748L26.0485 19.2843ZM18.6978 23.7139L25.8821 19.0271L19.1914 14.0403L18.6978 23.7139ZM18.8844 14.0442L10.787 19.4915L18.3891 23.7523L18.8844 14.0442ZM18.2478 24.0244L10.6945 19.7908L12.0588 28.5994L18.2478 24.0244ZM12.1245 29.1678L19.3629 33.7609L12.7248 35.1836L12.692 35.1587L12.6189 35.0863L12.1245 29.1678ZM20.014 34.0369L27.8607 35.5497L22.4394 38.9972L22.139 39.0674L20.014 34.0369ZM28.4163 35.1713L28.2983 28.1081L35.2208 30.1173L28.4163 35.1713ZM35.3784 29.844L34.2096 20.699L28.4066 27.8205L35.3784 29.844ZM28.2221 27.5619L34.0292 20.4352L26.3486 19.222L28.2221 27.5619ZM27.9934 28.1957L20.143 33.7498L28.1118 35.286L27.9934 28.1957ZM19.8814 33.5595L27.8245 27.9398L18.714 24.2468L19.8814 33.5595ZM19.5688 33.5286L18.4101 24.2855L12.2169 28.8636L19.5688 33.5286ZM11.7536 28.6313L10.4164 19.9977L7.07845 26.595L7.09442 26.7293L7.1167 26.7773L11.7536 28.6313ZM19.4096 13.8208L26.0716 18.7862L28.4025 11.8254L24.0504 12.7459L19.4096 13.8208ZM28.9763 11.8658L34.2665 19.9691L36.1647 13.857L36.145 13.7974L35.985 13.655L28.9763 11.8658ZM28.8138 11.5081L35.4869 13.2116L29.5815 7.95546L28.8138 11.5081ZM29.3095 7.76338L28.5264 11.3871L21.2279 7.38804L28.5989 7.61874L29.3095 7.76338ZM26.8191 7.25648L23.6346 6.60831L21.6387 7.09434L26.8191 7.25648ZM19.5439 7.60445L13.004 11.1168L13.5408 9.20124L13.6779 9.03293L19.5439 7.60445ZM13.0558 9.79635L9.44343 14.2292L12.613 11.3765L13.0558 9.79635ZM36.33 14.3579L34.5043 20.2365L38.8539 22.0039L36.33 14.3579Z"
                      fill="white"
                    ></path>
                    <defs>
                      <linearGradient
                        id="paint0_linear_924_29279"
                        x1="32.5286"
                        y1="9.68952"
                        x2="13.2607"
                        y2="36.0594"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop></stop>
                        <stop offset="0.451432" stopOpacity="0.548568"></stop>
                        <stop offset="1" stopOpacity="0"></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                  <Link to="/" className="font-mono text-lg md:text-xl lg:text-2xl">
                    HealthEngine
                  </Link>
                </div>
              </div>
            </nav>
          </div>
          <div>
            <div className="row">
              <div className="fixing">
                <div className="flex items-center lg:pl-[14rem] lg:pr-[7rem] md:pl-[4rem] my-4 lg:gap-[1.5rem]">
                  <div className="bussiness ml-3 flex lg:items-center">
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
                        className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem] text-white flex-1 align-middle gap-[1px]"
                      />
                    </span>
                  </div>
                </div>

                <div className="text-white lg:flex lg:flex-row md:flex-row lg:items-center lg:w-[65%] lg:mx-auto flex flex-col items-center mx-auto w-[50%] md:w-[65%] md:gap-4 lg:gap-0">
                  <div
                    className="w-[100%]"
                    onClick={ideaHandler}
                  >
                    <div
                      className="qna-border lg:w-[75%] lg:p-[24px] md:p-[22px] p-[20px] flex flex-col items-center"
                      style={{ border: buttonidea }}
                    >
                      <IoFitnessOutline className="lg:text-[4rem] text-[2.2rem] md:text-[3rem]" />
                      <div className="mydivider mt-4"></div>
                      <p className="qna-text lg:text-[16px] md:text-[14.5px] text-[13px]">Improving fitness</p>
                    </div>
                  </div>
                  <div
                    className="w-[100%]"
                    onClick={startupHandler}
                  >
                    <div
                      className="qna-border lg:w-[75%] lg:p-[24px] p-[20px] flex flex-col items-center"
                      style={{ border: buttonstartup }}
                    >
                      <FaLaptopMedical className="lg:text-[4rem] text-[2.2rem] md:text-[3rem]" />
                      <div className="mydivider mt-4"></div>
                      <p className="qna-text lg:text-[16px] md:text-[14.5px] text-[13px]">General wellness</p>
                    </div>
                  </div>
                  <div
                    className="w-[100%]"
                    onClick={brandHandler}
                  >
                    <div
                      className="qna-border lg:w-[75%] lg:p-[24px] p-[20px] flex flex-col items-center"
                      style={{ border: buttonbrand }}
                    >
                      <RiMentalHealthLine className="lg:text-[4rem] text-[2.2rem] md:text-[3rem]" />
                      <div className="mydivider mt-4"></div>
                      <p className="qna-text lg:text-[14px] md:text-[10.4px] text-[13px]">Personalized health plan</p>
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
                          <div className="lg:ml-[18rem] lg:mb-[1rem] md:ml-[8.2rem] md:mb-[1.5rem] ml-[3.7rem] mb-[1.5rem]">
                            <p className="lg:text-[1.2rem] md:text-[1.1rem] text-[1rem]">
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
