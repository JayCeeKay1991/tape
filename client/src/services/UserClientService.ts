import { apiClient } from './ApiClient';
import { User } from '@app/components/App/App';
import { FormValuesUser } from '@app/components/App/App';

// SIGN UP POST
export const signUp = async (body: FormValuesUser) => {
  try {
    return await apiClient<User>('users', 'POST', body);
  } catch (error) {
    console.error(error);
  }
};
