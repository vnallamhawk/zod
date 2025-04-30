import type { ReactNode } from "react";
import MUIInputLabel from "@mui/material/InputLabel";
import MUIMenuItem from "@mui/material/MenuItem";
import MUIFormControl from "@mui/material/FormControl";
import MUISelect, { SelectProps } from "@mui/material/Select";
import MUIFormHelperText from "@mui/material/FormHelperText";

// import { SelectOption } from "types/selectTypes";

export interface SelectOption<ValueType> {
  label: string;
  value: ValueType;
  disabled?: boolean;
  tooltipText?: string;
}

type Props = {
  options: Array<SelectOption<ValueType>>;
  onChange: SelectProps["onChange"];
  value: string | Array<string>;
  helperText?: string;
  label?: string | JSX.Element;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  renderMenuItemContent?: (options: SelectOption<ValueType>) => ReactNode;
  renderValue?: () => ReactNode;
  sqaPrefix?: string;
};

const Select = ({
  label,
  placeholder,
  options,
  onChange,
  value,
  helperText,
  multiple,
  disabled,
  error,
  className,
  renderMenuItemContent,
  renderValue,
}: Props) => {
  return (
    <MUIFormControl
      fullWidth
      variant="outlined"
      disabled={disabled}
      error={error}
      className={className}
    >
      {label && <MUIInputLabel shrink>{label}</MUIInputLabel>}
      {placeholder && <MUIInputLabel>{placeholder}</MUIInputLabel>}
      <MUISelect
        MenuProps={menuProps}
        multiple={multiple}
        value={value}
        onChange={onChange}
        displayEmpty
        renderValue={renderValue}
      >
        {options.map((option) => {
          const { disabled, value, label } = option;
          const item = (
            <MUIMenuItem key={value} value={value} disabled={disabled}>
              {renderMenuItemContent ? renderMenuItemContent(option) : label}
            </MUIMenuItem>
          );
          return item;
        })}
      </MUISelect>
      {helperText && <MUIFormHelperText>{helperText}</MUIFormHelperText>}
    </MUIFormControl>
  );
};

const menuProps = {
  anchorOrigin: {
    vertical: 45,
    horizontal: "left",
  },
  transformOrigin: {
    vertical: "top",
    horizontal: "left",
  },
  getContentAnchorEl: null,
} as const;

export default Select;
