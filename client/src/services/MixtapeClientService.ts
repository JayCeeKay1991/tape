import { apiClient } from './ApiClient';
import { MixTape } from '../types/MixTape';

export type CreateMixTapeArgs = {
  name: string;
  url: string;
  duration: number;
  channel: string;
  creator: string;
};

// Create new mixtape
export const createMixTape = async (body: CreateMixTapeArgs) => {
  try {
    return await apiClient<MixTape>(`mixtape`, 'POST', body);
  } catch (error) {
    console.error(error);
    throw new Error('Could not create mixtape');
  }
};
