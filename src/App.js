import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import Movies from "./Pages/Movies";
import TvShows from "./Pages/TvShows";

function App() {
  return (
<>
<Routes>
  <Route path="/" element= {<Home/>} />
  <Route path="/Login" element= {<Login/>} />
  <Route path="/SignUp" element= {<SignUp/>} />
  <Route path="/Movies" element= {<Movies/>} />
  <Route path="/TvShow" element= {<TvShows/>} />
  
</Routes>
</>
  );
}

export default App;
