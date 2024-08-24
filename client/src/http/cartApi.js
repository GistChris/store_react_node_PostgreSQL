import { $authHost, $host } from "./index";
export const itemToCart = async (item) => {
    console.log("ITEMDATAhttp",item)
    const { data } = await $authHost.post("api/basket", item);
    return data;
  };
  export const fetchBasket = async () => {
    const { data } = await $host.get("api/basket");
    return data;
  };
  export const fetchProducts = async () => {
    // const { data } = await $host.get("api/basket");
    // return data;
    const  data  = await JSON.parse(localStorage.getItem('products'));
    console.log("CARTDatayy",data)
    return data;
  };
//   //////////////////////////////////////////////////
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

// export const createDevice = async (formData) => {
//   // console.log("formData",formData)
//   const {data} = await $authHost.post("api/device", formData)
//   return data
// }
export const createDevice = async (device) => {
  
  const { data } = await $authHost.post("api/device", device);
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
  console.log("Data",data)
  return data;
};

export const fetchOneDevice = async (id) => {
  const { data } = await $host.get("api/device/" + id);
  return data;
};
