// dependencies
import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput } from 'react-native';
// context
import { useTheme } from '@context/ThemeContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// components
import RecipeCard from '@components/RecipeCard';
import ToggleThemeButton from '@components/buttons/ToggleTheme';
// constants
import MOCK_RECIPES from '@constants/mockData';
import { Image } from 'expo-image';

export default function HomeScreen() {
  const { colors, spacing, radii, textStyles, fontSizes, shadows, mode } =
    useTheme();
  const { top, right, bottom, left } = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
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
        backgroundColor: colors.bgPrimary,
      }}
    >
      <ToggleThemeButton />

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
              <View style={styles.logoStack}>
                {/* <Text style={styles.logoEmoji}>❄️</Text> */}
                <Image
                  style={styles.logoImage}
                  source={require('../../../assets/icons/splash-icon.png')}
                />
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

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  listContent: { flexGrow: 1 },
  header: { alignItems: 'center', marginBottom: 4 },
  logoStack: { alignItems: 'center', gap: 10 },
  // logoEmoji: { fontSize: 28 },
  logoImage: { width: 54, height: 54, marginBottom: -16 },
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
