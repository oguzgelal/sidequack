import { z } from "zod";

export const geocodingResponseSchema = z.object({
  results: z
    .array(z.object({ name: z.string(), country: z.string().optional(), latitude: z.number(), longitude: z.number() }))
    .optional(),
});

export const forecastResponseSchema = z.object({
  current: z.object({
    temperature_2m: z.number(),
    apparent_temperature: z.number(),
    relative_humidity_2m: z.number(),
    wind_speed_10m: z.number(),
    weather_code: z.number(),
  }),
});

export const weatherSchema = z.object({
  location: z.string(),
  condition: z.string(),
  temperature: z.number().meta({ description: "°C" }),
  feelsLike: z.number().meta({ description: "°C" }),
  humidity: z.number().meta({ description: "%" }),
  windSpeedKmh: z.number(),
});

export type Weather = z.infer<typeof weatherSchema>;
