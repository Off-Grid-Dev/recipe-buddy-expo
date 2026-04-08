// dependencies
import { Text, Pressable, StyleSheet } from 'react-native';
// context
import { useTheme } from '@context/ThemeContext';

export default function ToggleThemeButton() {
  const { spacing, radii, setMode, mode, colors } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: colors.bgTertiary,
          padding: spacing.md,
          aspectRatio: 1,
          borderRadius: radii.full,
          alignSelf: 'flex-end',
          justifyContent: 'center',
          margin: spacing.sm,
        },
        pressed && {
          backgroundColor: colors.bgTertiaryLow,
        },
      ]}
      onPress={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      <Text
        style={{
          color: colors.textAccent,
          textAlign: 'center',
        }}
      >
        Toggle theme
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
