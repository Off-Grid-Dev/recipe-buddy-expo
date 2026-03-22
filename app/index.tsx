import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home view</Text>
      <Link href="/about" style={styles.button}>
        Go to the About view
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#212139",
    gap: 70,
  },
  text: {
    color: "#e7e7e7",
    marginLeft: 80,
    marginRight: "auto",
  },
  textAnswer: {
    color: "#e7e7e7",
    marginLeft: "auto",
    marginRight: 195,
  },
  button: {
    borderRadius: 13,
    padding: 16,
    backgroundColor: "#090750",
    color: "#b9a9f3",
  },
});
