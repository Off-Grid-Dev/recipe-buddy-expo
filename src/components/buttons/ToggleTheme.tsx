// dependencies
import { TouchableOpacity, Text } from "react-native";
// context
import { useTheme } from "@/context/ThemeContext";

export default function ToggleThemeButton() {
  const { spacing, radii, setMode, mode, colors } = useTheme();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colors.bgTertiary,
        padding: spacing.md,
        aspectRatio: 1,
        borderRadius: radii.full,
        alignSelf: "flex-end",
        justifyContent: "center",
        margin: spacing.sm,
      }}
      onPress={() => setMode(mode === "dark" ? "light" : "dark")}
    >
      <Text
        style={{
          color: colors.textAccent,
          textAlign: "center",
        }}
      >
        Toggle theme
      </Text>
    </TouchableOpacity>
  );
}
