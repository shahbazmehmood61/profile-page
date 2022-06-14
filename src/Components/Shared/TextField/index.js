import { TextField, Button } from "@mui/material";
import React from "react";
import { fileUpload } from "../../../firebase.client";

function Index({ value, src, setValue, className, label, type, index }) {
  return (
    <div className={className}>
      {type === "file" ? (
        <>
          {src && <img src={src} style={{ height: "100px", width: "200px" }} alt="Logo" />}
          <Button style={{ marginTop: "10px" }} variant="contained" component="label">
            {label}
            <input
              type="file"
              hidden
              onChange={(e) => {
                fileUpload(e.target.files[0], "logo", setValue, index);
              }}
            />
          </Button>
          <p>{value.name}</p>
        </>
      ) : (
        <TextField
          id="outlined-basic"
          label={label}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          variant="outlined"
          className=" w-full"
          type={type ? type : "text"}
        />
      )}
    </div>
  );
}

export default Index;
