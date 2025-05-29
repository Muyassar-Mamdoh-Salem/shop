import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sign from "./pages/Sign";
import Home from "./components/Home";
import Cart from "./pages/Cart";
import Shop from "./components/Shop";
import Categories from "./components/Categories";
import Regpage from "./pages/Regpage";
import ProductDetails from "./components/ProductDetails";
import Checkout from "./pages/CheeckOut";
import { ProductsData } from "./api/Api";
import FavoriteBorder from "./pages/Favorites";
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
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} loader={ProductsData} />
        <Route path="cart" element={<Cart />} />
        <Route path="sign" element={<Sign />} />
        
         {/* ✅ تم نقلها إلى داخل Layout */}
        <Route path="regpage" element={<Regpage />} /> {/* ✅ */}
        <Route path="shop" element={<Shop />} />
        <Route path="footer" element={<Footer />} />
        <Route path="product/:id" element={<ProductDetails />} />
        <Route path="categories" element={<Categories />} />
        <Route path="favorite" element={<FavoriteBorder />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="*" element={<div className="p-10 text-red-600 text-xl">الصفحة غير موجودة</div>} />
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
