import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainTabParamList, RootStackParamList } from '../../navigation/types';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from '../../components/common/AppText';
import { Avatar } from '../../components/common/Avatar';
import { ChatListItem } from '../../components/chat/ChatListItem';
import { EmptyState } from '../../components/common/EmptyState';
import {
  ShieldCheck,
  Search,
  Plus,
  Users,
  Smartphone,
  Lock,
  ArrowRight,
} from '../../theme/icons';
import { useAuth } from '../../hooks/useAuth';
import { useChat } from '../../hooks/useChat';
import { useSecurity } from '../../hooks/useSecurity';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'HomeTab'>,
  NativeStackScreenProps<RootStackParamList>
>;

export const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();
  const { currentUser } = useAuth();
  const { conversations, fetchConversations, isLoading } = useChat();
  const { overview, fetchOverview } = useSecurity();

  useEffect(() => {
    fetchConversations();
    fetchOverview();
  }, [fetchConversations, fetchOverview]);

  const onRefresh = () => {
    fetchConversations();
    fetchOverview();
  };

  const recentConversations = conversations.slice(0, 4);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Ambient Cyber Wave Lighting */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <Svg width="100%" height="240" viewBox="0 0 375 240" style={styles.topWaveSvg}>
          <Defs>
            <LinearGradient id="ambientWave" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#2563EB" stopOpacity="0.22" />
              <Stop offset="60%" stopColor="#1E3A8A" stopOpacity="0.08" />
              <Stop offset="100%" stopColor="#040817" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Path
            d="M0,0 L375,0 L375,110 C310,170 210,95 110,160 C50,195 0,210 0,210 Z"
            fill="url(#ambientWave)"
          />
        </Svg>
        <Svg width="100%" height="220" viewBox="0 0 375 220" style={styles.bottomWaveSvg}>
          <Defs>
            <LinearGradient id="botWave" x1="0%" y1="100%" x2="100%" y2="0%">
              <Stop offset="0%" stopColor="#2563EB" stopOpacity="0.16" />
              <Stop offset="70%" stopColor="#1E3A8A" stopOpacity="0.05" />
              <Stop offset="100%" stopColor="#040817" stopOpacity="0" />
            </LinearGradient>
          </Defs>
          <Path
            d="M0,120 C110,50 230,140 375,65 L375,220 L0,220 Z"
            fill="url(#botWave)"
          />
        </Svg>
      </View>

      {/* Top Header Dashboard */}
      <View
        style={[
          styles.header,
          {
            paddingTop: insets.top + 10,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.userInfo}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Main', { screen: 'ProfileTab' })}
        >
          <Avatar
            name={currentUser?.fullName || 'Alex Mercer'}
            imageUrl={currentUser?.avatarUrl}
            size="md"
            isOnline={true}
            showOnlineIndicator={true}
            securityRing="verified"
          />
          <View style={styles.userTextCol}>
            <AppText variant="caption" style={styles.welcomeText}>
              Welcome back,
            </AppText>
            <AppText variant="headingSmall" weight="700" style={styles.userNameText} numberOfLines={1}>
              {currentUser?.fullName || 'Alex Mercer'}
            </AppText>
          </View>
        </TouchableOpacity>

        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.actionIconBtn}
            onPress={() => navigation.navigate('Search')}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Search conversations"
          >
            <Search size={20} color="#FFFFFF" strokeWidth={2.2} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionIconBtn, styles.securityActionBtn]}
            onPress={() => navigation.navigate('Main', { screen: 'SecurityTab' })}
            accessible
            accessibilityRole="button"
            accessibilityLabel="Open Security Center"
          >
            <ShieldCheck size={21} color="#10B981" strokeWidth={2.2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
      >
        {/* Vault Protected Hero Card */}
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('Main', { screen: 'SecurityTab' })}
          style={styles.vaultCard}
        >
          <View style={styles.vaultCardInner}>
            {/* Glowing Cyber Shield */}
            <View style={styles.vaultShieldWrapper}>
              <View style={styles.shieldGlowRing} />
              <Lock size={20} color="#38BDF8" strokeWidth={2.5} />
            </View>

            {/* Subtle Divider */}
            <View style={styles.vaultDivider} />

            {/* Information Text */}
            <View style={styles.vaultTextCol}>
              <AppText variant="labelLarge" weight="700" style={styles.vaultTitle}>
                Vault Protected
              </AppText>
              <AppText variant="caption" style={styles.vaultSubtitle}>
                End-to-end encryption active
              </AppText>
            </View>

            {/* Online Status Pill */}
            <View style={styles.onlinePill}>
              <View style={styles.onlineDot} />
              <AppText variant="caption" weight="600" style={styles.onlineText}>
                Online
              </AppText>
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Action Shortcuts */}
        <View style={styles.quickActionsRow}>
          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('NewChat')}
            activeOpacity={0.8}
          >
            <View style={[styles.qaIconWrapper, styles.qaBlueIcon]}>
              <Plus size={22} color="#FFFFFF" strokeWidth={2.5} />
            </View>
            <AppText variant="labelMedium" weight="600" style={styles.qaLabel}>
              New Chat
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() =>
              navigation.navigate('ContactVerification', {
                userId: 'usr_002',
                userName: 'Rahul Sharma',
              })
            }
            activeOpacity={0.8}
          >
            <View style={[styles.qaIconWrapper, styles.qaGreenIcon]}>
              <Users size={22} color="#10B981" strokeWidth={2.2} />
            </View>
            <AppText variant="labelMedium" weight="600" style={styles.qaLabel}>
              Verify Client
            </AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickActionCard}
            onPress={() => navigation.navigate('Devices')}
            activeOpacity={0.8}
          >
            <View style={[styles.qaIconWrapper, styles.qaPurpleIcon]}>
              <Smartphone size={22} color="#A78BFA" strokeWidth={2.2} />
            </View>
            <AppText variant="labelMedium" weight="600" style={styles.qaLabel}>
              Devices
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Section Header */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionTitleLeft}>
            <View style={styles.sectionAccentBar} />
            <AppText variant="caption" weight="700" style={styles.sectionTitleText}>
              RECENT CONVERSATIONS
            </AppText>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Main', { screen: 'ChatsTab' })}
            style={styles.seeAllBtn}
            activeOpacity={0.7}
          >
            <AppText variant="labelMedium" weight="600" customColor="#2563EB">
              See All
            </AppText>
            <ArrowRight size={14} color="#2563EB" strokeWidth={2.5} style={styles.seeAllIcon} />
          </TouchableOpacity>
        </View>

        {/* Recent Conversations List */}
        {recentConversations.length > 0 ? (
          <View style={styles.conversationsList}>
            {recentConversations.map((conv, index) => (
              <ChatListItem
                key={conv.id}
                conversation={conv}
                highlightActive={index === 0}
                onPress={() =>
                  navigation.navigate('ChatConversation', {
                    conversationId: conv.id,
                    participantName: conv.participant.fullName,
                    participantAvatar: conv.participant.avatarUrl,
                    participantUserId: conv.participant.id,
                  })
                }
              />
            ))}
          </View>
        ) : (
          <EmptyState
            title="No Conversations Yet"
            description="Start a private, end-to-end encrypted dialogue with your contacts."
            actionTitle="Start New Chat"
            onActionPress={() => navigation.navigate('NewChat')}
          />
        )}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NewChat')}
        activeOpacity={0.85}
        accessible
        accessibilityRole="button"
        accessibilityLabel="Start new conversation"
      >
        <Plus size={28} color="#FFFFFF" strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topWaveSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  bottomWaveSvg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingBottom: 14,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userTextCol: {
    marginLeft: 12,
  },
  welcomeText: {
    color: '#8E9EB5',
    fontSize: 12.5,
    marginBottom: 2,
  },
  userNameText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionIconBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  securityActionBtn: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderColor: 'rgba(16, 185, 129, 0.22)',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 90,
  },
  vaultCard: {
    borderRadius: 20,
    backgroundColor: '#070F28',
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.28)',
    marginBottom: 16,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 4,
  },
  vaultCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  vaultShieldWrapper: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(37, 99, 235, 0.2)',
    borderWidth: 1.5,
    borderColor: '#38BDF8',
    shadowColor: '#38BDF8',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 4,
  },
  shieldGlowRing: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: 'rgba(56, 189, 248, 0.25)',
  },
  vaultDivider: {
    width: 1,
    height: 34,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginHorizontal: 14,
  },
  vaultTextCol: {
    flex: 1,
  },
  vaultTitle: {
    color: '#FFFFFF',
    fontSize: 16.5,
    marginBottom: 2,
  },
  vaultSubtitle: {
    color: '#7E8DA6',
    fontSize: 12,
  },
  onlinePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.14)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.28)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  onlineDot: {
    width: 6.5,
    height: 6.5,
    borderRadius: 3.5,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  onlineText: {
    color: '#10B981',
    fontSize: 12,
  },
  quickActionsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 22,
  },
  quickActionCard: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    backgroundColor: '#081028',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  qaIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  qaBlueIcon: {
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 8,
    elevation: 4,
  },
  qaGreenIcon: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  qaPurpleIcon: {
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.3)',
  },
  qaLabel: {
    color: '#FFFFFF',
    fontSize: 12.5,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    paddingHorizontal: 2,
  },
  sectionTitleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionAccentBar: {
    width: 3.5,
    height: 15,
    borderRadius: 2,
    backgroundColor: '#2563EB',
    marginRight: 8,
  },
  sectionTitleText: {
    color: '#6A7D9B',
    fontSize: 12.5,
    letterSpacing: 1.1,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllIcon: {
    marginLeft: 4,
  },
  conversationsList: {
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 8,
  },
});
