import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromFavorites } from "../Redux/appSlice";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.app.favorites);

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-20 text-gray-500 text-lg font-medium">
        No favorites added yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-10 px-6">
      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-12 drop-shadow-md">
        Favorites
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-44 object-contain mb-6 mx-auto transition-transform duration-300 hover:scale-110"
            />
            <h3 className="text-lg font-semibold mb-3 text-gray-900 truncate" title={item.title}>
              {item.title}
            </h3>
            
            <button
              onClick={() => dispatch(removeFromFavorites({ id: item.id }))}
              className="mt-auto bg-red-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-red-700 active:scale-95 transition-transform duration-150"
              aria-label={`Remove ${item.title} from favorites`}
            >
              Remove from favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
