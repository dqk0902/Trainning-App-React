import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import React, { useState } from "react";
import axios from "axios";
const EditCustomer = ({ urlEdit }) => {
  const [open, setOpen] = useState(false);
  const editCustomer = async () => {
    try {
      const res = await axios.put(urlEdit, JSON.stringify(newCustomerInfo), {
        headers: { "Content-Type": "application/json" },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const [newCustomerInfo, setNewCustomerInfo] = useState({
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    phone: "",
    email: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleInputChange = (e) => {
    setNewCustomerInfo({ ...newCustomerInfo, [e.target.name]: e.target.value });
  };

  const handleEditCustomer = () => {
    editCustomer(newCustomerInfo);
    handleClose();
  };
  return (
    <div>
      <IconButton variant="contained" onClick={() => handleClickOpen()}>
        <ModeEditIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="firstname"
            value={newCustomerInfo.firstname}
            onChange={(e) => handleInputChange(e)}
            label="First Name"
            fullWidth
          />
          <TextField
            margin="dense"
            name="lastname"
            value={newCustomerInfo.lastname}
            onChange={(e) => handleInputChange(e)}
            label="Last Name"
            fullWidth
          />
          <TextField
            margin="dense"
            name="email"
            value={newCustomerInfo.email}
            onChange={(e) => handleInputChange(e)}
            label="Email"
            fullWidth
          />
          <TextField
            margin="dense"
            name="streetaddress"
            value={newCustomerInfo.streetaddress}
            onChange={(e) => handleInputChange(e)}
            label="Address"
            fullWidth
          />
          <TextField
            margin="dense"
            name="postcode"
            value={newCustomerInfo.postcode}
            onChange={(e) => handleInputChange(e)}
            label="Post Code"
            fullWidth
          />
          <TextField
            margin="dense"
            name="city"
            value={newCustomerInfo.city}
            onChange={(e) => handleInputChange(e)}
            label="City"
            fullWidth
          />
          <TextField
            margin="dense"
            name="phone"
            value={newCustomerInfo.phone}
            onChange={(e) => handleInputChange(e)}
            label="Phone"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {" "}
            Cancel{" "}
          </Button>
          <Button onClick={handleEditCustomer} color="primary">
            {" "}
            Save{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCustomer;
