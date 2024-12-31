import React from "react";
import "./Offering.css";

const Offering = () => {
  return (
    <section className="offerings-section text-white p-6">
      <p className="text-center font-bold text-5xl md:text-7xl mt-10">
        Accelerate Your Health Journey
      </p>
      <p className="offerings-description text-center text-lg md:text-xl mt-4">
        Unlock personalized health insights, expert recommendations, and
        resources tailored to your needs.
      </p>
      <div className="offerings-card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        <div className="offerings-card flex flex-col items-center text-center">
          <img
            src="img1-removebg-preview.png"
            alt="Build Roadmaps to Health Success"
            className="min-w-24"
          />
          <p className="mt-4">Build Roadmaps to Health Success</p>
        </div>
        <div className="offerings-card flex flex-col items-center text-center">
          <img
            src="img2-removebg-preview.png"
            alt="Get Personalized Health Insights"
            className="min-w-32"
          />
          <p className="mt-4">Get Personalized Health Insights</p>
        </div>
        <div className="offerings-card flex flex-col items-center text-center">
          <img
            src="img3-removebg-preview.png"
            alt="Achieve Health Clarity"
            className="min-w-24"
          />
          <p className="mt-4">Achieve Health Clarity</p>
        </div>
        <div className="offerings-card flex flex-col items-center text-center">
          <img
            src="img4-removebg-preview.png"
            alt="Expert Guidance for Health"
            className="min-w-24"
          />
          <p className="mt-4">Get Guided by Health Experts</p>
        </div>
        <div className="offerings-card flex flex-col items-center text-center">
          <img
            src="img5-removebg-preview.png"
            alt="Expand Your Health Vision"
            className="min-w-24"
          />
          <p className="mt-4">Expand Your Health Vision</p>
        </div>
        <div className="offerings-card flex flex-col items-center text-center">
          <img
            src="img6-removebg-preview.png"
            alt="Health Success Checklist"
            className="min-w-24"
          />
          <p className="mt-4">Health Success Checklist</p>
        </div>
      </div>
    </section>
  );
};

export default Offering;
