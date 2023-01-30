import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

import React, { useState } from "react";
import axios from "axios";
const AddCustomer = () => {
  const [open, setOpen] = useState(false);
  const addNewCustomer = async () => {
    try {
      const res = await axios.post(
        "http://traineeapp.azurewebsites.net/api/customers",
        JSON.stringify(newCustomerInfo),
        { headers: { "Content-Type": "application/json" } }
      );
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

  const handleAddCustomer = () => {
    addNewCustomer(newCustomerInfo);
    handleClose();
  };
  return (
    <div>
      <Button
        variant="contained"
        color="error"
        onClick={() => handleClickOpen()}
        style={{ transform: "translateY(-8px)" }}
      >
        Add Customer
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
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
          <Button onClick={handleAddCustomer} color="primary">
            {" "}
            Save{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCustomer;
