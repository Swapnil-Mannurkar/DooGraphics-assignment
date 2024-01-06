export const getAllProducts = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  return await response.json();
};

export const getProductById = async (id) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  return await response.json();
};
