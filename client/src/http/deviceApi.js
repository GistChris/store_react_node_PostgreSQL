import { $authHost, $host } from "./index";
export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};
export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};

export const createBrand = async (brand) => {
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};
export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};
//rating
export const createRating = async (rating) => {
  console.log("RATINGDATA",rating)
  const { data } = await $authHost.post("api/rating", rating);
  return data;
};
export const fetchRatings = async () => {
  const { data } = await $host.get("api/rating");
  return data;
};
export const itemToCart = async (item) => {
  console.log("CartDATA",item)
  const { data } = await $authHost.post("api/cart", item);
  return data;
};
// export const createDevice = async (formData) => {
//   // console.log("formData",formData)
//   const {data} = await $authHost.post("api/device", formData)
//   return data
// }
export const createDevice = async (device) => {
  const { data } = await $authHost.post("api/device", device);
  return data;
};
export const updateDevice = async (device) => {
  const { data } = await $authHost.patch("api/device", device);
  return data;
};
// export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
  export const fetchDevices = async (typeId, brandId, page, limit = 3) => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  // console.log("Data",data)
  return data;
};

export const fetchOneDevice = async (id) => {
  console.log("idddddddddddddddddd",id)
  const { data } = await $host.get("api/device/" + id);
  console.log("data",data)
  return data;
};
