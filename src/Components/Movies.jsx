import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import MediaContainer from "./MediaLibrary/MediaContainers";
import { selectMovies } from "../features/media/selectors";
import { toggleWatchlistItem } from "../features/user/userSlice";
import NavBar from "./NavBar";
import { fetchMedia } from "../features/media/mediaSlice";
import axios from "axios";
import { FaSearch } from "react-icons/fa";

const Movies = () => {
  // State for the search term
  const [searchTerm, setSearchTerm] = useState("");

  // State to store the search results
  const [searchResults, setSearchResults] = useState([0]);

  // Access the movies list from the Redux store
  const moviesList = useSelector(selectMovies);

  // Hooks for navigation and dispatching actions
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  //  console.log(process.env.REACT_APP_API_URL)
  // Retrieve the access token from local storage to check user authentication
  const access_token = localStorage.getItem("access_token");

  // Handler for navigating to the media detail page when a media card is clicked
  const handleCardClick = (id) => {
    navigate(`/media/${id}`);
  };

  // Handler for adding or removing an item from the watchlist
  const handleWatchListClick = async (id, type) => {
    if (!access_token) {
      navigate("/Login");
      return;
    }
    await dispatch(toggleWatchlistItem({ id, type }));
    dispatch(fetchMedia());
  };

  // Fetch the search results based on the search term
  useEffect(() => {
    const fetchResults = async () => {
      if (searchTerm) {
       try {
        const movieRes = await axios.get(
          `${process.env.REACT_APP_URL}/movies/search?query=${searchTerm}`
        );
        // console.log(movieRes)
        setSearchResults(movieRes.data);

       } catch (error) {
        console.log(error.response.data.message)
        // setSearchResults(error.response.data.message)
       }
       
      }else{
        setSearchResults([])
      }
    };
    fetchResults();
  }, [searchTerm]);

  // Render the Movies component with the Trending and MediaContainer components
  return (
    <>
      <NavBar />
      <div className="p-4 pl-6 md:pl-10 lg:pl-32 pt-8">
        <div className="max-w-lg flex items-center align-middle p-4 mb-4">
          <FaSearch className="relative mr-2" />{" "}
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
        data-testid= "data"
          mediaList={searchTerm ? searchResults : moviesList}
          handleCardClick={handleCardClick}
          handleWatchListClick={handleWatchListClick}
          title={
            searchTerm
              ? `Found ${searchResults.length} results for '${searchTerm}'`
              : "Movies"
           
          }
        />
      </div>
    </>
  );
};

export default Movies;
