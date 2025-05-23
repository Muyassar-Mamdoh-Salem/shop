import React from "react";
import { useLoaderData } from "react-router-dom";
import Products from "../pages/Products";
import Banner from "../pages/Banner";

const Home = () => {
  const allProducts = useLoaderData(); // استلام البيانات من الـ loader

  return (
    <div id="top" className="bg-gray-100">
      <Banner />
      <Products allProducts={allProducts} /> {/* تمرير البيانات كمُدخل */}
    </div>
  );
};

export default Home;
