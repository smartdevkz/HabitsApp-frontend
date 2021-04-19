import React, { useState, useEffect } from "react";

export default function MonthList(props) {
  const [months, setMonths] = useState(getMonths());

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  let handleChange = (e) => {
    const month = e.target.value;
    setSelectedMonth(month);
    props.onChange(month);
  };

  useEffect(() => {
    props.onChange(selectedMonth);
  }, []);

  return (
    <>
      <select value={selectedMonth} onChange={handleChange}>
        {months &&
          months.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
      </select>
    </>
  );
}

function getMonths() {
  return [
    { id: 1, name: "Январь" },
    { id: 2, name: "Февраль" },
    { id: 3, name: "Март" },
    { id: 4, name: "Апрель" },
    { id: 5, name: "Май" },
    { id: 6, name: "Июнь" },
    { id: 7, name: "Июль" },
    { id: 8, name: "Август" },
    { id: 9, name: "Сентябрь" },
    { id: 10, name: "Октябрь" },
    { id: 11, name: "Ноябрь" },
    { id: 12, name: "Декабрь" },
  ];
}
