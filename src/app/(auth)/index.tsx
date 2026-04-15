// dependencies
import ToggleThemeButton from '@/components/buttons/ToggleTheme';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// context
import { useTheme } from '@context/ThemeContext';

// types
import {
  ColorTheme,
  ThemeRadii,
  ThemeShadows,
  ThemeSpacing,
} from '@constants/theme';

type AuthTab = 'login' | 'signup';

export default function AuthScreen() {
  const { colors, spacing, radii, shadows } = useTheme();
  const { top, right, bottom, left } = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<AuthTab>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const tabAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const switchTab = (tab: AuthTab) => {
    Animated.timing(tabAnim, {
      toValue: tab === 'login' ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
    setActiveTab(tab);
  };

  const tabIndicatorLeft = tabAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['2%', '50%'],
  });

  const handleSubmit = () => {
    if (activeTab === 'login') {
      console.log('Login:', { email, password });
      // TODO: wire to Supabase auth
    } else {
      console.log('Sign up:', { userName, email, password });
      // TODO: wire to Supabase auth
    }
  };

  const styles = createStyles(
    colors,
    spacing,
    radii,
    shadows,
    top,
    right,
    bottom,
    left,
  );

  return (
    <View style={styles.safeArea}>
      <StatusBar style='light' />

      {/* Ambient background orbs */}
      <View style={styles.orbTop} />
      <View style={styles.orbBottom} />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ToggleThemeButton />
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        >
          {/* Logo */}
          <View style={styles.logoArea}>
            <View style={styles.logoIcon}>
              <Image
                source={require('../../../assets/icons/splash-icon.png')}
                style={styles.logoImage}
              />
            </View>
            <Text style={styles.logoTitle}>Recipe Buddy</Text>
            <Text style={styles.logoSub}>Your gelato companion</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            {/* Tab switcher */}
            <View style={styles.tabRow}>
              <Animated.View
                style={[styles.tabIndicator, { left: tabIndicatorLeft }]}
              />
              <Pressable
                style={styles.tab}
                onPress={() => switchTab('login')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'login' && styles.tabTextActive,
                  ]}
                >
                  Log in
                </Text>
              </Pressable>
              <Pressable
                style={styles.tab}
                onPress={() => switchTab('signup')}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === 'signup' && styles.tabTextActive,
                  ]}
                >
                  Sign up
                </Text>
              </Pressable>
            </View>

            {/* Sign up only: Full name */}
            {activeTab === 'signup' && (
              <View style={styles.field}>
                <Text style={styles.fieldLabel}>USER NAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder='Choose a user name'
                  placeholderTextColor={colors.textSecondary ?? '#475569'}
                  value={userName}
                  onChangeText={setUserName}
                  autoCapitalize='none'
                  autoComplete='off'
                />
              </View>
            )}

            {/* Email */}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>EMAIL</Text>
              <TextInput
                style={styles.input}
                placeholder='you@example.com'
                placeholderTextColor={colors.textSecondary ?? '#475569'}
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
                autoComplete='email'
              />
            </View>

            {/* Password */}
            <View style={styles.field}>
              <Text style={styles.fieldLabel}>PASSWORD</Text>
              <TextInput
                style={styles.input}
                placeholder={
                  activeTab === 'signup' ? 'Min. 8 characters' : '••••••••'
                }
                placeholderTextColor={colors.textSecondary ?? '#475569'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete={
                  activeTab === 'signup' ? 'new-password' : 'current-password'
                }
              />
            </View>

            {/* Forgot password (login only) */}
            {activeTab === 'login' && (
              <Pressable style={styles.forgotRow}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </Pressable>
            )}

            {/* Primary CTA */}
            <Pressable
              style={({ pressed }) => [
                styles.btnPrimary,
                pressed && styles.btnPrimaryPressed,
              ]}
              onPress={handleSubmit}
            >
              <Text style={styles.btnPrimaryText}>
                {activeTab === 'login' ? 'Log in' : 'Create account'}
              </Text>
            </Pressable>

            {/* Divider */}
            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Google OAuth */}
            <Pressable
              style={({ pressed }) => [
                styles.btnGoogle,
                pressed && styles.btnGooglePressed,
              ]}
            >
              <Text style={styles.btnGoogleText}>Continue with Google</Text>
            </Pressable>
            {/* Link to rest of app */}
            <Pressable
              style={({ pressed }) => [
                styles.btnGoogle,
                pressed && styles.btnGooglePressed,
              ]}
              onPress={() => router.push('/(tabs)')}
            >
              <Text style={styles.btnGoogleText}>See App</Text>
            </Pressable>

            {/* Terms */}
            <Text style={styles.terms}>
              By {activeTab === 'login' ? 'continuing' : 'creating an account'},
              you agree to our <Text style={styles.termsLink}>Terms</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

