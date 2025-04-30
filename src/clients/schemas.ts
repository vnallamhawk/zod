import { z } from "zod";

// This file is going to be auto generated
export const Alien = z.object({
  name: z.string(),
  dob: z
    .string()
    .regex(
      /^[1-9][0-9][0-9]{2}-([0][1-9]|[1][0-2])-([1-2][0-9]|[0][1-9]|[3][0-1])$/
    ),
  species: z.enum([
    "mercurian",
    "human",
    "martian",
    "venusian",
    "zorgan",
    "xantian",
    "falan",
  ]),
  hasVisitedEarth: z.boolean(),
  favoriteFood: z.enum(["rocks", "mac_n_cheese", "chicken_biriyani"]),
  breathingMechanism: z.enum(["oxygen", "nitrogen", "helium"]),
});

export const AllSubmissionsGetResponseSchema = z.array(
  z.object({
    id: z.number(),
    name: z.string(),
    species: z.enum([
      "mercurian",
      "human",
      "martian",
      "venusian",
      "zorgan",
      "xantian",
      "falan",
    ]),
    score: z.number(),
  })
);
