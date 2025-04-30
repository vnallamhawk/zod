import { z } from "zod";
import { SelectOption } from "../types/selectTypes";

export const getEnumOptions = <T extends z.ZodEnum<[string, ...string[]]>>(
  enumSchema: T
): SelectOption[] =>
  Object.values(enumSchema.Values).map((value) => ({
    label: value
      .toLowerCase()
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    value,
  }));
