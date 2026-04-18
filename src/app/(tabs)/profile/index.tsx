import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';

import ToggleThemeButton from '@components/buttons/ToggleTheme';

export default function ProfileScreen() {
  const { colors, spacing, radii, shadows, textStyles } = useTheme();
  const { user, handleLogout } = useAuth();

  const displayName =
    user?.user_metadata?.display_name ||
    user?.user_metadata?.username ||
    'Chef Buddy';

  const email = user?.email || 'No email';

  const handleLogOut = async () => {
    try {
      await handleLogout();
      Alert.alert('Logged out', 'See you next time!');
      router.replace('/(auth)');
    } catch (error) {
      Alert.alert('Error', 'Could not log out');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bgPrimary }}>
      <ToggleThemeButton />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.xxl,
          paddingBottom: spacing.xxxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Picture */}
        <View
          style={{
            width: 160,
            height: 160,
            borderRadius: radii.full,
            backgroundColor: colors.bgElevated,
            alignItems: 'center',
            justifyContent: 'center',
            ...shadows.card,
            borderWidth: 6,
            borderColor: colors.accentPrimary,
            marginBottom: spacing.xl,
          }}
        >
          <Image
            source={require('../../../../assets/images/geir.jpg')}
            style={{
              width: 148,
              height: 148,
              borderRadius: radii.full,
            }}
            contentFit='cover'
          />
        </View>

        {/* Display Name - using your theme typography */}
        <Text
          style={[
            textStyles.recipeNameLarge,
            {
              color: colors.textPrimary,
              textAlign: 'center',
              marginBottom: spacing.xs,
            },
          ]}
        >
          {displayName}
        </Text>

        {/* Email */}
        <Text
          style={[
            textStyles.bodySmall,
            { color: colors.textSecondary, marginBottom: spacing.xxl },
          ]}
        >
          {email}
        </Text>

        {/* Divider */}
        <View
          style={{
            width: '60%',
            height: 1,
            backgroundColor: colors.borderSubtle,
            marginBottom: spacing.xl,
          }}
        />

        {/* Quick stats */}
        <View
          style={{
            flexDirection: 'row',
            gap: spacing.lg,
            marginBottom: spacing.xxxl,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={[textStyles.h3, { color: colors.accentPrimary }]}>
              12
            </Text>
            <Text style={[textStyles.label, { color: colors.textSecondary }]}>
              RECIPES
            </Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={[textStyles.h3, { color: colors.accentPrimary }]}>
              4
            </Text>
            <Text style={[textStyles.label, { color: colors.textSecondary }]}>
              FAVORITES
            </Text>
          </View>
        </View>

        {/* Log Out Button */}
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: colors.error,
              borderRadius: radii.md,
              paddingVertical: spacing.md,
              paddingHorizontal: spacing.xl,
              width: '100%',
              alignItems: 'center',
              ...shadows.sm,
            },
            pressed && { opacity: 0.85 },
          ]}
          onPress={handleLogOut}
        >
          <Text style={[textStyles.button, { color: colors.bgPrimary }]}>
            Log Out
          </Text>
        </Pressable>

        <Text
          style={[
            textStyles.bodySmall,
            {
              color: colors.textSecondary,
              marginTop: spacing.lg,
              textAlign: 'center',
            },
          ]}
        >
          You’ll be logged out from all devices
        </Text>
      </ScrollView>
    </View>
  );
}
