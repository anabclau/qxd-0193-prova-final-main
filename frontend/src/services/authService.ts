import { api } from '../api';
import type { AuthData, User } from '../types';

export async function register(data: AuthData): Promise<User | Error>{
  try {
    const response = await api.post(`/users`, data);
    return response.data.data
  } catch (error) {
    return error as Error;
  }
};

export async function logout(): Promise<void | Error> {
  try {
    await api.get('/logout');
    localStorage.clear();
  } catch (error) {
    return error as Error;
  }
}