import { atom } from 'recoil';
import Contact from '@/types/contact';
import Company from '@/types/company';
import Template from '@/types/template';

export const contactsState = atom<Contact[]>({
  key: 'contactsState',
  default: [],
});

export const companiesState = atom<Company[]>({
  key: 'companiesState',
  default: [],
});

export const templatesState = atom<Template[]>({
  key: 'templatesState',
  default: [],
});