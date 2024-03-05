import React from "react";
import TextField from "@mui/material/TextField";

const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <TextField
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder={`Search ${column.id}`}
    />
  );
};

export default ColumnFilter;
