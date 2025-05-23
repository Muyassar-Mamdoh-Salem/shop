import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ProductsData } from "../api/Api";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const products = await ProductsData();
        const selectedProduct = products.find(p => p.id === parseInt(id));
        setProduct(selectedProduct);
      } catch (err) {
        setError("فشل في تحميل المنتج");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-center">جارٍ التحميل...</p></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center"><p className="text-red-500">{error}</p></div>;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden mt-">
        <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-xs w-full">
          <p className="text-red-500 font-bold mb-4">المنتج غير موجود</p>
          <a href="/" className="text-blue-500 underline">العودة إلى الصفحة الرئيسية</a>
        </div>
      </div>
    );
  }

  const fullStars = Math.floor(product.rating?.rate || 0);
  const halfStar = product.rating?.rate % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="min-h-screen bg-purple-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* تصميم عمودي للجوال وعمودي/أفقي للشاشات الكبيرة */}
          <div className="flex flex-col lg:flex-row">
            {/* قسم الصورة */}
            <div className="lg:w-1/2 p-4 flex justify-center items-center bg-gray-50">
              <img
                className="w-full max-w-xs h-64 object-contain sm:h-80 lg:h-96"
                src={product.image}
                alt={product.title}
              />
            </div>

            {/* قسم التفاصيل */}
            <div className="lg:w-1/2 p-6 space-y-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-purple-700">
                {product.title}
              </h1>

              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {Array(fullStars).fill().map((_, i) => (
                    <svg key={`full-${i}`} className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                  {halfStar && (
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  )}
                  {Array(emptyStars).fill().map((_, i) => (
                    <svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <span className="text-gray-500 text-sm ml-2">
                  ({product.rating?.rate || "N/A"}) من 5
                </span>
              </div>

              <p className="text-green-600 text-xl font-bold">
                ${product.price}
              </p>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="font-semibold text-lg mb-2">الوصف:</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-lg transition duration-200">
                  أضف إلى السلة
                </button>
                <button className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg transition duration-200">
                  شراء الآن
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;