import { useLoaderData, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToFavorites } from '../Redux/appSlice';
import { useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

const Products = () => {
  const products = useLoaderData();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.app.favorites);

  const [addedToFavId, setAddedToFavId] = useState(null);

  const handleAddToFavorites = (product) => {
    if (!favorites.find(item => item.id === product.id)) {
      dispatch(addToFavorites(product));
      setAddedToFavId(product.id);
      setTimeout(() => setAddedToFavId(null), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-8">Our Products</h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="relative bg-white rounded-xl shadow-md p-4 flex flex-col justify-between group overflow-hidden"
            variants={cardVariants}
            whileHover={{ scale: 1.05, boxShadow: "0px 8px 20px rgba(0,0,0,0.2)" }}
          >
            {/* زر المفضلة مع SVG */}
            <button
              onClick={() => handleAddToFavorites(product)}
              aria-label="Add to favorites"
              title="Add to favorites"
              className={`
                absolute top-3 right-3
                bg-white rounded-full p-1 shadow-md
                transition-all duration-300
                ${favorites.find(item => item.id === product.id) ? 'text-red-500' : 'text-gray-400'}

                sm:opacity-0 sm:group-hover:opacity-100
                opacity-100
              `}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                         2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 
                         4.5 2.09C13.09 3.81 14.76 3 16.5 3 
                         19.58 3 22 5.41 22 8.5c0 3.78-3.4 
                         6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>

            <img
              src={product.image}
              alt={product.title}
              className="h-40 object-contain mb-4 mx-auto"
            />
            <h3 className="text-md font-semibold mb-1 text-gray-800">{product.title}</h3>
            <p className="text-sm text-gray-600 mb-2">
              {product.description.slice(0, 60)}...
            </p>
            <div className="flex justify-between items-center mb-3">
              <span className="text-green-600 font-bold">${product.price}</span>
             <link> <button
                Link to={`/product/${product.id}`}
                className="bg-blue-500 text-white text-sm px-3 py-1 rounded hover:bg-blue-600 transition active:bg-blue-700"
              >
                More Details
              </button>
              </link>
            </div>
         
              <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition"    
              
              onClick={() =>
                  dispatch(addToCart({
                    id: product.id,
                    title: product.title,
                    image: product.image,
                    category: product.category,
                    description: product.description,
                    price: product.price,
                    quantity: 1
                  }))
                }
              >
                                Add to cart

              </button>
            </>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Products;
