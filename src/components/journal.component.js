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
    return (
      <div>
        <p>{"dayCount:" + daysCount}</p>
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
                          className="cell"
                          onClick={(e, id) => this.setPlus(e, item, j + 1)}
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
    var arr = new Array();

    var k = 0;
    for (var i = 0; i < daysCount; i++) {
      if (item.journals.length > k) {
        var d = new Date(item.journals[k].date).getDate();
        if (d == i + 1) {
          console.log("d=" + d + " i=" + (i + 1));
          console.log(item.journals[k]);
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

  setPlus(e, item, day) {
    console.log(day);
    e.target.innerHTML = "+";
    this.markCell(item, day);
  }

  markCell(item, day) {
    console.log(item);
    console.log(day);

    var journal = {
      habit_id: item.id,
      date: new Date(this.getYear(), this.getMonth(), ++day),
    };
    console.log(journal);
    JournalDataService.save(journal)
      .then((res) => {
        console.log(res.data.data);
        //this.setState({ habits: res.data.data });
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
