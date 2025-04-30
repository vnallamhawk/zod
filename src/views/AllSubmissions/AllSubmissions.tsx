import { Fragment } from "react";
import useGetAllSubmissions from "../../clients/useGetAllSubmissions";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { z } from "zod";
import { useValidatePagination } from "../../hooks/useValidatePagination";

const AllSubmissions = () => {
  const { data, error } = useGetAllSubmissions();
  useValidatePagination();

  return error ? (
    <Fragment>Error </Fragment>
  ) : (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: 600, margin: "auto", mt: 4 }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Species</TableCell>
            <TableCell align="right">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((row) => (
            <TableRow key={row.id} hover>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.species}</TableCell>
              <TableCell align="right">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AllSubmissions;
