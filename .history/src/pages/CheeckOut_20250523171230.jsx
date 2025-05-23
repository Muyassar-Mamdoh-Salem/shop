import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, RemoveAllCart } from "../Redux/appSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.app.products);

  // حساب المجموع الكلي
  const totalPrice = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <h1 className="text-4xl font-bold text-purple-700 mb-8">Checkout</h1>

      {cartProducts.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md p-6">
          {/* قائمة المنتجات */}
          <div className="space-y-4">
            {cartProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 border-b border-gray-200 pb-4"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-20 h-20 object-contain rounded"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-gray-800">{product.title}</h2>
                  <p className="text-sm text-gray-500 truncate">{product.description}</p>
                  <p className="mt-1 font-semibold text-green-600">
                    ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => dispatch(decrement(product))}
                    className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex justify-center items-center"
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    onClick={() => dispatch(increment(product))}
                    className="w-8 h-8 bg-gray-200 rounded hover:bg-gray-300 flex justify-center items-center"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ملخص الطلب */}
          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-2xl font-extrabold text-purple-700">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          {/* أزرار العملية */}
          <div className="mt-6 flex justify-between gap-4">
            <button
              onClick={() => dispatch(RemoveAllCart())}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg shadow-md transition"
            >
              Clear Cart
            </button>

            <button
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg shadow-md transition"
              onClick={() => alert("Proceed to payment flow")}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
