import { $authHost, $host } from "./index";
// import jwt_decode from "jwt-decode"
import { jwtDecode } from "jwt-decode";
export const registration = async (email, password) => {
  // const response = await $host.post("api/user/registration", {
  //   email,
  //   password,
  //   role: "ADMIN",
  // });
 
  const { data } = await $host.post("api/user/registration", {
    email,
    password,
    role: "ADMIN",
  });
  console.log("registration")
  localStorage.setItem('token', data.token);
 
  return jwtDecode(data.token);
  // return response
};
export const login = async (email, password) => {
  const { data } = await $host.post("api/user/login", {
    email,
    password,
  });
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};
//user avtorisovalsia, tokin sokhranilsia i teper pri kazhdom zaprose bydet vyzyvatsia function check
//i esli token ne validnyi to user bydet razloginevatsia, esli validnyi user budet popadat na stranitsy 
//magazina pod svoim account
export const check = async () => {
  const {data} = await $authHost.get("api/user/auth");
  localStorage.setItem('token', data.token);
  return jwtDecode(data.token);
};
// export const currentUser = async () => {
//   const {data} = await $authHost.get("api/user/auth");
//   console.log("DATAUSERFROMSERVER",data)
//   // localStorage.setItem('token', data.token);
//   console.log("jwtDecode(data.token).id",jwtDecode(data.token).id)
//   const user=jwtDecode(data.token)
//   return user;
// };revampPersonalInfo
export const updateUser = async (user) => {
  // const { data } = await $authHost.patch("api/device", device);
  // console.log("UPDATEUSER",user)

  const { data } = await $authHost.put("api/user", user);
  console.log("dataUPDATEUSER",data)
  return data;
};

