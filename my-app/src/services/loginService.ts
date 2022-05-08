import Token from '../types/api/token';
import User from '../types/api/user';
import { API_URL, ENDPOINTS } from '../utils/constants';

type LoginService = (user: User) => Promise<Token>;

export const loginService: LoginService = async (user) => {
  const response = await fetch(`${API_URL}${ENDPOINTS.SIGNIN}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  return response.json();
};
