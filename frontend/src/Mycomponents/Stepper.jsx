import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { Box, CircularProgress } from "@mui/material";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { context } from "../context";

function Stepper({ steps }) {
  const [activeStep, setActiveStep] = useState(0);
  const [step, setStep] = useState(1);
  const [loader, setLoader] = useState(false);
  const [percent, setPercent] = useState(2);

  const { healthData, setHealthData } = useContext(context);
  console.log(healthData);
  const messages = healthData?.messages || { questions: [], answers: [] };

  const handleResponseSubmit = async (response) => {
    try {
      setHealthData((prevData) => ({
        ...prevData,
        savedResponse: response,
        messages,
      }));

      const cookies = Cookies.get("token");
      await fetch(
        "https://health-engine-backend-4gyo.vercel.app/api/v1/saveresponse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: cookies,
          },
          body: JSON.stringify({ response }),
        }
      );
    } catch (error) {
      console.error("Error saving response:", error);
    }
  };

  function validations(step) {
    const domain = healthData.domain || {};
    if (step === 1 && Object.keys(domain["wellness"] || {}).length < 8)
      return true;
    if (step === 2 && Object.keys(domain["nutrition"] || {}).length < 10)
      return true;
    if (step === 3 && Object.keys(domain["fitness"] || {}).length < 10)
      return true;
    if (step === 4 && Object.keys(domain["mental"] || {}).length < 10)
      return true;
    if (step === 5 && Object.keys(domain["medical"] || {}).length < 10)
      return true;
    if (step === 6 && Object.keys(domain["preventive"] || {}).length < 10)
      return true;
  }

  const genAI = new GoogleGenerativeAI(
    "AIzaSyAM1T6li4pgjil1q55wbC_UvYq-cbNJs2I"
  );

  const answer = async (tPrompt) => {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(
        healthData.savedResponse
          ? `Previous context: ${JSON.stringify(
              healthData.savedResponse
            )}. New prompt: ${tPrompt}`
          : tPrompt
      );
      return result.response.text();
    } catch (error) {
      window.alert(error);
    }
  };

  const handleNext = () => {
    if (validations(step)) {
      window.alert("Answer all the questions to proceed");
      return;
    }
    setStep((step) => step + 1);
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((step) => step - 1);
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleDownloadPdf = async () => {
    try {
      setLoader(true);
      setPercent((prev) => prev + 5);

      const text = {};
      const tPrompt = await generatePrompt(
        messages.questions,
        messages.answers
      );

      const commonText = await answer(tPrompt);
      await handleResponseSubmit(commonText);
      text.commonText = commonText;

      // Send to backend
      const cookies = Cookies.get("token");
      const response = await fetch(
        "https://health-engine-backend-4gyo.vercel.app/api/v1/generatepdf",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            token: cookies,
          },
          body: JSON.stringify({ text }),
        }
      );

      if (!response.ok) throw new Error("PDF generation failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "health_plan.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoader(false);
      setPercent(100);
    }
  };

  if (!steps?.length) return <div>No steps provided</div>;

  return (
    <>
      {loader ? (
        <div
          style={{
            backgroundColor: "#000000",
            height: "100vh",
            width: "100vw",
            zIndex: "20",
            position: "fixed",
            top: "0",
            left: "0",
            right: "0",
          }}
        >
          <Box
            position="relative"
            justifyContent="center"
            height="100vh"
            alignItems="center"
            display="flex"
          >
            <CircularProgress variant="determinate" size={55} value={percent} />
            <Box
              bottom={0}
              right={0}
              top={0}
              justifyContent="center"
              left={0}
              display="flex"
              alignItems="center"
              position="absolute"
            >
              {`${Math.round(percent)}%`}
            </Box>
          </Box>
        </div>
      ) : (
        <div>
          <context.Provider value={{ healthData, setHealthData }}>
            {steps[activeStep]}
          </context.Provider>
          <div className="d-flex justify-content-center">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outline-primary"
              className="mx-2"
            >
              Back
            </Button>
            {step !== 6 && (
              <Button
                disabled={activeStep === steps.length - 1}
                onClick={handleNext}
                variant="outline-primary"
                className="mx-2"
              >
                Next
              </Button>
            )}
            {step === 6 && (
              <Button
                onClick={handleDownloadPdf}
                variant="outline-primary"
                className="mx-2"
              >
                Generate PDF
              </Button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Stepper;
