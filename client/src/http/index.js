import axios from "axios";
const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});
console.log("authInterceptor")
/////////////////////////////////////////////////
const authInterceptor = config => {
  // config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
  return config;
};
//for $authHost. add interceptors (add token each request)
$authHost.interceptors.request.use(authInterceptor)
// $authHost.interceptors.request.use(true)
////////////////////////////////////////////
export{
    $host,
    $authHost
}
