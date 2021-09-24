import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import classes from "./HomePage.module.css";

export default function HomePage() {
  const socketRef = useRef();
  const connectionURL = "https://realtimedata-backend.herokuapp.com/";

  //useStates
  const [rtData, setrtData] = useState([]);
  const [start, setstart] = useState(true);
  //console.log(rtData);

  useEffect(() => {
    socketRef.current = io.connect(connectionURL, {
      transports: ["websocket"],
    });
    socketRef.current.emit("join", "NAN");
    socketRef.current.on("showrtdata", (data) => {
      //console.log(data);
      setrtData(data);
    });
    // socketRef.current.on("user-disconnected" , ()=>{
    //   setstart(false)
    // })
  }, []);

  const handleStartandStop = () => {
    socketRef.current.emit("savert-data", start);
    setstart(!start);
  };

  return (
    <div className={classes.HomepageWrapper}>
      <button onClick={handleStartandStop}>
        {start ? "Start Real Time Uploading" : "Stop Real Time Uploading"}
      </button>
      <div className={classes.tableWrapper}>
        <table>
          <thead>
            <tr className={classes.tableHeadingRow}>
              <th>Sr. No.</th>
              <th>batteryLevel</th>
              <th>temperature</th>
              <th>timeStamp</th>
            </tr>
          </thead>
          <tbody>
            {rtData &&
              rtData.map((item, pos) => {
                const { batteryLevel, temperature, timeStamp } = item;
                //console.log(item);
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
      </div>
    </div>
  );
}
