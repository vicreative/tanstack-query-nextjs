import axios from 'axios';
import { getStoredAuthToken } from '@app/shared/utils/auth';

// create a new axios instance
export const instance = axios.create({
  baseURL: process.env.API_URL,
});

instance.interceptors.request.use((config) => {
  const token = getStoredAuthToken();

  if (token && !config.headers.hasOwnProperty('Authorization')) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (
      !error.response ||
      !error.response.data ||
      !error.response.data.message
    ) {
      error = {
        response: {
          data: {
            ...error.response.data,
            message: 'Unable to complete request',
          },
        },
      };
    } else if (401 === error.response.status) {
      error = {
        response: {
          data: {
            ...error.response.data,
            message:
              error.response.data.message ===
              'Unauthorized, please provide a jwt token'
                ? 'Unauthorized access! please login first'
                : error.response.data.message,
          },
        },
      };
    } else if (404 === error.response.status) {
      error = {
        response: {
          data: error.response.data,
        },
      };
    } else if (409 === error.response.status) {
      // Add a 409 response interceptor

      error = {
        response: {
          data: error.response.data,
        },
      };
    } else if (500 === error.response.status) {
      error = {
        response: {
          data: {
            ...error.response.data,
            message: 'Ooops! an error occurred',
          },
        },
      };
    } else {
      return Promise.reject(error);
    }
    throw error;
  }
);
