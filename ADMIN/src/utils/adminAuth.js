const ADMIN_TOKEN_KEY = 'adminToken';

export const getAdminToken = () => {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
};

export const setAdminToken = (token) => {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
};

export const removeAdminToken = () => {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
};