// dependencies
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Pressable, Alert, Button } from "react-native";
import { useRouter, useLocalSearchParams, Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// context
import { useTheme } from "@/context/ThemeContext";
// constants
import { fontWeights } from "@/constants/theme";
import MOCK_RECIPES from "@/constants/mockData";
// types
import { Recipe, Ingredient } from "@/types";

// ─── Cook Screen ──────────────────────────────────────────────────────────────
export default function CookScreen() {
  const { colors, spacing, radii, textStyles, fontSizes, mode, setMode } =
    useTheme();
  const { top, right, bottom, left } = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const recipe: Recipe = MOCK_RECIPES.find((item) => item.id === String(id))!;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const currentIngredient: Ingredient = recipe.ingredients[currentStepIndex];
  const targetWeight =
    recipe.baseWeightGrams * (currentIngredient.percentage / 100);

  const advanceStep = useCallback(() => {
    if (currentStepIndex < recipe.ingredients.length - 1) {
      setCurrentStepIndex((i) => i + 1);
    } else {
      // Last ingredient — batch complete
      Alert.alert(
        "Batch Complete! 🎉",
        `${recipe.name} is ready for processing.`,
        [{ text: "Done", onPress: () => router.push(`/recipe/${id}`) }],
      );
    }
  }, [currentStepIndex, recipe.ingredients.length, id, recipe.name, router]);

  const retreatStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
    }
  }, [currentStepIndex]);

  const isLastIngredient = currentStepIndex === recipe.ingredients.length - 1;

  return (
    <View
      style={{
        flex: 1,
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
      {/* ── Cook Header ── */}
      <View
        style={[
          styles.header,
          { paddingHorizontal: spacing.md, paddingTop: spacing.md },
        ]}
      >
        {/* ── Back link ── */}
        <Link href="/" asChild>
          <Pressable
            style={StyleSheet.flatten([
              styles.backLink,
              { marginTop: spacing.lg },
            ])}
          >
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

        <View style={styles.headerCenter}>
          <Text
            style={[
              textStyles.bodySmall,
              { color: colors.textSecondary, textAlign: "right" },
            ]}
            numberOfLines={1}
          >
            {recipe.name}
          </Text>
          <Text
            style={[
              textStyles.label,
              {
                color: colors.textAccent,
                textAlign: "right",
                fontSize: fontSizes.xxs,
              },
            ]}
          >
            {currentStepIndex + 1} / {recipe.ingredients.length}
          </Text>
        </View>
      </View>

      {/* ── Main Scale Card ── */}
      <View style={[styles.main, { paddingHorizontal: spacing.md }]}>
        <View
          style={[
            styles.scaleCard,
            {
              backgroundColor: colors.bgSecondary,
              borderRadius: radii.xl,
              borderColor: colors.borderDefault,
              padding: spacing.xl,
            },
          ]}
        >
          {/* Ingredient label */}
          <Text
            style={[
              textStyles.label,
              {
                color: colors.textSecondary,
                fontSize: fontSizes.xxs,
                textAlign: "center",
                marginBottom: spacing.xs,
              },
            ]}
          >
            {currentIngredient.group}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[
              textStyles.h2,
              {
                color: colors.textPrimary,
                textAlign: "center",
                marginBottom: spacing.lg,
              },
            ]}
          >
            {currentIngredient.name}
          </Text>

          {/* Target info */}
          <Text
            style={[
              textStyles.body,
              {
                color: colors.textSecondary,
                textAlign: "center",
                marginBottom: spacing.sm,
              },
            ]}
          >
            Target:{" "}
            <Text
              style={{
                color: colors.textPrimary,
                fontWeight: fontWeights.bold,
              }}
            >
              {targetWeight.toFixed(1)}g
            </Text>
            <Text style={{ color: colors.textAccent }}>
              {"  "}({currentIngredient.percentage}%)
            </Text>
          </Text>
        </View>

        {/* ── Controls ── */}
        <View
          style={[styles.controls, { marginTop: spacing.md, gap: spacing.sm }]}
        >
          <Pressable
            onPress={advanceStep}
            disabled={!isLastIngredient}
            style={({ pressed }) => [
              styles.controlBtn,
              {
                backgroundColor: pressed
                  ? colors.accentPressed
                  : colors.accentPrimary,
                opacity: isLastIngredient ? 1 : 0,
                userSelect: isLastIngredient ? "auto" : "none",
                borderRadius: radii.md,
                paddingVertical: spacing.md + 2,
                shadowColor: colors.accentPrimary,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 8,
                transitionDuration: 900,
                transitionTimingFunction: "ease-in-out",
                transitionProperty: "opacity",
              },
            ]}
          >
            <Link href={`/recipe/${id}`}>
              <Text
                style={[
                  textStyles.button,
                  {
                    color: colors.bgPrimary,
                  },
                ]}
              >
                {isLastIngredient ? "Finish Batch 🎉" : "Not finished"}
              </Text>
            </Link>
          </Pressable>
        </View>
      </View>

      {/* ── Bottom Nav ── */}
      <View
        style={[
          styles.bottomNav,
          {
            borderTopColor: colors.borderSubtle,
            paddingHorizontal: spacing.md,
            paddingBottom: spacing.lg,
            paddingTop: spacing.sm,
          },
        ]}
      >
        <Pressable
          onPress={retreatStep}
          disabled={currentStepIndex === 0}
          style={({ pressed }) => [
            styles.navBtn,
            { opacity: currentStepIndex === 0 ? 0.3 : pressed ? 0.6 : 1 },
          ]}
        >
          <Text style={[textStyles.body, { color: colors.textSecondary }]}>
            ← Previous
          </Text>
        </Pressable>

        {/* Step dots */}
        <View style={styles.stepDots}>
          {recipe.ingredients.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    idx === currentStepIndex
                      ? colors.accentPrimary
                      : idx < currentStepIndex
                        ? colors.accentPrimary + "55"
                        : colors.bgTertiary,
                  width: idx === currentStepIndex ? 18 : 6,
                },
              ]}
            />
          ))}
        </View>
        <Pressable
          onPress={advanceStep}
          disabled={currentStepIndex === recipe.ingredients.length - 1}
          style={({ pressed }) => [
            styles.navBtn,
            {
              opacity:
                currentStepIndex === recipe.ingredients.length - 1
                  ? 0.3
                  : pressed
                    ? 0.6
                    : 1,
            },
          ]}
        >
          <Text style={[textStyles.body, { color: colors.textSecondary }]}>
            Next →
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  abortBtn: { paddingVertical: 8, paddingRight: 8 },
  headerCenter: { alignItems: "flex-end", flex: 1, paddingLeft: 16 },
  main: { flex: 1, justifyContent: "center", gap: 0 },
  scaleCard: { borderWidth: 1, alignItems: "center" },
  weightRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginBottom: 12,
  },
  progressTrack: { height: 8, width: "100%", overflow: "hidden" },
  progressFill: { height: "100%" },
  controls: { flexDirection: "row" },
  controlBtn: { flex: 1, alignItems: "center" },
  controlBtnWide: { flex: 2 },
  overweightAlert: { borderWidth: 1 },
  backLink: { alignSelf: "flex-start", paddingVertical: 8, marginBottom: 8 },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
  },
  navBtn: { paddingVertical: 12, paddingHorizontal: 8 },
  stepDots: { flexDirection: "row", alignItems: "center", gap: 5 },
  dot: { height: 6, borderRadius: 3 },
});
