import React from "react";
import TextField from "@material-ui/core/TextField";

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
