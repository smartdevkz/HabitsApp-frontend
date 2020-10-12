import React, { Component } from "react";
import { Link } from "react-router-dom";
import HabitDataService from "../services/habit.service";

export default class HabitsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      habits: [],
      currentItem: null,
    };
  }

  componentDidMount() {
    this.loadHabits();
  }

  loadHabits() {
    HabitDataService.getAll()
      .then((res) => {
        this.setState({
          habits: res.data.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { habits, currentItem } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3"></div>
        </div>
        <div className="col-md-6">
          <h4>Список привычек</h4>

          <ul className="list-group">
            {habits &&
              habits.map((item, index) => (
                <li
                  className="list-group-item"
                  key={index}
                  onClick={() => this.showItem(item, index)}
                >
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentItem ? (
            <div>
              <h4>Привычка</h4>
              <div>
                <label>
                  <strong>Описание:</strong>
                </label>{" "}
                {currentItem.name}
              </div>
              <div>
                <label>
                  <strong>Статус:</strong>
                </label>{" "}
                {currentItem.is_active ? "Активный" : "Неактивный"}
              </div>
              <div>
                <label>
                  <strong>Создан:</strong>
                </label>{" "}
                {currentItem.created_at}
              </div>

              <Link
                to={"/habits/" + currentItem.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Tutorial...</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  showItem(item, index) {
    console.log(item);
    this.setState({
      currentItem: item,
    });
  }
}
