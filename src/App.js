import { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";
import Table from "./components/Table";
import useModal from "./hooks/useModal";

const columns = [
  {
    key: "fullName",
    label: "Full name",
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "phone",
    label: "Phone number",
  },
];

function App() {
  const { showModal, toggle } = useModal();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: null,
  });
  const [data, setData] = useState([
    {
      fullName: "Anh Tu",
      email: "ntat@gmail.com",
      phone: "0909090",
    },
  ]);
  const [isEditing, setIsEditing] = useState({
    status: false,
    rowKey: null,
  });

  const handleInputChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddNewRecord = (e) => {
    e.preventDefault();
    toggle();
    setData([...data, formData]);
  };

  const handleEditRecord = (e, selectedRow) => {
    setIsEditing({
      status: true,
      rowKey: selectedRow,
    });
    setFormData(data[selectedRow]);
    toggle();
  };
  const handleUpdateRecord = (e) => {
    e.preventDefault();
    const newData = [...data];
    newData[isEditing.rowKey] = formData;
    setData(newData);
    toggle();
    setIsEditing({ rowKey: null, status: false });
  };
  const handleDeleteSingleRecord = (rowKey) => {
    const newData = [...data];
    newData.splice(rowKey, 1);
    setData(newData);
  };

  const handleDeleteMultiRecord = (selectedRow, setCheckedItems) => {
    const newData = [...data];
    for (let i = selectedRow.length - 1; i >= 0; i--)
      newData.splice(selectedRow[i], 1);
    setData(newData);
    setCheckedItems(new Array(data.length).fill(false));
  };

  return (
    <>
      <Modal isShowing={showModal} hide={toggle}>
        <form>
          <div className="form-input">
            <label>Full name</label>
            <input
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-input">
            <label>Email</label>{" "}
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-input">
            <label>Phone number</label>
            <input
              name="phone"
              type="number"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <button
            onClick={isEditing.status ? handleUpdateRecord : handleAddNewRecord}
          >
            Submit
          </button>
        </form>
      </Modal>
      <div className="container">
        <Table
          columns={columns}
          data={data}
          onDeleteMultiRecord={handleDeleteMultiRecord}
          onDeletSingleRecord={handleDeleteSingleRecord}
          onEditRecord={handleEditRecord}
          onAddNewRecord={toggle}
        />
      </div>
    </>
  );
}

export default App;
