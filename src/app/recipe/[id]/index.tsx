// dependencies
import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// context
import { useTheme } from "@/context/ThemeContext";
// types
import { Recipe, IngredientGroup } from "@/types";

const MOCK_RECIPE: Recipe = {
  id: "pistachio",
  name: "Pistachio Bronte",
  category: "gelato",
  description:
    "Made with pure Bronte pistachio paste. Intense green color and deeply nutty finish.",
  baseWeightGrams: 5000,
  agingTimeHours: 12,
  ingredients: [
    {
      id: "1",
      name: "Whole Milk",
      percentage: 56,
      unit: "g",
      group: "liquids",
    },
    { id: "2", name: "Cream 35%", percentage: 16, unit: "g", group: "liquids" },
    { id: "3", name: "Sucrose", percentage: 14, unit: "g", group: "sugars" },
    { id: "4", name: "Dextrose", percentage: 4, unit: "g", group: "sugars" },
    {
      id: "5",
      name: "Stabilizer",
      percentage: 0.5,
      unit: "g",
      group: "stabilizers",
    },
    {
      id: "6",
      name: "Pistachio Paste",
      percentage: 9.5,
      unit: "g",
      group: "flavorings",
    },
  ],
  steps: [
    {
      id: "s1",
      type: "weighing",
      instruction: "Weigh all ingredients accurately.",
    },
    {
      id: "s2",
      type: "pasteurization",
      instruction: "Pasteurize mix at 85°C for 5 minutes.",
      targetTemperature: 85,
    },
    {
      id: "s3",
      type: "aging",
      instruction: "Cool rapidly and age for 12 hours at 4°C.",
      targetTemperature: 4,
      durationMinutes: 720,
    },
    {
      id: "s4",
      type: "churning",
      instruction: "Churn in batch freezer until desired consistency.",
    },
  ],
};

const INGREDIENT_GROUP_ORDER: IngredientGroup[] = [
  "liquids",
  "sugars",
  "stabilizers",
  "flavorings",
  "solids",
];

