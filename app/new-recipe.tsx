import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useTheme } from '../ThemeContext';
import { Ingredient, IngredientGroup, RecipeCategory } from '../types';

// ─── Sub-components ───────────────────────────────────────────────────────────

function FormLabel({ text, required = false }: { text: string; required?: boolean }) {
  const { textStyles, colors } = useTheme();
  return (
    <Text style={[textStyles.label, { color: colors.textSecondary, fontSize: 10, marginBottom: 6 }]}>
      {text}{required && <Text style={{ color: colors.error }}> *</Text>}
    </Text>
  );
}

function FormInput({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline = false,
  numberOfLines = 1,
  required = false,
}: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
  multiline?: boolean;
  numberOfLines?: number;
  required?: boolean;
}) {
  const { colors, radii, textStyles } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      style={[
        textStyles.body,
        styles.formInput,
        {
          backgroundColor: colors.bgTertiary,
          borderColor: focused ? colors.borderAccent : colors.borderSubtle,
          borderRadius: radii.md,
          color: colors.textPrimary,
          minHeight: multiline ? numberOfLines * 24 + 24 : undefined,
          textAlignVertical: multiline ? 'top' : 'center',
        }
      ]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.textSecondary}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={multiline ? numberOfLines : undefined}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const { colors, radii, textStyles } = useTheme();

  return (
    <View style={[styles.segmented, { backgroundColor: colors.bgTertiary, borderRadius: radii.md }]}>
      {options.map(opt => {
        const active = opt.value === value;
        return (
          <Pressable
            key={opt.value}
            onPress={() => onChange(opt.value)}
            style={[
              styles.segmentedOption,
              {
                borderRadius: radii.sm,
                backgroundColor: active ? colors.accentPrimary : 'transparent',
              }
            ]}
          >
            <Text style={[
              textStyles.label,
              {
                color: active ? colors.bgPrimary : colors.textSecondary,
                fontSize: 10,
              }
            ]}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

// ─── New Recipe Screen ────────────────────────────────────────────────────────
export default function NewRecipeScreen() {
  const { colors, spacing, radii, textStyles, shadows, mode } = useTheme();
  const router = useRouter();

  // Basic fields
  const [recipeName,        setRecipeName]        = useState('');
  const [description,       setDescription]       = useState('');
  const [category,          setCategory]          = useState<RecipeCategory>('gelato');
  const [baseWeight,        setBaseWeight]        = useState('5000');
  const [agingTime,         setAgingTime]         = useState('12');

  // Ingredients
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: '', percentage: 0, unit: 'g', group: 'liquids' },
  ]);
  const [inputMode, setInputMode] = useState<'percentage' | 'weight'>('percentage');
  const [weightInputs, setWeightInputs] = useState<number[]>([0]);

  const totalPercentage = ingredients.reduce((sum, i) => sum + i.percentage, 0);
  const totalWeight     = weightInputs.reduce((sum, w) => sum + w, 0);

  const addIngredient = useCallback(() => {
    const newId = String(Date.now());
    setIngredients(prev => [...prev, { id: newId, name: '', percentage: 0, unit: 'g', group: 'liquids' }]);
    setWeightInputs(prev => [...prev, 0]);
  }, []);

  const removeIngredient = useCallback((index: number) => {
    if (ingredients.length === 1) return;
    setIngredients(prev => prev.filter((_, i) => i !== index));
    setWeightInputs(prev => prev.filter((_, i) => i !== index));
  }, [ingredients.length]);

  const updateIngredientField = useCallback(<K extends keyof Ingredient>(
    index: number, field: K, value: Ingredient[K]
  ) => {
    setIngredients(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  }, []);

  const handleSubmit = () => {
    if (!recipeName.trim()) {
      Alert.alert('Missing Field', 'Please enter a recipe name.');
      return;
    }
    if (ingredients.some(i => !i.name.trim())) {
      Alert.alert('Missing Field', 'Please name all ingredients.');
      return;
    }
    Alert.alert('Recipe Saved', `${recipeName} has been saved! (Check console for data)`, [
      { text: 'OK', onPress: () => router.push('/') }
    ]);
    console.log('New Recipe:', { recipeName, description, category, baseWeight, agingTime, ingredients });
  };

  const categoryOptions = [
    { label: 'Gelato',    value: 'gelato' },
    { label: 'Sorbetto',  value: 'sorbetto' },
    { label: 'Crema',     value: 'crema' },
  ];

  const modeOptions = [
    { label: 'By Percentage', value: 'percentage' },
    { label: 'By Weight',     value: 'weight' },
  ];

  const groupOptions: { label: string; value: IngredientGroup }[] = [
    { label: 'Liquids',     value: 'liquids' },
    { label: 'Sugars',      value: 'sugars' },
    { label: 'Solids',      value: 'solids' },
    { label: 'Stabilizers', value: 'stabilizers' },
    { label: 'Flavorings',  value: 'flavorings' },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bgPrimary }]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingHorizontal: spacing.md }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Header ── */}
          <Link href="/" asChild>
            <Pressable style={[styles.backLink, { marginTop: spacing.lg }]}>
              {({ pressed }) => (
                <Text style={[textStyles.bodySmall, { color: pressed ? colors.textAccent : colors.textSecondary }]}>
                  ← Back to Library
                </Text>
              )}
            </Pressable>
          </Link>

          <View style={[styles.pageHeader, { borderBottomColor: colors.borderSubtle, paddingBottom: spacing.lg, marginBottom: spacing.lg }]}>
            <Text style={[textStyles.h2, { color: colors.textPrimary }]}>
              New Recipe
            </Text>
            <Text style={[textStyles.bodySmall, { color: colors.textSecondary, marginTop: spacing.xs }]}>
              Add a gelato, sorbetto, or crema recipe
            </Text>
          </View>

          {/* ── Basic Info Section ── */}
          <View style={[styles.section, { backgroundColor: colors.bgSecondary, borderRadius: radii.lg, borderColor: colors.borderSubtle, padding: spacing.lg, marginBottom: spacing.md, ...(mode === 'dark' ? shadows.sm : shadows.cardLight) }]}>
            <Text style={[textStyles.h3, { color: colors.textPrimary, marginBottom: spacing.lg }]}>
              Basic Information
            </Text>

            <FormLabel text="Recipe Name" required />
            <FormInput
              value={recipeName}
              onChangeText={setRecipeName}
              placeholder="e.g. Pistachio Bronte"
              required
            />

            <View style={{ marginTop: spacing.md }}>
              <FormLabel text="Category" required />
              <SegmentedControl
                options={categoryOptions}
                value={category}
                onChange={v => setCategory(v as RecipeCategory)}
              />
            </View>

            <View style={{ marginTop: spacing.md }}>
              <FormLabel text="Description" />
              <FormInput
                value={description}
                onChangeText={setDescription}
                placeholder="Describe the flavor profile, texture, etc."
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={[styles.twoCol, { marginTop: spacing.md, gap: spacing.md }]}>
              <View style={{ flex: 1 }}>
                <FormLabel text="Base Batch (g)" required />
                <FormInput
                  value={baseWeight}
                  onChangeText={setBaseWeight}
                  keyboardType="numeric"
                  required
                />
              </View>
              <View style={{ flex: 1 }}>
                <FormLabel text="Aging Time (hrs)" required />
                <FormInput
                  value={agingTime}
                  onChangeText={setAgingTime}
                  keyboardType="numeric"
                  required
                />
              </View>
            </View>
          </View>

          {/* ── Input Mode ── */}
          <View style={[styles.section, { backgroundColor: colors.bgSecondary, borderRadius: radii.lg, borderColor: colors.borderSubtle, padding: spacing.lg, marginBottom: spacing.md, ...(mode === 'dark' ? shadows.sm : shadows.cardLight) }]}>
            <Text style={[textStyles.h3, { color: colors.textPrimary, marginBottom: spacing.md }]}>
              Ingredients
            </Text>
            <SegmentedControl
              options={modeOptions}
              value={inputMode}
              onChange={v => setInputMode(v as 'percentage' | 'weight')}
            />
            <Text style={[textStyles.bodySmall, { color: colors.textSecondary, marginTop: spacing.sm, fontStyle: 'italic' }]}>
              {inputMode === 'percentage'
                ? 'Enter percentages — weights calculated from base batch'
                : 'Enter weights — percentages calculated automatically'}
            </Text>
          </View>

          {/* ── Ingredients List ── */}
          <View style={[styles.section, { backgroundColor: colors.bgSecondary, borderRadius: radii.lg, borderColor: colors.borderSubtle, padding: spacing.lg, marginBottom: spacing.md, ...(mode === 'dark' ? shadows.sm : shadows.cardLight) }]}>
            {ingredients.map((ingredient, index) => (
              <View
                key={ingredient.id}
                style={[styles.ingredientCard, { backgroundColor: colors.bgTertiary, borderRadius: radii.md, borderColor: colors.borderSubtle, padding: spacing.md, marginBottom: spacing.sm }]}
              >
                {/* Row header */}
                <View style={styles.ingredientCardHeader}>
                  <Text style={[textStyles.label, { color: colors.textAccent, fontSize: 10 }]}>
                    Ingredient {index + 1}
                  </Text>
                  <Pressable
                    onPress={() => removeIngredient(index)}
                    disabled={ingredients.length === 1}
                    style={({ pressed }) => ({ opacity: ingredients.length === 1 ? 0.3 : pressed ? 0.5 : 1 })}
                  >
                    <Text style={{ color: colors.error, fontSize: 18, lineHeight: 20 }}>✕</Text>
                  </Pressable>
                </View>

                <View style={{ marginTop: spacing.sm }}>
                  <FormLabel text="Name" required />
                  <FormInput
                    value={ingredient.name}
                    onChangeText={t => updateIngredientField(index, 'name', t)}
                    placeholder="e.g. Whole Milk"
                    required
                  />
                </View>

                <View style={[styles.twoCol, { marginTop: spacing.sm, gap: spacing.sm }]}>
                  <View style={{ flex: 1 }}>
                    <FormLabel text={inputMode === 'percentage' ? 'Percentage (%)' : 'Weight (g)'} required />
                    <FormInput
                      value={inputMode === 'percentage'
                        ? String(ingredient.percentage || '')
                        : String(weightInputs[index] || '')}
                      onChangeText={t => {
                        const num = parseFloat(t) || 0;
                        if (inputMode === 'percentage') {
                          updateIngredientField(index, 'percentage', num);
                        } else {
                          const updated = [...weightInputs];
                          updated[index] = num;
                          setWeightInputs(updated);
                          // Recalculate percentages
                          const total = updated.reduce((s, w) => s + w, 0);
                          setIngredients(prev =>
                            prev.map((ing, i) => ({
                              ...ing,
                              percentage: total > 0 ? (updated[i] / total) * 100 : 0,
                            }))
                          );
                        }
                      }}
                      keyboardType="decimal-pad"
                      required
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <FormLabel text="Group" />
                    {/* Native group picker — simplified to Pressable cycle */}
                    <Pressable
                      onPress={() => {
                        const groupValues = groupOptions.map(g => g.value);
                        const currentIdx = groupValues.indexOf(ingredient.group);
                        const next = groupValues[(currentIdx + 1) % groupValues.length];
                        updateIngredientField(index, 'group', next);
                      }}
                      style={[
                        styles.groupCycler,
                        {
                          backgroundColor: colors.bgTertiary,
                          borderColor: colors.borderDefault,
                          borderRadius: radii.md,
                          paddingHorizontal: spacing.md,
                          paddingVertical: 13,
                          borderWidth: 1,
                        }
                      ]}
                    >
                      <Text style={[textStyles.body, { color: colors.textAccent }]}>
                        {ingredient.group} ↕
                      </Text>
                    </Pressable>
                  </View>
                </View>

                {/* Calculated value */}
                <Text style={[textStyles.label, { color: colors.textSecondary, fontSize: 10, marginTop: spacing.xs }]}>
                  Calculated:{' '}
                  <Text style={{ color: colors.textAccent }}>
                    {inputMode === 'percentage'
                      ? `${((ingredient.percentage / 100) * parseFloat(baseWeight || '0')).toFixed(1)}g`
                      : `${totalWeight > 0 ? ((weightInputs[index] / totalWeight) * 100).toFixed(2) : '0.00'}%`}
                  </Text>
                </Text>
              </View>
            ))}

            {/* Add ingredient button */}
            <Pressable
              onPress={addIngredient}
              style={({ pressed }) => [
                styles.addBtn,
                {
                  borderColor: colors.textAccent,
                  borderRadius: radii.md,
                  paddingVertical: spacing.md,
                  backgroundColor: pressed ? colors.accentSubtle : 'transparent',
                }
              ]}
            >
              <Text style={[textStyles.button, { color: colors.textAccent }]}>
                + Add Ingredient
              </Text>
            </Pressable>

            {/* Totals */}
            <View style={[styles.totalsRow, { borderTopColor: colors.borderSubtle, marginTop: spacing.md, paddingTop: spacing.md }]}>
              <Text style={[textStyles.label, { color: colors.textSecondary, fontSize: 10 }]}>Total</Text>
              <Text style={[textStyles.body, { color: colors.textPrimary, fontWeight: '700' }]}>
                {totalPercentage.toFixed(2)}%
                {'  '}
                <Text style={{ color: colors.textSecondary }}>|</Text>
                {'  '}
                {totalWeight.toFixed(1)}g
              </Text>
              {Math.abs(totalPercentage - 100) > 0.5 && inputMode === 'percentage' && (
                <Text style={[textStyles.label, { color: colors.warning, fontSize: 10 }]}>
                  ⚠️ Should equal 100%
                </Text>
              )}
            </View>
          </View>

          {/* ── Submit ── */}
          <View style={[styles.submitRow, { marginBottom: spacing.xxxl, gap: spacing.sm }]}>
            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [
                styles.submitBtn,
                {
                  backgroundColor: pressed ? colors.accentPressed : colors.accentPrimary,
                  borderRadius: radii.full,
                  paddingVertical: spacing.md,
                  shadowColor: colors.accentPrimary,
                  shadowOffset: { width: 0, height: 0 },
                  shadowOpacity: 0.4,
                  shadowRadius: 16,
                  elevation: 10,
                }
              ]}
            >
              <Text style={[textStyles.button, { color: colors.bgPrimary }]}>
                Save Recipe
              </Text>
            </Pressable>

            <Link href="/" asChild>
              <Pressable
                style={({ pressed }) => [
                  styles.cancelBtn,
                  {
                    backgroundColor: pressed ? colors.bgElevated : colors.bgTertiary,
                    borderRadius: radii.full,
                    paddingVertical: spacing.md,
                  }
                ]}
              >
                <Text style={[textStyles.button, { color: colors.textSecondary }]}>
                  Cancel
                </Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:              { flex: 1 },
  scrollContent:         { flexGrow: 1 },
  backLink:              { alignSelf: 'flex-start', paddingVertical: 8, marginBottom: 8 },
  pageHeader:            { borderBottomWidth: 1 },
  section:               { borderWidth: 1 },
  twoCol:                { flexDirection: 'row' },
  formInput:             { borderWidth: 1, paddingHorizontal: 14, paddingVertical: 12 },
  segmented:             { flexDirection: 'row', padding: 4 },
  segmentedOption:       { flex: 1, alignItems: 'center', paddingVertical: 10 },
  ingredientCard:        { borderWidth: 1 },
  ingredientCardHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  groupCycler:           {},
  addBtn:                { borderWidth: 1.5, borderStyle: 'dashed', alignItems: 'center', marginTop: 4 },
  totalsRow:             { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1 },
  submitRow:             { flexDirection: 'column', marginTop: 8 },
  submitBtn:             { alignItems: 'center' },
  cancelBtn:             { alignItems: 'center' },
});
