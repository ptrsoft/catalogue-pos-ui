import axios from "axios";
import config from "Views/Config";
// Import any other necessary utilities or constants

const service = axios.create({
  baseURL: config.BASE_URL,
  timeout: 60000,
});

service.interceptors.request.use(
  (request) => {
    // Here you can add any headers or authentication tokens needed
    // Example: Adding JWT token to headers
    // const jwtToken = localStorage.getItem(AUTH_TOKEN);
    // if (jwtToken) {
    //   request.headers['Authorization'] = `Bearer ${jwtToken}`;
    // }

    // Example: Redirect to login if not authenticated
    // const currentOrgId = getCurrentOrgId();
    // if (!jwtToken && !request.headers[PUBLIC_REQUEST_KEY]) {
    //   history.push(ENTRY_ROUTE);
    //   window.location.reload();
    // }

    return request;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle response errors
    // Example: Handle specific error statuses
    // const status = error?.response?.status;
    // if (status === 400 || status === 403) {
    //   // Handle authentication errors
    // }
    // if (status === 404) {
    //   // Handle not found errors
    // }
    // if (status === 500) {
    //   // Handle server errors
    // }
    // if (status === 508) {
    //   // Handle timeout errors
    // }

    return Promise.reject(error);
  }
);

const authService = axios.create({
  baseURL: config.BASE_URL,
  timeout: 60000,
});

authService.interceptors.response.use(
  (response) => {
    // Handle successful responses for auth service if needed
    return response;
  },
  (error) => {
    // Handle auth service response errors if needed
    return Promise.reject(error);
  }
);

export { service as postLoginService };
export { authService as preLoginService };
