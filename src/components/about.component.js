import React, { Component } from "react";

export default class About extends Component {
  componentDidMount() {
    document.title = "HabitsApp - трекер привычек";
  }

  render() {
    return (
      <div>
        <h3>О проекте</h3>
        <p>
          С <b>HabitsApp</b> создавай правильные привычки. Останови вредные.
          Становись лучше.
        </p>
        <br />
        <br />
        <p>
          Для тех, кто хочет участвовать в разработке проекта:{" "}
          <a href="https://github.com/smartdevkz/HabitsApp-frontend">Github</a>
        </p>
        <p>
          По всем вопросам:{" "}
          <a href="https://t.me/YerlanKarakulov">Telegram</a>
        </p>
      </div>
    );
  }
}
