import { API_BASE_URL } from "../lib/constants";

interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
}


export async function getUserById(id: string): Promise<IUser>{
    const response = await fetch(`${API_BASE_URL}/users/${id}`);
    const dataUser = await response.json();
    return dataUser;
}