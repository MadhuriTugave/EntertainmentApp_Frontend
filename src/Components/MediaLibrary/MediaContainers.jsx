import React, { useState, useEffect } from "react";
import MediaCard from "./MediaCard";


import LoadingCard from "./loadingCard";

const MediaContainer = ({
  mediaList,
  handleCardClick,
  handleWatchListClick,
  title,
}) => {
 

  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );

  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="ml-4 mr-4">
      <h1 className="text-heading-m sm:text-heading-l text-white">{title}</h1>
      <div
        className="grid grid-flow-row auto-rows-max gap-8"
        style={{
          gridTemplateColumns: `repeat(auto-fit, minmax(${
            isLandscape ? "250px" : "150px"
          }, 1fr))`,
        }}
      >
        {mediaList.length >=1 ? mediaList.map((media) => (
          <MediaCard
            key={media._id}
            bannerUrl={media.bannerUrl}
            title={media.title}
            releaseDate={
              media.type === "Movie" ? media.releaseDate : media.firstAirDate
            }
            mediaType={media.type}
            onCardClick={() => handleCardClick(media._id, media.type)}
            isWatchlisted={media.isWatchlisted}
            onWatchlistClick={() => handleWatchListClick(media._id, media.type)}
          />
        )) : <LoadingCard/> }
      </div>
    </div>
  );
};

export default MediaContainer;
