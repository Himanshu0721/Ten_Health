import React, { useContext, useEffect, useState } from 'react';
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";
import { context } from '../context';
import { Box, CircularProgress } from '@mui/material'
// const { GoogleGenerativeAI } = require("@google/generative-ai");
import { GoogleGenerativeAI } from "@google/generative-ai";

function Stepper({ steps }) {
  const [activeStep, setActiveStep] = useState(0);
  const [step, setStep] = useState(1)
  const [loader, setLoader] = useState(false);
  const [percent, setPercent] = useState(2);

  let { questions, setQuestions, addQuestions, answers, setAnswers, addAnswers, domain, setDomain } = useContext(context)
  const messages = { questions, answers };

  useEffect(() => {
    console.log("question " + percent); // Logs the updated value whenever percent changes
  }, [percent]);


  function validations(step) {
    if (step === 1 && Object.keys(domain.healthMetrices).length !== 6) {
      return true;
    }
    if (step === 2 && Object.keys(domain.DietaryPreferences).length !== 5) {
      return true;
    }
    if (step === 3 && Object.keys(domain.PhysicalActivities).length !== 5) {
      return true;
    }
    if (step === 4 && Object.keys(domain.SleepPatterns).length !== 5) {
      return true;
    }
    if (step === 5 && Object.keys(domain.MentalHealth).length !== 5) {
      return true;
    }
  }


  const generatePrompt = async (questions, answers) => {
    try {
      let healthStatus = answers[questions.indexOf('health status')]
      let activityMember = answers[questions.indexOf('activity members')]
      let healthGoal = answers[questions.indexOf('health goal')]
      let healthTools = answers[questions.indexOf('health tools')]
      let planPreference = answers[questions.indexOf('plan preference')]
      let healthTitle = answers[questions.indexOf('health goal title')]
      let healthDescription = answers[questions.indexOf('description about your health')]
      let healthInvestement = answers[questions.indexOf('health investement')]
      let expectations = answers[questions.indexOf('expectations')]
      let healthProgress = answers[questions.indexOf('health progress')]
      let healthExpenses = answers[questions.indexOf('health expenses')]
      let healthChallenges = answers[questions.indexOf('Challenges')]

      let prompt = `Create an end-to-end health and wellness plan tailored to my needs. My current health status is ${healthStatus}, and I am part of ${activityMember}. My primary health goal is ${healthGoal}, and I plan to use ${healthTools} to achieve it. I prefer a plan that aligns with ${planPreference}. The title of my health goal is "${healthTitle}", and the description is "${healthDescription}". I am willing to invest ${healthInvestement} in my health journey, and I have the following expectations: ${expectations}. My current health progress is ${healthProgress}, and my health expenses are ${healthExpenses}. However, I face the following challenges: ${healthChallenges}. Please create a personalized and comprehensive plan to help me overcome these challenges, track my progress, and achieve my health goals efficiently.`;      
      return prompt;

    } catch (error) {
      window.alert(error)
    }
  }

  const handleNext = () => {
    let validator = validations(step)
    if (validator) {
      window.alert("Answer all the questions to proceed");
      return
    }
    setStep((step) => step + 1)
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setStep((step) => step - 1)
    setActiveStep((prevStep) => prevStep - 1);
  };

  // Handle if steps is undefined or not an array
  if (!steps || !Array.isArray(steps) || steps.length === 0) {
    return <div>No steps provided</div>;
  }

  // const answer = async (tPrompt) => {
  //   try {
  //     const cookies = Cookies.get("token");
  //     console.log(tPrompt)
  //     const response = await fetch(
  //       "https://idea-engine-backend-4gyo.vercel.app/api/v1/generateresponse",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           token: cookies,
  //         },
  //         body: JSON.stringify({ tPrompt }),
  //       }
  //     );
  //     const res = await response.json();
  //     console.log(res)
  //     return res;
  //   } catch (error) {
  //     console.error("Some error occured at generating response!!")
  //   }
  // }

  const genAI = new GoogleGenerativeAI("AIzaSyAM1T6li4pgjil1q55wbC_UvYq-cbNJs2I");
  const answer = async (tPrompt) => {
    try {
      // For text-only input, use the gemini-pro model
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      // const prompt = question
      const result = await model.generateContent(tPrompt);
      // const response = await result.response;
      const res = result.response;
      const text = res.text();
      // console.log(text);
      return text
    } catch (error) {
      window.alert(error)
    }
  }

  // console.log(percent)
  // useEffect(() => {
  //   setUploadOrDownloadCount((previousCount) => {
  //     const newCount = previousCount + percent;
  //     console.log("loader " + previousCount)
  //     console.log("loader " + percent)
  //     return newCount >= 100 ? 100 : newCount;
  //   });
  // }, [percent])


  const handleDownloadPdf = async () => {
    try {
      setLoader(true);
      setPercent((prevPercent) => prevPercent + 5);
      let text = {};
      const questions = messages.questions
      const answers = messages.answers
      let tPrompt = await generatePrompt(questions, answers);
      let commonText = await answer(tPrompt);
      text['commonText'] = commonText
      setPercent(prevPercent => prevPercent + 8);

      let executiveText = await answer(`${tPrompt} + \nPlease explain in more detail about the Executive Summary of my health plan.`);
      text['executiveText'] = executiveText
      setPercent(prevPercent => prevPercent + 2);
      let healthAnalysisText = await answer(`${tPrompt} + \nPlease explain in more detail about the Health Analysis and Current Status.`);
      text['healthAnalysisText'] = healthAnalysisText
      setPercent(prevPercent => prevPercent + 2);

      let healthGoalText = await answer(`${tPrompt} + \nPlease explain in more detail about the Health Goals and Objectives.`);
      text['healthGoalText'] = healthGoalText
      setPercent(prevPercent => prevPercent + 2);
      let healthStrategyText = await answer(`${tPrompt} + \nPlease explain in more detail about the Health Improvement Strategies.`);
      text['healthStrategyText'] = healthStrategyText
      setPercent(prevPercent => prevPercent + 2);

      let financialPlanText = await answer(`${tPrompt} + \nPlease explain in more detail about the Financial Plan for health-related expenses.`);
      text['financialPlanText'] = financialPlanText
      setPercent(prevPercent => prevPercent + 2);

      let lifestyleChangesText = await answer(`${tPrompt} + \nPlease explain in more detail about the Recommended Lifestyle Changes.`);
      text['lifestyleChangesText'] = lifestyleChangesText
      setPercent(prevPercent => prevPercent + 2);
      let progressTrackingText = await answer(`${tPrompt} + \nPlease explain in more detail about the Progress Tracking and Monitoring Plan.`);
      text['progressTrackingText'] = progressTrackingText
      setPercent(prevPercent => prevPercent + 2);

      let healthMissionText = await answer(`${tPrompt} + \nPlease explain in more detail about the Mission Statement for my health journey.`);
      text['healthMissionText'] = healthMissionText
      setPercent(prevPercent => prevPercent + 2);

      let healthVisionText = await answer(`${tPrompt} + \nPlease explain in more detail about the Vision Statement for my health and wellness.`);
      text['healthVisionText'] = healthVisionText
      setPercent(prevPercent => prevPercent + 2);

      // let { healthMatrices } = domain
      const [healthMatrices] = Object.entries(domain)
      let healthMatricesPrompt = `Our health matrix system starts by identifying your current weight: ${healthMatrices[1][1]}. Next, we assess your height: ${healthMatrices[1][2]} to calculate BMI and understand your physical proportions. we also check for known medical conditions: ${healthMatrices[1][3]}, and monitor your blood pressure range: ${healthMatrices[1][4]}. Your BMI status is tracked as: ${healthMatrices[1][5]}. Additionally, we take note of allergies: ${healthMatrices[1][6]} to ensure a comprehensive health overview. Our goal is to provide personalized health recommendations and improvements based on these metrics.`;

      let healthMatricesText = await answer(healthMatricesPrompt)
      text['healthMatricesText'] = healthMatricesText
      setPercent(prevPercent => prevPercent + 9);
      console.log("login " + percent)

      // let { DietaryPreferences } = domain
      // console.log(domain.DietaryPreferences)
      const [DietaryPreferences] = Object.entries(domain)
      let DietaryPreferencesPrompt = `We aim to understand your dietary preferences starting with whether you follow a specific diet: ${DietaryPreferences[1][1]}. Your meal pattern is also important, as you typically eat ${DietaryPreferences[1][2]} per day. We take into account any food allergies: ${DietaryPreferences[1][3]} to ensure your dietary recommendations are safe and customized. Additionally, we assess how often you eat out: ${DietaryPreferences[1][4]}, which can impact your overall nutritional intake5f you take dietary supplements: ${DietaryPreferences[1][5]}, we incorporate this into your personalized dietary plan. Our goal is to provide tailored dietary advice that aligns with your preferences, lifestyle, and health objectives.`;
      let DietaryPreferencesText = await answer(DietaryPreferencesPrompt)
      text['DietaryPreferencesText'] = DietaryPreferencesText
      setPercent(prevPercent => prevPercent + 9);
      console.log("login " + percent)


      // let { PhysicalActivities } = domain
      // console.log(domain.PhysicalActivities)
      const [PhysicalActivities] = Object.entries(domain)
      let PhysicalActivitiesPrompt = `${PhysicalActivities[1][1]} reflects how often you exercise as part of your routine. Engaging in ${PhysicalActivities[1][2]} is your preferred choice of physical activity, helping to improve overall fitness and health. Each session typically lasts ${PhysicalActivities[1][3]}, which determines the intensity and impact of your workouts. If you have any physical limitations: ${PhysicalActivities[1][4]}, we ensure that your exercise plan accommoda5 and respects those limitations for safety. Following a specific fitness routine: ${PhysicalActivities[1][5]} helps structure your physical activity and achieve targeted fitness goals. Our aim is to create a comprehensive and personalized fitness plan that aligns with your activity levels, preferences, and physical needs.`;
      
      let PhysicalActivitiesText = await answer(PhysicalActivitiesPrompt)
      text['PhysicalActivitiesText'] = PhysicalActivitiesText
      setPercent(prevPercent => prevPercent + 9);
      console.log("login " + percent)


      // let { SleepPatterns } = domain
      // console.log(domain.SleepPatterns)
      const [SleepPatterns] = Object.entries(domain)
      let SleepPatternsPrompt = `${SleepPatterns[1][1]} reflects how many hours of sleep you get on average, which plays a crucial role in your overall well-being. Having a consistent sleep schedule: ${SleepPatterns[1][2]} impacts the regularity of your rest cycle and contributes to better sleep quality.Experiencing sleep disturbances: ${SleepPatterns[1][3]} highlights potential issues that might affect your sleep. You feel ${SleepPatterns[1][4]} when you wake up, which provides insight int5our sleep quality and recovery. Taking sleep aids or medications: ${SleepPatterns[1][5]} indicates whether you rely on external assistance to achieve restful sleep. Our goal is to analyze these factors and offer personalized suggestions to improve your sleep patterns and overall health.`;
      let SleepPatternsText = await answer(SleepPatternsPrompt)
      text['SleepPatternsText'] = SleepPatternsText
      setPercent(prevPercent => prevPercent + 9);
      console.log("login " + percent)


      // let { MentalHealth } = domain
      // console.log(domain.MentalHealth)
      const [MentalHealth] = Object.entries(domain)      
      let MentalHealthPrompt = `${MentalHealth[1][1]} reflects how frequently stress impacts your daily life, which is a key factor in mental well-being. Having coping mechanisms for stress: ${MentalHealth[1][2]} highlights the importance of effective strategies to manage stress. Feeling anxious: ${MentalHealth[1][3]} shows how often anxiety is experienced, providing insights into potential triggers and areas for improvement. Having mental health conditions: ${MentalHealth[1][4]} indicates whether specific conditions may require5rgeted support. Seeking professional help for mental health: ${MentalHealth[1][5]} shows whether external assistance is being utilized for managing mental health. Our focus is to understand these aspects to help create a personalized approach for enhancing mental well-being and providing the necessary resources for support.`;
      let MentalHealthText = await answer(MentalHealthPrompt)
      text['MentalHealthText'] = MentalHealthText
      setPercent(prevPercent => prevPercent + 9);
      console.log("login " + percent)


      try {
        setLoader(true);
        setPercent(prevPercent => prevPercent + 5);

        const cookies = Cookies.get("token");
        // Send a request to your backend to generate and download the PDF
        const response = await fetch(
          "http://localhost:8000/api/v1/generatepdf",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              token: cookies,
            },
            body: JSON.stringify({ text }),
          }
        );
        // Check if the response is successful
        if (!response.ok) {
          setPercent(() => 100);
          throw new Error("Failed to generate or download PDF");
        } else {
          setPercent(prevPercent => prevPercent + 2);
          // Convert the response body to a blob
          const blob = await response.blob();
          // Create a URL for the blob
          const url = window.URL.createObjectURL(new Blob([blob]));
          // Create an anchor element to facilitate the download
          const a = document.createElement("a");
          a.href = url;
          a.download = "output.pdf";
          setPercent(prevPercent => prevPercent + 2);
          // Append the anchor element to the document body
          document.body.appendChild(a);
          // Trigger a click event on the anchor element to initiate the download
          a.click();
          // Remove the anchor element from the document body after the download is complete
          document.body.removeChild(a);
          setPercent(prevPercent => prevPercent + 4);
          console.log("login " + percent)
        }
      } catch (error) {
        console.error("Error generating or downloading PDF:", error);
      }
      setLoader(false);
    } catch (error) {
      console.error("Error generating or downloading PDF:", error);
    }
  };

  return (
    <>
      {loader ? (
        <div style={{ backgroundColor: '#000000', height: '100vh', width: '100vw', zIndex: '20', position: 'fixed', top: '0', left: '0', right: '0', }}>
          <Box position={'relative'} justifyContent={'center'} height={'100vh'} alignItems={'center'} display="flex">
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
      ) :
        (<div className='mb-5'>
          <context.Provider value={{ questions, setQuestions, addQuestions, answers, setAnswers, addAnswers, domain, setDomain }}>
            {steps[activeStep]}
          </context.Provider>
          <div className='flex gap-3 lg:ml-[43%] lg:mr-[44%] md:ml-[40%] ml-[30%]'>
            <Button disabled={activeStep === 0} onClick={handleBack} variant="outline-primary" className='py-3 px-5 rounded-lg bg-[#121212] cursor-pointer'>Back</Button>
            {step !== 5 && <Button disabled={activeStep === steps.length - 1} onClick={handleNext} variant="outline-primary" className='py-3 px-5 rounded-lg bg-[#121212] cursor-pointer'>Next</Button>}
            {step === 5 && <Button onClick={handleDownloadPdf} variant="outline-primary" className='py-3 px-5 rounded-lg bg-[#121212] cursor-pointer min-w-max'>Generate Pdf</Button>}
          </div>
        </div>
        )}
    </>
  );
}

export default Stepper;
