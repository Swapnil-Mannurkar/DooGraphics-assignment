export const addToCartHelper = async ({ product, username }) => {
  const response = await fetch("/api/cart/addToCart", {
    method: "POST",
    body: JSON.stringify({ product: product, username: username }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.ok;
};
