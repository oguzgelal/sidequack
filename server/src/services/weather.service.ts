import { forecastResponseSchema, geocodingResponseSchema, type Weather } from "../schemas/weather.schema.js";
import { ServiceError } from "./service-error.js";

const GEOCODING_URL = "https://geocoding-api.open-meteo.com/v1/search";
const FORECAST_URL = "https://api.open-meteo.com/v1/forecast";
const CURRENT_FIELDS = "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code";

// https://open-meteo.com/en/docs#weather_variable_documentation (WMO weather interpretation codes)
const CONDITIONS: Record<number, string> = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Light drizzle",
  53: "Drizzle",
  55: "Heavy drizzle",
  56: "Freezing drizzle",
  57: "Freezing drizzle",
  61: "Light rain",
  63: "Rain",
  65: "Heavy rain",
  66: "Freezing rain",
  67: "Freezing rain",
  71: "Light snow",
  73: "Snow",
  75: "Heavy snow",
  77: "Snow grains",
  80: "Rain showers",
  81: "Rain showers",
  82: "Heavy rain showers",
  85: "Snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with hail",
  99: "Thunderstorm with hail",
};

class WeatherService {
  async getCurrent(city: string, signal?: AbortSignal): Promise<Weather> {
    const place = await this.geocode(city, signal);
    const params = new URLSearchParams({
      latitude: String(place.latitude),
      longitude: String(place.longitude),
      current: CURRENT_FIELDS,
    });
    const { current } = forecastResponseSchema.parse(await this.fetchJson(`${FORECAST_URL}?${params}`, signal));
    return {
      location: [place.name, place.country].filter(Boolean).join(", "),
      condition: CONDITIONS[current.weather_code] ?? "Unknown",
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      windSpeedKmh: current.wind_speed_10m,
    };
  }

  private async geocode(city: string, signal?: AbortSignal) {
    const params = new URLSearchParams({ name: city, count: "1" });
    const { results } = geocodingResponseSchema.parse(await this.fetchJson(`${GEOCODING_URL}?${params}`, signal));
    const place = results?.[0];
    if (!place) throw new ServiceError(`Couldn't find a place called ${city}`);
    return place;
  }

  private async fetchJson(url: string, signal?: AbortSignal): Promise<unknown> {
    const response = await fetch(url, { signal });
    if (!response.ok) throw new ServiceError(`Weather service responded with ${response.status}`);
    return response.json();
  }
}

export const weatherService = new WeatherService();
