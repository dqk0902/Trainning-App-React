import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "../../styles/Customer.css";
import { CircularProgress, IconButton } from "@mui/material";
import AddCustomer from "./AddCustomer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditCustomer from "./EditCustomer";
import AddTraining from "../TrainingPage/AddTraining";
import { Search, SearchIconWrapper, StyledInputBase } from "./style";
import SearchIcon from "@mui/icons-material/Search";

const Customer = () => {
  const [customers, setCustomers] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [search, setSearch] = useState("");
  const getCustomerList = async () => {
    try {
      const res = await axios.get(
        "https://traineeapp.azurewebsites.net/api/customers"
      );
      setIsSuccess(true);
      setCustomers(res.data.content);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleDeleteCustomer = async (url) => {
    if (window.confirm("Do you want to delete this customer?")) {
      try {
        const res = await axios.delete(url);
        console.log(res.status);
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  console.log(customers);
  useEffect(() => {
    getCustomerList();
  }, []);
  const [pageSize, setPageSize] = useState(7);

  const columns = [
    { field: "id", hide: true },
    {
      field: "edit",
      headerName: "Edit",
      align: "center",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <EditCustomer urlEdit={params.id} />
          </div>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      align: "center",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <IconButton onClick={() => handleDeleteCustomer(params.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </div>
        );
      },
    },
    {
      field: "addTraining",
      headerName: "Add Training",
      align: "center",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <AddTraining urlTraining={params.id} />
          </div>
        );
      },
    },
    { field: "firstname", headerName: "First Name", width: 200 },
    { field: "lastname", headerName: "Last Name", width: 200 },
    { field: "streetaddress", headerName: "Street Address", width: 300 },
    { field: "postcode", headerName: "Postcode", width: 300 },
    { field: "city", headerName: "City", width: 300 },
    { field: "email", headerName: "Email", width: 300 },
    { field: "phone", headerName: "Phone", width: 300 },
  ];

  const rows = customers
    ?.filter(
      (customer) =>
        customer.firstname.toLowerCase().indexOf(search.toLowerCase()) > -1
    )
    .map((customer) => ({
      id: customer.links[0].href,
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
        <div className="search">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Search>
        </div>
        <AddCustomer />

        {isSuccess ? (
          <DataGrid
            columns={columns}
            rows={rows}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[7, 15]}
            editMode="row"
            components={{ Toolbar: GridToolbar }}
          />
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default Customer;
