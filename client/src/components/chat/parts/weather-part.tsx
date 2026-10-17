import { StyleSheet, Text, View } from "react-native";
import { colors, typography } from "../../../theme";

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
      <Text style={typography.body}>{weather.location}</Text>
      <Text style={typography.title}>{Math.round(weather.temperature)}°C</Text>
      <Text style={styles.condition}>{weather.condition}</Text>
      <Text style={typography.body}>
        Feels like {Math.round(weather.feelsLike)}°C · Humidity {weather.humidity}% · Wind{" "}
        {Math.round(weather.windSpeedKmh)} km/h
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: "flex-start",
    gap: 8,
    padding: 32,
    borderRadius: 24,
    backgroundColor: colors.surface,
  },
  condition: {
    fontSize: 36,
    color: colors.foreground,
  },
});
