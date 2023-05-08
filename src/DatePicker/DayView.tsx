import { Dispatch } from "react";
import { DatePickerAction, DatePickerState } from "../DatePicker";
import styles from "../DatePicker.module.scss";
import DatePickerHeader from "./Header";

export default function DayView({
  state,
  dispatch,
  selectDate,
}: {
  state: DatePickerState;
  dispatch: Dispatch<DatePickerAction>;
  selectDate: (date: Date) => void;
}) {
  const monthView = () => {
    dispatch({
      type: "monthView",
    });
  };

  const changeMonth = (increment: number) => {
    dispatch({
      type: "setFocus",
      date: new Date(
        state.focusDate.getFullYear(),
        state.focusDate.getMonth() + increment,
        1
      ),
    });
  };

  const monthName = state.focusDate.toLocaleString(state.locale.toString(), {
    month: "long",
  });

  const firstDayOfMonth = new Date(
    state.focusDate.getFullYear(),
    state.focusDate.getMonth(),
    1
  );

  // Doing this maths for Februaries that start on a Sunday (e.g. Feb 2026)
  // (so they have a row before and after, instead of 2 rows after)
  const calendarOffset = (firstDayOfMonth.getDay() + 6) % 7;

  // A list of days at 1 week intervals, starting from the last day of the previous month
  // 0th, 7th, 14th, 21st, 28th, 35th
  let anchors: Date[] = [];
  for (let index = 0; index <= 5; index++) {
    anchors.push(
      new Date(
        state.focusDate.getFullYear(),
        state.focusDate.getMonth(),
        index * 7
      )
    );
  }

  return (
    <div className={styles.dayView}>
      <table>
        <thead>
          <tr>
            <DatePickerHeader
              text={`${monthName} ${state.focusDate.getFullYear()}`}
              titleClick={monthView}
              previousClick={() => {
                changeMonth(-1);
              }}
              nextClick={() => {
                changeMonth(1);
              }}
            />
          </tr>
          <tr>
            <th>Su</th>
            <th>Mo</th>
            <th>Tu</th>
            <th>We</th>
            <th>Th</th>
            <th>Fr</th>
            <th>Sa</th>
          </tr>
        </thead>
        <tbody>
          {anchors.map((anchorDate, index) => {
            // For each day of the week, get the date based off the anchor date
            let days: Date[] = [];
            for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
              let date = new Date(anchorDate);
              date.setDate(anchorDate.getDate() + dayOfWeek - calendarOffset);
              days.push(date);
            }

            return (
              <tr key={index}>
                {days.map((date, index) => {
                  const isOutOfMonth =
                    date.getMonth() !== state.focusDate.getMonth();
                  const isActive = IsSameDate(date, state.selectedDate);
                  const isToday = IsSameDate(date, new Date());

                  return (
                    <td
                      key={index}
                      className={`${isOutOfMonth ? styles.outOfMonth : ""} ${
                        isActive ? styles.active : ""
                      } ${isToday ? styles.today : ""}`}
                    >
                      <button
                        onClick={() => {
                          selectDate(date);
                        }}
                      >
                        {date.getDate()}
                      </button>
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

/**
 * Checks if the dates are the same, ignoring the time and timezones
 * @param a Date A
 * @param b Date B
 */
const IsSameDate = (a: Date, b: Date): boolean => {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
};
