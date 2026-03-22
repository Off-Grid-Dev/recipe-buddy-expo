import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>About view</Text>
      <Link href="/" style={styles.button}>
        Go back home. Idiot!
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    borderRadius: 13,
    padding: 16,
    backgroundColor: "#090750",
    color: "#b9a9f3",
  },
});
