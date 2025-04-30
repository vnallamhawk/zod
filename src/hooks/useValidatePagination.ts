import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";

const PaginationSchema = z.object({
  page: z.coerce.number().positive(),
  limit: z.coerce.number().positive(),
});

export const useValidatePagination = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const queryObject = Object?.fromEntries(searchParams.entries());
  const navigate = useNavigate();

  useEffect(() => {
    if (page && limit) {
      const result = PaginationSchema.safeParse(queryObject);
      if (!result?.success) {
        navigate("?page=1&limit=10");
      }
    }
  }, [page, limit]);
};
