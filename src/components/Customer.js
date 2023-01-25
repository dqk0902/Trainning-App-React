import React, { useEffect } from "react";
import axios from "axios";
const Customer = () => {
  const getCustomerList = async () => {
    try {
      const res = await axios.get(
        "https://customerrest.herokuapp.com/api/customers"
      );
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getCustomerList();
  }, []);
  return <div>Customer</div>;
};

export default Customer;
