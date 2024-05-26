import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MediaContainer from "./MediaLibrary/MediaContainer";
import { selectWatchlist } from "../features/media/selectors";
import { fetchUser, toggleWatchlistItem } from "../features/user/userSlice";
import NavBar from "./NavBar";
import { fetchMedia } from "../features/media/mediaSlice";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Watchlist = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const watchlist = useSelector((state) => state.user.data.watchlist) || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const access_token = localStorage.getItem("access_token");

  const handleCardClick = (id, type) => {
    navigate(`/media/${id}`);
  };

  const handleWatchListClick = async (id, type) => {
    await dispatch(toggleWatchlistItem({ id, type }));
    dispatch(fetchMedia());
  };

  useEffect(() => {
    if (searchTerm) {
      const fetchResults = async () => {
        const movieRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/movies/search?query=${searchTerm}`
        );
        const tvShowRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/tvshows/search?query=${searchTerm}`
        );
        setSearchResults([...movieRes.data, ...tvShowRes.data]);
      };
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (!access_token) {
      navigate("/login");
    } else {
      dispatch(fetchUser());
    }
  }, [access_token, navigate, dispatch]);

  return (
    <>
      <NavBar />
      <div className="p-4 pl-6 md:pl-10 lg:pl-32 pt-8">
        <div className="max-w-lg flex items-center align-middle p-4 mb-4">
          <FaSearch className="relative mr-2" />
          <input
            id="search"
            type="search"
            placeholder="Search for movies or TV Shows"
            className="w-full bg-dark-bg text-body-m text-white outline-none border-b-dark-bg border-b-2 focus:border-b-light-blue transition duration-300 caret-red-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <MediaContainer
          mediaList={searchTerm ? searchResults : watchlist}
          handleCardClick={handleCardClick}
          handleWatchListClick={handleWatchListClick}
          title={
            searchTerm
              ? `Found ${searchResults.length} results for '${searchTerm}'`
              : "Watchlist"
          }
        />
      </div>
    </>
  );
};

export default Watchlist;
