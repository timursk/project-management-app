import { API_URL, ENDPOINTS } from '../utils/constants';

type User = {
  id: string;
  name: string;
  login: string;
};

type GetUsersService = (token: string) => Promise<User[]>;

export const getUsersService: GetUsersService = async (token: string) => {
  if (!token) throw new Error('No token');

  const response = await fetch(`${API_URL}${ENDPOINTS.USERS}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 404) throw new Error('User not found');
  if (response.status === 401) throw new Error('Unauthorized');
  if (response.status !== 200) throw new Error('Unknown error');
  return response.json();
};
