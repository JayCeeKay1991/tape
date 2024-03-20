import { apiClient } from "./ApiClient";
import { User } from "../types/User";
import { FormValuesUser } from "../components/SignupForm/SignupForm";
import { FormValuesUserLogin } from "../components/LoginForm/LoginForm";
import FormValuesUserProfile from "../components/UserDetails/UserDetails";

// Sign up new user
export async function signup(body: FormValuesUser) {
  try {
    return await apiClient<User>("users", "POST", body);
  } catch (error) {
    console.error(error);
  }
}

// log in existing user
export async function login(body: FormValuesUserLogin) {
  try {
    return await apiClient<User>("users/login", "POST", body);
  } catch (error) {
    console.error(error);
  }

};


// get all users
export const getAllUsers = async () => {
  return await apiClient<User[]>('users')
}


export async function updateUser(
  body: Omit<User, "channels" | "mixTapes" | "password">
) {
  try {
    return await apiClient<User>(`users/${body._id}`, "PUT", body);
  } catch (error) {
    console.error(error);
  }
}

