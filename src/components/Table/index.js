import React, { useEffect, useState } from "react";
import TableHead from "./components/TableHead";
import PropTypes from "prop-types";

const Table = ({
  columns,
  data,
  onAddNewRecord,
  onEditRecord,
  onDeletSingleRecord,
  onDeleteMultiRecord,
}) => {
  const [checkedItems, setCheckedItems] = useState(
    new Array(data.length).fill(false)
  );
  const [isCheckedAll, setIsCheckedAll] = useState(false);

  useEffect(() => {
    let allChecked = true;
    for (const key in checkedItems) {
      if (checkedItems[key] === false) {
        allChecked = false;
      }
    }
    if (allChecked) {
      setIsCheckedAll(true);
    } else {
      setIsCheckedAll(false);
    }
  }, [checkedItems]);

  useEffect(() => {
    setCheckedItems((prevState) => {
      const newState = [...data];
      for (const key in newState) {
        if (!prevState[key]) {
          newState[key] = false;
        }
      }
      return newState;
    });
  }, [data]);

  const handleSelectRow = (position) => {
    setCheckedItems((prevState) => {
      const newState = [...prevState];
      newState[position] = !prevState[position];
      return newState;
    });
  };

  const handleCheckAll = (e) => {
    setIsCheckedAll(e.target.checked);
    setCheckedItems((prevState) => {
      const newState = [...prevState];
      for (const key in newState) {
        newState[key] = e.target.checked;
      }
      return newState;
    });
  };

  const handleDeleteSingleRecord = (rowKey) => {
    onDeletSingleRecord(rowKey);
  };

  const handleDeleteMultiRecord = () => {
    const selectedIndex = checkedItems.reduce(
      (out, bool, index) => (bool ? out.concat(index) : out),
      []
    );
    onDeleteMultiRecord(selectedIndex, setCheckedItems);
  };

  return (
    <>
      <div className="action-group">
        <button onClick={onAddNewRecord}>Add</button>
        <button onClick={handleDeleteMultiRecord}>
          Delete selected record
        </button>
      </div>
      <table>
        <TableHead
          isCheckedAll={isCheckedAll}
          handleCheckAll={handleCheckAll}
          columns={columns}
        />
        <tbody>
          {data?.map((item, key) => (
            <tr key={key}>
              <td>
                <input
                  id={`checkbox-${key}`}
                  type="checkbox"
                  value={checkedItems[key]}
                  checked={checkedItems[key]}
                  onChange={() => handleSelectRow(key)}
                />
              </td>
              {columns.map((field) => (
                <td key={field.key}>{item[field.key]}</td>
              ))}
              <td>
                <button onClick={(e) => onEditRecord(e, key)}>Edit</button>
              </td>
              <td>
                <button onClick={() => handleDeleteSingleRecord()}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

Table.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
  onAddNewRecord: PropTypes.func,
  onEditRecord: PropTypes.func,
  onDeletSingleRecord: PropTypes.func,
  onDeleteMultiRecord: PropTypes.func,
};
Table.defaultProps = {
  data: [],
  columns: [],
};

export default Table;
