import React, { useState } from 'react';

const CheckoutPage = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // هنا ممكن تحط المنتجات من الريدوكس أو أي مصدر
  const cartItems = [
    { id: 1, title: 'Product A', price: 49.99, quantity: 2 },
    { id: 2, title: 'Product B', price: 29.99, quantity: 1 },
  ];

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.fullName.trim()) tempErrors.fullName = 'Full name is required';
    if (!form.email.trim()) tempErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = 'Email is invalid';
    if (!form.address.trim()) tempErrors.address = 'Address is required';
    if (!form.cardNumber.trim()) tempErrors.cardNumber = 'Card number is required';
    if (!form.expiryDate.trim()) tempErrors.expiryDate = 'Expiry date is required';
    if (!form.cvv.trim()) tempErrors.cvv = 'CVV is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // هنا تحط منطق الدفع أو الطلب
      setTimeout(() => {
        alert('Payment Successful! Thank you for your purchase.');
        setIsSubmitting(false);
        // ممكن تفريغ العربة أو إعادة التوجيه بعد الدفع
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-purple-700">
        Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ملخص الطلب */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Order Summary</h2>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b py-3"
              >
                <div>
                  <p className="font-medium text-gray-800">{item.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <span className="font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between text-xl font-bold text-gray-900">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </section>

        {/* نموذج الدفع */}
        <section className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 border-b pb-3">Payment Details</h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* الاسم */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* البريد الإلكتروني */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full border rounded px-3 py-2 focus:outline-none ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* العنوان */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-1" htmlFor="address">
                Shipping Address
              </label>
              <textarea
                id="address"
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                className={`w-full border rounded px-3 py-2 focus:outline-none resize-none ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="1234 Main St, City, Country"
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* تفاصيل البطاقة */}
            <div className="mb-4 grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-gray-700 mb-1" htmlFor="cardNumber">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleChange}
                  maxLength={19}
                  placeholder="1234 5678 9012 3456"
                  className={`w-full border rounded px-3 py-2 focus:outline-none ${
                    errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-1" htmlFor="expiryDate">
                  Expiry
                </label>
                <input
                  type="text"
                  id="expiryDate"
                  name="expiryDate"
                  value={form.expiryDate}
                  onChange={handleChange}
                  maxLength={5}
                  placeholder="MM/YY"
                  className={`w-full border rounded px-3 py-2 focus:outline-none ${
                    errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-1" htmlFor="cvv">
                  CVV
                </label>
                <input
                  type="password"
                  id="cvv"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleChange}
                  maxLength={3}
                  placeholder="123"
                  className={`w-full border rounded px-3 py-2 focus:outline-none ${
                    errors.cvv ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
            >
              {isSubmitting ? 'Processing...' : 'Pay Now'}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default CheckoutPage;
