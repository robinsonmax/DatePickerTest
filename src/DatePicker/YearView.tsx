import { Dispatch } from "react";
import {
  DatePickerAction,
  DatePickerHeader,
  DatePickerState,
} from "../DatePicker";
import styles from "../DatePicker.module.scss";

export default function YearView({
  state,
  dispatch,
}: {
  state: DatePickerState;
  dispatch: Dispatch<DatePickerAction>;
}) {
  const changeYear = (increment: number) => {
    dispatch({
      type: "setFocus",
      date: new Date(
        state.focusDate.getFullYear() + increment,
        state.focusDate.getMonth(),
        1
      ),
    });
  };

  const monthView = (year: number) => {
    const month =
      year === state.selectedDate.getFullYear()
        ? state.selectedDate.getMonth()
        : 0;

    dispatch({
      type: "monthView",
      date: new Date(year, month, 1),
    });
  };

  const firstYearOfDecade = Math.floor(state.focusDate.getFullYear() / 10) * 10;

  let rows: number[] = [];
  for (let row = firstYearOfDecade; row < firstYearOfDecade + 10; row += 2) {
    rows.push(row);
  }

  return (
    <div className={styles.yearView}>
      <table>
        <thead>
          <tr>
            <DatePickerHeader
              text={`${firstYearOfDecade} - ${firstYearOfDecade + 9}`}
              previousClick={() => {
                changeYear(-10);
              }}
              nextClick={() => {
                changeYear(10);
              }}
            />
          </tr>
        </thead>
        <tbody>
          {rows.map((year, index) => {
            const evenYearActive = state.selectedDate.getFullYear() === year;
            const oddYearActive = state.selectedDate.getFullYear() === year + 1;

            return (
              <tr key={index}>
                <td className={evenYearActive ? styles.active : ""}>
                  <button
                    onClick={() => {
                      monthView(year);
                    }}
                  >
                    {year}
                  </button>
                </td>
                <td className={oddYearActive ? styles.active : ""}>
                  <button
                    onClick={() => {
                      monthView(year + 1);
                    }}
                  >
                    {year + 1}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
