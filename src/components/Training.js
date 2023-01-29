import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { CircularProgress, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";
const Training = () => {
  const [trainings, setTrainings] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const getTrainingrList = async () => {
    try {
      const res = await axios.get(
        "http://traineeapp.azurewebsites.net/api/trainings"
      );
      setIsSuccess(true);
      setTrainings(res.data.content);
    } catch (err) {
      console.log(err.message);
    }
  };
  const handleDeleteTraining = async (url) => {
    if (window.confirm("Do you want to delete this?")) {
      try {
        const res = await axios.delete(url);
        console.log(res.status);
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  useEffect(() => {
    getTrainingrList();
  }, []);
  const [pageSize, setPageSize] = useState(5);
  const columns = [
    { field: "id", hide: true },
    {
      field: "delete",
      headerName: "Delete",
      align: "center",
      sortable: false,
      width: 100,
      renderCell: (params) => {
        return (
          <div>
            <IconButton onClick={() => handleDeleteTraining(params.id)}>
              <DeleteIcon color="error" />
            </IconButton>
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 400,
      renderCell: (params) => (
        <Moment format="MMMM Do YYYY, h:mm:ss a">{params.value}</Moment>
      ),
    },
    { field: "duration", headerName: "Duration", width: 400 },
    { field: "activity", headerName: "Activity", width: 600 },
  ];

  const rows = trainings
    ?.filter((training) => training.activity.toLowerCase())
    .map((training) => ({
      id: training.links[0].href,
      date: training.date,
      duration: training.duration,
      activity: training.activity,
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
            rowsPerPageOptions={[5, 10]}
            editMode="row"
          />
        ) : (
          <CircularProgress />
        )}
      </div>
    </div>
  );
};

export default Training;
