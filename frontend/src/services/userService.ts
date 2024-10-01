import { api } from '../api';
import type { User } from '../types';


export async function getUsers(): Promise<User[] | Error> {
  try {
    const response = await api.get('/users');
    return response.data.data;
  } catch (error) {
    return error as Error
  }
};

export async function getUserById(id: number): Promise<User | Error> {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data.data
  } catch (error) {
    return error as Error
  }
};

export async function createUser(user: Omit<User, 'id'>): Promise<User | Error> {
  try {
    const response = await api.post('/users', user);
    return response.data.data
  } catch (error) {
    return error as Error
  }
};

export async function updateUser (id: number, user: Omit<User, 'id' | 'password' | 'role'>): Promise<User | Error> {
  try {
    const response = await api.put(`'/users'/${id}`, user);
    return response.data.data
  } catch (error) {
    return error as Error
  }
};

export async function removeUser(id: number): Promise<User | Error> {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data.data
  } catch (error) {
    return error as Error
  }
};
