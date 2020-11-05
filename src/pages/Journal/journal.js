import React, { Component } from "react";
import JournalDataService from "../../services/journal.service";
import { JournalCell } from "./components/journal-cell.component";

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
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    var daysCount = new Date(year, month, 0).getDate();

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
                    {item.journals.map((record, j) => {
                      return (
                        <td>
                          <JournalCell
                            day={j + 1}
                            data={record}
                            habitId={item.id}
                          />
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
    return <span>${record == null ? "-" : "+"}</span>;
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
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    JournalDataService.getAll(year, month)
      .then((res) => {
        console.log(res.data.data);
        this.setState({ habits: res.data.data });
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
