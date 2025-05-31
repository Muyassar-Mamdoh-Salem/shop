import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../Redux/appSlice";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.app.favorites);

  if (favorites.length === 0) {
    return (
      <div className="text-center mt-40 text-gray-500 text-lg font-medium">
        No favorites added yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-10 px-6">
      <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-12 drop-shadow-md mt-20">
        Your Favorites
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {favorites.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between"
          >
            <div className="h-48 flex items-center justify-center mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/150'; // صورة بديلة
                }}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900 truncate">
              {item.title}
            </h3>
            <p className="text-green-600 font-bold mb-4">${item.price}</p>
            <button
              onClick={() => dispatch(toggleFavorite(item))}
              className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;