import { TOKEN_IDENTIFIER } from '@constants/strings';

export const storeAuthToken = (token: string) =>
  localStorage.setItem(TOKEN_IDENTIFIER, token);
export const getStoredAuthToken = () => localStorage.getItem(TOKEN_IDENTIFIER);
export const removeAuthToken = () => localStorage.removeItem(TOKEN_IDENTIFIER);
