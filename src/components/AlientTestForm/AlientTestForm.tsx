import { Field, Form } from "react-final-form";
import { z, ZodError } from "zod";
import { styled } from "styled-components";
import {
  BREATHING_MECHANISM,
  FAVORITE_FOOD_OPTIONS,
  HAS_VISITED_EARTH_OPTIONS,
  SPECIES_OPTIONS,
} from "../../constants/alientFormConstants";
import Select from "../../components/Select";
import TextField from "../../components/TextField";
import { Alien } from "../../clients/schemas";
import { getEnumOptions } from "../../services/dataServices";
import DatePicker from "../../components/DatePicker";
import { format } from "date-fns";

// if a form has some has around 20 to 30 fields we don't have to redefine types
// again for all the 30 fields again here.
// We can just extend of the generated schema and add only the fields which require
// customization again here
const AlienFormSchema = Alien.extend({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(10, "Max Length musst be 10 characters"),
  dob: z.date().transform((value) => format(value, "yyyy-MM-dd")),
})
  .strict()
  .refine(
    (data) => !(data.species === "human" && data.hasVisitedEarth === false),
    {
      message: "Humans must have visited Earth!",
      path: ["hasVisitedEarth"],
    }
  );

type Alien = z.infer<typeof AlienFormSchema>;

export const AlientTestForm = () => {
  const onSubmit = (values: Alien) => {
    const parsedValues = Alien.safeParse(values);
    // submission logic goes here
    // AlienCreateSchema.parse(parseValues)
  };

  // RHF supports a zodResolver import which can avoid this boiler plate code
  // RFF didn't have one
  const validateZod = (values: Alien) => {
    try {
      const result = AlienFormSchema.safeParse(values);
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
            <Field name="dob">
              {({ input, meta }) => (
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
