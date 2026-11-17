import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ThemeSetting = 'light' | 'dark' | 'system';

interface SettingsState {
  themeMode: ThemeSetting;
  notifications: {
    messagesEnabled: boolean;
    securityAlertsEnabled: boolean;
    soundEnabled: boolean;
    vibrationEnabled: boolean;
  };
  privacy: {
    readReceipts: boolean;
    onlineStatus: boolean;
    typingIndicator: boolean;
  };
  security: {
    biometricUnlock: boolean;
    screenSecurity: boolean;
    incognitoKeyboard: boolean;
  };
}

const initialState: SettingsState = {
  themeMode: 'dark',
  notifications: {
    messagesEnabled: true,
    securityAlertsEnabled: true,
    soundEnabled: true,
    vibrationEnabled: true,
  },
  privacy: {
    readReceipts: true,
    onlineStatus: true,
    typingIndicator: true,
  },
  security: {
    biometricUnlock: false,
    screenSecurity: true,
    incognitoKeyboard: true,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setThemeModeSetting: (state, action: PayloadAction<ThemeSetting>) => {
      state.themeMode = action.payload;
    },
    toggleNotificationSetting: (
      state,
      action: PayloadAction<keyof SettingsState['notifications']>
    ) => {
      state.notifications[action.payload] = !state.notifications[action.payload];
    },
    togglePrivacySetting: (
      state,
      action: PayloadAction<keyof SettingsState['privacy']>
    ) => {
      state.privacy[action.payload] = !state.privacy[action.payload];
    },
    toggleSecuritySetting: (
      state,
      action: PayloadAction<keyof SettingsState['security']>
    ) => {
      state.security[action.payload] = !state.security[action.payload];
    },
  },
});

export const {
  setThemeModeSetting,
  toggleNotificationSetting,
  togglePrivacySetting,
  toggleSecuritySetting,
} = settingsSlice.actions;

export default settingsSlice.reducer;
