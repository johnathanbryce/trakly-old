import { atom } from 'recoil';
import Contact from '@/types/contact';

// data object states:

interface ContactsState {
  data: Contact[] | null;
  error: string | null;
  loading: boolean;
}

export const contactsState = atom<ContactsState>({
  key: 'contactsState',
  default: {
    data: null,
    error: null,
    loading: false,
  },
});

export const companiesState = atom({
  key: 'companiesState',
  default: {
    data: null,
    error: null,
    loading: false,
  },
});

export const templatesState = atom({
  key: 'templatesState',
  default: {
    data: null,
    error: null,
    loading: false,
  },
});

