import React, { ChangeEvent, FC, memo } from "react";
import { TextField } from "@material-ui/core";

type InputPropsType = {
  label: string;
  value: number;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error: boolean;
  name?: string;
};

export const Input: FC<InputPropsType> = memo(
  ({ label, value, error, onChange, name }) => {
    return (
      <TextField
        variant="standard"
        type="number"
        size="small"
        label={label}
        value={value}
        onChange={onChange}
        error={error}
        name={name}
      />
    );
  }
);
