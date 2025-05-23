import { createSlice } from "@reduxjs/toolkit";

// تحميل البيانات من localStorage عند بدء التطبيق (إذا كانت موجودة)
const savedProducts = localStorage.getItem("products");
const savedUserInfo = localStorage.getItem("UserInfo");
const savedFavorites = localStorage.getItem("favorites");

// الحالة الابتدائية (initial state)
const initialState = {
  products: savedProducts ? JSON.parse(savedProducts) : [],
  UserInfo: savedUserInfo ? JSON.parse(savedUserInfo) : null,
  favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
  searchTerm: "", // قيمة النص في خانة البحث
};

const appSlice = createSlice({
  name: "Ecommerce",
  initialState,
  reducers: {
    // إضافة منتج للسلة أو زيادة الكمية إذا المنتج موجود
    addToCart: (state, action) => {
      const item = state.products.find(item => item?.id === action.payload?.id);
      if (item) {
        if (action.payload?.quantity > 0) {
          item.quantity += action.payload.quantity;
        }
      } else {
        if (action.payload?.id && action.payload?.quantity > 0) {
          state.products.push(action.payload);
        }
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    // زيادة كمية منتج في السلة
    increment: (state, action) => {
      const item = state.products.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    // تقليل كمية منتج في السلة (لكن لا تقل عن 1)
    decrement: (state, action) => {
      const item = state.products.find(item => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    // إزالة منتج محدد من السلة
    RemoveOneCart: (state, action) => {
      const { id } = action.payload;
      if (!id) return; // حماية إذا لم يكن هناك id
      state.products = state.products.filter(item => item.id !== id);
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    // تفريغ السلة بالكامل
    RemoveAllCart: (state) => {
      state.products = [];
      localStorage.removeItem("products");
    },

    // تعيين بيانات المستخدم بعد تسجيل الدخول
    setUser: (state, action) => {
      state.UserInfo = action.payload;
      localStorage.setItem("UserInfo", JSON.stringify(action.payload));
    },

    // تسجيل خروج المستخدم ومسح بياناته
    Logoutuser: (state) => {
      state.UserInfo = null;
      localStorage.removeItem("UserInfo");
    },

    // إضافة منتج للمفضلة إذا لم يكن موجودًا
    addToFavorites: (state, action) => {
      const exists = state.favorites.find(item => item.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },

    // إزالة منتج من المفضلة
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },

    // تبديل حالة المنتج في المفضلة (إضافة أو إزالة)
    toggleFavorite: (state, action) => {
      const itemId = action.payload.id;
      const exists = state.favorites.find(item => item.id === itemId);
      if (exists) {
        state.favorites = state.favorites.filter(item => item.id !== itemId);
      } else {
        state.favorites.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },

    // تحديث قيمة نص البحث في الواجهة
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

// تصدير الأفعال (actions)
export const {
  addToCart,
  increment,
  decrement,
  RemoveOneCart,
  RemoveAllCart,
  setUser,
  Logoutuser,
  addToFavorites,
  removeFromFavorites,
  toggleFavorite,
  setSearchTerm,
} = appSlice.actions;

// تصدير الريديُسر (reducer)
export default appSlice.reducer;
