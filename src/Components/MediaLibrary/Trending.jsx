import React from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";


import MediaCard from "./MediaCard";
import LoadingCard from "./loadingCard";

const Trending = ({
  mediaList,
  handleCardClick,
  handleWatchListClick,
  canScrollLeft,
  canScrollRight,
  scrollContent,
  containerRef,
}) => {
  // console.log(mediaList.map((item)=> item["_doc"]._id))


  return (
    <div className="ml-4 mb-8">
      <h1 className="text-heading-l text-white">Trending</h1>
      <div className="relative">
        <div
          ref={containerRef}
          className="flex overflow-x-auto no-scrollbar py-2 space-x-4 transition-all ease-in-out duration-300"
        >
          {!mediaList.length ? <LoadingCard/> : mediaList.map((media) => (
            <div key={media["_doc"]._id} className="min-w-[250px] flex-shrink-0">
              <div className="mr-8">
            
                 <MediaCard
                 bannerUrl={media["_doc"].bannerUrl}
                 title={media["_doc"].title}
                 releaseDate={
                   media["_doc"].type === "Movie"
                     ? media["_doc"].releaseDate
                     : media["_doc"].firstAirDate
                 }
                 mediaType={media["_doc"].type}
                 isTrending={true}
                 onCardClick={() => handleCardClick(media["_doc"]._id, media["_doc"].type)}
                 isWatchlisted={media["_doc"].isWatchlisted}
                 onWatchlistClick={() =>
                   handleWatchListClick(media["_doc"]._id, media["_doc"].type)
                 }
               />
               
              </div>
            </div>
          ))}
          <button
            className={`absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-gray-800/80 hover:bg-gray-700 p-2 rounded-md ${
              !canScrollLeft && "hidden"
            }`}
            onClick={() => scrollContent("left")}
          >
            <FaAngleLeft className="text-white" />
          </button>
          <button
            className={`absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-gray-800/80 hover:bg-gray-700 p-2 rounded-md ${
              !canScrollRight && "hidden"
            }`}
            onClick={() => scrollContent("right")}
          >
            <FaAngleRight className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trending;
