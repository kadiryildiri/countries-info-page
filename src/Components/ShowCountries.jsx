import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaAngleDown, FaCheck } from "react-icons/fa6";
import { Navigate, useNavigate } from "react-router";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

function ShowCountries({ countries }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);

  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);
  };

  const filteredCountries = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    return countries.filter((country) => {
      const matchesName = country.name.common.toLowerCase().includes(term);
      const matchesRegion =
        !selectedRegion || country.region === selectedRegion;
      return matchesName && matchesRegion;
    });
  }, [countries, searchTerm, selectedRegion]);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region === selectedRegion ? "" : region);
    setFilterOpen(false);
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-very-light-gray py-6 dark:bg-very-dark-blue">
      <div className="flex flex-col gap-6 px-6 md:flex-row md:justify-between md:px-8 lg:px-24 xl:px-32">
        <div className="relative lg:md:w-1/3">
          <span className="absolute top-6 left-6 -translate-y-1/2">
            <IoMdSearch className="text-xl text-gray-500 " />
          </span>
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            className="w-full pl-16 py-3 bg-white dark:bg-dark-blue dark:text-very-light-gray dark:placeholder:text-very-light-gray outline-none shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)]"
            placeholder="Search for a country..."
          />
        </div>
        <div className="w-3/5 flex flex-col gap-1 shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] rounded-md md:w-2/6 lg:w-1/6">
          <div
            onClick={toggleFilter}
            className="relative flex items-center justify-between bg-white dark:bg-dark-blue dark:text-very-light-gray py-3 px-6 cursor-pointer"
          >
            <span>{selectedRegion || "Filter by Region"}</span>
            <FaAngleDown />
          </div>
          {filterOpen && (
            <div className="absolute mt-1 w-full bg-white dark:bg-dark-blue shadow-[0px_2px_4px_rgba(0,0,0,0.1)] rounded-md z-10">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => handleRegionSelect(region)}
                  className={`flex w-full items-center justify-between py-3 px-6 hover:bg-gray-100 cursor-pointer ${
                    selectedRegion === region ? "font-bold" : ""
                  }`}
                >
                  <span className="dark:text-very-light-gray">{region}</span>
                  {selectedRegion === region && <FaCheck />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6 px-12 mt-6 md:justify-between md:flex-row md:flex-wrap md:px-24 lg:px-24 xl:px-32">
        {filteredCountries.map((country) => {
          return (
            <div
              key={country.cca3}
              className="flex flex-col h-100 w-70 bg-white dark:bg-dark-blue shadow-[0px_2px_4px_0px_rgba(0,0,0,0.1)] rounded-md"
            >
              <img
                src={country.flags.png}
                alt={country.name.common}
                className="w-full h-1/2 object-cover rounded-t-md"
              />
              <div className="flex flex-col gap-4 w-full px-6 py-6">
                <h2
                  onClick={() =>
                    navigate("/country-info/" + country.name.common)
                  }
                  className="text-xl font-bold cursor-pointer dark:text-very-light-gray hover:text-black/50 transition-all duration-200 dark:hover:text-very-light-gray/50"
                >
                  {country.name.common}
                </h2>
                <p className="dark:text-very-light-gray">
                  <strong className="">Population:</strong>{" "}
                  {country.population.toLocaleString()}
                </p>
                <p className="dark:text-very-light-gray">
                  <strong>Region:</strong> {country.region}
                </p>
                <p className="dark:text-very-light-gray">
                  <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ShowCountries;
