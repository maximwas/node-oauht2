export interface Book {
  title: string;
  name: string;
}

export interface Response {
  code: string;
  success: boolean;
  message: string;
}

export interface UserResponse extends Response {
  token: string;
}

export interface Users {
  email: string;
  password: string;
}
