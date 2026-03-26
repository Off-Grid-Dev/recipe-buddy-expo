import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../../ThemeContext";
import { Recipe, Ingredient } from "../../../types";
import { fontSizes, fontWeights } from "../../../theme";

// ─── Mock Recipe ──────────────────────────────────────────────────────────────
const MOCK_RECIPE: Recipe = {
  id: "pistachio",
  name: "Pistachio Bronte",
  category: "gelato",
  description: "Made with pure Bronte pistachio paste.",
  baseWeightGrams: 5000,
  agingTimeHours: 12,
  ingredients: [
    {
      id: "1",
      name: `Whole Milk`,
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
  steps: [],
};

const TOLERANCE_GRAMS = 2.0;

type StatusType = "add" | "perfect" | "remove";

// ─── Cook Screen ──────────────────────────────────────────────────────────────
export default function CookScreen() {
  const { colors, spacing, radii, textStyles, fontSizes } = useTheme();
  const { top, right, bottom, left } = useSafeAreaInsets();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const recipe = MOCK_RECIPE;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [scaleWeight, setScaleWeight] = useState(0);
  const [isTared, setIsTared] = useState(false);
  const [isAdjusting, setIsAdjusting] = useState(false);

  const currentIngredient: Ingredient = recipe.ingredients[currentStepIndex];
  const targetWeight =
    recipe.baseWeightGrams * (currentIngredient.percentage / 100);

  // ── Simulated scale noise ─────────────────────────────────────────────────
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (!isTared) {
        const noise = Math.random() * 1.5 - 0.75;
        setScaleWeight((w) => Math.max(0, w + noise));
      }
    }, 200);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isTared]);

  // ── Animated progress bar ─────────────────────────────────────────────────
  const progressAnim = useRef(new Animated.Value(0)).current;
  const progressPercent = Math.min(100, (scaleWeight / targetWeight) * 100);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progressPercent,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [progressPercent, progressAnim]);

  // ── Pulse animation for overweight alert ──────────────────────────────────
  const pulseAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (scaleWeight > targetWeight + 5 && !isAdjusting) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.stopAnimation();
      pulseAnim.setValue(0);
    }
  }, [scaleWeight > targetWeight + 5, isAdjusting]);

  // ── Status logic ──────────────────────────────────────────────────────────
  const diff = scaleWeight - targetWeight;
  const isComplete = Math.abs(diff) <= TOLERANCE_GRAMS;

  const status: StatusType = isComplete
    ? "perfect"
    : diff < 0
      ? "add"
      : "remove";

  const statusConfig: Record<StatusType, { text: string; color: string }> = {
    perfect: { text: "Perfect Weight ✓", color: colors.success },
    add: { text: "Add More", color: colors.textPrimary },
    remove: { text: "Remove Excess", color: colors.error },
  };

  const progressColor: Record<StatusType, string> = {
    perfect: colors.success,
    add: colors.accentPrimary,
    remove: colors.error,
  };

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleTare = useCallback(() => {
    setScaleWeight(0);
    setIsTared(true);
  }, []);

  const advanceStep = useCallback(() => {
    if (currentStepIndex < recipe.ingredients.length - 1) {
      setCurrentStepIndex((i) => i + 1);
      setScaleWeight(0);
      setIsTared(false);
      setIsAdjusting(false);
    } else {
      // Last ingredient — batch complete
      Alert.alert(
        "Batch Complete! 🎉",
        `${recipe.name} is ready for processing.`,
        [{ text: "Done", onPress: () => router.push(`/recipe/${id}`) }],
      );
    }
  }, [currentStepIndex, recipe.ingredients.length]);

  const retreatStep = useCallback(() => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
      setScaleWeight(0);
      setIsTared(false);
      setIsAdjusting(false);
    }
  }, [currentStepIndex]);

  const handleAbort = () => {
    Alert.alert("Abort Batch?", "Your progress will be lost.", [
      { text: "Keep Going", style: "cancel" },
      {
        text: "Abort",
        style: "destructive",
        onPress: () => router.push(`/recipe/${id}`),
      },
    ]);
  };

  // ── Render ────────────────────────────────────────────────────────────────
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
      {/* ── Cook Header ── */}
      <View
        style={[
          styles.header,
          { paddingHorizontal: spacing.md, paddingTop: spacing.md },
        ]}
      >
        <Pressable onPress={handleAbort} style={styles.abortBtn}>
          {({ pressed }) => (
            <Text
              style={[
                textStyles.bodySmall,
                { color: pressed ? colors.error : colors.textSecondary },
              ]}
            >
              Abort Batch
            </Text>
          )}
        </Pressable>

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
          {isComplete ? (
            <Pressable
              onPress={advanceStep}
              style={({ pressed }) => [
                styles.controlBtn,
                {
                  backgroundColor: pressed
                    ? colors.accentPressed
                    : colors.accentPrimary,
                  borderRadius: radii.md,
                  paddingVertical: spacing.md + 2,
                  shadowColor: colors.accentPrimary,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 12,
                  elevation: 8,
                },
              ]}
            >
              <Text style={[textStyles.button, { color: colors.bgPrimary }]}>
                {currentStepIndex === recipe.ingredients.length - 1
                  ? "Finish Batch 🎉"
                  : "Next Ingredient →"}
              </Text>
            </Pressable>
          ) : (
            // Placeholder to maintain layout when neither button is shown
            <View style={styles.controlBtn} />
          )}
        </View>

        {/* ── Overweight Alert ── */}
        {scaleWeight > targetWeight + 5 && !isAdjusting && (
          <Animated.View
            style={[
              styles.overweightAlert,
              {
                backgroundColor: colors.error + "18",
                borderColor: colors.error,
                borderRadius: radii.md,
                padding: spacing.md,
                marginTop: spacing.md,
                opacity: pulseAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.7, 1],
                }),
              },
            ]}
          >
            <Text
              style={[
                textStyles.body,
                {
                  color: colors.error,
                  fontWeight: fontWeights.bold,
                  marginBottom: spacing.xxs,
                },
              ]}
            >
              ⚠️ Overweight
            </Text>
            <Text
              style={[
                textStyles.bodySmall,
                { color: colors.textSecondary, marginBottom: spacing.sm },
              ]}
            >
              Exceeds tolerance by {(scaleWeight - targetWeight).toFixed(1)}g
            </Text>
            <Pressable onPress={() => setIsAdjusting(true)}>
              {({ pressed }) => (
                <Text
                  style={[
                    textStyles.bodySmall,
                    {
                      color: pressed ? colors.error + "aa" : colors.error,
                      textDecorationLine: "underline",
                    },
                  ]}
                >
                  Recalculate remaining ingredients
                </Text>
              )}
            </Pressable>
          </Animated.View>
        )}
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
