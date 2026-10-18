import { Image, StyleSheet } from "react-native";

const HEIGHT = 48;

export function Wordmark() {
  return (
    <Image
      source={require("../../../assets/images/sidequack-wordmark-cream.png")}
      accessibilityLabel="SideQuack"
      style={styles.wordmark}
    />
  );
}

const styles = StyleSheet.create({
  wordmark: {
    width: (HEIGHT * 1292) / 240,
    height: HEIGHT,
    alignSelf: "flex-start",
  },
});
