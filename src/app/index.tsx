import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Button,
} from "react-native";
import { Link } from "expo-router";
import { useTheme } from "../context/ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MOCK_RECIPES from "@/constants/mockData";
import RecipeCard from "./components/RecipeCard";

// ─── Home Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const { colors, spacing, radii, textStyles, shadows, mode, setMode } =
    useTheme();
  const { top, right, bottom, left } = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const filteredRecipes = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return MOCK_RECIPES;
    return MOCK_RECIPES.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  return (
    <View
      style={{
        paddingTop: top,
        paddingRight: right,
        paddingBottom: bottom,
        paddingLeft: left,
      }}
    >
      <Button
        title="toggle theme"
        onPress={() => setMode(mode === "dark" ? "light" : "dark")}
      />

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContent,
          { paddingHorizontal: spacing.md },
        ]}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* ── Header ── */}
            <View style={[styles.header, { paddingTop: spacing.xl }]}>
              <View style={styles.logoRow}>
                <Text style={styles.logoEmoji}>❄️</Text>
                <Text style={[textStyles.h1, { color: colors.textAccent }]}>
                  Recipe Buddy
                </Text>
              </View>
              <Text
                style={[
                  textStyles.label,
                  { color: colors.textSecondary, marginTop: spacing.xs },
                ]}
              >
                Sweet Madness by Geir Tengs
              </Text>
            </View>

            {/* ── Search ── */}
            <View
              style={[
                styles.searchWrapper,
                {
                  backgroundColor: colors.bgSecondary,
                  borderRadius: radii.full,
                  borderColor: searchFocused
                    ? colors.borderAccent
                    : colors.borderSubtle,
                  marginVertical: spacing.lg,
                  ...(mode === "dark" ? shadows.sm : shadows.cardLight),
                },
              ]}
            >
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={[
                  textStyles.body,
                  styles.searchInput,
                  { color: colors.textPrimary },
                ]}
                placeholder="Search flavors (e.g. Pistachio, Sorbet)…"
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                returnKeyType="search"
                clearButtonMode="while-editing"
              />
            </View>

            {/* ── Section label ── */}
            <Text
              style={[
                textStyles.label,
                { color: colors.textSecondary, marginBottom: spacing.md },
              ]}
            >
              {filteredRecipes.length}{" "}
              {filteredRecipes.length === 1 ? "Recipe" : "Recipes"}
            </Text>
          </>
        }
        renderItem={({ item }) => (
          <View style={{ marginBottom: spacing.md }}>
            <RecipeCard recipe={item} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={[textStyles.h3, { color: colors.textSecondary }]}>
              No results
            </Text>
            <Text
              style={[
                textStyles.bodySmall,
                { color: colors.textSecondary, marginTop: spacing.sm },
              ]}
            >
              No recipes matching &quot;{searchQuery}&quot;
            </Text>
          </View>
        }
        // Bottom padding so FAB doesn't cover last card
        ListFooterComponent={
          <View style={{ height: spacing.xxxl + spacing.xl }} />
        }
      />

      {/* ── Floating Action Button ── */}
      <Link href="/new-recipe" asChild>
        <Pressable
          style={({ pressed }) => [
            styles.fab,
            {
              backgroundColor: colors.accentPrimary,
              borderRadius: radii.full,
              bottom: spacing.xl,
              right: spacing.lg,
              shadowColor: colors.accentPrimary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 16,
              elevation: 12,
            },
            pressed && {
              transform: [{ scale: 0.94 }],
              backgroundColor: colors.accentPressed,
            },
          ]}
        >
          <Text
            style={[
              textStyles.button,
              styles.fabText,
              { color: colors.bgPrimary },
            ]}
          >
            + New Recipe
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  listContent: { flexGrow: 1 },
  header: { alignItems: "center", marginBottom: 4 },
  logoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  logoEmoji: { fontSize: 28 },
  themeToggle: {
    marginInline: "auto",
  },
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
  },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, padding: 0 },
  emptyState: { alignItems: "center", paddingVertical: 60 },
  fab: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  fabText: { marginLeft: 0 },
});
