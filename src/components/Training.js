import React, { useEffect, useState } from "react";
import axios from "axios";
import Moment from "react-moment";
import { v4 as uuidv4 } from "uuid";
import { CircularProgress } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const Training = () => {
  const [trainings, setTrainings] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const getCustomerList = async () => {
    try {
      const res = await axios.get(
        "https://customerrest.herokuapp.com/api/trainings"
      );
      setIsSuccess(true);
      setTrainings(res.data.content);
    } catch (err) {
      console.log(err.message);
    }
  };
  console.log(trainings);
  useEffect(() => {
    getCustomerList();
  }, []);
  const [pageSize, setPageSize] = useState(5);
  const columns = [
    { field: "id", hide: true },
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
      id: uuidv4(),
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
