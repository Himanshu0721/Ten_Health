import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./Login.css";
import Cookies from "js-cookie";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";

const DivlayoutAuthPage = () => {
  const [login, setLogin] = useState(false);
  const [percent, setPercent] = useState(10);
  let navigate = useNavigate();

  useEffect(() => {
    console.log("question " + percent);
  }, [percent]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();
    setLogin(true);
    setPercent((prevPercent) => prevPercent + 20);
    console.log("email: ", email);
    console.log("password: ", password);
    const res = await axios.post("http://localhost:8000/api/v1/login", {
      email,
      password,
    });
    setPercent((prevPercent) => prevPercent + 20);

    const data = res.data;

    if (res.status === 400 || res.status === 401 || !data) {
      setLogin(false);
      window.alert("Invalid Credentials");
    } else {
      setPercent((prevPercent) => prevPercent + 20);

      Cookies.set("token", data.token, {
        expires: 5,
        path: "/welcome-page",
        httpOnly: true,
      });
      setPercent((prevPercent) => prevPercent + 10);

      Cookies.set("token", data.token, {
        expires: 5,
        path: "/qna-page",
      });

      document.cookie = `token=${data.token}; expires=${new Date(
        data.options.expires
      ).toUTCString()}; path='/welcome-page'`;
      document.cookie = `token=${data.token}; expires=${new Date(
        data.options.expires
      ).toUTCString()}; path='/qna-page'`;
      setPercent((prevPercent) => prevPercent + 20);

      setLogin(false);
      navigate("/welcome-page");
    }
  };

  return (
    <>
      {login ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black z-20">
          <Box
            position={"relative"}
            justifyContent={"center"}
            height={"100vh"}
            alignItems={"center"}
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
        <div className="login-page bg-gradient-to-br from-gray-800 via-gray-900 to-black min-h-screen">
          <div className="divlayout-auth-mypage mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="svg text-center">
              <img className="vector-icon mx-auto" alt="" src="/vector.svg" />
            </div>
            <div className="divpage-fg">
              <div className="section text-center">
                <div className="heading-1">
                  <div className="welcome-to-dayzero-login font-mono text-white text-2xl md:text-3xl">
                    Welcome To Healthengine!
                  </div>
                </div>
                <div className="ppage-tagmargin text-white text-sm mt-2">
                  <div className="blueprint-to-brilliance">
                    BLUEPRINT TO BRILLIANCE
                  </div>
                </div>
                <div className="heading-2margin text-white text-sm mt-2">
                  <div className="heading-2">
                    <div className="a-blueprint-engine-container">
                      <span className="a-blueprint-engine">{`A blueprint engine that converts your ideas into execution focused plan of action within `}</span>
                      <b>6 minutes</b>
                      <span className="a-blueprint-engine">.</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="section1 bg-gradient-to-br from-gray-700 via-gray-800 to-900 py-8">
                  <div className="pform-title">
                    <div className="text-white text-3xl">Welcome Back</div>
                  </div>
                  <div className="pform-subtitle text-white mt-2 text-sm">
                    Fill your details to get started
                  </div>
                  <div className="form mt-4 space-y-4">
                    <input
                      className="input w-full p-3 bg-gray-800 text-white rounded-md border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                    ></input>

                    <input
                      className="input w-full p-3 bg-gray-800 text-white rounded-md border-2 border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Unique Password"
                    ></input>

                    <button
                      className="button2 w-full bg-slate-400 hover:bg-slate-500 py-3 rounded-md"
                      type="submit"
                      name="signin"
                      id="signin"
                      value="Log In"
                      onClick={loginUser}
                    >
                      <div className="create-an-account text-white">Login</div>
                    </button>
                    <div className="pswitch-link text-center mt-4">
                      <div className="do-you-already-container text-white">
                        <span>{`Don't have an account? `}</span>
                        <Link to="/signUp">
                          <span className="login text-blue-500 hover:underline">
                            Register
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DivlayoutAuthPage;
