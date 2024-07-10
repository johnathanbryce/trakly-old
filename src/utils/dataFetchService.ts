'use server'

export async function fetchDataFromServer<T>(apiRoute: string, userId: string, token: string): Promise<T>{
    const headers: HeadersInit = {
        'Authorization': `Bearer ${token}`,
        'X-User-ID': userId,
      };
    
      const response = await fetch(apiRoute, { headers });
    
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
    
      const result: T = await response.json();
      return result;
}