import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit app/index.tsx to edit this screen.</Text>
      <Text style={styles.textAnswer}>...no.</Text>
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
});
