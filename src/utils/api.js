export const fetchProductsAPI = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
