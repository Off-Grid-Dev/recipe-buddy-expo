import { useTheme } from '@context/ThemeContext';
// import { useState } from 'react';
import { TextInput, View } from 'react-native';

type AuthProps = {
  style?: {
    [key: string]: string;
  };
  label: string;
};

export default function Auth({ style, label, ...props }: AuthProps) {
  const { spacing, colors } = useTheme();
  // const [session, setSession] = useState(null);

  return (
    <View>
      <TextInput
        style={[
          {
            padding: spacing.sm,
            color: colors.textPrimary,
            backgroundColor: colors.bgTertiaryLow,
          },
          style,
        ]}
        placeholder={label}
        {...props}
      />
    </View>
  );
}
