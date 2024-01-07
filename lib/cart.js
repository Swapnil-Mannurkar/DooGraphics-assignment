export const addToCartHelper = async ({ item, username }) => {
  const response = await fetch("/api/cart/addToCart", {
    method: "POST",
    body: JSON.stringify({ product: item, username }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const reduceItemHelper = async ({ item, username }) => {
  const response = await fetch("/api/cart/reduceItem", {
    method: "PATCH",
    body: JSON.stringify({ product: item, username }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export const removeItemHelper = async ({ item, username }) => {
  const response = await fetch("/api/cart/removeItem", {
    method: "DELETE",
    body: JSON.stringify({ product: item, username }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
