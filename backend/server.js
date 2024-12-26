// server.js
import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai"; // Example for Gemini
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import { fileURLToPath } from "url";
import cors from "cors";

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json()); // To parse JSON bodies

// Initialize AI client (e.g., Gemini model from Google)
const genAI = new GoogleGenerativeAI(
  "AIzaSyBL8N4oeleEtb7cHhoyVepnF0m_mC217v8" // Replace with your actual API key
);

// Function to get the current directory
const getCurrentDir = () => {
  // Convert the current module's URL to a file path
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return __dirname;
};

const answerWithAI = async (tPrompt) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(tPrompt);
    return result.response.text();
  } catch (error) {
    console.error("Error generating AI content:", error);
    return null;
  }
};

// Endpoint to generate the PDF and send it for download
app.post("/generate-pdf", async (req, res) => {
  const { name, age, symptoms } = req.body;

  const aiPrompt = `Generate a detailed health report for the following data: Name: ${name}, Age: ${age}, Symptoms: ${symptoms}. Please include relevant health information and recommendations.`;
  const aiContent = await answerWithAI(aiPrompt);

  if (!aiContent) {
    return res.status(500).send("Error generating AI content");
  }

  const doc = new PDFDocument();
  const pdfPath = path.resolve(getCurrentDir(), "output.pdf");
  const writeStream = fs.createWriteStream(pdfPath);

  doc.pipe(writeStream);
  doc.fontSize(20).text("Health Report");
  doc.fontSize(14).text(`Name: ${name}`);
  doc.text(`Age: ${age}`);
  doc.text(`Symptoms: ${symptoms}`);
  doc.text("\nAI-Generated Content:");
  doc.text(aiContent);
  doc.end();

  writeStream.on("finish", () => {
    console.log(`PDF created at: ${pdfPath}`); // Debug log
    res.download(pdfPath, "HealthReport.pdf", (err) => {
      if (err) {
        console.error("Error sending file:", err);
        res.status(500).send("Error sending file");
      }
    });
  });

  writeStream.on("error", (error) => {
    console.error("Error writing PDF:", error);
    res.status(500).send("Error generating PDF");
  });
});

// Start the server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
