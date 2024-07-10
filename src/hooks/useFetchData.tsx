'use client'
import { useEffect } from "react";
// Recoil Global State
import { useRecoilState } from "recoil";
// Types
import FetchResult from "@/types/dataFetchResult";
// Clerk Auth
import { useAuth } from '@clerk/clerk-react';
// Utils
import { fetchDataFromServer } from "@/utils/dataFetchService";

/* fetches data and stores the fetched data into recoil state for either Contacts, Companies, or Templates
    - REMEMBER: recoilState parameter determines which recoil atom state this fetched data will be stored in
*/

interface FetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export const useFetchData = <T,>(apiRoute: string, recoilState: any,): FetchResult<T> => {
  // recoil's global data persists across renders unless the data changes; thus limiting data fetch calls when user toggles btwn categories
  const [fetchState, setFetchState] = useRecoilState<FetchState<T>>(recoilState);
  // clerk auth (userId is "provider_id" in our db)
  const { userId, getToken } = useAuth();

  const fetchData = async () => {
    setFetchState((prevState) => ({ ...prevState, loading: true }));
    try {
      if (!userId) {
        throw new Error('User ID is not defined');
      }

      const token = await getToken();
      if (!token) {
        throw new Error('Token is not defined');
      }

      const result: T = await fetchDataFromServer(apiRoute, userId, token)
      setFetchState({ data: result, error: null, loading: false });

    } catch (error: any) {
      setFetchState({ data: null, error: error.message, loading: false });
    }
  };

  useEffect(() => {
    if (!fetchState.data) {
      fetchData();
    }
  }, [apiRoute]);

  return { data: fetchState.data, error: fetchState.error, loading: fetchState.loading };
};
  
