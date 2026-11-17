import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from '../../../domain/entities/Device';
import { INITIAL_MOCK_DEVICES } from '../../../infrastructure/mock/devices.mock';

interface DevicesState {
  devices: Device[];
  isLoading: boolean;
  error: string | null;
}

const initialState: DevicesState = {
  devices: INITIAL_MOCK_DEVICES,
  isLoading: false,
  error: null,
};

export const devicesSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setDevices: (state, action: PayloadAction<Device[]>) => {
      state.devices = action.payload;
    },
    removeDevice: (state, action: PayloadAction<string>) => {
      state.devices = state.devices.filter((d) => d.id !== action.payload);
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setDevices, removeDevice, setError } = devicesSlice.actions;

export default devicesSlice.reducer;
