import React, { useState } from "react";
import classes from "./SortDataPage.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function SortDataPage() {
  const [isShowRangeSelector, setisShowRangeSelector] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [sortedData, setsortedData] = useState([]);
  let startDateOut = "";
  let endDateOut = "";

  const handleFilter = (startDate, endDate) => {
    let url = "https://realtimedata-backend.herokuapp.com/getsorteddata";
    let data = {
      startDate: startDate,
      endDate: endDate,
    };
    setsortedData(true);
    //const { apiResults, isLoading } = UseFetchAPI(url, "post", data);
    axios
      .post(url, data)
      .then((response) => {
        console.log(response);
        setsortedData(response.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CreateCalenderUI = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          startDateOut = "";
          startDateOut = date;
          setStartDate(date);
        }}
        dateFormat={`yyyy-MM-dd`}
      />
    );
  };
  const CreateCalenderUI2 = () => {
    const [endDate, setEndDate] = useState(new Date());
    return (
      <DatePicker
        selected={endDate}
        onChange={(date) => {
          endDateOut = "";
          endDateOut = date.toLocaleString();
          setEndDate(date);
        }}
        dateFormat={`yyyy-MM-dd`}
      />
    );
  };

  return (
    <div className={classes.sortDataPageWrapper}>
      <button
        onClick={() => {
          setisShowRangeSelector(!isShowRangeSelector);
        }}
      >
        select range
      </button>

      <div className={classes.dateselectorWrapper}>
        {isShowRangeSelector ? (
          <div className={classes.calendorWrapper}>
            <CreateCalenderUI />
            <h3>to</h3>
            <CreateCalenderUI2 />
            <button
              onClick={() => {
                handleFilter(startDateOut, endDateOut);
              }}
            >
              Filter
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className={classes.tableWrapper}>
        {isLoading ? (
          <h3>Loading...</h3>
        ) : (
          <div>
            {sortedData.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Sr. No.</th>
                    <th>batteryLevel</th>
                    <th>temperature</th>
                    <th>timeStamp</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.length > 0 &&
                    sortedData.map((item, pos) => {
                      const { batteryLevel, temperature, timeStamp } = item;
                      return (
                        <tr key={pos}>
                          <td>{pos + 1}</td>
                          <td>{batteryLevel}</td>
                          <td>{temperature}</td>
                          <td>{timeStamp}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            ) : (
              <h3>No data found</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
