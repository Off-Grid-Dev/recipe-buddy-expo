// dependencies
import { ColorTheme, ThemeRadii, ThemeSpacing } from '@/constants/theme';
import { Image } from 'expo-image';
import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// context
import { useTheme } from '@context/ThemeContext';

// components
import ToggleThemeButton from '@components/buttons/ToggleTheme';
import RecipeCard from '@components/ui/RecipeCard';

// constants
import MOCK_RECIPES from '@constants/mockData';

export default function HomeScreen() {
  const { colors, spacing, radii, textStyles, fontSizes, shadows, mode } =
    useTheme();
  const { top, right, bottom, left } = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const styles = createStyles(
    colors,
    spacing,
    radii,
    textStyles,
    fontSizes,
    shadows,
    mode,
    top,
    right,
    bottom,
    left,
  );

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
    <View style={styles.safeView}>
      <ToggleThemeButton />

      <FlatList
        data={filteredRecipes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* ── Header ── */}
            <View style={styles.header}>
              <View style={styles.logoStack}>
                <Image
                  style={styles.logoImage}
                  source={require('../../../assets/icons/splash-icon.png')}
                />
                <Text style={[styles.logoText, textStyles.h1, {}]}>
                  Recipe Buddy
                </Text>
              </View>
              <Text
                style={[
                  textStyles.label,
                  { color: colors.textSecondary, marginTop: spacing.xs },
                ]}
              >
                by{' '}
                <Text
                  style={{
                    color: colors.accentPrimary,
                    fontSize: fontSizes.sm,
                  }}
                >
                  skinnyK
                </Text>
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
                  ...(mode === 'dark' ? shadows.sm : shadows.cardLight),
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
                placeholder='Search flavors…'
                placeholderTextColor={colors.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                returnKeyType='search'
                clearButtonMode='while-editing'
              />
            </View>

            {/* ── Section label ── */}
            <Text
              style={[
                textStyles.label,
                { color: colors.textSecondary, marginBottom: spacing.md },
              ]}
            >
              {filteredRecipes.length}{' '}
              {filteredRecipes.length === 1 ? 'Recipe' : 'Recipes'}
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
      />
    </View>
  );
}

function createStyles(
  colors: ColorTheme,
  spacing: ThemeSpacing,
  radii: ThemeRadii,
  textStyles: any,
  fontSizes: any,
  shadows: any,
  mode: any,
  top: number,
  right: number,
  bottom: number,
  left: number,
) {
  return StyleSheet.create({
    safeView: {
      flex: 1,
      paddingTop: top,
      paddingRight: right,
      paddingBottom: bottom,
      paddingLeft: left,
    },
    listContent: { flexGrow: 1, paddingHorizontal: spacing.md },
    header: { alignItems: 'center', marginBottom: 4, paddingTop: spacing.xl },
    logoStack: { alignItems: 'center', gap: 10 },
    logoImage: { width: 54, height: 54, marginBottom: -16 },
    logoText: { color: colors.textAccent },
    searchWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 14,
      borderWidth: 1,
    },
    searchIcon: { fontSize: 16, marginRight: 10 },
    searchInput: { flex: 1, padding: 0 },
    emptyState: { alignItems: 'center', paddingVertical: 60 },
  });
}
