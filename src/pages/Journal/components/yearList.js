import React, { useState, useEffect } from "react";
import JournalService from "../../../services/journal.service";

export default function YearList(props) {
  const [years, setYears] = useState();

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    props.onChange(selectedYear);
  }, []);

  useEffect(() => {
    loadYears();
  }, []);

  return (
    <div>
      <select value={selectedYear} onChange={handleChange}>
        {years &&
          years.map((item) => {
            return (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            );
          })}
      </select>
    </div>
  );

  function loadYears() {
    JournalService.getYears()
      .then((res) => {
        setYears(
          res.data.data.map((item) => ({
            text: item.year,
            value: item.year,
            selected: false,
          }))
        );
        if (res.data.data.length == 1) props.onChange(res.data.data[0].year);
      })
      .catch((err) => console.log(err));
  }

  function handleChange(e) {
    const year = e.target.value;
    setSelectedYear(year);
    props.onChange(year);
  }
}
