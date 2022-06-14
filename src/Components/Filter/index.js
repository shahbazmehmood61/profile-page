import React, { useEffect, useState } from "react";
import TextField from "../Shared/TextField";
import SelectField from "../Shared/SelectField";
import Button from "../Shared/Button";

function Index({ setSearchValue, setSearchRole, handleSearch }) {
  const [value, setValue] = useState("");
  const [role, setRole] = useState("");
  const roles = [
    { role: "Admin", value: "admin" },
    { role: "User", value: "user" },
    { role: "Operator", value: "operator" },
  ];

  useEffect(() => {
    setSearchRole(role);
  }, [role]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setSearchValue(value);
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className=" w-4/5 mx-auto flex flex-row justify-between relative">
      <div className=" w-3/5">
        <TextField
          value={value}
          type="search"
          setValue={setValue}
          label="Search By Email or Name"
        />
      </div>
      <div className=" w-1/5">
        <SelectField value={role} setValue={setRole} label="Role" options={roles} />
      </div>
      <Button onClick={handleSearch} label="Search" height={56} />
    </div>
  );
}

export default Index;
