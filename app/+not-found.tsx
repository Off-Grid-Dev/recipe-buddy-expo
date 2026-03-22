import { View, Text, StyleSheet } from "react-native";
import { Stack } from "expo-router";

export default function NotFound() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "404 - These are not the droids you are looking for.",
        }}
      />
      <View style={styles.container}>
        <Text style={styles.button}>Go back home. Idiot.</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 13,
    padding: 16,
    backgroundColor: "#090750",
    color: "#b9a9f3",
  },
});
