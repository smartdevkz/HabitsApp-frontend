import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserService from "./services/user.service";

function App() {
  UserService.validateUserData();

  const [user, setUser] = useState(0);

  useEffect(() => {
    console.log("app js userEffect");
    let user = UserService.getUserFromLocalStorage();
    setUser(user);
  }, []);

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-nav mr-auto">
        <nav className="navbar navbar-light">
          <a className="navbar-brand" href="/">
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
      <div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
        {!user && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/user/login"} className="nav-link">
                Логин
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/user/register"} className="nav-link">
                Регистрация
              </Link>
            </li>
          </ul>
        )}
        {user && (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"#"} className="nav-link">
                {user.email}
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={() => {
                  UserService.logout();
                  window.location.href = "/";
                }}
                to={"/"}
                className="nav-link"
              >
                Выйти
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default App;
