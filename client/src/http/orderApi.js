import { $authHost, $host } from "./index";
export const itemToCart = async (item) => {
  const { data } = await $authHost.post("api/basket", item);
  return data;
};

export const fetchOrders = async (userId) => {
 
  const { data } = await $host.get("api/order", { params: { userId } });
  console.log("fetchOrdersuserId", userId);
  return data;
};
export const fetchOneOrder = async (id) => {
  console.log("fetchOneOrder");
  console.log("fetchOrderId", id);
  const { data } = await $host.get("api/order/" + id);
  return data;
};
export const emptyCart = async () => {
  const { data } = await $host.delete("api/cart");
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
  console.log("addToCart");
  console.log("addToCartproduct",product);
  const { data } = await $authHost.post("api/cart", product);
  return data;
};

export const createOrder = async (order) => {
  // console.log("order.userId",order)
  const { data } = await $authHost.post("api/basket", order);
  return data;
};
