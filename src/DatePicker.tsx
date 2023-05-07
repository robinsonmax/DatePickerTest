import { useReducer } from "react";
import styles from "./DatePicker.module.scss";
import {
  Calendar2Event,
  ChevronLeft,
  ChevronRight,
  Clock,
} from "react-bootstrap-icons";
import MonthView from "./DatePicker/MonthView";
import YearView from "./DatePicker/YearView";

export enum States {
  Date,
  Time,
}

export enum Views {
  Month,
  Year,
}

export type DatePickerState = {
  selectedDate: Date;
  focusDate: Date;
  view: Views;
  state: States;
};

export type DatePickerAction = {
  type: "selectDate" | "setFocus" | "toggleState" | "monthView" | "yearView";
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
        selectedDate: action.date,
        focusDate: action.date,
        view: Views.Month,
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
    case "monthView":
      if (!action.date) {
        throw new Error("Date picker action requires a date");
      }
      return {
        ...state,
        focusDate: action.date,
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

export default function DatePicker({ defaultValue }: { defaultValue?: Date }) {
  const [state, dispatch] = useReducer(reducer, {
    selectedDate: defaultValue || new Date(),
    focusDate: defaultValue || new Date(),
    view: Views.Month,
    state: States.Date,
  });

  const isDateView = state.state === States.Date;

  let currentView;
  switch (state.view) {
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

export const DatePickerHeader = ({
  text,
  titleClick,
  previousClick,
  nextClick,
}: {
  text: string;
  titleClick?: () => void;
  previousClick?: () => void;
  nextClick?: () => void;
}) => {
  const title = titleClick ? (
    <button className={styles.title} onClick={titleClick}>
      {text}
    </button>
  ) : (
    <p className={styles.title}>{text}</p>
  );

  return (
    <th colSpan={7}>
      <div className={styles.header}>
        <button className={styles.icon} onClick={previousClick}>
          <ChevronLeft />
        </button>
        {title}
        <button className={styles.icon} onClick={nextClick}>
          <ChevronRight />
        </button>
      </div>
    </th>
  );
};
