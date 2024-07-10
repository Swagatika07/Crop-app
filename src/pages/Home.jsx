/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addGrain, removeGrain, editGrain } from "../store/grainSlice";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button,Tooltip, Typography } from "@mui/material";
import AddGrainModal from "../components/AddGrainModal";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteGrainModal from "../components/DeleteGrainModal";

const Home = () => {
  const dispatch = useDispatch();
  const grainData = useSelector((state) => state?.grains?.data);

  const [selectedRow, setSelectedRow] = useState(null);
  const [editing, setEditing] = useState(false);

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);
  const handleAdd = (grainDetails, isEdit) => {
    const payload = {
      ...grainDetails,
      id: isEdit ? grainDetails.id : uuidv4(),
      productName: grainDetails.productName,
      startDate: grainDetails.startDate,
      endDate: grainDetails.endDate,
      cropYear: grainDetails.cropYear,
    };
    console.log(payload, isEdit, "isEdit");
    if (isEdit) {
      dispatch(editGrain(payload));
    } else {
      dispatch(addGrain(payload));
    }
    setOpenAddModal(false);
    setEditing(false);
    setSelectedRow(null);
  };

  const handleDelete = () => {
    if (selectedRow) {
      dispatch(removeGrain({ id: selectedRow.id }));
      setSelectedRow(null);
      setOpenDeleteModal(false);
    }
  };

  const handleOpenModal = (modalType, isEdit = false) => {
    if (modalType === "ADD") {
      setOpenAddModal(true);
      setEditing(isEdit);
    } else if (modalType === "DELETE") {
      setOpenDeleteModal(true);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h2>Your grain prices :</h2>
        <Button
          variant="contained"
          sx={{ float: "right", marginBottom: 5,background:"#00615D", borderRadius:10,fontSize: "18px",fontWeight: "bold",padding:1.5 }}
          onClick={() => handleOpenModal("ADD")}
        >
          Add Product
        </Button>
      </div>
      <TableContainer component={Paper} sx={{boxShadow:3}}>
        <Table sx={{ minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow >
              <TableCell style={{ color: "#00615D", fontSize: "20px",fontWeight:"bold" }}>
                Product Name
              </TableCell>
              <TableCell style={{ color: "#00615D", fontSize: "20px",fontWeight:"bold" }}>
                Contract Period
              </TableCell>
              <TableCell style={{ color: "#00615D", fontSize: "20px",fontWeight:"bold" }}>
                Crop Year
              </TableCell>
              <TableCell
                align="center"
                style={{ color: "#00615D", fontSize: "20px",fontWeight:"bold" }}
              >
                Price (₹)
              </TableCell>
              <TableCell
                align="right"
                style={{ color: "#00615D", fontSize: "20px" }}
              >
                
              </TableCell>
              <TableCell
                align="right"
                style={{ color: "white", fontSize: "20px" }}
              >
                
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grainData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 },"&:nth-of-type(odd)": {
    backgroundColor: "#F4F8FB",fontSize:"20px"
  }, }}
              >
                <TableCell sx={{fontSize:"16px"}}>{row?.productName}</TableCell>
                <TableCell component="th" scope="row" sx={{fontSize:"16px"}}>
                  {`${
                    row?.startDate
                      ? dayjs(row.startDate).format("MMM YY")
                      : "N/A"
                  } - ${
                    row?.endDate ? dayjs(row.endDate).format("MMM YY") : "N/A"
                  }`}
                </TableCell>
                <TableCell align="left" sx={{fontSize:"16px"}}>{row?.cropYear}</TableCell>
                <TableCell align="center" sx={{fontSize:"16px"}}>{row?.price}</TableCell>
                <TableCell align="right">
                  <Tooltip title={<h2 style={{ color: "white" }}>Modify the entries of this row</h2>}>
                    <EditIcon
                      sx={{ cursor: "pointer", color: "grey" }}
                      onClick={() => {
                        setSelectedRow(row);
                        setEditing(true);
                        handleOpenModal("ADD", true);
                      }}
                    />
                  </Tooltip>
                </TableCell>
                <TableCell align="right">
                  <Tooltip title={<h2 style={{ color: "white" }}>Delete the selected row</h2>}>
                    <DeleteIcon
                      sx={{ cursor: "pointer", color: "#da312e" }}
                      onClick={() => {
                        setSelectedRow(row);
                        handleOpenModal("DELETE");
                      }}
                    />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {grainData?.length === 0 && (
        <Typography sx={{ textAlign: "center" }}>
          <h4>No data to display</h4>
        </Typography>
      )}

      <AddGrainModal
        isShow={openAddModal}
        handleClose={() => setOpenAddModal(false)}
        handleAdd={handleAdd}
        rowDetails={selectedRow}
        isEdit={editing}
      />

      <DeleteGrainModal
        isShow={openDeleteModal}
        handleClose={() => setOpenDeleteModal(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default Home;
