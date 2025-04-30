import React from "react";
import MUITextField from "@mui/material/TextField";
import classnames from "classnames";

export type TextInputProps = {
  value?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  label?: string | JSX.Element;
  helperText?: string;
  disabled?: boolean;
  error?: boolean;
  placeholder?: string;
  className?: string;
  InputProps?: {};
  inputProps?: {};
  autoFocus?: boolean;
  multiline?: boolean;
  style?: {};
  sqaPrefix?: string;
};

const TextInput = ({
  label,
  value,
  onBlur,
  onChange,
  helperText,
  disabled,
  error,
  placeholder,
  className,
  InputProps,
  inputProps,
  style,
  sqaPrefix,
  ...rest
}: TextInputProps) => {
  return (
    <MUITextField
      {...rest}
      fullWidth
      className={classnames(className, { error: error && helperText })}
      error={error}
      label={label}
      style={style}
      disabled={disabled}
      InputLabelProps={{ shrink: true }}
      variant="outlined"
      placeholder={placeholder}
      onBlur={onBlur}
      onChange={onChange}
      value={value}
      helperText={helperText}
      InputProps={InputProps}
      inputProps={{
        ...inputProps,
      }}
    />
  );
};

export default TextInput;
