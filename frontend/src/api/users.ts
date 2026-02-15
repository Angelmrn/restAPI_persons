import type { User } from "../types/user";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const fetchUserById = async (id: Number): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("User not found");
    }
    throw new Error("Failed to fetch user");
  }
  return response.json();
};

export const registerUser = async (
  username: string,
  email: string,
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email }),
  });
  if (!response.ok) {
    const errData = await response.json().catch(() => null);
    throw new Error(errData?.detail || "Failed to register user");
  }
  return response.json();
};

export const updateUser = async (
  id: number,
  userData: Partial<User>,
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errData = await response.json().catch(() => null);
    throw new Error(errData?.detail || "Failed to update user");
  }
  return response.json();
};

export const deleteUser = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errData = await response.json().catch(() => null);
    throw new Error(errData?.detail || "Failed to delete user");
  }
};
