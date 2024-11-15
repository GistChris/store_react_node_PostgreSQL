import { $authHost, $host } from "./index";
export const itemToCart = async (item) => {
  const { data } = await $authHost.post("api/basket", item);
  return data;
};

export const fetchCart = async (userId) => {
  // console.log("fetchCartuserId", userId);
  const { data } = await $host.get("api/cart", { params: { userId } });
  return data;
};
export const emptyCart = async (userId) => {
  console.log("emptyCartuserId", userId);
  const { data } = await $host.delete("api/cart",{ params: { userId } });
  return data;
};
export const updateCartItem = async (cartItem) => {
  const { data } = await $authHost.put("api/cart", cartItem);
  return data;
};
export const deleteCartProduct = async (itemId) => {
  const cartProductId = itemId;
  const { data } = await $authHost.delete("api/cart?id=" + cartProductId);
  return data;
};
// export const fetchBasket = async () => {
//   const { data } = await $host.get("api/basket");
//   return data;
// };

// export const createDevice = async (device) => {
//   const { data } = await $authHost.post("api/device", device);
//   return data;
// };
export const addToCart = async (product) => {
  const { data } = await $authHost.post("api/cart", product);
  return data;
};

export const createOrder = async (order) => {
  const { data } = await $authHost.post("api/order", order);
  return data;
};
