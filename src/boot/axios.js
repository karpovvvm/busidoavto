import axios from "axios";

export default ({ app, router, store }) => {

  if (process.env.PROD) {
    axios.defaults.baseURL = process.env.HOST;
  }

  axios.interceptors.request.use(
    (request) => {
      console.log(request);
      // Edit request config
      return request;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    (response) => {
      console.log(response);
      // Edit response config
      return response;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );

}
