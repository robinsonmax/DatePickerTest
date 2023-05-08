import { Dispatch } from "react";
import { DatePickerAction, DatePickerState } from "../DatePicker";
import DatePickerGrid from "./3x4 Grid";

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

  const changeYear = (increment: 1 | -1) => {
    dispatch({
      type: "setFocus",
      date: new Date(
        state.focusDate.getFullYear() + increment,
        state.focusDate.getMonth(),
        1
      ),
    });
  };

  const isActive = (index: number) =>
    index === state.selectedDate.getMonth() &&
    state.selectedDate.getFullYear() === state.focusDate.getFullYear();

  const monthName = (index: number) =>
    new Date(state.focusDate.getFullYear(), index, 1).toLocaleString(
      state.locale.toString(),
      {
        month: "short",
      }
    );

  const dayView = (month: number) => {
    dispatch({
      type: "dayView",
      date: new Date(state.focusDate.getFullYear(), month, 1),
    });
  };

  return (
    <DatePickerGrid
      title={state.focusDate.getFullYear().toString()}
      titleClick={yearView}
      changeYear={changeYear}
      isActive={isActive}
      itemName={monthName}
      itemClick={dayView}
    />
  );
}
