import axios from "axios";
import api_url from "./config";

const jwtInterceoptor = axios.create({});

jwtInterceoptor.interceptors.request.use((config) => {
  let tokensData = JSON.parse(localStorage.getItem("tokens"));
  config.headers.common["Authorization"] = `bearer ${tokensData.token}`;
  return config;
});

jwtInterceoptor.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const authData = JSON.parse(localStorage.getItem("tokens"));
      const payload = {
        token: authData.token,
        refresh_token: authData.refreshToken,
      };

      let apiResponse = await axios.post(
        api_url+ "auth/refreshtoken",
        payload
      );
      localStorage.setItem("tokens", JSON.stringify(apiResponse.data));
      error.config.headers[
        "Authorization"
      ] = `bearer ${apiResponse.data.token}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default jwtInterceoptor;
