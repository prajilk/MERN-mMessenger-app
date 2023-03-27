import { HiKey, HiEye, HiEyeOff, HiMail } from "react-icons/hi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import WaitingForResModal from "./Components/Modal/WaitingForResModal";

export default function Signin() {

  const [passVisibility, setPassVisibility] = useState(false); // Show and hide password state.
  const [modal, setModal] = useState(false); // Waiting for server response Loading modal.
  const [email, setEmail] = useState(); // Email state.
  const [password, setPassword] = useState(); // Password state.
  const [loginError, setLoginError] = useState(false); // Login error state.

  const navigate = useNavigate(); // React navigate hook

  // Change password visibility, onClick function for eye button in password
  const changePassVisibility = () => setPassVisibility(!passVisibility);

  // Login form submition
  const onLogin = (e) => {
    e.preventDefault(); // Prevent default refresh behaviour of form submission
    setModal(true); // Activate the Loading model

    // Sent the email and password to server to authenticate
    axios.post("/signin", { email, password }).then(() => {

        setModal(false); // Deactivate the Loading modal after server response!
        return navigate("/"); // Successfully authenticated the user, redirect to Homepage.

      }).catch((res) => {

        setModal(false); // Deactivate the Loading modal after server response!
        if (res.response.data.error) setLoginError(true); // Set error in the Login error state.
        
      });
  };

  return (
    <div className="login-page">
      <div className="logo-container">
        <img src={process.env.PUBLIC_URL + "/logo_w.png"} alt="..." />
      </div>
      <div className="card auth-card shadow col-10 col-sm-7 col-md-7 col-lg-4 py-3">
        <form onSubmit={onLogin}>
          <h3>Sign in</h3>
          <p>Log in to your account</p>
          {loginError ? (
            <p className="bg-danger px-2 py-1 text-white rounded">
              <small>Email or password is incorrect! try again.</small>
            </p>
          ) : (
            ""
          )}
          <div className="input-wrapper mb-3">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <i className="input-icons">
              <HiMail />
            </i>
          </div>
          <div className="input-wrapper mb-3">
            <input
              type={passVisibility ? "text" : "password"}
              className="form-control"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <i className="input-icons">
              <HiKey />
            </i>
            <i className="pass-visibility" onClick={changePassVisibility}>
              {passVisibility ? <HiEyeOff /> : <HiEye />}
            </i>
          </div>
          <button className="btn" type="submit">
            Sign in
          </button>
        </form>
      </div>
      <div className="outside-card">
        <p>
          Don't you have an account?
          <span>
            <Link to="/signup"> Sign up</Link>
          </span>
        </p>
      </div>
      {modal && <WaitingForResModal />}
    </div>
  );
}
