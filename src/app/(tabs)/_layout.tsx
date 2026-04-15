// dependencies
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

// constants
import { useTheme } from '@context/ThemeContext';

export default function TabsLayoutNav() {
  const { colors } = useTheme();

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.bgPrimary,
          },
        }}
      >
        <Tabs.Screen
          name='index'
          options={{
            title: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                size={size}
                name='home-outline'
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='profile'
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                size={size}
                name='account-cog-outline'
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name='recipe/[id]'
          options={{
            href: null,
            title: 'Recipes',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                size={size}
                name='account-cog-outline'
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
