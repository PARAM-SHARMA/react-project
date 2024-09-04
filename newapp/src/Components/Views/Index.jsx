import React from "react";
import { Link } from "react-router-dom";
import styles from './style.module.css';

export default function Index() {
  return (
    <>
      <div id="index" className={`${styles.center} container-fluid d-flex flex-column justify-content-center align-items-center`}>
        <h1>Welcome to My React Project</h1>
        <p className="text-muted">Click the button below to browse the app</p>
        <div>
          <Link to="/notebook"><button className={`${styles.buttonPrimary} btn btn-primary rounded-0 px-4 mx-3 bg-transparent text-primary`}>Notebook</button></Link>
          <Link to="/todoist"><button className={`${styles.buttonSecondary} btn btn-secondary rounded-0 px-4 mx-3 bg-transparent text-secondary`}>Todoist</button></Link>
        </div>
      </div>
    </>
  )
}