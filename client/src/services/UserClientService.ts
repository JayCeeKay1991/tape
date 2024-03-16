import { apiClient } from './ApiClient';
import { User } from '@app/types/User';
import { FormValuesUser } from '@app/components/SignupForm/SignupForm';
import { FormValuesUserLogin } from '@app/components/LogIn/LogIn';

// SIGN UP POST
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
