import { LoginUser, Token } from '../types/api/authTypes';
import { API_URL, ENDPOINTS } from '../utils/constants';

type LoginService = (user: LoginUser) => Promise<Token>;

export const loginService: LoginService = async (user) => {
  const response = await fetch(`${API_URL}${ENDPOINTS.SIGNIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.status === 403) throw new Error('Invalid user or password');
  if (response.status === 404) throw new Error('User not found');
  if (response.status !== 201) throw new Error('Unknown error');
  return response.json();
};
