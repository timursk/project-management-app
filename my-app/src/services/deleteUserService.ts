import { DecodedToken } from '../types/api/authTypes';
import { API_URL, ENDPOINTS } from '../utils/constants';
import jwt_decode from 'jwt-decode';

type DeleteUserService = (token: string) => Promise<boolean>;

export const deleteUserService: DeleteUserService = async (token) => {
  const { userId }: DecodedToken = jwt_decode(token);
  if (!userId) throw new Error('Unknown error');

  const response = await fetch(`${API_URL}${ENDPOINTS.USERS}/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 404) throw new Error('Not found');
  if (!response.ok) throw new Error('Unknown error');
  return true;
};
