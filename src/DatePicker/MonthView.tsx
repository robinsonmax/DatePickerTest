import { Dispatch } from "react";
import {
  DatePickerAction,
  DatePickerHeader,
  DatePickerState,
} from "../DatePicker";
import styles from "../DatePicker.module.scss";

export default function MonthView({
  state,
  dispatch,
}: {
  state: DatePickerState;
  dispatch: Dispatch<DatePickerAction>;
}) {
  const yearView = () => {
    dispatch({
      type: "yearView",
    });
  };

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

  const dayView = (month: number) => {
    dispatch({
      type: "dayView",
      date: new Date(state.focusDate.getFullYear(), month, 1),
    });
  };

  return (
    <div className={styles.yearView}>
      <table>
        <thead>
          <tr>
            <DatePickerHeader
              text={state.focusDate.getFullYear().toString()}
              titleClick={yearView}
              previousClick={() => {
                changeYear(-1);
              }}
              nextClick={() => {
                changeYear(1);
              }}
            />
          </tr>
        </thead>
        <tbody>
          {[...Array(4)].map((_, row) => (
            <tr key={row}>
              {[...Array(3)].map((_, col) => {
                const month = row * 3 + col;
                const isActive =
                  month === state.selectedDate.getMonth() &&
                  state.selectedDate.getFullYear() ===
                    state.focusDate.getFullYear();

                const monthName = new Date(
                  state.focusDate.getFullYear(),
                  month,
                  1
                ).toLocaleString(state.locale.toString(), {
                  month: "short",
                });

                return (
                  <td key={col} className={isActive ? styles.active : ""}>
                    <button
                      onClick={() => {
                        dayView(month);
                      }}
                    >
                      {monthName}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
