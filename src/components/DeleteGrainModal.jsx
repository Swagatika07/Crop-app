/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 10,
  p: 4,
};

const DeleteGrainModal = ({
  isShow,
  handleClose = () => null,
  handleDelete = () => null,
}) => {
  return (
    <Modal
      open={isShow}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" sx={{ mb: 2 }}>
          Are you sure, you want to delete this record ?
        </Typography>
        <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            sx={{ mr: 1 }}
            onClick={() => {
              handleClose();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handleDelete()}
            color="error"
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteGrainModal;
