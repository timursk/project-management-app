import SignupUser from '../types/api/signupUser';
import { API_URL, ENDPOINTS } from '../utils/constants';

type SignupService = (user: SignupUser) => Promise<SignupUser>;

export const signupService: SignupService = async (user) => {
  const response = await fetch(`${API_URL}${ENDPOINTS.SIGNUP}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });

  return response.json();
};
