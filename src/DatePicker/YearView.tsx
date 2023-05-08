import { Dispatch } from "react";
import { DatePickerAction, DatePickerState } from "../DatePicker";
import DatePickerGrid from "./3x4 Grid";

export default function YearView({
  state,
  dispatch,
}: {
  state: DatePickerState;
  dispatch: Dispatch<DatePickerAction>;
}) {
  const firstYearOfDecade = Math.floor(state.focusDate.getFullYear() / 10) * 10;

  const changeYear = (increment: 1 | -1) => {
    dispatch({
      type: "setFocus",
      date: new Date(
        state.focusDate.getFullYear() + increment * 10,
        state.focusDate.getMonth(),
        1
      ),
    });
  };

  const isActive = (year: number) => year === state.selectedDate.getFullYear();

  const yearName = (year: number) => year.toString();

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

  return (
    <DatePickerGrid
      title={`${firstYearOfDecade} - ${firstYearOfDecade + 9}`}
      changeYear={changeYear}
      startingIndex={firstYearOfDecade - 1}
      isActive={isActive}
      itemName={yearName}
      itemClick={monthView}
    />
  );
}
