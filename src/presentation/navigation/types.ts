import { NavigatorScreenParams } from '@react-navigation/native';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  HomeTab: undefined;
  ChatsTab: undefined;
  ContactsTab: undefined;
  SecurityTab: undefined;
  ProfileTab: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
  ChatConversation: {
    conversationId: string;
    participantName: string;
    participantAvatar?: string;
    participantUserId: string;
  };
  NewChat: undefined;
  ContactVerification: {
    userId: string;
    userName: string;
    userAvatar?: string;
  };
  Devices: undefined;
  Settings: undefined;
  Search: undefined;
};
