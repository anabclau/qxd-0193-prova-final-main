export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface AuthData {
  username: string;
  password: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  ownerId: number;  
  progress: number;  
}

export interface ApplicationError {
  name: string,
  message: string,
}
