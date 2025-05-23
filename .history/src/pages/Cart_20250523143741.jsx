import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { increment, decrement, RemoveAllCart } from '../Redux/appSlice';

const Cart = () => {
  const products = useSelector((state) => state.app.products);
  const dispatch = useDispatch();

  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!products || products.length === 0) {
    return (
      <div className="mt-32 text-center text-gray-600 px-4">
        <div className="flex flex-col items-center justify-center">
          <img src="shopping.png" className="w-24 h-24 mb-6 animate-bounce" />
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Your cart is empty!</h2>
          <p className="text-sm text-gray-500 mb-4">Start adding some items to your cart now!</p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            onClick={() => window.location.href = '/'}
          >
            Go to Shop
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-2xl sm:text-4xl font-bold text-center text-gray-800 mb-8 overflow-hidden">Your Cart</h1>

      <div className="flex flex-col items-center gap-6">
        {products.map((product) => {
          const isExpanded = expanded[product.id];
          const shortDesc = product.description.slice(0, 70);

          return (
            <div
              key={product.id}
              className="w-full max-w-[300px] sm:max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-xl shadow-lg"
            >
              {/* Image + info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full sm:w-2/3">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-28 h-28 object-cover rounded-xl shadow"
                />
                <div className="text-white text-center sm:text-left w-full">
                  <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
                  <p className="text-sm text-white/90">
                    {isExpanded ? product.description : shortDesc + '... '}
                    {product.description.length > 70 && (
                      <button
                        onClick={() => toggleExpand(product.id)}
                        className="text-yellow-300 underline text-xs"
                      >
                        {isExpanded ? 'Read less' : 'Read more'}
                      </button>
                    )}
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="text-white text-center sm:text-right w-full sm:w-1/3">
                <p className="text-base font-semibold">${product.price}</p>
                <p className="mt-1 text-sm">Qty: {product.quantity}</p>
                <div className="flex justify-center sm:justify-end gap-2 mt-2">
                  <button
                    onClick={() => dispatch(increment({ id: product.id }))}
                    className="text-lg bg-green-500 px-2 py-1 rounded-full hover:bg-green-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(decrement({ id: product.id }))}
                    className="text-lg bg-red-500 px-2 py-1 rounded-full hover:bg-red-600"
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Clear All */}
      <div className="mt-6 text-center">
        <button
          onClick={() => dispatch(RemoveAllCart())}
          className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Clear All
        </button>
      </div>

      {/* Total */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-xl shadow-lg mt-10">
        <h2 className="text-xl font-semibold text-white">Total</h2>
        <p className="text-xl font-bold text-yellow-300 mt-2 sm:mt-0">
          ${products.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}
        </p>
      </div>

      {/* Checkout */}
      <div className="mt-10 text-center">
        <button className="bg-yellow-500  text-white py-3 px-6 rounded-full shadow-xl hover:bg-yellow-600 transition">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
