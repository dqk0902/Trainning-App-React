import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { CircularProgress } from "@mui/material";
import "../styles/Customer.css";
import { v4 as uuidv4 } from "uuid";
const Customer = () => {
  const [customers, setCustomers] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const getCustomerList = async () => {
    try {
      const res = await axios.get(
        "https://customerrest.herokuapp.com/api/customers"
      );
      setIsSuccess(true);
      setCustomers(res.data.content);
    } catch (err) {
      console.log(err.message);
    }
  };
  console.log(customers);
  useEffect(() => {
    getCustomerList();
  }, []);
  const [pageSize, setPageSize] = useState(7);
  const columns = [
    { field: "id", hide: true },
    { field: "firstname", headerName: "First Name", width: 200 },
    { field: "lastname", headerName: "Last Name", width: 200 },
    { field: "streetaddress", headerName: "Street Address", width: 300 },
    { field: "postcode", headerName: "Postcode", width: 300 },
    { field: "city", headerName: "City", width: 300 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "phone", headerName: "Phone", width: 300 },
  ];

  const rows = customers
    ?.filter((customer) => customer.firstname.toLowerCase())
    .map((customer) => ({
      id: uuidv4(),
      firstname: customer.firstname,
      lastname: customer.lastname,
      streetaddress: customer.streetaddress,
      postcode: customer.postcode,
      city: customer.city,
      email: customer.email,
      phone: customer.phone,
    }));

  return (
    <div className="grid-layout">
      <div className="grid-wrapper">
        {isSuccess ? (
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[7, 15]}
            editMode="row"
          />
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default Customer;
