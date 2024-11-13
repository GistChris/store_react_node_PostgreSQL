import { $authHost, $host } from "./index";
import { useNavigate } from "react-router-dom";

export const createType = async (type) => {
  const { data } = await $authHost.post("api/type", type);
  return data;
};
export const fetchTypes = async () => {
  const { data } = await $host.get("api/type");
  return data;
};
/////////////////////
export const fetchInfos = async () => {
  const { data } = await $host.get("api/info");
  return data;
};
///////////////////////////////////

export const createBrand = async (brand) => {
  console.log("brand",brand)
  const { data } = await $authHost.post("api/brand", brand);
  return data;
};
export const fetchBrands = async () => {
  const { data } = await $host.get("api/brand");
  return data;
};
//rating
export const createRating = async (rating) => {
  const { data } = await $authHost.post("api/rating", rating);
  return data;
};
export const fetchRatings = async () => {
  const { data } = await $host.get("api/rating");
  return data;
};
export const itemToCart = async (item) => {
  console.log("itemToCart")
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
  const { data } = await $authHost.put("api/device", device);
  return data;
};
export const deleteDevice = async (itemId) => {
  console.log("deletedevice",itemId)
  const deviceId = itemId;
  const { data } = await $authHost.delete("api/device?id=" + deviceId);

  return data;
};
// export const fetchOneDevice = async (id) => {
//   const { data } = await $host.get("api/device/" + id);
//   return data;
// };

// export const fetchDevices = async (typeId, brandId, page, limit = 5) => {
export const fetchDevices = async (typeId, brandId, page, limit = 7) => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
// console.log("DATAROW",data.rows)
  return data;
};
export const fetchAllDevices = async (typeId, brandId, page, limit ) => {
  // export const fetchAllDevices = async () => {
  const { data } = await $host.get("api/device", {
    params: {
      typeId,
      brandId,
      page,
      limit,
    },
  });
  // console.log("DATAROW",data.rows)
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};
