/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box, Modal, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 10,
  p: 4,
};

const AddGrainModal = ({
  isShow,
  handleClose,
  handleAdd,
  rowDetails = {},
  isEdit = false,
}) => {
  const [grainDetails, setGrainDetails] = useState({
    id: rowDetails?.id || null,
    productName: rowDetails?.productName || "",
    startDate: rowDetails?.startDate ? dayjs(rowDetails.startDate) : null,
    endDate: rowDetails?.endDate ? dayjs(rowDetails.endDate) : null,
    cropYear: rowDetails?.cropYear
      ? dayjs(`${rowDetails.cropYear}-01-01`)
      : null,
    price: rowDetails?.price || "",
  });

  const handleResetState = () => {
    setGrainDetails({
      productName: "",
      startDate: null,
      endDate: null,
      cropYear: null,
      price: "",
      id: "",
    });
  };

  useEffect(() => {
    if (isEdit) {
      setGrainDetails({
        id: rowDetails?.id || null,
        productName: rowDetails?.productName || "",
        startDate: rowDetails?.startDate ? dayjs(rowDetails.startDate) : null,
        endDate: rowDetails?.endDate ? dayjs(rowDetails.endDate) : null,
        cropYear: rowDetails?.cropYear
          ? dayjs(`${rowDetails.cropYear}-01-01`)
          : null,
        price: rowDetails?.price || "",
      });
    } else {
      handleResetState();
    }
  }, [rowDetails, isEdit]);

  return (
    <Modal
      open={isShow}
      onClose={() => handleClose("ADD")}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" sx={{ mb: 2 }}>
          {isEdit ? "Edit Grain" : "Add Grain"}
        </Typography>
        <TextField
          label="Product Name"
          value={grainDetails.productName}
          sx={{ mb: 2, width: "100%" }}
          onChange={(e) =>
            setGrainDetails({ ...grainDetails, productName: e.target.value })
          }
        ></TextField>
        <DatePicker
          value={grainDetails.startDate}
          onChange={(val) =>
            setGrainDetails({ ...grainDetails, startDate: val || null })
          }
          label="Contract Start Date"
          sx={{ mb: 2, width: "100%" }}
        />

        <DatePicker
          value={grainDetails.endDate}
          onChange={(val) =>
            setGrainDetails({ ...grainDetails, endDate: val || null })
          }
          label="Contract End Date"
          sx={{ mb: 2, width: "100%" }}
        />

        <DatePicker
          views={["year"]}
          value={grainDetails.cropYear}
          onChange={(val) =>
            setGrainDetails({
              ...grainDetails,
              cropYear: val ? dayjs(`${val.year()}-01-01`) : null,
            })
          }
          label="Crop Year"
          sx={{ mb: 2, width: "100%" }}
        />
        

        <TextField
          id="outlined-basic"
          label="Price"
          variant="outlined"
          sx={{ mb: 2, width: "100%" }}
          value={grainDetails.price}
          type="number"
          onChange={(e) =>
            setGrainDetails({ ...grainDetails, price: e.target.value })
          }
        />

        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            color="success"
            onClick={() => {
              // handleResetState();
              handleClose("ADD");
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={
              !grainDetails.productName ||
              !grainDetails.startDate ||
              !grainDetails.endDate ||
              !grainDetails.cropYear ||
              !grainDetails.price
            }
            color="success"
            onClick={() => {
              handleAdd(
                {
                  ...grainDetails,
                  productName: grainDetails.productName,
                  startDate: grainDetails.startDate?.format(),
                  endDate: grainDetails.endDate?.format(),
                  cropYear: grainDetails.cropYear?.year(),
                },
                isEdit
              );
              handleResetState();
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddGrainModal;
