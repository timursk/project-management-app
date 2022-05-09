import LoginUser from '../types/api/loginUser';
import Token from '../types/api/token';
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

  return response.json();
};
