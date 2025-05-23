import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, RemoveAllCart } from "../Redux/appSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.app.products);

  // بيانات الدفع
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // تحديث بيانات الفورم
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // حساب المجموع الكلي
  const totalPrice = cartProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // ارسال الطلب (هنا مجرد مثال)
  const handleSubmit = (e) => {
    e.preventDefault();
    if(cartProducts.length === 0){
      alert("Your cart is empty!");
      return;
    }
    alert(`Thank you, ${formData.fullName}! Your order of $${totalPrice.toFixed(2)} is being processed.`);
    dispatch(RemoveAllCart());
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex justify-center mt-20">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* نموذج تفاصيل الدفع */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md space-y-6"
        >
          <h2 className="text-2xl font-bold text-purple-700 mb-4">Payment Details</h2>

          {/* معلومات العميل */}
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="fullName">
              Full Name
            </label>
            <input
              required
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="phone">
              Phone Number
            </label>
            <input
              required
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* عنوان الشحن */}
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="address">
              Address
            </label>
            <input
              required
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="city">
                City
              </label>
              <input
                required
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="country">
                Country
              </label>
              <input
                required
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="postalCode">
              Postal Code
            </label>
            <input
              required
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* بيانات البطاقة */}
          <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">Payment Info</h3>

          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="cardNumber">
              Card Number
            </label>
            <input
              required
              type="text"
              id="cardNumber"
              name="cardNumber"
              maxLength={19}
              placeholder="1234 5678 9012 3456"
              value={formData.cardNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="expiryDate">
                Expiry Date
              </label>
              <input
                required
                type="text"
                id="expiryDate"
                name="expiryDate"
                placeholder="MM/YY"
                maxLength={5}
                value={formData.expiryDate}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1" htmlFor="cvv">
                CVV
              </label>
              <input
                required
                type="password"
                id="cvv"
                name="cvv"
                maxLength={3}
                value={formData.cvv}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition"
          >
            Confirm Order
          </button>
        </form>

        {/* ملخص الطلب */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">Order Summary</h2>

          {cartProducts.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center mb-4 border-b border-gray-200 pb-4"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 object-contain rounded"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-sm text-gray-500 truncate">{product.description}</p>
                    <p className="mt-1 font-semibold text-green-600">
                      ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-gray-700 font-medium max-w">
                    x{product.quantity}
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 mt-4 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
