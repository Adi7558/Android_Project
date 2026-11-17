import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SecurityOverview } from '../../../domain/repositories/ISecurityRepository';
import { SecurityActivity } from '../../../domain/entities/SecurityActivity';
import {
  MOCK_SECURITY_OVERVIEW,
  MOCK_SECURITY_ACTIVITIES,
} from '../../../infrastructure/mock/security.mock';

interface SecurityState {
  overview: SecurityOverview;
  activities: SecurityActivity[];
  verifiedUserIds: Record<string, boolean>;
  isLoading: boolean;
  error: string | null;
}

const initialState: SecurityState = {
  overview: MOCK_SECURITY_OVERVIEW,
  activities: MOCK_SECURITY_ACTIVITIES,
  verifiedUserIds: {
    usr_002: true,
    usr_003: true,
    usr_004: true,
    usr_006: true,
    usr_005: false,
    usr_007: false,
  },
  isLoading: false,
  error: null,
};

export const securitySlice = createSlice({
  name: 'security',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setOverview: (state, action: PayloadAction<SecurityOverview>) => {
      state.overview = action.payload;
    },
    setActivities: (state, action: PayloadAction<SecurityActivity[]>) => {
      state.activities = action.payload;
    },
    addActivity: (state, action: PayloadAction<SecurityActivity>) => {
      state.activities.unshift(action.payload);
    },
    markContactVerified: (state, action: PayloadAction<string>) => {
      state.verifiedUserIds[action.payload] = true;
    },
    markContactUnverified: (state, action: PayloadAction<string>) => {
      state.verifiedUserIds[action.payload] = false;
    },
    rotateIdentityKeySuccess: (
      state,
      action: PayloadAction<{ newFingerprint: string; lastRotation: string }>
    ) => {
      state.overview.identityKeyFingerprint = action.payload.newFingerprint;
      state.overview.lastKeyRotation = action.payload.lastRotation;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setOverview,
  setActivities,
  addActivity,
  markContactVerified,
  markContactUnverified,
  rotateIdentityKeySuccess,
  setError,
} = securitySlice.actions;

export default securitySlice.reducer;
