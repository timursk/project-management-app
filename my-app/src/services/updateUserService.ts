import { DecodedToken, SignupUser, UpdateUser } from '../types/api/authTypes';
import { API_URL, ENDPOINTS } from '../utils/constants';
import jwt_decode from 'jwt-decode';

type UpdateUserService = (user: UpdateUser) => Promise<SignupUser>;

export const updateUserService: UpdateUserService = async (user) => {
  const { token, name, login, password } = user;
  const { userId }: DecodedToken = jwt_decode(token);
  if (!userId) throw new Error('Unknown error');

  const response = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, login, password }),
  });
  if (response.status === 403) throw new Error('Invalid user or password');
  if (response.status === 409) throw new Error('Duplicate user');
  if (response.ok) return response.json();
  throw new Error('Unknown error');
};
