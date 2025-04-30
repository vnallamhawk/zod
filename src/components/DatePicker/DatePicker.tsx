import React, { useState } from "react";
import { TextField, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TextInput from "../TextField/TextInput";

const DateControl = ({
  value,
  onChange,
  error,
  helperText,
}: {
  value: Date | null;
  onChange: (arg0: Date | null) => void;
  error?: boolean;
  helperText?: string;
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mt: 4,
        }}
      >
        <DatePicker
          label="Select Date"
          value={value}
          onChange={onChange}
          slotProps={{
            textField: {
              error,
              helperText,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default DateControl;
