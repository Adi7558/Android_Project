import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../application/state/store';
import {
  setLoading,
  setContacts,
  addContact as addContactAction,
  setError,
} from '../../application/state/slices/contactsSlice';
import {
  GetContactsUseCase,
  SearchContactsUseCase,
  AddContactUseCase,
} from '../../application/usecases/contacts/ContactUseCases';

const getContactsUseCase = new GetContactsUseCase();
const searchContactsUseCase = new SearchContactsUseCase();
const addContactUseCase = new AddContactUseCase();

export const useContacts = () => {
  const dispatch = useAppDispatch();
  const { contacts, isLoading, error } = useAppSelector((state) => state.contacts);

  const fetchContacts = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const list = await getContactsUseCase.execute();
      dispatch(setContacts(list));
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to load contacts'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const searchContacts = useCallback(async (query: string) => {
    return searchContactsUseCase.execute(query);
  }, []);

  const addContact = useCallback(
    async (usernameOrEmail: string) => {
      try {
        dispatch(setLoading(true));
        const contact = await addContactUseCase.execute(usernameOrEmail);
        dispatch(addContactAction(contact));
        return contact;
      } catch (err: any) {
        dispatch(setError(err.message || 'Failed to add contact'));
        return null;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  return {
    contacts,
    isLoading,
    error,
    fetchContacts,
    searchContacts,
    addContact,
  };
};
