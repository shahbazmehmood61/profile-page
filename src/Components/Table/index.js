import React from "react";

function Index({ rows }) {
  const tableHeading = ["Name", "Email", "Password", "Role"];

  return (
    <div className=" w-4/5 mx-auto flex flex-row">
      <table className=" w-full border border-gray-400 border-collapse h-screen">
        <thead id="header">
          <tr className="border border-gray-400">
            {tableHeading.map((head) => (
              <th align="left" key={head} className=" p-4">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.email}
              className={`border border-gray-400 ${i % 2 === 0 ? " bg-gray-200" : "bg-white"}`}
            >
              <td className=" p-4">{row.name}</td>
              <td className=" p-4">{row.email}</td>
              <td className=" p-4">{row.password}</td>
              <td className=" p-4">{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Index;
