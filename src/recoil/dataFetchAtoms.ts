import { atom } from 'recoil';
import Contact from '@/types/contact';
import Company from '@/types/company';
import MessageTemplate from '@/types/messageTemplate';

// data object states:

interface ContactsState {
  data: Contact[] | null;
  error: string | null;
  loading: boolean;
}

interface CompaniesState {
  data: Company[] | null;
  error: string | null;
  loading: boolean;
}

interface TemplatesState {
  data: MessageTemplate[] | null;
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

export const companiesState = atom<CompaniesState>({
  key: 'companiesState',
  default: {
    data: null,
    error: null,
    loading: false,
  },
});

export const templatesState = atom<TemplatesState>({
  key: 'templatesState',
  default: {
    data: null,
    error: null,
    loading: false,
  },
});

