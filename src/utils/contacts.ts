// Types
import Contact from '@/types/contact'
import FetchResult from '@/types/dataFetchResult';

// getContacts currently not in-use, contacts data fetching handled generally/flexibly via useFetchData hook
/* export const getContacts = async (apiRoute: string): Promise<FetchResult<Contact[]>> => {
    try {
        const response = await fetch(apiRoute);
        if (!response.ok) {
          throw new Error('Failed to fetch contacts');
        }
        const data: Contact[] = await response.json();
        return { data, error: null, loading: false };
      } catch (error) {
        return { data: null, error: error.message, loading: false };
      }
}; */

export const updateContact = async (contact: Contact) => {
    const response = ''
    return response
}
  
export const addContact = async (contact: Contact) => {
    const response = ''
    return response
};

export const deleteContact = async (contact: Contact) => {
    const response = ''
    return response
};

  
  