import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, RemoveAllCart } from '../Redux/appSlice';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector(state => state.app.products);

  // حساب إجمالي السعر
  const totalPrice = cartProducts.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cartProducts.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
        <h2 className="text-2xl font-semibold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-600">Add some products before checking out.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center text-purple-700">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Products List */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Products</h2>
          {cartProducts.map(product => (
            <div
              key={product.id}
              className="flex items-center justify-between border-b border-gray-300 py-4"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-20 h-20 object-contain rounded"
              />
              <div className="flex-1 px-4">
                <h3 className="font-semibold text-gray-800">{product.title}</h3>
                <p className="text-sm text-gray-500 truncate">{product.description}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => dispatch(decrement(product))}
                  className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span>{product.quantity}</span>
                <button
                  onClick={() => dispatch(increment(product))}
                  className="bg-gray-200 px-2 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <span className="font-bold text-green-600">${(product.price * product.quantity).toFixed(2)}</span>
            </div>
          ))}

          <button
            onClick={() => dispatch(RemoveAllCart())}
            className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition"
          >
            Clear Cart
          </button>
        </div>

        {/* Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="border-t border-gray-300 pt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <button className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded shadow-lg transition">
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
