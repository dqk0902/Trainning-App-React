import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
const AddTraining = ({ urlTraining }) => {
  const [open, setOpen] = useState(false);
  const addNewTraining = async () => {
    try {
      const res = await axios.post(
        "https://traineeapp.azurewebsites.net/api/trainings",
        JSON.stringify(newTrainingInfo),
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const [newTrainingInfo, setNewTrainingInfo] = useState({
    date: "",
    activity: "",
    duration: "",
    customer: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
    setNewTrainingInfo({
      ...newTrainingInfo,
      customer: urlTraining,
    });
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (e) => {
    setNewTrainingInfo({
      ...newTrainingInfo,
      [e.target.name]:
        e.target.name === "name"
          ? e.target.value.moment().toISOString()
          : e.target.value,
    });
  };
  const handleAddNewTraining = () => {
    if (
      newTrainingInfo.date &&
      newTrainingInfo.activity &&
      newTrainingInfo.duration
    ) {
      addNewTraining(newTrainingInfo);
      handleClose();
    } else alert("Input is invalid. Please fill all.");
  };

  return (
    <div>
      <IconButton variant="contained" onClick={() => handleClickOpen()}>
        <AddCircleIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required="true"
            margin="dense"
            name="activity"
            value={newTrainingInfo.activity}
            onChange={(e) => handleInputChange(e)}
            label="Activity"
            fullWidth
          />
          <TextField
            margin="dense"
            name="date"
            type="datetime-local"
            value={newTrainingInfo.date}
            onChange={(e) => handleInputChange(e)}
            label="Date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            margin="dense"
            name="duration"
            type="number"
            value={newTrainingInfo.duration}
            onChange={(e) => handleInputChange(e)}
            label="Duration"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {" "}
            Cancel{" "}
          </Button>
          <Button onClick={handleAddNewTraining} color="primary">
            {" "}
            Save{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTraining;
