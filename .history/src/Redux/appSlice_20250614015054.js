import { createSlice } from "@reduxjs/toolkit";

// دالة مساعدة لقراءة البيانات من localStorage بأمان
const loadFromLocalStorage = (key, fallbackValue) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : fallbackValue;
  } catch (error) {
    console.error(`فشل في قراءة ${key} من localStorage:`, error);
    return fallbackValue;
  }
};

// الحالة الابتدائية مع تحميل بيانات محمية
const initialState = {
  products: loadFromLocalStorage("products", []),
  UserInfo: loadFromLocalStorage("UserInfo", null),
  favorites: loadFromLocalStorage("favorites", []),
  searchTerm: "",
};

const appSlice = createSlice({
  name: "Ecommerce",
  initialState,
  reducers: {
    // إضافة منتج للسلة أو تحديث الكمية
    addToCart: (state, action) => {
      const { id, quantity } = action.payload || {};
      if (!id || quantity <= 0) return;

      const existingItem = state.products.find(item => item.id === id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.products.push({ ...action.payload });
      }

      localStorage.setItem("products", JSON.stringify(state.products));
    },

    // زيادة كمية منتج في السلة
    increment: (state, action) => {
      const item = state.products.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity++;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },

    // تقليل كمية منتج ولكن لا تقل عن 1
    decrement: (state, action) => {
      const item = state.products.find(item => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity--;
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },

    // إزالة منتج واحد من السلة
    RemoveOneCart: (state, action) => {
      const { id } = action.payload;
      if (!id) return;
      state.products = state.products.filter(item => item.id !== id);
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    // تفريغ السلة بالكامل
    RemoveAllCart: (state) => {
      state.products = [];
      localStorage.removeItem("products");
    },

    // تعيين بيانات المستخدم
    setUser: (state, action) => {
      state.UserInfo = action.payload;
      localStorage.setItem("UserInfo", JSON.stringify(action.payload));
    },

    // تسجيل خروج المستخدم
    Logoutuser: (state) => {
      state.UserInfo = null;
      localStorage.removeItem("UserInfo");
    },

    // إضافة منتج للمفضلة
    addToFavorites: (state, action) => {
      const exists = state.favorites.find(item => item.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      }
    },

    // إزالة منتج من المفضلة
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },

    // تبديل حالة منتج في المفضلة
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

    // تحديث نص البحث
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
});

// تصدير الأفعال
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

// تصدير الريدويسر
export default appSlice.reducer;