// ─── Overview Screen ──────────────────────────────────────────────────────────
export default function RecipeOverviewScreen() {
  const { colors, spacing, radii, textStyles, shadows, mode } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { top, right, bottom, left } = useSafeAreaInsets();

  // In production: fetch recipe by id. Using mock for now.
  const recipe = MOCK_RECIPE;

  const [batchSize, setBatchSize] = useState(String(recipe.baseWeightGrams));
  const batchSizeNum = useMemo(
    () => parseFloat(batchSize) || recipe.baseWeightGrams,
    [batchSize],
  );

  const getAdjustedWeight = (percentage: number) =>
    ((percentage / 100) * batchSizeNum).toFixed(1);

  const groupedIngredients = useMemo(
    () =>
      INGREDIENT_GROUP_ORDER.map((group) => ({
        group,
        items: recipe.ingredients.filter((i) => i.group === group),
      })).filter((g) => g.items.length > 0),
    [recipe.ingredients],
  );

  return (
    <View style={{ paddingTop: top }}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingHorizontal: spacing.md },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Back link ── */}
        <Link href="/" asChild>
          <Pressable style={[styles.backLink, { marginTop: spacing.lg }]}>
            {({ pressed }) => (
              <Text
                style={[
                  textStyles.bodySmall,
                  { color: pressed ? colors.textAccent : colors.textSecondary },
                ]}
              >
                ← Back to Library
              </Text>
            )}
          </Pressable>
        </Link>

        {/* ── Header ── */}
        <View
          style={[
            styles.recipeHeader,
            {
              borderBottomColor: colors.borderSubtle,
              paddingBottom: spacing.lg,
              marginBottom: spacing.lg,
            },
          ]}
        >
          <Text
            style={[textStyles.recipeNameLarge, { color: colors.textPrimary }]}
          >
            {recipe.name}
          </Text>
          <Text
            style={[
              textStyles.bodySmall,
              { color: colors.textSecondary, marginTop: spacing.sm },
            ]}
          >
            {recipe.description}
          </Text>

          {/* Batch size control */}
          <View
            style={[
              styles.yieldControl,
              {
                backgroundColor: colors.bgSecondary,
                borderColor: colors.borderDefault,
                borderRadius: radii.md,
                marginTop: spacing.md,
              },
            ]}
          >
            <Text
              style={[
                textStyles.label,
                { color: colors.textSecondary, fontSize: 10 },
              ]}
            >
              Batch Weight (g)
            </Text>
            <TextInput
              style={[
                textStyles.body,
                styles.yieldInput,
                { color: colors.textAccent },
              ]}
              value={batchSize}
              onChangeText={setBatchSize}
              keyboardType="numeric"
              selectTextOnFocus
            />
          </View>
        </View>

        {/* ── Ingredients ── */}
        <Text
          style={[
            textStyles.h3,
            { color: colors.textPrimary, marginBottom: spacing.md },
          ]}
        >
          Mise en Place
        </Text>

        <View
          style={[
            styles.section,
            {
              backgroundColor: colors.bgSecondary,
              borderRadius: radii.lg,
              borderColor: colors.borderSubtle,
              ...(mode === "dark" ? shadows.card : shadows.cardLight),
            },
          ]}
        >
          {groupedIngredients.map((groupData, gIdx) => (
            <View key={groupData.group}>
              {/* Group header */}
              <Text
                style={[
                  textStyles.label,
                  {
                    color: colors.textAccent,
                    fontSize: 10,
                    paddingHorizontal: spacing.md,
                    paddingTop: gIdx === 0 ? spacing.md : spacing.sm,
                    paddingBottom: spacing.xs,
                    borderBottomColor: colors.borderSubtle,
                    borderBottomWidth: 1,
                  },
                ]}
              >
                {groupData.group}
              </Text>

              {groupData.items.map((ing, iIdx) => (
                <View
                  key={ing.id}
                  style={[
                    styles.ingredientRow,
                    {
                      paddingHorizontal: spacing.md,
                      paddingVertical: spacing.sm + 2,
                      borderBottomColor: colors.borderSubtle,
                      borderBottomWidth:
                        iIdx < groupData.items.length - 1 ? 1 : 0,
                    },
                  ]}
                >
                  <Text
                    style={[
                      textStyles.body,
                      { color: colors.textPrimary, flex: 1 },
                    ]}
                  >
                    {ing.name}
                  </Text>
                  <Text
                    style={[
                      textStyles.body,
                      {
                        color: colors.textPrimary,
                        fontWeight: "600",
                        marginHorizontal: spacing.md,
                        minWidth: 70,
                        textAlign: "right",
                      },
                    ]}
                  >
                    {getAdjustedWeight(ing.percentage)}
                    <Text style={{ color: colors.textSecondary }}> g</Text>
                  </Text>
                  <Text
                    style={[
                      textStyles.bodySmall,
                      {
                        color: colors.textSecondary,
                        minWidth: 40,
                        textAlign: "right",
                      },
                    ]}
                  >
                    {ing.percentage}%
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* ── Process Flow ── */}
        <Text
          style={[
            textStyles.h3,
            {
              color: colors.textPrimary,
              marginTop: spacing.xl,
              marginBottom: spacing.md,
            },
          ]}
        >
          Process Flow
        </Text>

        <View style={{ gap: spacing.sm }}>
          {recipe.steps.map((step, idx) => (
            <View
              key={step.id}
              style={[
                styles.stepCard,
                {
                  backgroundColor: colors.bgSecondary,
                  borderRadius: radii.md,
                  borderLeftColor: colors.accentPrimary,
                  padding: spacing.md,
                },
              ]}
            >
              {/* Step number circle */}
              <View
                style={[
                  styles.stepNumberCircle,
                  { backgroundColor: colors.bgTertiary },
                ]}
              >
                <Text
                  style={[
                    textStyles.stepNumber,
                    { color: colors.textAccent, fontSize: 14 },
                  ]}
                >
                  {idx + 1}
                </Text>
              </View>

              <View style={styles.stepInfo}>
                <Text
                  style={[textStyles.body, { color: colors.textSecondary }]}
                >
                  {step.instruction}
                </Text>
                <View style={styles.stepBadges}>
                  {step.targetTemperature !== undefined && (
                    <View
                      style={[
                        styles.metaBadge,
                        { backgroundColor: colors.bgTertiary },
                      ]}
                    >
                      <Text
                        style={[
                          textStyles.label,
                          { color: colors.textPrimary, fontSize: 10 },
                        ]}
                      >
                        🌡️ {step.targetTemperature}°C
                      </Text>
                    </View>
                  )}
                  {step.durationMinutes !== undefined && (
                    <View
                      style={[
                        styles.metaBadge,
                        { backgroundColor: colors.bgTertiary },
                      ]}
                    >
                      <Text
                        style={[
                          textStyles.label,
                          { color: colors.textPrimary, fontSize: 10 },
                        ]}
                      >
                        ⏱️ {step.durationMinutes / 60}h
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* ── Aging Alert ── */}
        <View
          style={[
            styles.agingAlert,
            {
              backgroundColor: colors.accentSubtle,
              borderColor: colors.borderAccent,
              borderRadius: radii.md,
              padding: spacing.md,
              marginTop: spacing.lg,
            },
          ]}
        >
          <Text style={{ fontSize: 22 }}>🕒</Text>
          <View style={{ flex: 1, marginLeft: spacing.md }}>
            <Text
              style={[
                textStyles.body,
                { color: colors.textAccent, fontWeight: "700" },
              ]}
            >
              Required Aging: {recipe.agingTimeHours} Hours at 4°C
            </Text>
            <Text
              style={[
                textStyles.bodySmall,
                { color: colors.textSecondary, marginTop: spacing.xxs },
              ]}
            >
              Plan your batch accordingly
            </Text>
          </View>
        </View>

        {/* Bottom padding for fixed footer */}
        <View style={{ height: 120 }} />
      </ScrollView>

      {/* ── Fixed Footer CTA ── */}
      <View
        style={[
          styles.footer,
          {
            backgroundColor: colors.bgPrimary,
            borderTopColor: colors.borderSubtle,
            paddingBottom: spacing.lg,
            paddingHorizontal: spacing.md,
            paddingTop: spacing.md,
          },
        ]}
      >
        <Pressable
          onPress={() => router.push(`/recipe/${id}/cook`)}
          style={({ pressed }) => [
            styles.startBtn,
            {
              backgroundColor: pressed
                ? colors.accentPressed
                : colors.accentPrimary,
              borderRadius: radii.full,
              paddingVertical: spacing.md,
              shadowColor: colors.accentPrimary,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.4,
              shadowRadius: 16,
              elevation: 10,
            },
            pressed && { transform: [{ scale: 0.98 }] },
          ]}
        >
          <Text style={[textStyles.button, { color: colors.bgPrimary }]}>
            Initialize Batch Weighing →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContent: { flexGrow: 1 },
  backLink: { alignSelf: "flex-start", paddingVertical: 8, marginBottom: 8 },
  recipeHeader: { borderBottomWidth: 1 },
  yieldControl: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    alignSelf: "flex-start",
    minWidth: 200,
  },
  yieldInput: { textAlign: "right", fontWeight: "700", minWidth: 80 },
  section: { borderWidth: 1, overflow: "hidden" },
  ingredientRow: { flexDirection: "row", alignItems: "center" },
  stepCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderLeftWidth: 3,
  },
  stepNumberCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    flexShrink: 0,
  },
  stepInfo: { flex: 1, gap: 6 },
  stepBadges: { flexDirection: "row", gap: 6, flexWrap: "wrap" },
  metaBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  agingAlert: { flexDirection: "row", alignItems: "center", borderWidth: 1 },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
  },
  startBtn: { alignItems: "center" },
});
