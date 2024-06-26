import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import ActionButton from "./ActionButton";
import Logo from "./Logo";
import axios from "axios";
import { fetchUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const SignUp = () => {
  // State to store the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // State to mamage focus on the input fields
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [confirmPasswordFocus, setConfirmPasswordFocus] = useState(false);

  // State to manage the error message
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  // Instantiate the navigate hook
  const navigate = useNavigate();

  // Instantiate the dispatch hook
  const dispatch = useDispatch();

  // Regex to validate the email address
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Login box ref
  const registerBoxRef = useRef(null);

  // Logo top position
  const [logoTop, setLogoTop] = useState("");

  // Get the access token from local storage
  const access_token = localStorage.getItem("access_token");

  // Helper function to calculate the logo top position
  const calculateLogoTop = () => {
    if (registerBoxRef.current) {
      const registerBoxTop = registerBoxRef.current.getBoundingClientRect().top;
      const middlePosition = registerBoxTop / 2 + window.scrollY;
      if (middlePosition - 13 > 0) setLogoTop(`${middlePosition - 13}px`);
      else setLogoTop("0px");
    }
  };

  // Set the logo top position
  useEffect(() => {
    // Calculate the logo top position on mount
    calculateLogoTop();

    // Recalculate on window resize
    window.addEventListener("resize", calculateLogoTop);

    // Cleanup function to remove the event listener
    return () => window.removeEventListener("resize", calculateLogoTop);
  }, []);

  // Navigate to the dashboard if the user is already logged in
  useEffect(() => {
    if (access_token) navigate("/");
  }, [access_token, navigate]);

  // Placeholder function to handle the Sign Up
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Reset the error messages
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate the email address
    // else if (!emailRegex.test(email)) {
    //   toast.error("Invalid email");
    // }

    // Check if the password and confirm password match
    if (password === "" && email === "" && confirmPassword === "") {
      toast.error("Please fill all the fields"); //check if all the fields are empty.
    } else if (email === "") {
      toast.error(" Email cannot be empty"); // Check if the email is empty
    } else if (password === "") {
      toast.error("password cannot be empty"); // Check if the password is empty
    } else if (confirmPassword === "") {
      toast.error("confirmPassword cannot be empty"); // Check if the confirm password is empty
    } else if (password !== confirmPassword) {
      return toast.error(" confirmPassword is not matching");
    }

    if (email && password && confirmPassword) {
      // Validate the email address
      if (!emailRegex.test(email)) {
        toast.error("Invalid email");
      } else {
        try {
          // Send the registration request
          const response = await axios.post(
            `${process.env.REACT_APP_URL}/user/SignUp`,
            {
              email,
              password,
            }
          );
          console.log(process.env.REACT_APP_API_URL);
          // console.log(response)
          //Set access token in local storage
          localStorage.setItem("access_token", response.data.access_token);

          // Fetch the user data
          dispatch(fetchUser());

          // Navigate to the dashboard
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }
  };
  // Navigate to Login Page
  const handleLoginClick = () => {
    navigate("/Login");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <Logo logoTop={logoTop} />

      <div
        ref={registerBoxRef}
        className="rounded-3xl bg-box-bg p-8 max-w-md w-full shadow-xl "
      >
        <h1 className="text-heading-l text-white mb-5 mt-8">Sign Up</h1>

        <form onSubmit={handleSignUp} className="space-y-5">
          {/* Email Address Input Field*/}
          <InputField
            id="email"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            focus={emailFocus}
            onFocusChange={(focus) => {
              setEmailFocus(focus);
              setEmailError("");
            }}
          />
          {/* Password Input Field*/}
          <InputField
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            focus={passwordFocus}
            onFocusChange={(focus) => {
              setPasswordFocus(focus);
              setPasswordError("");
            }}
          />
          {/* Confirm Password Input Field*/}
          <InputField
            id="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={confirmPasswordError}
            focus={confirmPasswordFocus}
            onFocusChange={(focus) => {
              setConfirmPasswordFocus(focus);
              setConfirmPasswordError("");
            }}
          />
          <ActionButton text="Create an account" />
        </form>

        {/* Navigate to Sign Up Page */}
        <div className="flex items-center justify-center mt-6">
          <p className="text-sm text-white mr-2">Already have an account?</p>
          <button
            onClick={handleLoginClick}
            className="text-red-bg text-body-m hover:text-red-700"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
