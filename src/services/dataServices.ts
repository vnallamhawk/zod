import { SelectOption } from "components/Select/Select";
import { z } from "zod";

export const getEnumOptions = <T extends z.ZodEnum<[string, ...string[]]>>(
  enumSchema: T
): SelectOption<z.infer<T>>[] =>
  // the order of the enum is preserved since zod just stores the enum as an array and just returns
  // it directly
  Object.values(enumSchema.options).map((value) => ({
    label: value
      .toLowerCase()
      .split("_")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" "),
    value,
  }));
