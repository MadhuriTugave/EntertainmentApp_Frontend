import { FaFilm, FaTv, FaBookmark, FaRegBookmark } from "react-icons/fa";
const TrendingMediaCard= ({
     bannerUrl,
    title,
   date,
    mediaType,
    isTrending,
    onCardClick,
    isWatchlisted,
    onWatchlistClick,
  })=>{
   
   // Fetch the release year from the release date
//    const releaseYear = new Date(date).getFullYear();

   const posterurl =`https://image.tmdb.org/t/p/w780${bannerUrl}`

     // Set the media icon based on the media type
   
     const MediaIcon = mediaType === "movie" ? FaFilm : FaTv;
   
     return (
       // Card container
       <div
         className={`mt-4 group relative rounded-lg` }
         onClick={onCardClick}
       >
         {/* Banner image */}
         <img
           src={posterurl}
           alt={title}
           className={`rounded-xl overflow-hidden w-full h-full object-cover group-hover:opacity-80  max-h-40 max-w-70
           }`}
           
         />
         {/* Card content */}
         <div
           className={`absolute left-0 w-full p-1`}
         >
           <div>
             <div
               className={`text-body-m font-light ${
                 isTrending ? "text-white" : "text-light-blue"
               } mb-1`}
             >
               {"2024"} • <MediaIcon className="inline-block mx-1" />{" "}
               {mediaType}
             </div>
             <div className={`heading-xs ${isTrending ? "text-white" : ""}`}>
               {title}
             </div>
           </div>
         </div>
         {/* Watchlist button */}
         <div className="absolute top-0 right-0 w-full p-3">
           <button
             className="bg-gray-800/80 hover:bg-gray-700 p-2 rounded-md"
             onClick={(e) => {
               e.stopPropagation();
               onWatchlistClick();
             }}
           >
             {isWatchlisted ? (
               <FaBookmark className="text-white" />
             ) : (
               <FaRegBookmark className="text-white" />
             )}
           </button>
         </div>
       </div>

    )

}
export default TrendingMediaCard;