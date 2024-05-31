'use client'
import { useEffect } from "react";
// Recoil Global State
import { useRecoilState } from "recoil";
// Types
import FetchResult from "@/types/dataFetchResult";

// EXAMPLE -- may change dependent on MongoDB 
// ** UTILIZE NEXT.JS 14 server FETCH COMPONENTS

/* fetches data and stores the fetched data into recoil state for either Contacts, Companies, or Templates
    - REMEMBER: recoilState parameter determines which recoil atom state this fetched data will be stored in
*/

export const useFetchData = <T,>(apiRoute: string, recoilState: any): FetchResult<T> => {
  // remember: Recoil's dglobal ata persists across renders unless the data changes; thus limiting data fetch calls when user toggles btwn categories
  const [data, setData] = useRecoilState<any| null>(recoilState);
  const [error, setError] = useRecoilState<string | null>(recoilState);
  const [loading, setLoading] = useRecoilState<boolean>(recoilState);
    
  const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(apiRoute);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result: T = await response.json();
        setData(result);
        setError(null);
      } catch (error: any) {
        setError(error.message);
        setData(null);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    // check if data is already fetched
    if (!data || data.length === 0) { 
      fetchData();
    }
  }, [apiRoute]); 

  return { data, error, loading };
};
  