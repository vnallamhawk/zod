import useSWR from "swr";
import { z } from "zod";
import { submissionsApi } from "./apis";
import { AllSubmissionsGetResponseSchema } from "./schemas";

type Submissions = z.infer<typeof AllSubmissionsGetResponseSchema>;

const fetchSubmissions = async () => {
  const response = await submissionsApi.get(
    "v3/5a1e0b1c-70d8-4b20-bf6e-f9c26eea8d04?page=1&limit=15"
  );
  const result = AllSubmissionsGetResponseSchema.safeParse(response);
  if (result.success) {
    return result.data;
  } else {
    throw new Error("Response did not match expected schema");
  }
};

export const useGetAllSubmissions = () => {
  const { data, error, isLoading } = useSWR<Submissions>(
    "submissions",
    fetchSubmissions
  );

  return {
    data,
    isLoading,
    error,
  };
};

export default useGetAllSubmissions;
