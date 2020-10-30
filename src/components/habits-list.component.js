import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HabitDataService from "../services/habit.service";

export default function HabitsList() {

  const loadHabits = () => {
    HabitDataService.getAll()
      .then((res) => {
        setHabits(res.data.data)
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const [habits, setHabits] = useState([]);

  const [currentItem, setCurrentItem] = useState(null);

  const [newItem, setNewItem] = useState(null);

  useEffect(() => loadHabits(), []);

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <Link 
             onClick={() => {setNewItem({name: ""})
                              setCurrentItem(null)}}
            >Добавить</Link>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Список привычек</h4>

          <ul className="list-group">
            {habits.map(item => (
                <li
                  className="list-group-item"
                  key={item.name}
                  onClick={() => {setCurrentItem(item)
                                  setNewItem(null)}}
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
                {currentItem.is_active ? "Активный" : "Неактивный"}
              </div>
              <div>
                <label>
                  <strong>Создан:</strong>
                </label>
                {currentItem.created_at}
              </div>

              <Link
                onClick={() => {setNewItem({id: currentItem.id,
                                            name: currentItem.name});
                                setCurrentItem(null);}} 
                className="badge badge-warning"
              >
                Редактировать
              </Link>

              <Link
                onClick={() => {
                  let confirmDelete = window.confirm("Вы действительно хотите удалить эту запись?")
                  if(confirmDelete) {
                    deleteItem(currentItem, loadHabits)
                    setCurrentItem(null)
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
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  name="name"
                />
              </div>
              <button 
               onClick={() => {save(newItem, loadHabits)
                               setNewItem(null)}}
               className="btn btn-success">
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
    HabitDataService.create(newItem).then((res)=>cb()).catch((err) => {console.log(err)})
  }

const deleteItem = (item, cb) => {
    HabitDataService.delete(item.id).then((res)=>cb()).catch((err) => {console.log(err)})
  }
