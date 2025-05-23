import { createSlice } from "@reduxjs/toolkit";

// تحميل البيانات من localStorage
const savedProducts = localStorage.getItem("products");
const savedUserInfo = localStorage.getItem("UserInfo");
const savedFavorites = localStorage.getItem("favorites");

const initialState = {
  products: savedProducts ? JSON.parse(savedProducts) : [],
  UserInfo: savedUserInfo ? JSON.parse(savedUserInfo) : null,
  favorites: savedFavorites ? JSON.parse(savedFavorites) : [],
   searchTerm: "",
};

const appSlice = createSlice({
  name: "Ecommerce",
  initialState,
  reducers: {
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

    increment: (state, action) => {
      const item = state.products.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    decrement: (state, action) => {
      const item = state.products.find(item => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },
   RemoveOneCart: (state, action) => {
  const { id } = action.payload;
  if (!id) return; // حماية في حال عدم وجود id

  // تحديث قائمة المنتجات بإزالة المنتج الذي يطابق id
  state.products = state.products.filter(item => item.id !== id);

  // تحديث البيانات في localStorage
  localStorage.setItem("products", JSON.stringify(state.products));
}
,

    RemoveAllCart: (state) => {
      state.products = [];
      localStorage.removeItem("products");
    },

    setUser: (state, action) => {
      state.UserInfo = action.payload;
      localStorage.setItem("UserInfo", JSON.stringify(action.payload));
    },

    Logoutuser: (state) => {
      state.UserInfo = null;
      localStorage.removeItem("UserInfo");
    },

    addToFavorites: (state, action) => {
      const exists = state.favorites.find(item => item.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },

    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(item => item.id !== action.payload.id);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },

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
  },

  setSearchTerm: (state, action) => {
    state.searchTerm = action.payload;
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
  
} = appSlice.actions;

// تصدير الـ reducer
export default appSlice.reducer;
