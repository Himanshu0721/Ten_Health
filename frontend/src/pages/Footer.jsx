import { FaLinkedin, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      {/* Bottom Footer */}
      <div className="bg-blue-950 px-4 md:px-17 lg:px-28">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* 1. Left Part */}
          <div>
            <h1 className="text-white font-bold text-xl mt-7">HealthEngine</h1>
            <p className="text-gray-400 text-sm ml-0">
              Empowering Your Health Journey with Cutting-Edge Technology.
            </p>
          </div>

          {/* 2. Middle Part */}
          <div>
            <h1 className="text-white text-xl font-bold mt-6 ml-0">Platform</h1>
            <ul className="text-gray-500">
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500 ml-0">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500 ml-0">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500 ml-0">
                  Login
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500 ml-0">
                  SignUp
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500 ml-0">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Right Part */}
          <div className="py-6 px-4">
            <h1 className="text-white font-bold text-xl">Follow Us</h1>
            <div className="flex gap-3 mt-4">
              <FaLinkedin className="text-2xl text-white hover:text-gray-500" />
              <FaYoutube className="text-2xl text-white hover:text-gray-500" />
              <FaTwitter className="text-2xl text-white hover:text-gray-500" />
              <FaInstagram className="text-2xl text-white hover:text-gray-500" />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center text-center mt-7 p-4">
          <p className="text-gray-400 hover:text-white mt-10">
            HealthEngine © 2024 All Rights Reserved | Your Health, Our Priority
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
