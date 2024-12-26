import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import axios from "axios";
import QuestionnaireForm from "./components/QuestionnaireForm";
import Summary from "./components/Summary";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (formData) => {
    setData(formData);
  };

  const handleGeneratePDF = async () => {
    setLoading(true);
    console.log("Generating PDF with data:", data);
    try {
      const response = await axios.post(
        "http://localhost:5000/generate-pdf",
        data,
        {
          responseType: "blob",
        }
      );

      if (response.status === 200) {
        console.log("PDF generated successfully.");
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "HealthReport.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to generate PDF:", response.statusText);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
      setData(null); // Reset data after generating PDF
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={<QuestionnaireForm onSubmitData={handleFormSubmit} />}
          />
          <Route
            path="/summary"
            element={
              <Summary
                data={data}
                onConfirm={handleGeneratePDF}
                loading={loading}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
