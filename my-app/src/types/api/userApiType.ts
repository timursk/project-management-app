export interface UserChange {
  name: string;
  login: string;
  userId: string;
  token: string;
  password: string;
}
export interface UserDelete {
  userId: string;
  token: string;
}
