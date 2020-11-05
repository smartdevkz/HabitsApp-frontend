import React, { useState, useEffect } from "react";
import JournalDataService from "../../../services/journal.service";

export function JournalCell(props) {
  const [mark, setMark] = useState();
  const [data, setData] = useState(props.data);

  useEffect(() => {
    setMark(data ? "+" : "-");
  }, [data]);

  return (
    <div
      className={getBackgroundClass(props.day)}
      onClick={() => toggleMark(props, mark)}
    >
      {mark}
    </div>
  );

  function toggleMark(props, mark) {
    const day = props.day;
    if (mark == "-") {
      const habitId = props.habitId;
      addMark(habitId, day, (newMark) => setData(newMark));
    } else if (mark == "+") {
      if (data.id) removeMark(data.id, () => setData(null));
    }
  }

  function getBackgroundClass(currentDay) {
    var today = new Date().getDate();
    if (today > currentDay) return "cell last_day";
    else if (today == currentDay) return "cell current_day";
    return "cell";
  }

  function addMark(habitId, day, cb) {
    const dt = new Date();
    const year = dt.getFullYear();
    const month = dt.getMonth();

    var journal = {
      habit_id: habitId,
      date: new Date(year, month, ++day),
    };

    JournalDataService.save(journal)
      .then((res) => {
        cb(res.data.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function removeMark(id, cb) {
    console.log(id);
    JournalDataService.delete(id)
      .then((res) => {
        cb();
      })
      .catch((e) => {
        console.log(e);
      });
  }
}
