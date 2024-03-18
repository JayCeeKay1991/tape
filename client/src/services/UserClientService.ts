import { apiClient } from './ApiClient';
import { User } from '../types/User';
import { FormValuesUser } from '../components/SignupForm/SignupForm';
import { FormValuesUserLogin } from '../components/LogInForm/LogInForm';

// Sign up new user
export const signUp = async (body: FormValuesUser) => {
  try {
    return await apiClient<User>('users', 'POST', body);
  } catch (error) {
    console.error(error);
  }
};

// log in existing user
export const logIn = async (body: FormValuesUserLogin) => {
  try {
    return await apiClient<User>('users/login', 'POST', body);
  } catch (error) {
    console.error(error);
  }
};
