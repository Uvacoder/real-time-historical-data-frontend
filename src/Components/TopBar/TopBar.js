import React from "react";
import { Link } from "react-router-dom";
import classes from "./TopBar.module.css";

export default function TopBar() {
  return (
    <div className={classes.Topbarwrapper}>
      <Link className={classes.linkText} to="/">
        Home
      </Link>
      <Link className={classes.linkText} to="/sort">
        Sort Data
      </Link>
    </div>
  );
}
