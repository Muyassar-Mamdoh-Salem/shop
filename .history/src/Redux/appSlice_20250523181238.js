const appSlice = createSlice({
  name: "Ecommerce",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item?.id === action.payload?.id);
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
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity++;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },

    decrement: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item && item.quantity > 1) {
        item.quantity--;
      }
      localStorage.setItem("products", JSON.stringify(state.products));
    },

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

    // ✅ هنا تضيف toggleFavorite داخل reducers
    toggleFavorite: (state, action) => {
      const itemId = action.payload.id;
      const exists = state.favorites.find(item => item.id === itemId);

      if (exists) {
        state.favorites = state.favorites.filter(item => item.id !== itemId);
      } else {
        state.favorites.push(action.payload);
      }
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }
  }
});
