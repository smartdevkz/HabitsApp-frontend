import React, { Component } from "react";
import { Link } from "react-router-dom";
import HabitDataService from "../services/habit.service";

export default class HabitsList extends Component {
  constructor(props) {
    super(props);

    this.onChangeName = this.onChangeName.bind(this);

    this.state = {
      habits: [],
      currentItem: null,
      newItem: null,
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
    const newItem = this.state.newItem;
    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <Link onClick={() => this.showNewItemForm()}>Добавить</Link>
          </div>
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
                onClick={() => this.showEditItemForm(currentItem)}
                className="badge badge-warning"
              >
                Редактировать
              </Link>

              <Link
                onClick={() => {
                  if (
                    window.confirm(
                      "Вы действительно хотите удалить эту запись?"
                    )
                  ) {
                    this.deleteItem(currentItem);
                  }
                }}
                className="badge badge-default"
              >
                Удалить
              </Link>
            </div>
          ) : (
            <span></span>
          )}
          {newItem ? (
            <div>
              <div className="form-group">
                <label htmlFor="name">Описание</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={this.state.newItem.name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>
              <button onClick={() => this.save()} className="btn btn-success">
                Сохранить
              </button>
            </div>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    );
  }

  onChangeName(e) {
    const oldItem = this.state.newItem;
    oldItem.name = e.target.value;

    this.setState(oldItem);
  }

  save() {
    const newItem = this.state.newItem;

    HabitDataService.create(newItem)
      .then((res) => {
        console.log(res);
        this.loadHabits();
        this.setState({
          newItem: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  showItem(item, index) {
    console.log(item);
    this.setState({
      currentItem: item,
    });
  }

  showNewItemForm() {
    this.setState({
      newItem: {
        name: "",
      },
      currentItem: null,
    });
  }

  showEditItemForm(item) {
    this.setState({
      newItem: {
        id: item.id,
        name: item.name,
      },
      currentItem: null,
    });
  }

  deleteItem(item) {
    HabitDataService.delete(item.id)
      .then((res) => {
        console.log(res);
        this.loadHabits();
        this.setState({
          newItem: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
