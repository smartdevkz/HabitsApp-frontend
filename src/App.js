import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav mr-auto">
        <nav className="navbar navbar-light">
          <a className="navbar-brand" href="#">
            HabitsApp
          </a>
        </nav>
        <li className="nav-item">
          <Link to={"/habits"} className="nav-link">
            Привычки
          </Link>
        </li>
        <li className="nav-item">
          <Link to={"/journal"} className="nav-link">
            Журнал
          </Link>
        </li>
      </div>
    </nav>
  );
}

export default App;
