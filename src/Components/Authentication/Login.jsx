import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import ActionButton from "./ActionButton";
import Logo from "./Logo";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchUser } from "../../features/user/userSlice";
import toast from 'react-hot-toast';
const Login = () => {
  // State to store the email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 
  // State to mamage focus on the input fields
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // State to manage the error message
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Login box ref
  const loginBoxRef = useRef(null);

  // Logo top position
  const [logoTop, setLogoTop] = useState("");

  // Get the access token from local storage
  const access_token = localStorage.getItem("access_token");

  // Instantiate the dispatch hook
  const dispatch = useDispatch();

  // Helper function to calculate the logo top position
  const calculateLogoTop = () => {
    if (loginBoxRef.current) {
      const loginBoxTop = loginBoxRef.current.getBoundingClientRect().top;
      const middlePosition = loginBoxTop / 2 + window.scrollY;
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

  // Regex to validate the email address
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  // Instantiate the navigate hook
  const navigate = useNavigate();

  // Navigate to the dashboard if the user is already logged in
  useEffect(() => {
    if (access_token) navigate("/");
  }, [access_token, navigate]);

  // Handle login
  const handleLogin = async(e) => {
    // Prevent the default form submission
    e.preventDefault();

    // Reset the error messages
    setEmailError("");
    setPasswordError("");

    // Check if the email is empty
    if(email=== "" && password ===""){
      toast.error("please fill the fields ");
    }else{
      if (email === "" ) {
        toast.error("email Cannot be empty ");
      }else if(password ===""){
        toast.error("password Cannot be empty ");
      }
    }
   

    // // Check if the password is empty
    // if (password === "") {
    //   toast.error(" password Cannot be empty");
    // }

    // Break the function if there are any errors
    if (emailError || passwordError) return;
       
    // Send the login request
    if(email && password){
      if (!emailRegex.test(email)) {
        toast.error("Invalid email");
      }else{
      try {

        const response= await axios.post(`${process.env.REACT_APP_URL}/user/Login`, { email, password })
        // console.log(response)
       
            // Set access token in local storage
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
    
    
  }

  // Navigate to Sign Up Page
  const handleSignupClick = () => {
    navigate("/SignUP");
  };

  return (
    <div className="h-screen flex justify-center items-center">
      {/* Logo */}
      <Logo logoTop={logoTop} />
      <div
        ref={loginBoxRef}
        className="rounded-3xl bg-box-bg p-8 max-w-md w-full shadow-xl"
      >
        <h1 className="text-heading-l text-white mb-5 mt-5 ">Login</h1>
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
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
          <ActionButton text="Login to your account" />
        </form>
        {/* Navigate to Sign Up Page */}
        <div className="flex items-center justify-center mt-6">
          <p className="text-sm text-white mr-2">Don't have an account?</p>
          <button
            onClick={handleSignupClick}
            className="text-red-bg text-body-m hover:text-red-700"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
