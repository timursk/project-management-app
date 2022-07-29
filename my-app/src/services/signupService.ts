import { SignupUser } from '../types/api/authTypes';
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
  if (response.status === 409) throw new Error('Duplicate user');
  if (!response.ok) throw new Error('Unknown error');
  return response.json();
};
