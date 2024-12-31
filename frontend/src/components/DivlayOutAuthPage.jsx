import { Link, useNavigate } from "react-router-dom";
import "./DivlayoutAuthPage.css";
import React, { useState } from "react";

const DivlayoutAuthPage = () => {
  // Connecting Backend to frontend of Signup page

  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  let name, value;
  const handleInputs = (e) => {
    // console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    try {
      const { name, email, password } = user;
      const res = await fetch("http://localhost:8000/api/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      // console.log(res);
      const data = await res.json(); // Error line

      if (res.status === 400 || res.status === 401 || !data) {
        window.alert("Invalid Registration");
        // console.log("Invalid Registration");
      } else {
        window.alert("Registration Successfull");
        // console.log("Registration Successfull");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-page pt-12 bg-gradient-to-br from-gray-800 via-gray-900 to-black">
      <div className="divlayout-auth-page-signup">
        <div className="svg">
          <img className="vector-icon" alt="" src="/vector.svg" />
        </div>
        <div className="divpage-fg">
          <div className="section-signup">
            <div className="heading-1">
              <div className="welcome-to-dayzero">
                Welcome to the HealthEngine!
              </div>
            </div>
            <div className="heading-2margin">
              <div className="heading-2">
                <div className="a-blueprint-engine-container-signup">
                  <span className="a-blueprint-engine">{`A blueprint engine that converts your ideas into execution focused plan of action within `}</span>
                  <b>6 minutes</b>
                  <span className="a-blueprint-engine">.</span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="section1 bg-gradient-to-br from-gray-800 via-gray-900 to-black "
            style={{ padding: "1.2rem 4rem" }}
          >
            <div className="pform-title">
              <div
                className="create-your-account-signup"
                style={{ fontSize: "2.5rem" }}
              >
                Create your account
              </div>
            </div>
            <div className="pform-subtitle1">
              <div className="fill-your-details">
                Fill your details to get started
              </div>
            </div>
            <div className="divor-box"></div>
            <div className="form-signup">
              <input
                className="input"
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={user.name}
                onChange={handleInputs}
                placeholder="Enter Your Name"
              ></input>

              <input
                className="input"
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={user.email}
                onChange={handleInputs}
                placeholder="Enter Your Email"
              ></input>

              <input
                className="input"
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                value={user.password}
                onChange={handleInputs}
                placeholder="Enter Unique Password"
              ></input>

              <button
                className="button2 bg-slate-400 hover:bg-slate-500 text-black"
                type="submit"
                name="signup"
                id="signup"
                value="Register"
                onClick={PostData}
              >
                <div className="create-an-account">Create an account</div>
              </button>
              <div className="pswitch-link">
                <div className="do-you-already-container-signup">
                  <span>{`Do you already have an account? `}</span>
                  <Link to="/login">
                    <span className="login">Login</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DivlayoutAuthPage;
