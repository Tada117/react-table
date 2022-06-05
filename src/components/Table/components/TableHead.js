import React from "react";

const TableHead = ({ isCheckedAll, handleCheckAll, columns }) => {
  return (
    <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            checked={isCheckedAll}
            value={isCheckedAll}
            onChange={handleCheckAll}
          />
        </th>
        {columns.map((item) => (
          <th key={item?.key}>{item?.label}</th>
        ))}
        <th>Action Edit</th>
        <th>Action Delete</th>
      </tr>
    </thead>
  );
};

export default TableHead;
