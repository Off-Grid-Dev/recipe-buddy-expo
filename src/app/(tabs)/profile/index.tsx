// dependencies
import { Text, View } from 'react-native';

// context
import { useTheme } from '@context/ThemeContext';

// components
import ToggleThemeButton from '@components/buttons/ToggleTheme';

// ─── Overview Screen ──────────────────────────────────────────────────────────
export default function RecipeOverviewScreen() {
  const { colors } = useTheme();
  return (
    <View style={{ flex: 1 }}>
      <ToggleThemeButton />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.textPrimary }}>
          This is the profile page...{' '}
        </Text>
        <Text style={{ color: colors.textPrimary }}>... well it will be.</Text>
      </View>
    </View>
  );
}
