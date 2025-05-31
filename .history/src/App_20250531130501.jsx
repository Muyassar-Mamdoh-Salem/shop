import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
  useNavigate,
  useSubmit,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import PropTypes from "prop-types";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sign from "./pages/Sign";
import Home from "./components/Home";
import Cart from "./pages/Cart";
import Shop from "./components/Shop";
import Categories from "./components/Categories";
import Regpage from "./pages/Regpage";
import ProductDetails from "./components/ProductDetails";
import { ProductsData } from "./api/Api";
import Favorites from "./pages/Favorites";
import Scroll from "./components/Scroll";


// ErrorBoundary component مع دعم retry بدون reload كامل
const ErrorBoundary = ({ customMessage }) => {
  const error = useRouteError();
  const navigate = useNavigate();
  const submit = useSubmit();

  React.useEffect(() => {
    console.error("تفاصيل الخطأ:", error);
    // هنا ممكن تضيف إرسال الخطأ لخدمة مثل Sentry
  }, [error]);

  const getErrorMessage = () => {
    if (customMessage) return customMessage;
    if (isRouteErrorResponse(error)) {
      return error.data?.message || error.statusText || "خطأ في استجابة الخادم";
    }
    if (error instanceof TypeError) {
      if (error.message.includes("fetch")) {
        return "تعذر الاتصال بالخادم. الرجاء التحقق من اتصال الإنترنت.";
      }
      return "حدث خطأ في نوع البيانات";
    }
    if (error instanceof Error) {
      return error.message || "حدث خطأ غير متوقع";
    }
    return "حدث خطأ غير معروف";
  };

  const handleAction = (actionType) => {
    switch (actionType) {
      case "retry":
        // إعادة محاولة إعادة تحميل البيانات (تستخدم submit لإعادة طلب loader)
        submit(null, { method: "GET", action: window.location.pathname });
        break;
      case "home":
        navigate("/");
        break;
      case "back":
        navigate(-1);
        break;
      default:
        submit(null, { method: "GET", action: window.location.pathname });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full text-center">
        <div className="text-red-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">حدث خطأ!</h2>
        <p className="text-gray-600 mb-6">{getErrorMessage()}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => handleAction("retry")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            إعادة المحاولة
          </button>
          <button
            onClick={() => handleAction("home")}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            الصفحة الرئيسية
          </button>
          <button
            onClick={() => handleAction("back")}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            العودة للخلف
          </button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <div className="mt-8 text-left">
            <details className="bg-gray-50 p-3 rounded">
              <summary className="font-medium cursor-pointer">معلومات التصحيح (للنظام)</summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto text-xs">
                {JSON.stringify(error, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

ErrorBoundary.propTypes = {
  customMessage: PropTypes.string,
};


// توحيد ErrorBoundary مخصص للتسجيل
const ErrorBoundarySign = () => (
  <ErrorBoundary customMessage="حدث خطأ في صفحة التسجيل" />
);


const Layout = () => {
  return (
    <>
      <Header />
      <Scroll />
      <Outlet />
      <Footer />
    </>
  );
};


const NotFound = () => (
  <div className="p-10 text-red-600 text-xl text-center">الصفحة غير موجودة</div>
);


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
        <Route index element={<Home />} loader={ProductsData} errorElement={<ErrorBoundary />} />
        <Route path="cart" element={<Cart />} errorElement={<ErrorBoundary />} />
        <Route path="sign" element={<Sign />} errorElement={<ErrorBoundarySign />} />
        <Route path="regpage" element={<Regpage />} errorElement={<ErrorBoundarySign />} />
        <Route path="shop" element={<Shop />} errorElement={<ErrorBoundary />} />
        <Route path="product/:id" element={<ProductDetails />} errorElement={<ErrorBoundary />} />
        <Route path="categories" element={<Categories />} errorElement={<ErrorBoundary />} />
        <Route path="favorites" element={<Favorites />} errorElement={<ErrorBoundary />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/"
      </Route>
    ),
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    }
  );

  return <RouterProvider router={router} />;
};

export default App;
