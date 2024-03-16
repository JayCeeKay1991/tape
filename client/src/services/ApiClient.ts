import config from '../../../server/src/config/config';

const BASEURL = `http://localhost:3000/${config.port}`

export async function apiClient<T> (
    endpoint: string, 
    method: string = 'GET', // Defaults to GET method
    body?: Record<string, any>// optional param for body
  ): Promise <T> {
    const options: RequestInit = {
      method,
      headers: {
        'Content-type': 'application/json'
      }, 
      body: body? JSON.stringify(body) : undefined
    };
  
    const response = await fetch(`${BASEURL}/${endpoint}`, options) // calls specified endpoint with given options
  
    if (response.ok) {
      return response.json() as unknown as T; // success, return
    }
    return Promise.reject(new Error('Something went wrong'));
  }
  