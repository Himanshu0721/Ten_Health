import { FaLinkedin, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      {/* Bottom Footer */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-black px-4 sm:px-8 md:px-12 lg:px-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          {/* 1. Left Part */}
          <div className="py-6">
            <h1 className="text-white font-bold text-xl mt-7">HealthEngine</h1>
            <p className="text-gray-400 text-sm mt-2">
              Empowering Your Health Journey with Cutting-Edge Technology.
            </p>
          </div>

          {/* 2. Middle Part */}
          <div className="py-6 md:pl-10">
            <h1 className="text-white text-xl font-bold mt-6">Platform</h1>
            <ul className="text-gray-500 space-y-2 mt-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500">
                  Login
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500">
                  SignUp
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-gray-500">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Right Part */}
          <div className="py-6">
            <h1 className="text-white font-bold text-xl mt-6">Follow Us</h1>
            <div className="flex justify-center md:justify-start gap-4 mt-4">
              <FaLinkedin className="text-2xl text-white hover:text-gray-500" />
              <FaYoutube className="text-2xl text-white hover:text-gray-500" />
              <FaTwitter className="text-2xl text-white hover:text-gray-500" />
              <FaInstagram className="text-2xl text-white hover:text-gray-500" />
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="flex justify-center items-center text-center mt-10 p-4">
          <p className="text-gray-400 hover:text-white text-sm sm:text-base">
            HealthEngine © 2024 All Rights Reserved | Your Health, Our Priority
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
