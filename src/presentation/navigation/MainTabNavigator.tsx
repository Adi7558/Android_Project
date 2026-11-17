import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainTabParamList } from './types';
import { useTheme } from '../theme/ThemeContext';
import { HomeScreen } from '../screens/home/HomeScreen';
import { ChatListScreen } from '../screens/chat/ChatListScreen';
import { ContactsScreen } from '../screens/contacts/ContactsScreen';
import { SecurityCenterScreen } from '../screens/security/SecurityCenterScreen';
import { ProfileScreen } from '../screens/profile/ProfileScreen';
import { AppText } from '../components/common/AppText';
import {
  MessageSquare,
  Users,
  ShieldCheck,
  Home,
  Menu,
} from '../theme/icons';
import { useAppSelector } from '../../application/state/store';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const conversations = useAppSelector((state) => state.chat.conversations);

  const totalUnread = conversations.reduce(
    (acc, curr) => acc + (curr.unreadCount || 0),
    0
  );

  const bottomInset = insets.bottom;
  const tabHeight = 62 + bottomInset;

  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#38BDF8',
        tabBarInactiveTintColor: '#64748B',
        tabBarStyle: {
          backgroundColor: '#040814',
          borderTopColor: 'rgba(255, 255, 255, 0.07)',
          borderTopWidth: 1,
          height: tabHeight,
          paddingBottom: bottomInset > 0 ? bottomInset : 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <View style={styles.homeLabelCol}>
              <AppText
                variant="caption"
                weight={focused ? '700' : '600'}
                customColor={focused ? '#38BDF8' : '#64748B'}
                style={styles.labelText}
              >
                Home
              </AppText>
              {focused && <View style={styles.homeActiveIndicator} />}
            </View>
          ),
          tabBarIcon: ({ focused }) => (
            <View style={[styles.tabPill, focused && styles.homeActivePill]}>
              <Home
                size={22}
                color={focused ? '#38BDF8' : '#64748B'}
                strokeWidth={focused ? 2.5 : 2}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ChatsTab"
        component={ChatListScreen}
        options={{
          tabBarLabel: 'Chats',
          tabBarBadge: totalUnread > 0 ? totalUnread : undefined,
          tabBarBadgeStyle: {
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            fontSize: 10,
            fontWeight: '700',
          },
          tabBarIcon: ({ color, focused }) => (
            <MessageSquare size={22} color={focused ? '#38BDF8' : color} strokeWidth={focused ? 2.4 : 2} />
          ),
        }}
      />
      <Tab.Screen
        name="ContactsTab"
        component={ContactsScreen}
        options={{
          tabBarLabel: 'Contacts',
          tabBarIcon: ({ color, focused }) => (
            <Users size={22} color={focused ? '#38BDF8' : color} strokeWidth={focused ? 2.4 : 2} />
          ),
        }}
      />
      <Tab.Screen
        name="SecurityTab"
        component={SecurityCenterScreen}
        options={{
          tabBarLabel: 'Security',
          tabBarIcon: ({ color, focused }) => (
            <ShieldCheck size={22} color={focused ? '#38BDF8' : color} strokeWidth={focused ? 2.4 : 2} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'More',
          tabBarIcon: ({ color, focused }) => (
            <Menu size={22} color={focused ? '#38BDF8' : color} strokeWidth={focused ? 2.4 : 2} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabPill: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  homeActivePill: {
    backgroundColor: 'rgba(37, 99, 235, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.35)',
  },
  homeLabelCol: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 11,
    lineHeight: 14,
  },
  homeActiveIndicator: {
    width: 24,
    height: 2.5,
    borderRadius: 1.5,
    backgroundColor: '#2563EB',
    marginTop: 2,
  },
});
