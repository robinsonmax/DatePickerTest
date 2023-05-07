import { useState } from "react";
import styles from "./DatePicker.module.scss";
import {
  Calendar2Event,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "react-bootstrap-icons";
import MonthView from "./DatePicker/MonthView";

enum States {
  Date,
  Time,
}

enum Views {
  Month,
  Year,
  Decade,
}

export default function DatePicker({ defaultValue }: { defaultValue?: Date }) {
  const [state, setState] = useState<States>(States.Date);
  const [view, setView] = useState<Views>(Views.Month);
  const [date, setDate] = useState<Date>(defaultValue || new Date());

  const isDateView = state !== States.Time;

  let currentView;
  switch (view) {
    case Views.Month:
      currentView = <MonthView date={date} setDate={setDate} />;
  }

  return (
    <div className={styles.container}>
      <div
        className={`${styles.sectionContainer} ${
          isDateView ? styles.expand : ""
        }`}
      >
        <div className={styles.dateSection}>{currentView}</div>
      </div>
      <div
        className={`${styles.switch} ${isDateView ? styles.date : styles.time}`}
      >
        <button
          className="btn"
          onClick={() => {
            setState((state) => {
              if (state === States.Time) {
                setView(Views.Month);
                return States.Date;
              }
              return States.Time;
            });
          }}
        >
          {state == States.Time ? <Calendar2Event /> : <Clock />}
        </button>
      </div>
      <div
        className={`${styles.sectionContainer} ${
          state === States.Time ? styles.expand : ""
        }`}
      >
        <div className={styles.timeSection}>
          <div style={{ textAlign: "center" }}>
            <p>Time Picker</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const DatePickerTitle = ({ text }: { text: string }) => {
  return (
    <div className={styles.tableTitle}>
      <button className={styles.icon}>
        <ChevronLeft />
      </button>
      <button className={styles.title}>{text}</button>
      <button className={styles.icon}>
        <ChevronRight />
      </button>
    </div>
  );
};
