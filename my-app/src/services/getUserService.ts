import { UserInfo } from '../types/api/authTypes';
import { API_URL, ENDPOINTS } from '../utils/constants';
import jwt_decode from 'jwt-decode';

type GetUserService = (token: string) => Promise<UserInfo>;

interface DecodedToken {
  userId: string;
}

export const getUserService: GetUserService = async (token: string) => {
  const { userId }: DecodedToken = jwt_decode(token);
  if (!userId) throw new Error('Unknown error');
  const response = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 404) throw new Error('User not found');
  if (response.status !== 200) throw new Error('Unknown error');
  return response.json();
};
