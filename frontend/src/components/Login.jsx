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

  // function validate() {
  //   const mail = document.getElementById("email").value;
  //   const regExp = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+.([a-z]+)(.[a-z]+)?$/;
  //   regExp.test(mail) ? alert("You have entered a valid email") : alert("You have entered wrong email");
  // }

  //Connection Login Page to backend

  // const navigate = useNavigate();
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
      window.alert("Invalid Credientials");
      // console.log("Invalid");
    } else {
      // dispatch({type: "USER", payload: true});

      // window.alert("Login Successfull");
      // const time = new Date(data.options.expires).toUTCString()
      // const expirationDate = new Date();
      // expirationDate.setDate(expirationDate.getDate() + 5);
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
        <div className="login-page">
          <div className="divlayout-auth-mypage mx-auto">
            <div className="svg">
              <img className="vector-icon" alt="" src="/vector.svg" />
            </div>
            <div className="divpage-fg">
              <div className="section">
                <div className="heading-1">
                  <div className="welcome-to-dayzero-login">
                    Welcome To TEN-HealthEngine!
                  </div>
                </div>
                <div className="ppage-tagmargin">
                  <div className="blueprint-to-brilliance">
                    BLUEPRINT TO BRILLIANCE
                  </div>
                </div>
                <div className="heading-2margin">
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
                <div className="section1">
                  <div className="pform-title">
                    <div style={{ fontSize: "2.5rem" }}>Welcome Back</div>
                  </div>
                  <div className="pform-subtitle">
                    <div className="fill-your-details">
                      Fill your details to get started
                    </div>
                  </div>
                  <div className="form">
                    <input
                      className="input"
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="off"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                    ></input>

                    <input
                      className="input"
                      type="password"
                      name="password"
                      id="password"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Unique Password"
                    ></input>

                    <button
                      className="button2"
                      type="submit"
                      name="signin"
                      id="signin"
                      value="Log In"
                      onClick={loginUser}
                    >
                      <div className="create-an-account">Let's Login</div>
                    </button>
                    <div className="pswitch-link">
                      <div className="do-you-already-container">
                        <span>{`Don't have an account? `}</span>
                        <Link to="/signUp">
                          <span className="login">Register</span>
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
