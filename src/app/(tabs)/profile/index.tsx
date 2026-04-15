// dependencies
import { Image } from 'expo-image';
import { Text, View } from 'react-native';

// context
import { useTheme } from '@context/ThemeContext';

// components
import ToggleThemeButton from '@components/buttons/ToggleTheme';

// ─── Overview Screen ──────────────────────────────────────────────────────────
export default function RecipeOverviewScreen() {
  const { colors, spacing } = useTheme();
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
      </View>
    </View>
  );
}