function createStyles(
  colors: ColorTheme,
  spacing: ThemeSpacing,
  radii: ThemeRadii,
  shadows: ThemeShadows,
  top: number,
  right: number,
  bottom: number,
  left: number,
) {
  return StyleSheet.create({
    flex: { flex: 1 },
    safeArea: {
      flex: 1,
      paddingTop: top,
      paddingRight: right,
      paddingBottom: bottom,
      paddingLeft: left,
      backgroundColor: colors.bgPrimary,
    },
    scroll: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
      paddingVertical: spacing.xl,
    },

    // Ambient orbs
    orbTop: {
      position: 'absolute',
      width: 220,
      aspectRatio: 1,
      borderRadius: radii.full,
      backgroundColor: colors.accentPrimary,
      opacity: 0.12,
      top: -80,
      left: -60,
    },
    orbBottom: {
      position: 'absolute',
      width: 140,
      aspectRatio: 1,
      borderRadius: radii.full,
      backgroundColor: colors.accentPrimary,
      opacity: 0.11,
      bottom: -50,
      right: -40,
    },

    // Logo area
    logoArea: {
      alignItems: 'center',
      marginBottom: spacing.xl,
    },
    logoIcon: {
      width: 56,
      height: 56,
      borderRadius: 16,
      backgroundColor: colors.bgElevated,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
    },
    logoImage: {
      width: 28,
      height: 28,
    },
    logoTitle: {
      fontFamily: 'PlayfairDisplay_600SemiBold',
      fontSize: 26,
      color: colors.textPrimary,
      letterSpacing: -0.5,
    },
    logoSub: {
      fontFamily: 'Inter_400Regular',
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 4,
    },

    // Card
    card: {
      backgroundColor: colors.bgSecondary,
      borderRadius: radii.xl,
      borderWidth: 0.5,
      borderColor: colors.borderSubtle,
      padding: spacing.lg,
      ...shadows.card,
    },

    // Tabs
    tabRow: {
      flexDirection: 'row',
      backgroundColor: colors.bgTertiary ?? colors.bgPrimary,
      borderRadius: radii.md,
      padding: 3,
      marginBottom: spacing.lg,
      position: 'relative',
    },
    tabIndicator: {
      position: 'absolute',
      top: 3,
      bottom: 3,
      width: '48%',
      backgroundColor: colors.bgSecondary,
      borderRadius: radii.sm,
      ...shadows.sm,
    },
    tab: {
      flex: 1,
      alignItems: 'center',
      paddingVertical: spacing.xs,
    },
    tabText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: colors.textSecondary,
    },
    tabTextActive: {
      color: colors.textPrimary,
      fontFamily: 'Inter_500Medium',
    },

    // Fields
    field: {
      marginBottom: spacing.md,
    },
    fieldLabel: {
      fontFamily: 'Inter_500Medium',
      fontSize: 11,
      letterSpacing: 0.8,
      color: colors.textSecondary,
      marginBottom: 6,
    },
    input: {
      backgroundColor: colors.bgPrimary,
      borderWidth: 0.5,
      borderColor: colors.borderSubtle,
      borderRadius: radii.md,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm + 2,
      fontSize: 15,
      fontFamily: 'Inter_400Regular',
      color: colors.textPrimary,
    },

    // Forgot
    forgotRow: {
      alignItems: 'flex-end',
      marginTop: -spacing.xs,
      marginBottom: spacing.md,
    },
    forgotText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 13,
      color: colors.accentPrimary,
    },

    // Primary button
    btnPrimary: {
      backgroundColor: colors.accentPrimary,
      borderRadius: radii.md,
      paddingVertical: spacing.sm + 4,
      alignItems: 'center',
    },
    btnPrimaryPressed: {
      opacity: 0.88,
    },
    btnPrimaryText: {
      fontFamily: 'Inter_500Medium',
      fontSize: 15,
      color: colors.bgPrimary,
      letterSpacing: -0.1,
    },

    // Divider
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: spacing.md,
      gap: spacing.sm,
    },
    dividerLine: {
      flex: 1,
      height: 0.5,
      backgroundColor: colors.borderSubtle,
    },
    dividerText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },

    // Google button
    btnGoogle: {
      borderWidth: 0.5,
      borderColor: colors.borderSubtle,
      borderRadius: radii.md,
      paddingVertical: spacing.sm + 3,
      alignItems: 'center',
    },
    btnGooglePressed: {
      backgroundColor: colors.bgPrimary,
    },
    btnGoogleText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 14,
      color: colors.textPrimary,
    },

    // Terms
    terms: {
      fontFamily: 'Inter_400Regular',
      fontSize: 12,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: spacing.md,
      lineHeight: 18,
    },
    termsLink: {
      color: colors.accentPrimary,
    },
  });
}
