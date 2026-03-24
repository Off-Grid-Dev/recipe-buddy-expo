import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Image,
  // StatusBar,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useTheme } from "../ThemeContext";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Recipe } from "../types";

// ─── Mock Data ────────────────────────────────────────────────────────────────
const MOCK_RECIPES: Recipe[] = [
  {
    id: "pistachio",
    name: "Pistachio Bronte",
    category: "gelato",
    description:
      "Made with pure Bronte pistachio paste. Intense green color and deeply nutty finish.",
    baseWeightGrams: 5000,
    ingredients: [],
    steps: [],
    agingTimeHours: 12,
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1694116056814-edddc837a61d?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "stracciatella",
    name: "Stracciatella",
    category: "gelato",
    description:
      "Sweet cream base with hand-shaved dark chocolate flakes throughout.",
    baseWeightGrams: 5000,
    ingredients: [],
    steps: [],
    agingTimeHours: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1706177175286-dfc625f8fabe?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "lemon-sorbet",
    name: "Lemon Sorbetto",
    category: "sorbetto",
    description:
      "Dairy-free and refreshing. Bright Sicilian lemon zest and freshly squeezed juice.",
    baseWeightGrams: 4000,
    ingredients: [],
    steps: [],
    agingTimeHours: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1608322368735-b6b6ec262af7?w=900&auto=format&fit=crop&q=60",
  },
  {
    id: "dark-choc",
    name: "Dark Chocolate 70%",
    category: "gelato",
    description:
      "Rich cocoa base with deep, balanced sweetness and a clean finish.",
    baseWeightGrams: 5000,
    ingredients: [],
    steps: [],
    agingTimeHours: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1593410974855-87ab9de04bb5?w=900&auto=format&fit=crop&q=60",
  },
];

// ─── Badge Component ──────────────────────────────────────────────────────────
function CategoryBadge({ category }: { category: Recipe["category"] }) {
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

// ─── Recipe Card ──────────────────────────────────────────────────────────────
function RecipeCard({ recipe }: { recipe: Recipe }) {
  const { colors, spacing, radii, textStyles, shadows, mode } = useTheme();
  const router = useRouter();
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPress={() => router.push(`/recipe/${recipe.id}`)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.card,
        {
          backgroundColor: colors.bgSecondary,
          borderRadius: radii.lg,
          borderColor: pressed ? colors.borderAccent : colors.borderSubtle,
          ...(mode === "dark" ? shadows.card : shadows.cardLight),
        },
        pressed && { transform: [{ scale: 0.985 }] },
      ]}
    >
      {/* Card Image */}
      <View
        style={[
          styles.cardImageWrapper,
          { borderRadius: radii.lg, overflow: "hidden" },
        ]}
      >
        {recipe.imageUrl ? (
          <Image
            source={{ uri: recipe.imageUrl }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        ) : null}
        {/* Dark overlay so text always reads well */}
        <View
          style={[
            styles.cardImageOverlay,
            { backgroundColor: "rgba(0,0,0,0.45)" },
          ]}
        />
        {/* Monogram fallback */}
        <Text style={[styles.cardMonogram, { color: colors.textAccent }]}>
          {recipe.name.charAt(0)}
        </Text>
      </View>

      {/* Card Content */}
      <View style={[styles.cardContent, { padding: spacing.md }]}>
        <View style={styles.cardHeader}>
          <Text
            style={[
              textStyles.recipeName,
              { color: colors.textPrimary, flex: 1, marginRight: spacing.sm },
            ]}
            numberOfLines={1}
          >
            {recipe.name}
          </Text>
          <CategoryBadge category={recipe.category} />
        </View>

        <Text
          style={[
            textStyles.bodySmall,
            { color: colors.textSecondary, marginTop: spacing.xs },
          ]}
          numberOfLines={2}
        >
          {recipe.description}
        </Text>

        <View
          style={[
            styles.cardMeta,
            { borderTopColor: colors.borderSubtle, marginTop: spacing.md },
          ]}
        >
          <Text
            style={[
              textStyles.label,
              { color: colors.textSecondary, fontSize: 10 },
            ]}
          >
            ⏱ {recipe.agingTimeHours}h aging
          </Text>
          <Text
            style={[
              textStyles.label,
              { color: colors.textSecondary, fontSize: 10 },
            ]}
          >
            ⚖️ {recipe.baseWeightGrams / 1000}kg batch
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

// ─── Home Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const { colors, spacing, radii, textStyles, shadows, mode } = useTheme();
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
    <View style={{ paddingTop: top, paddingRight: right, paddingBottom: bottom, paddingLeft: left, }}
    >
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
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderWidth: 1,
  },
  searchIcon: { fontSize: 16, marginRight: 10 },
  searchInput: { flex: 1, padding: 0 },
  card: { borderWidth: 1, overflow: "hidden" },
  cardImageWrapper: {
    height: 170,
    justifyContent: "center",
    alignItems: "center",
  },
  cardImage: { position: "absolute", width: "100%", height: "100%" },
  cardImageOverlay: { position: "absolute", width: "100%", height: "100%" },
  cardMonogram: { fontSize: 48, fontWeight: "700", opacity: 0.6 },
  cardContent: { gap: 0 },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardMeta: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 12,
  },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 9999 },
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
