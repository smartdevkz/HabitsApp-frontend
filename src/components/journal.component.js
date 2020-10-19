import React, { Component } from "react";
import JournalDataService from "../services/journal.service";

export default class Journal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      habits: [],
    };
  }

  componentDidMount() {
    this.loadHabits();
  }

  render() {
    const habits = this.state.habits;
    var daysCount = new Date(this.getYear(), this.getMonth() + 1, 0).getDate();
    var today = new Date().getDate();

    return (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th></th>
              <th></th>
              {[...Array(daysCount).keys()].map((j) => (
                <th className="cell">{j + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {habits &&
              habits.map((item, i) => {
                this.fillHabitJournal(item, daysCount);
                return (
                  <tr key={i}>
                    <td>{i + 1}.</td>
                    <td>{item.name}</td>
                    {item.journals.map((journal, j) => {
                      return (
                        <td
                          className={
                            "cell " +
                            (today > j + 1
                              ? "last_day"
                              : today == j + 1
                              ? "current_day"
                              : "")
                          }
                          onClick={(e, id) => this.togglePlus(e, item, j + 1)}
                        >
                          {this.getMark(journal)}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }

  getMark(record) {
    return record == null ? <span>-</span> : <span>+</span>;
  }

  fillHabitJournal(item, daysCount) {
    var arr = [];

    var k = 0;
    for (var i = 0; i < daysCount; i++) {
      if (item.journals.length > k) {
        var d = new Date(item.journals[k].date).getDate();
        if (d === i + 1) {
          arr.push(item.journals[k]);
          k++;
        } else {
          arr.push(null);
        }
      } else {
        arr.push(null);
      }
    }

    item.journals = arr;
  }

  loadHabits() {
    JournalDataService.getAll(this.getYear(), this.getMonth() + 1)
      .then((res) => {
        console.log(res.data.data);
        this.setState({ habits: res.data.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  togglePlus(e, item, day) {
    if (e.target.innerHTML === "-") {
      e.target.innerHTML = "+";
      this.addMark(item, day);
    } else {
      e.target.innerHTML = "-";
      this.removeMark(item, day);
    }
  }

  addMark(item, day) {
    var journal = {
      habit_id: item.id,
      date: new Date(this.getYear(), this.getMonth(), ++day),
    };

    JournalDataService.save(journal)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeMark(item, day) {
    JournalDataService.delete(item.journals[day - 1].id)
      .then((res) => {
        console.log(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  getMonth() {
    return new Date().getMonth();
  }
  getYear() {
    return new Date().getFullYear();
  }
}
