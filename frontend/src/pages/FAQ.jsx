import React, { useState } from "react";
import faqData from "./Faqs";
import "./faq.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

function Faq() {
  const [expanded, setExpanded] = useState({});

  const toggleAnswer = (index) => {
    setExpanded((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div className="top-page">
      <div className="first-faq">
        <h1
          style={{
            textAlign: "center",
            marginBottom: "60px",
            fontSize: "70px",
            color: "white",
          }}
        >
          FAQs
        </h1>
        <div className="div-top">
          {faqData.map((item, index) => (
            <div
              onClick={() => toggleAnswer(index)}
              className="faq-item"
              key={index}
            >
              <div className="header">
                <h3>{item.question}</h3>
                <button>{expanded[index] ? <RxCross2 /> : <FaPlus />}</button>
              </div>
              {expanded[index] && <p>{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>

      <div className="about-section">
        <h1 className="about-title">Let's Transform Your Health Journey...</h1>
        <p className="about-description text-white">
          Unlock the power of personalized health insights with our innovative
          platform, guiding you every step of the way towards a healthier, more
          balanced life.
        </p>
        <a href="/">
          <Link to="/login">
            <button className="login-btn bg-gray-700 hover:bg-gray-600">
              Get Started
            </button>
          </Link>
        </a>
      </div>
    </div>
  );
}

export default Faq;
