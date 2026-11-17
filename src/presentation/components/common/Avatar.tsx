import React, { useState } from 'react';
import { View, Image, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme/ThemeContext';
import { AppText } from './AppText';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarProps {
  name: string;
  imageUrl?: string;
  size?: AvatarSize;
  isOnline?: boolean;
  showOnlineIndicator?: boolean;
  securityRing?: 'verified' | 'warning' | 'none';
  style?: ViewStyle;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  imageUrl,
  size = 'md',
  isOnline = false,
  showOnlineIndicator = false,
  securityRing = 'none',
  style,
}) => {
  const { theme } = useTheme();
  const [imageError, setImageError] = useState(false);

  const getDimension = (): number => {
    switch (size) {
      case 'sm':
        return 34;
      case 'lg':
        return 58;
      case 'xl':
        return 84;
      case 'md':
      default:
        return 46;
    }
  };

  const dim = getDimension();

  const getInitials = (fullName: string): string => {
    if (!fullName) return '?';
    const parts = fullName.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return fullName.slice(0, 2).toUpperCase();
  };

  const getRingColor = (): string => {
    if (securityRing === 'verified') return theme.colors.securityVerified;
    if (securityRing === 'warning') return theme.colors.securityWarning;
    return 'transparent';
  };

  return (
    <View style={[styles.container, { width: dim, height: dim }, style]}>
      <View
        style={[
          styles.innerRing,
          {
            width: dim,
            height: dim,
            borderRadius: dim / 2,
            borderWidth: securityRing !== 'none' ? 2 : 0,
            borderColor: getRingColor(),
            backgroundColor: theme.colors.surfaceSecondary,
          },
        ]}
      >
        {imageUrl && !imageError ? (
          <Image
            source={{ uri: imageUrl }}
            onError={() => setImageError(true)}
            style={[styles.image, { width: dim - 4, height: dim - 4, borderRadius: (dim - 4) / 2 }]}
          />
        ) : (
          <View
            style={[
              styles.fallback,
              {
                width: dim - 4,
                height: dim - 4,
                borderRadius: (dim - 4) / 2,
                backgroundColor: theme.colors.primary,
              },
            ]}
          >
            <AppText
              variant={size === 'sm' ? 'caption' : size === 'xl' ? 'headingLarge' : 'labelLarge'}
              color="white"
              weight="700"
            >
              {getInitials(name)}
            </AppText>
          </View>
        )}
      </View>

      {showOnlineIndicator && (
        <View
          style={[
            styles.onlineBadge,
            {
              backgroundColor: isOnline ? theme.colors.online : theme.colors.offline,
              borderColor: theme.colors.surface,
              width: size === 'sm' ? 9 : 12,
              height: size === 'sm' ? 9 : 12,
              borderRadius: 6,
            },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerRing: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    resizeMode: 'cover',
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
  },
});
