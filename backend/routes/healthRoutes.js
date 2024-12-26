import express from "express";
import { generateHealthPDF } from "../controllers/healthController.js";

const router = express.Router();

// Route to generate PDF
router.post("/generate-pdf", generateHealthPDF);

export default router;
