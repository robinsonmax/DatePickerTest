import { useState } from "react";
import styles from "./DatePicker.module.scss";
import {
  Calendar2Event,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "react-bootstrap-icons";

enum States {
  Month,
  Year,
  Decade,
  Time,
}

export default function DatePicker() {
  const [state, setState] = useState<States>(States.Month);

  const isDateView = state !== States.Time;

  return (
    <div className={styles.container}>
      <div
        className={`${styles.sectionContainer} ${
          isDateView ? styles.expand : ""
        }`}
      >
        <div className={styles.dateSection}>
          <div>
            <table>
              <thead>
                <tr>
                  <th colSpan={7}>
                    <Title text="May" />
                  </th>
                </tr>
                <tr>
                  <th>S</th>
                  <th>M</th>
                  <th>T</th>
                  <th>W</th>
                  <th>T</th>
                  <th>F</th>
                  <th>S</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <button>30</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button>7</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button>14</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button>21</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <button>28</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        className={`${styles.switch} ${isDateView ? styles.date : styles.time}`}
      >
        <button
          className="btn"
          onClick={() => {
            setState((state) =>
              state === States.Time ? States.Month : States.Time
            );
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

const Title = ({ text }: { text: string }) => {
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
