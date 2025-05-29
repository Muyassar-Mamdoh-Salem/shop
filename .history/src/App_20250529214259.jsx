import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorBoundary from ".//ErrorBoundary";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sign from "./pages/Sign";
import Home from "./components/Home";
import Cart from "./pages/Cart";
import Shop from "./components/Shop";
import Categories from "./components/Categories";
import Regpage from "./pages/Regpage";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./pages/Checkout";
import { ProductsData } from "./api/Api";
import Favorites from "./pages/Favorites";
import Scroll from "./components/Scroll";

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

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route 
        path="/" 
        element={<Layout />} 
        errorElement={<ErrorBoundary />}
      >
        <Route 
          index 
          element={<Home />} 
          loader={ProductsData} 
          errorElement={<ErrorBoundary />} 
        />
        <Route path="cart" element={<Cart />} errorElement={<ErrorBoundary />} />
        <Route path="sign" element={<Sign />} errorElement={<ErrorBoundary customMessage="حدث خطأ في صفحة التسجيل" />} />
        <Route path="regpage" element={<Regpage />} errorElement={<ErrorBoundary customMessage="حدث خطأ في صفحة التسجيل" />} />
        <Route path="shop" element={<Shop />} errorElement={<ErrorBoundary />} />
        <Route path="product/:id" element={<ProductDetails />} errorElement={<ErrorBoundary />} />
        <Route path="categories" element={<Categories />} errorElement={<ErrorBoundary />} />
        <Route path="favorites" element={<Favorites />} errorElement={<ErrorBoundary />} />
        <Route path="checkout" element={<Checkout />} errorElement={<ErrorBoundary customMessage="حدث خطأ أثناء الدفع" />} />
        <Route 
          path="*" 
          element={
            <div className="p-10 text-red-600 text-xl text-center">
              الصفحة غير موجودة
            </div>
          } 
        />
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