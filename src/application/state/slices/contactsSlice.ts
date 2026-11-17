import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Contact } from '../../../domain/entities/Contact';
import { INITIAL_MOCK_CONTACTS } from '../../../infrastructure/mock/contacts.mock';

interface ContactsState {
  contacts: Contact[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ContactsState = {
  contacts: INITIAL_MOCK_CONTACTS,
  isLoading: false,
  error: null,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload);
      state.contacts.sort((a, b) => a.user.fullName.localeCompare(b.user.fullName));
    },
    updateContactVerification: (
      state,
      action: PayloadAction<{ userId: string; verified: boolean }>
    ) => {
      const contact = state.contacts.find((c) => c.user.id === action.payload.userId);
      if (contact) {
        contact.user.securityStatus = action.payload.verified ? 'verified' : 'unverified';
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setContacts,
  addContact,
  updateContactVerification,
  setError,
} = contactsSlice.actions;

export default contactsSlice.reducer;
