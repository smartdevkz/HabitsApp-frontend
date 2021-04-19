import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import HabitDataService from "../../services/habit.service";

export default function HabitsList() {
  
  const loadHabits = (status) => {
    const params = status == "active" ? { is_active: 1 } : {};
    HabitDataService.getAll(params)
      .then((res) => {
        console.log(res.data);
        setHabits(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const loadStatuses = () => {
    setStatuses([
      { title: "Все", is_active: false, value: "all" },
      { title: "Активные", is_active: true, value: "active" },
    ]);
  };

  const [statuses, setStatuses] = useState();

  const [habits, setHabits] = useState([]);

  const [currentItem, setCurrentItem] = useState(null);

  const [newItem, setNewItem] = useState(null);

  const onItemStatusChange = (item) => {
    item.is_active = item.is_active == 0 || !item.is_active ? 1 : 0;
    setNewItem({ ...item });
  };

  const activateStatus = (index) => {
    statuses.forEach((element, i) => {
      element.is_active = index == i;
    });
    setStatuses([...statuses]);
    loadHabits(statuses[index].value);
  };

  useEffect(() => {
    loadStatuses();
    loadHabits("active");
  }, []);

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <Link
            onClick={() => {
              setNewItem({ name: "" });
              setCurrentItem(null);
            }}
          >
            Добавить
          </Link>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Список привычек</h4>

        <ul id="statuses">
          {statuses &&
            statuses.map((st, i) => (
              <li
                className={st.is_active === true ? "active" : ""}
                onClick={() => {
                  activateStatus(i);
                }}
              >
                {st.title}
              </li>
            ))}
        </ul>

        <ul className="list-group">
          {habits &&
            habits.map((item) => (
              <li
                className="list-group-item"
                key={item.name}
                onClick={() => {
                  setCurrentItem(item);
                  setNewItem(null);
                }}
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
              </label>
              {currentItem.name}
            </div>
            <div>
              <label>
                <strong>Статус:</strong>
              </label>
              {currentItem.is_active == 1 ? "Активный" : "Неактивный"}
            </div>
            <div>
              <label>
                <strong>Создан:</strong>
              </label>
              {currentItem.created_at}
            </div>

            <Link
              onClick={() => {
                console.log(currentItem);
                setNewItem({
                  id: currentItem.id,
                  name: currentItem.name,
                  is_active: currentItem.is_active,
                });
                setCurrentItem(null);
              }}
              className="badge badge-warning"
            >
              Редактировать
            </Link>

            <Link
              onClick={() => {
                let confirmDelete = window.confirm(
                  "Вы действительно хотите удалить эту запись?"
                );
                if (confirmDelete) {
                  deleteItem(currentItem, () => activateStatus(1));
                  setCurrentItem(null);
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
                value={newItem.name}
                onChange={(e) =>
                  setNewItem({ ...newItem, name: e.target.value })
                }
                name="name"
              />
            </div>
            <div className="form-group">
              <input
                type="checkbox"
                name="is_active"
                checked={newItem.is_active == 1}
                onChange={() => onItemStatusChange(newItem)}
              />
              <label
                htmlFor="is_active"
                onClick={() => onItemStatusChange(newItem)}
              >
                &nbsp;Активный
              </label>
            </div>
            <button
              onClick={() => {
                save(newItem, () => activateStatus(1));
                setNewItem(null);
              }}
              className="btn btn-success"
            >
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

const save = (newItem, cb) => {
  HabitDataService.create(newItem)
    .then((res) => cb())
    .catch((err) => {
      console.log(err);
    });
};

const deleteItem = (item, cb) => {
  HabitDataService.delete(item.id)
    .then((res) => cb())
    .catch((err) => {
      console.log(err);
    });
};
