import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Authentication/Login";
import Register from "./Components/Authentication/Register";
import Media from "./Components/Media";
import Movies from "./Components/Movies";
import TvShows from "./Components/TvShows";
import Watchlist from "./Components/Watchlist";
import { useEffect } from "react";
import { fetchUser } from "./features/user/userSlice";
import { useDispatch } from "react-redux";
import { fetchMedia } from "./features/media/mediaSlice";

function App() {
  // Get the access token cookie
  const access_token = localStorage.getItem("access_token");

  // Instantiate the dispatch hook
  const dispatch = useDispatch();

  // fetchUser async thunk from redux
  useEffect(() => {
    dispatch(fetchUser(access_token));
    dispatch(fetchMedia());
  }, [access_token, dispatch]);

  return (
    <>
      <Routes>
        {" "}
        <Route path="/" element=<Home /> />
        <Route path="/login" element=<Login /> />
        <Route path="/register" element=<Register /> />
        <Route path="/movies" element=<Movies /> />
        <Route path="/tvshows" element=<TvShows /> />
        <Route path="/watchlist" element=<Watchlist /> />
        <Route path="/media/:id" element=<Media /> />
      </Routes>
    </>
  );
}

export default App;
