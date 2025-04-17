import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductsAPI } from "../utils/api";

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await fetchProductsAPI();
    return response.products;
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    filteredProducts: [],
    cart: [],
    wishlist: [],
    loading: false,
    error: null,
  },
  reducers: {
    filterProducts: (state, action) => {
      const { categories, priceRange } = action.payload;
      state.filteredProducts = state.products.filter((product) => {
        const inCategory =
          categories.length === 0 || categories.includes(product.category);
        const inPriceRange =
          product.price >= priceRange[0] && product.price <= priceRange[1];
        return inCategory && inPriceRange;
      });
    },
    sortProducts: (state, action) => {
      const { sortBy } = action.payload;
      state.filteredProducts.sort((a, b) => {
        if (sortBy === "price-low-high") return a.price - b.price;
        if (sortBy === "price-high-low") return b.price - a.price;
        if (sortBy === "latest") return new Date(b.date) - new Date(a.date);
        return 0;
      });
    },
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    addToWishlist: (state, action) => {
      state.wishlist.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { filterProducts, sortProducts, addToCart, addToWishlist } =
  productsSlice.actions;
export default productsSlice.reducer;
