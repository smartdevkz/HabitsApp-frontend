import React from "react";
import MonthList from "./monthList.component";
import YearList from "./yearList";

export default function Calendar(props) {
  return (
    <table>
      <tr>
        <td><YearList setYear={props.setYear} /></td>
        <td><MonthList setMonth={props.setMonth} /></td>
      </tr>
    </table>
  );
}
