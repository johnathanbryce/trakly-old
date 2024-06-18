'use client'
import { useEffect } from "react";
// Recoil Global State
import { useRecoilState } from "recoil";
// Types
import FetchResult from "@/types/dataFetchResult";

/* fetches data and stores the fetched data into recoil state for either Contacts, Companies, or Templates
    - REMEMBER: recoilState parameter determines which recoil atom state this fetched data will be stored in
*/

interface FetchState<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

export const useFetchData = <T,>(apiRoute: string, recoilState: any): FetchResult<T> => {
  // remember: Recoil's global data persists across renders unless the data changes; thus limiting data fetch calls when user toggles btwn categories
  const [fetchState, setFetchState] = useRecoilState<FetchState<T>>(recoilState);

  const fetchData = async () => {
    setFetchState((prevState) => ({ ...prevState, loading: true }));
    try {
      const response = await fetch(apiRoute);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result: T = await response.json();
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
  