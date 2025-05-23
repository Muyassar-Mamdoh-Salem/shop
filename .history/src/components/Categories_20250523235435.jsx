import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'إلكترونيات',
      image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03',
      count: 45
    },
    {
      id: 2,
      name: 'ملابس',
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f',
      count: 32
    },
    {
      id: 3,
      name: 'أثاث',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
      count: 28
    },
    {
      id: 4,
      name: 'ألعاب',
      image: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1',
      count: 19
    },
    {
      id: 5,
      name: 'كتب',
      image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
      count: 56
    },
    {
      id: 6,
      name: 'رياضة',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
      count: 23
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    }
  };

  return (
    <div id='Categories' className="min-h-screen py-12 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4"
          >
            تصفح الفئات
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            اكتشف مجموعتنا الواسعة من المنتجات المصنفة بدقة لتسهيل تجربة التسوق لديك
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover="hover"
              className="group relative overflow-hidden rounded-xl shadow-md bg-white"
            >
              <Link to={`/category/${category.id}`} className="block">
                <div className="h-48 sm:h-56 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold">{category.name}</h3>
                  <p className="text-sm opacity-90">{category.count} منتج</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                  عرض الكل
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300">
            عرض جميع الفئات
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;