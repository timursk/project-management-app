export interface LoginUser {
  login: string;
  password: string;
}

export interface SignupUser {
  name: string;
  login: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface UserInfo {
  name: string;
  login: string;
  token: string;
  id: string;
}
