import { useState } from "react";
import styles from "./DatePicker.module.scss";

enum States {
  Date,
  Time,
}

export default function DatePicker() {
  const [state, setState] = useState<States>(States.Date);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.sectionContainer} ${
          state === States.Date ? styles.expand : ""
        }`}
      >
        <div className={styles.section}>
          Date Picker
          <br />
          Date Picker
          <br />
          Date Picker
          <br />
          Date Picker
          <br />
          Date Picker
          <br />
          Date Picker
          <br />
          Date Picker
          <br />
          Date Picker
          <br />
          Date Picker
          <br />
          Date Picker
        </div>
      </div>
      <div className={styles.switch}>
        <button
          onClick={() => {
            setState((state) =>
              state === States.Date ? States.Time : States.Date
            );
          }}
        >
          Toggle
        </button>
      </div>
      <div
        className={`${styles.sectionContainer} ${
          state === States.Time ? styles.expand : ""
        }`}
      >
        <div className={styles.section}>
          Time Picker
          <br />
          Time Picker
          <br />
          Time Picker
          <br />
          Time Picker
          <br />
          Time Picker
        </div>
      </div>
    </div>
  );
}
