import { Image } from "react-native";

export function Duck({ height }: { height: number }) {
  return (
    <Image
      source={require("../../../assets/images/sidequack-duck.png")}
      accessible={false}
      style={{ width: (height * 490) / 593, height }}
    />
  );
}
