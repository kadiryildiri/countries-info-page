import { useEffect, useState } from "react";
import GetCountries from "./Components/GetCountries";
import ShowCountries from "./Components/ShowCountries";
import Header from "./Components/Header";
import { Routes, Route, Router } from "react-router";
import CountryInfo from "./Pages/CountryInfo";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  const [countries, setCountries] = useState([]);

  const countriesData = (data) => setCountries(data);

  return (
    <div className="font-nunito min-h-screen ">
      <Header toggleTheme={toggleTheme} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <GetCountries countriesData={countriesData} />
              <ShowCountries countries={countries} />
            </>
          }
        />

        <Route
          path="/country-info/:countryName"
          element={<CountryInfo countries={countries} />}
        />
      </Routes>
    </div>
  );
}

export default App;
