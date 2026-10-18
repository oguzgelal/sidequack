import { StyleSheet, Text, View } from "react-native";
import { colors, radius, space, typography } from "../../../theme";

export type Weather = {
  location: string;
  condition: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeedKmh: number;
};

export function WeatherPart({ weather }: { weather: Weather }) {
  return (
    <View style={styles.card}>
      <Text style={typography.callout}>{weather.location}</Text>
      <Text style={typography.hero}>{Math.round(weather.temperature)}°C</Text>
      <Text style={typography.headline}>{weather.condition}</Text>
      <Text style={typography.caption}>
        Feels like {Math.round(weather.feelsLike)}°C · Humidity {weather.humidity}% · Wind{" "}
        {Math.round(weather.windSpeedKmh)} km/h
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "flex-start",
    gap: space[2],
    padding: space[6],
    borderWidth: 2,
    borderColor: colors.line,
    borderRadius: radius.lg,
  },
});
