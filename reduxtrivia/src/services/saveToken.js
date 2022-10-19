const TOKEN_KEY = 'token';

export const saveToken = (currentToken) => localStorage
  .setItem(TOKEN_KEY, (currentToken));

export const getToken = () => JSON.parse(localStorage.getItem(TOKEN_KEY));

export const delToken = () => localStorage.removeItem(TOKEN_KEY);
