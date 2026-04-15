// dependencies
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

// context
import { useTheme } from '@context/ThemeContext';

// types
import type { Recipe } from '@/types';

// components
import CategoryBadge from './CategoryBadge';

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
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
          ...(mode === 'dark' ? shadows.card : shadows.cardLight),
        },
        pressed && { transform: [{ scale: 0.985 }] },
      ]}
    >
      {/* Card Image */}
      <View
        style={[
          styles.cardImageWrapper,
          { borderRadius: radii.lg, overflow: 'hidden' },
        ]}
      >
        {recipe.imageUrl ? (
          <Image
            source={{ uri: recipe.imageUrl }}
            style={styles.cardImage}
            resizeMode='cover'
          />
        ) : null}
        {/* Dark overlay so text always reads well */}
        <View
          style={[
            styles.cardImageOverlay,
            { backgroundColor: 'rgba(0,0,0,0.45)' },
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

const styles = StyleSheet.create({
  card: { borderWidth: 1, overflow: 'hidden' },
  cardImageWrapper: {
    height: 170,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: { position: 'absolute', width: '100%', height: '100%' },
  cardImageOverlay: { position: 'absolute', width: '100%', height: '100%' },
  cardMonogram: { fontSize: 48, fontWeight: '700', opacity: 0.6 },
  cardContent: { gap: 0 },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingTop: 12,
    marginTop: 12,
  },
});
