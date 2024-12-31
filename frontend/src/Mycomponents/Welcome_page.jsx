import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Loader from "../components/Loader";

function Welcome_page() {
  let navigate = useNavigate();

  useEffect(() => {
    const cookies = Cookies.get("token");
    if (!cookies) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen flex flex-col items-center justify-center text-white px-4 sm:px-8">
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Welcome to Healthengine
        </h1>
        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6">
          BLUEPRINT TO BRILLIANCE
        </h3>
        <div className="max-w-3xl mx-auto">
          <p className="text-base sm:text-lg leading-relaxed mb-4">
            We are here for you if you’re planning to improve your health, need
            personalized wellness strategies, mental health support, or an
            exhaustive scope of work for niche services such as fitness
            planning, diet customization, mental well-being programs, and more.
          </p>
          <p className="text-sm sm:text-base leading-relaxed font-bold">
            Disclaimer: We’re only your planners, NOT your implementers. Make
            sure that your health execution is done right.
          </p>
        </div>
        <Link to="/qna-page">
          <button className="mt-6 bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-blue-700 transition-transform transform hover:scale-105">
            Create Free Blueprint
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Welcome_page;
