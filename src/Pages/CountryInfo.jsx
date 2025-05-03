import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

function CountryInfo() {
  const { countryName } = useParams();
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const getCountryInfo = async () => {
      try {
        const { data } = await axios.get(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        setInfo(data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    getCountryInfo();
  }, [countryName]);

  const navigate = useNavigate();

  if (!info) {
    return (
      <div className="bg-very-light-gray min-h-screen py-6 dark:bg-very-dark-blue">
        <div className="mt-2 px-6">
          <button className="bg-white px-5 py-1.5 shadow">← Back</button>
        </div>
        <div className="px-6">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-very-light-gray min-h-screen py-6 dark:bg-very-dark-blue ">
      <div className="mt-2 px-6 lg:px-18 xl:px-48">
        <button
          onClick={() => navigate("/")}
          className="bg-white px-5 py-1.5 shadow lg:px-8 lg:py-2 dark:bg-dark-blue dark:text-very-light-gray cursor-pointer"
        >
          ← Back
        </button>
      </div>
      <div className="px-6 mt-6  flex flex-col lg:flex-row lg:items-center lg:px-16 lg:mt-0 lg:justify-between lg:gap-6 xl:items-start xl:justify-center xl:gap-40 xl:mt-20 xl:px-8">
        <img
          className="w-full h-1/3 object-cover lg:w-1/2 lg:h-80 xl:w-1/3"
          src={info.flags.png}
          alt={`${info.name.common} flag`}
        />
        <div className="lg:h-80 lg:w-1/3">
          <p className="text-xl font-bold mt-4 lg:mt-0 lg:text-2xl xl:text-4xl dark:text-very-light-gray">
            {info.name.common}
          </p>
          <div className="flex flex-col gap-6 lg:flex-row lg:mt-4 xl:gap-12 xl:mt-4 dark:text-very-light-gray/70">
            <div className="flex flex-col gap-1.5 mt-4 lg:mt-0 ">
              <p>
                <span className="font-bold dark:text-very-light-gray">
                  Native Name:
                </span>
                {info && info.name.official}
              </p>
              <p>
                <span className="font-bold dark:text-very-light-gray">
                  Population:
                </span>
                {info.population}
              </p>
              <p>
                <span className="font-bold dark:text-very-light-gray">
                  Region:
                </span>
                {info.region}
              </p>
              <p>
                <span className="font-bold dark:text-very-light-gray">
                  Sub Region:
                </span>
                {info.subregion}
              </p>
              <p>
                <span className="font-bold dark:text-very-light-gray">
                  Capital:
                </span>
                {info.capital}
              </p>
            </div>
            <div className="flex flex-col gap-1.5 dark:text-very-light-gray/70">
              <p>
                <span className="font-bold dark:text-very-light-gray">
                  Top Level Domain:
                </span>
                {info.tld}
              </p>
              <p>
                <span className="font-bold dark:text-very-light-gray">
                  Currencies:{" "}
                </span>
                {info.currencies &&
                  Object.values(info.currencies)
                    .map((currency) => currency.name)
                    .join(", ")}
              </p>
              <p>
                <span className="font-bold dark:text-very-light-gray">
                  Languages:{" "}
                </span>
                {info.languages &&
                  Object.values(info.languages)
                    .map((language) => language)
                    .join(", ")}
              </p>
            </div>
          </div>
          <div className="mt-6 xl:mt-10 dark:text-very-light-gray/70">
            <p className="font-bold dark:text-very-light-gray">
              Border Countries:
            </p>
            <div className="flex gap-2 flex-wrap mt-1">
              {info.borders && info.borders.length > 0 ? (
                info.borders.map((border, index) => (
                  <p
                    key={index}
                    className="bg-white px-4 py-1 shadow rounded-sm dark:bg-dark-blue"
                  >
                    {border}
                  </p>
                ))
              ) : (
                <p>No neighboring country</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryInfo;
