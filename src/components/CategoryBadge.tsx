// dependencies
import { View, Text, StyleSheet } from "react-native";
// context
import { useTheme } from "@/context/ThemeContext";
// types
import type { Recipe } from "@/types";

export default function CategoryBadge({
  category,
}: {
  category: Recipe["category"];
}) {
  const { colors, textStyles } = useTheme();

  const badgeColors = {
    gelato: { bg: colors.badgeGelato, text: colors.badgeGelatoText },
    sorbetto: { bg: colors.badgeSorbetto, text: colors.badgeSorbettoText },
    crema: { bg: colors.badgeCrema, text: colors.badgeCremaText },
  };

  const { bg, text } = badgeColors[category];

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={[textStyles.label, { color: text, fontSize: 9 }]}>
        {category}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 9999 },
});
