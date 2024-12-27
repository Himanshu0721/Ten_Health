import React from "react";
import "./Offering.css";

const Offering = () => {
  return (
    <section className="offerings-section" style={{ color: "white" }}>
      <p className="text-center font-bold text-5xl w-auto md:text-7xl mt-10">
        Accelerate Your Health Journey
      </p>
      <p className="offerings-description">
        Unlock personalized health insights, expert recommendations, and
        resources tailored to your needs.
      </p>
      <div className="offerings-card-container w-auto">
        <div className="offerings-card">
          <img
            src="img1-removebg-preview.png"
            alt="Build Roadmaps to Health Success"
          />
          <p>Build Roadmaps to Health Success</p>
        </div>
        <div className="offerings-card">
          <img
            src="img2-removebg-preview.png"
            alt="Get Personalized Health Insights"
          />
          <p>Get Personalized Health Insights</p>
        </div>
        <div className="offerings-card">
          <img src="img3-removebg-preview.png" alt="Achieve Health Clarity" />
          <p>Achieve Health Clarity</p>
        </div>
        <div className="offerings-card">
          <img
            src="img4-removebg-preview.png"
            alt="Expert Guidance for Health"
          />
          <p>Get Guided by Health Experts</p>
        </div>
        <div className="offerings-card">
          <img
            src="img5-removebg-preview.png"
            alt="Expand Your Health Vision"
          />
          <p>Expand Your Health Vision</p>
        </div>
        <div className="offerings-card">
          <img src="img6-removebg-preview.png" alt="Health Success Checklist" />
          <p>Health Success Checklist</p>
        </div>
      </div>
    </section>
  );
};

export default Offering;
