import { CURRENT_ROUTE, TOKEN_IDENTIFIER } from '@constants/strings';

export const storeAuthToken = (token: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(TOKEN_IDENTIFIER, token);
  }
};

export const getStoredAuthToken = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(TOKEN_IDENTIFIER);
  }
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(TOKEN_IDENTIFIER);
  }
};

export const storeCurrentRoute = (path: string) => {
  if (typeof window !== 'undefined') {
    return window.localStorage.setItem(CURRENT_ROUTE, path);
  }
};

export const getStoredPreviousRoute = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(CURRENT_ROUTE);
  }
};

export const removePreviousRoute = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.removeItem(CURRENT_ROUTE);
  }
};
