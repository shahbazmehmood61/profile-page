import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import React from "react";

function Index({ value, setValue, className, label, options }) {
  return (
    <div className={className}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select value={value} label={label} onChange={({ target }) => setValue(target.value)}>
          <MenuItem value="" disabled>
            <em>none</em>
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.role}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default Index;
