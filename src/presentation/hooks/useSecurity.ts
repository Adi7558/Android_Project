import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../../application/state/store';
import {
  setLoading,
  setOverview,
  setActivities,
  markContactVerified as markContactVerifiedAction,
  rotateIdentityKeySuccess,
  setError,
} from '../../application/state/slices/securitySlice';
import { setConversationVerified } from '../../application/state/slices/chatSlice';
import { updateContactVerification } from '../../application/state/slices/contactsSlice';
import {
  GetSecurityOverviewUseCase,
  GetSecurityIdentityUseCase,
  VerifyContactIdentityUseCase,
  GetSecurityActivitiesUseCase,
  RotateIdentityKeysUseCase,
} from '../../application/usecases/security/SecurityUseCases';

const getSecurityOverviewUseCase = new GetSecurityOverviewUseCase();
const getSecurityIdentityUseCase = new GetSecurityIdentityUseCase();
const verifyContactIdentityUseCase = new VerifyContactIdentityUseCase();
const getSecurityActivitiesUseCase = new GetSecurityActivitiesUseCase();
const rotateIdentityKeysUseCase = new RotateIdentityKeysUseCase();

export const useSecurity = () => {
  const dispatch = useAppDispatch();
  const { overview, activities, verifiedUserIds, isLoading, error } = useAppSelector(
    (state) => state.security
  );

  const fetchOverview = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const data = await getSecurityOverviewUseCase.execute();
      dispatch(setOverview(data));
      const acts = await getSecurityActivitiesUseCase.execute();
      dispatch(setActivities(acts));
    } catch (err: any) {
      dispatch(setError(err.message || 'Failed to load security overview'));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const getContactIdentity = useCallback(async (userId: string) => {
    return getSecurityIdentityUseCase.execute(userId);
  }, []);

  const verifyContact = useCallback(
    async (userId: string) => {
      try {
        await verifyContactIdentityUseCase.execute(userId);
        dispatch(markContactVerifiedAction(userId));
        dispatch(setConversationVerified({ userId, verified: true }));
        dispatch(updateContactVerification({ userId, verified: true }));
        // Refresh activities
        const acts = await getSecurityActivitiesUseCase.execute();
        dispatch(setActivities(acts));
        return true;
      } catch (err: any) {
        dispatch(setError(err.message || 'Verification failed'));
        return false;
      }
    },
    [dispatch]
  );

  const rotateKeys = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const newIdentity = await rotateIdentityKeysUseCase.execute();
      dispatch(
        rotateIdentityKeySuccess({
          newFingerprint: newIdentity.identityKeyFingerprint,
          lastRotation: 'Just now',
        })
      );
      const acts = await getSecurityActivitiesUseCase.execute();
      dispatch(setActivities(acts));
      return newIdentity;
    } catch (err: any) {
      dispatch(setError(err.message || 'Key rotation failed'));
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  return {
    overview,
    activities,
    verifiedUserIds,
    isLoading,
    error,
    fetchOverview,
    getContactIdentity,
    verifyContact,
    rotateKeys,
  };
};
