import { Field, Form } from "react-final-form";
import { z, ZodError } from "zod";
import { styled } from "styled-components";
import {
  BREATHING_MECHANISM,
  FAVORITE_FOOD_OPTIONS,
  HAS_VISITED_EARTH_OPTIONS,
  SPECIES_OPTIONS,
} from "../../constants/alientFormConstants";
import Select from "Components/Select";
import TextField from "../../components/TextField";
import { Alien } from "../../clients/schemas";
import { getEnumOptions } from "../../services/dataServices";
import DatePicker from "../../components/DatePicker";
import { format } from "date-fns";

const AlienFormSchema = Alien.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  birthYear: z.date().transform((value) => format(value, "yyyy-MM-dd")),
})
  .strict()
  .refine(
    (data) => !(data.species === "human" && data.hasVisitedEarth === false),
    {
      message: "Humans must have visited Earth!",
      path: ["hasVisitedEarth"],
    }
  );

// const AlientTestFormSchema = z
//   .object({
//     name: z.string().min(2, "Name must be at least 2 characters"),
//     birthYear: z.string().transform((value) => Number(value)),
//     species: z.enum([
//       "mercurian",
//       "human",
//       "martian",
//       "venusian",
//       "zorgan",
//       "xantian",
//       "falan",
//     ]),
//     hasVisitedEarth: z.boolean(),
//     favoriteFood: z.enum(["rocks", "mac_n_cheese", "chicken_biriyani"]),
//     breathingMechanism: z.enum(["oxygen", "nitrogen", "helium"]),
//   })
//   .refine(
//     (data) => !(data.species === "human" && data.hasVisitedEarth === false),
//     {
//       message: "Humans must have visited Earth!",
//       path: ["hasVisitedEarth"],
//     }
//   );

type Alien = z.infer<typeof AlienFormSchema>;

export const AlientTestForm = () => {
  const onSubmit = (values: Alien) => {
    console.log({ values });
    const parsedValues = Alien.safeParse(values);
    console.log({ parsedValues });

    // const testParsing = { ...values, birthYear: "12-12-2023" };
    // console.log(Alien.safeParse(testParsing));
    // console.log(parsedValues);
  };

  const validateZod = (values: Alien) => {
    try {
      const result = AlienFormSchema.safeParse(values);
      console.log({ result });
      if (!result.success) {
        const finalFormErrors = result.error.flatten().fieldErrors;
        return finalFormErrors;
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <AlientTestForm.Styled>
      <h1>🚀 HUMAN VERIFICATION TEST 🚀</h1>
      <p>Please prove you are not an extraterrestrial entity:</p>
      <Form onSubmit={onSubmit} validate={validateZod}>
        {({ handleSubmit, submitting, values }) => (
          <div>
            <Field name="name">
              {({ input, meta }) => {
                return (
                  <TextField
                    {...input}
                    helperText={
                      meta.submitFailed && meta.error ? meta.error : undefined
                    }
                    placeholder="name"
                    value={input.value}
                    error={meta.submitFailed && !!meta.error}
                    onChange={input.onChange}
                  />
                );
              }}
            </Field>

            <Field name="birthYear">
              {({ input, meta }) => (
                // <TextField
                //   {...input}
                //   helperText={
                //     meta.submitFailed && meta.error ? meta.error : undefined
                //   }
                //   placeholder="birthYear"
                //   value={input.value}
                //   error={meta.submitFailed && !!meta.error}
                //   onChange={input.onChange}
                // />
                <DatePicker
                  value={input.value}
                  onChange={(value) => {
                    input.onChange(value);
                  }}
                  error={meta.submitFailed && !!meta.error}
                  helperText={meta.submitFailed && meta.error}
                />
              )}
            </Field>

            <Field name="species">
              {({ input, meta }) => (
                <Select
                  options={getEnumOptions(Alien.shape.species)}
                  value={input.value}
                  error={meta.submitFailed && !!meta.error}
                  helperText={meta.submitFailed && meta.error}
                  onChange={input.onChange}
                  placeholder="Select Species"
                />
              )}
            </Field>
            <Field name="hasVisitedEarth">
              {({ input, meta }) => (
                <Select
                  options={HAS_VISITED_EARTH_OPTIONS}
                  value={input.value}
                  error={meta.submitFailed && !!meta.error}
                  helperText={meta.submitFailed && meta.error}
                  onChange={input.onChange}
                  placeholder="Have you visited Earth?"
                />
              )}
            </Field>

            <Field name="breathingMechanism">
              {({ input, meta }) => (
                <Select
                  options={BREATHING_MECHANISM}
                  value={input.value}
                  error={meta.submitFailed && !!meta.error}
                  helperText={meta.submitFailed && meta.error}
                  onChange={input.onChange}
                  placeholder="What is your breathing mechanism?"
                />
              )}
            </Field>

            <Field name="favoriteFood">
              {({ input, meta }) => (
                <Select
                  options={FAVORITE_FOOD_OPTIONS}
                  value={input.value}
                  error={meta.submitFailed && !!meta.error}
                  helperText={meta.submitFailed && meta.error}
                  onChange={input.onChange}
                  placeholder="What is your favorite food?"
                />
              )}
            </Field>

            <button onClick={handleSubmit} disabled={submitting}>
              Submit
            </button>
          </div>
        )}
      </Form>
    </AlientTestForm.Styled>
  );
};

AlientTestForm.Styled = styled.form`
  font-family: "Comic Sans MS", sans-serif;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: white;
  max-width: 500px;
  margin: 0 auto;

  h1 {
    color: limegreen;
    text-shadow: 2px 2px 5px black;
  }

  .MuiInput-root {
    width: 100%;
  }

  .MuiFormControl-root {
    margin-bottom: 30px;
  }

  .MuiTextField-root {
    width: 100%;
    display: block;
  }
`;

export default AlientTestForm;
