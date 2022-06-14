import React, { useEffect, useState } from "react";
import Filter from "../../Components/Filter";
import Table from "../../Components/Table";

function Index() {
  const [searchValue, setSearchValue] = useState("");
  const [searchRole, setSearchRole] = useState("");
  const [rows, setRows] = useState([]);
  const registeredUsers = JSON.parse(localStorage.getItem("users")) ?? [];

  useEffect(() => {
    setRows(registeredUsers);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = () => {
    if (searchValue && !searchRole) {
      setRows(
        registeredUsers.filter(
          (user) => user.name.includes(searchValue) || user.email.includes(searchValue)
        )
      );
    } else if (!searchValue && searchRole) {
      setRows(registeredUsers.filter((user) => user.role === searchRole));
    } else if (searchValue && searchRole) {
      setRows(
        registeredUsers.filter(
          (user) =>
            user.name.includes(searchValue) ||
            user.email.includes(searchValue) ||
            user.role === searchRole
        )
      );
    } else if (!searchValue && !searchRole) {
      setRows(registeredUsers);
    }
  };

  return (
    <div className=" w-4/5 mx-auto h-screen p-5 relative">
      <Filter
        setSearchValue={setSearchValue}
        setSearchRole={setSearchRole}
        handleSearch={handleSearch}
      />
      <div className="mt-5">
        <Table rows={rows} />
      </div>
    </div>
  );
}

export default Index;
