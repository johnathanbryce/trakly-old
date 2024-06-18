import { atom } from 'recoil';

// data object states:

export const contactsState = atom({
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

