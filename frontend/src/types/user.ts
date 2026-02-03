export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: string;
}

export interface CreateUserDTO {
  username: string;
  email: string;
}

export interface UpdateUserDTO {
  username?: string;
  email?: string;
}
