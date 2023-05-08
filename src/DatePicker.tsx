import { useContext, useReducer } from "react";
import styles from "./DatePicker.module.scss";
import { Calendar2Event, Clock } from "react-bootstrap-icons";
import DayView from "./DatePicker/DayView";
import YearView from "./DatePicker/YearView";
import MonthView from "./DatePicker/MonthView";
import { LocaleContext } from "./LocaleContextComponent";

export enum States {
  Date,
  Time,
}

export enum Views {
  Day,
  Month,
  Year,
}

export type DatePickerState = {
  selectedDate: Date;
  focusDate: Date;
  view: Views;
  state: States;
  locale: string;
};

export type DatePickerAction = {
  type:
    | "selectDate"
    | "setFocus"
    | "toggleState"
    | "dayView"
    | "monthView"
    | "yearView";
  date?: Date;
};

const reducer = (
  state: DatePickerState,
  action: DatePickerAction
): DatePickerState => {
  switch (action.type) {
    case "selectDate":
      if (!action.date) {
        throw new Error("Date picker action requires a date");
      }
      return {
        ...state,
        selectedDate: action.date,
        focusDate: action.date,
        view: Views.Day,
        state: States.Date,
      };
    case "setFocus":
      if (!action.date) {
        throw new Error("Date picker action requires a date");
      }
      return {
        ...state,
        focusDate: action.date,
      };
    case "toggleState":
      return {
        ...state,
        state: state.state === States.Time ? States.Date : States.Time,
      };
    case "dayView":
      return {
        ...state,
        focusDate: action.date || state.focusDate,
        view: Views.Day,
      };
    case "monthView":
      return {
        ...state,
        focusDate: action.date || state.focusDate,
        view: Views.Month,
      };
    case "yearView":
      return {
        ...state,
        view: Views.Year,
      };
    default:
      throw new Error("Date picker action doesn't exist");
  }
};

export default function DatePicker({
  defaultValue,
  onChange,
}: {
  defaultValue?: Date;
  onChange?: (date: Date) => any;
}) {
  const locale = useContext(LocaleContext);

  const [state, dispatch] = useReducer(reducer, {
    selectedDate: defaultValue || new Date(),
    focusDate: defaultValue || new Date(),
    view: Views.Day,
    state: States.Date,
    locale: locale,
  });

  const selectDate = (date: Date) => {
    dispatch({
      type: "selectDate",
      date: date,
    });

    onChange && onChange(date);
  };

  const isDateView = state.state === States.Date;

  let currentView;
  switch (state.view) {
    case Views.Day:
      currentView = (
        <DayView state={state} dispatch={dispatch} selectDate={selectDate} />
      );
      break;
    case Views.Month:
      currentView = <MonthView state={state} dispatch={dispatch} />;
      break;
    case Views.Year:
      currentView = <YearView state={state} dispatch={dispatch} />;
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
            dispatch({ type: "toggleState" });
          }}
        >
          {isDateView ? <Clock /> : <Calendar2Event />}
        </button>
      </div>
      <div
        className={`${styles.sectionContainer} ${
          !isDateView ? styles.expand : ""
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
