import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { useAuth } from '@context/AuthContext';
import { useTheme } from '@context/ThemeContext';

import ToggleThemeButton from '@components/buttons/ToggleTheme';

export default function RecipeOverviewScreen() {
  const { colors, spacing, radii } = useTheme();
  const { isLoggedIn, handleLogin, handleLogout } = useAuth();
  return (
    <View style={{ flex: 1 }}>
      <ToggleThemeButton />
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginBlockStart: spacing.xxxl,
        }}
      >
        <Text
          style={{
            color: colors.textPrimary,
            marginBottom: spacing.md,
            fontWeight: 600,
            fontSize: 48,
          }}
        >
          Mr. Badass
        </Text>
        <Image
          source={require('../../../../assets/images/geir.jpg')}
          style={{
            width: 168,
            height: 168,
            borderRadius: 13,
            borderWidth: 2,
            borderColor: colors.accentPrimary,
          }}
        />
        <Text
          style={{
            color: colors.textPrimary,
            marginBottom: spacing.md,
            fontWeight: 600,
            fontSize: 24,
          }}
        >
          is {!isLoggedIn && 'not '}logged in.
        </Text>
        <Pressable
          style={{
            paddingInline: spacing.lg,
            paddingBlock: spacing.sm,
            backgroundColor: colors.bgTertiary,
            borderRadius: radii.md,
            borderWidth: 2,
            borderColor: !isLoggedIn ? colors.success : colors.warning,
          }}
          onPress={() => (isLoggedIn ? handleLogout() : handleLogin())}
        >
          <Text style={{ color: colors.textPrimary }}>
            Log {isLoggedIn ? 'out' : 'in'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
