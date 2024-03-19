import { apiClient } from "./ApiClient";
import { MixTape } from "../types/MixTape";

// Create new mixtape
export const createMixTape = async (body:Omit<MixTape, '_id'>) => {
  return await apiClient<MixTape>('mixtapes', 'POST', body);
}