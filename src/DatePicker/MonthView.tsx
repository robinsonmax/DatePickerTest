import { Dispatch, useContext } from "react";
import {
  DatePickerAction,
  DatePickerHeader,
  DatePickerState,
} from "../DatePicker";
import { LocaleContext } from "../LocaleContextComponent";
import styles from "../DatePicker.module.scss";

export default function MonthView({
  state,
  dispatch,
}: {
  state: DatePickerState;
  dispatch: Dispatch<DatePickerAction>;
}) {
  const locale = useContext(LocaleContext);

  const yearView = () => {
    dispatch({
      type: "yearView",
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

  const selectDate = (date: Date) => {
    dispatch({
      type: "selectDate",
      date: date,
    });
  };

  const monthName = state.focusDate.toLocaleString(locale.toString(), {
    month: "long",
  });

  const firstDayOfMonth = new Date(
    state.focusDate.getFullYear(),
    state.focusDate.getMonth(),
    1
  );
  const calendarOffset = firstDayOfMonth.getDay();

  // A list of days at 1 week intervals, starting from the 1st of the month
  // 1st, 8th, 15th, 22nd, 29th
  let anchors: Date[] = [];
  for (
    let index = 1;
    index <=
    DaysInMonth(state.focusDate.getMonth() + 1, state.focusDate.getFullYear()) +
      calendarOffset;
    index += 7
  ) {
    anchors.push(
      new Date(state.focusDate.getFullYear(), state.focusDate.getMonth(), index)
    );
  }

  return (
    <div className={styles.monthView}>
      <table>
        <thead>
          <tr>
            <DatePickerHeader
              text={`${monthName} ${state.focusDate.getFullYear()}`}
              titleClick={yearView}
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
            return (
              <tr key={index}>
                <GenerateRow
                  activeDay={state.selectedDate}
                  focusDate={state.focusDate}
                  anchorDate={anchorDate}
                  offset={calendarOffset}
                  onClick={selectDate}
                />
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Generates a row of dates around the anchorDate
 * @param param0 Properties
 * @returns
 */
const GenerateRow = ({
  activeDay, // The selected day
  focusDate,
  anchorDate,
  offset,
  onClick,
}: {
  activeDay: Date;
  focusDate: Date;
  anchorDate: Date;
  offset: number;
  onClick: (date: Date) => void;
}) => {
  // For each day of the week, get the date based off the anchor date
  let days: Date[] = [];
  for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
    let date = new Date(anchorDate);
    date.setDate(anchorDate.getDate() + dayOfWeek - offset);
    days.push(date);
  }

  return (
    <>
      {days.map((date, index) => {
        const isOutOfMonth = date.getMonth() !== focusDate.getMonth();
        const isActive = IsSameDate(date, activeDay);
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
                onClick(date);
              }}
            >
              {date.getDate()}
            </button>
          </td>
        );
      })}
    </>
  );
};

/**
 * Gets the number of days in a month
 * @param month the month (0-11)
 * @param year the year
 * @returns the number of days in that month
 */
const DaysInMonth = (month: number, year: number): number => {
  return new Date(year, month, 0).getDate();
};

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
