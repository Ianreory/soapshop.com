import Cookies from "js-cookie";
import axios from "axios";

const axiosWithConfig = axios.create();

axiosWithConfig.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = "https://soapshop.site/";

  const token = Cookies.get("token"); // Ambil token dari cookies setiap kali request
  if (token) {
    axiosConfig.headers.Authorization = `Bearer ${token}`;
  } else {
    delete axiosConfig.headers.Authorization; // Hapus header jika token tidak ada
  }

  return axiosConfig;
});

axiosWithConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      Cookies.remove("token");
      // Optionally, you could redirect the user to the login page
      // window.location.href = '/login';
    }
    return Promise.reject(error); // Pastikan untuk meneruskan error ke pemanggil
  }
);

export default axiosWithConfig;
