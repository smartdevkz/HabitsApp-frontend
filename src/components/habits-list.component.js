import React, { Component } from "react";
import HabitDataService from "../services/habit.service";

export default class HabitsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      habits: [],
    };
  }

  componentDidMount() {
    this.loadHabits();
  }

  loadHabits() {
    HabitDataService.getAll()
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          habits: res.data.data,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    var habits = this.state.habits;

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
                <li className="list-group-item" key={index}>
                  {item.name}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">Current habit</div>
      </div>
    );
  }
}
