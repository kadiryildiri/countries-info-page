import React from "react";
import axios from "axios";
import { useEffect } from "react";

const URL = "https://restcountries.com/v3.1/all";

function GetCountries({ countriesData }) {
  const getAllCountries = async () => {
    const response = await axios.get(URL);
    const data = response.data;

    countriesData(data);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  return <div></div>;
}

export default GetCountries;
