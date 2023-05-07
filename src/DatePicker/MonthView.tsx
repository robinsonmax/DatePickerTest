import { MouseEventHandler, useContext } from "react";
import { DatePickerTitle } from "../DatePicker";
import { LocaleContext } from "../LocaleContextComponent";
import styles from "../DatePicker.module.scss";

export default function MonthView({
  date,
  setDate,
}: {
  date: Date;
  setDate: (date: Date) => void;
}) {
  const locale = useContext(LocaleContext);

  const monthName = date.toLocaleString(locale.toString(), { month: "long" });

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const calendarOffset = firstDayOfMonth.getDay();

  // A list of days at 1 week intervals, starting from the 1st of the month
  let anchors: Date[] = [];
  for (
    let index = 1;
    index <=
    DaysInMonth(date.getMonth() + 1, date.getFullYear()) + calendarOffset;
    index += 7
  ) {
    anchors.push(new Date(date.getFullYear(), date.getMonth(), index));
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan={7}>
              <DatePickerTitle text={monthName} />
            </th>
          </tr>
          <tr>
            <th>M</th>
            <th>T</th>
            <th>W</th>
            <th>T</th>
            <th>F</th>
            <th>S</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          {anchors.map((anchorDate, index) => {
            return (
              <tr key={index}>
                <GenerateRow
                  day={date}
                  anchorDate={anchorDate}
                  offset={calendarOffset}
                  onClick={(_, date) => {
                    console.log(date.toDateString());
                  }}
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
  day,
  anchorDate,
  offset,
  onClick,
}: {
  day: Date;
  anchorDate: Date;
  offset: number;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    date: Date
  ) => void;
}) => {
  let days: Date[] = [];
  for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
    let date = new Date(anchorDate);
    date.setDate(anchorDate.getDate() + dayOfWeek - offset);
    days.push(date);
  }

  return (
    <>
      {days.map((date, index) => {
        const isActive = date.getDate() === day.getDate();
        const isToday = IsToday(date);

        return (
          <td
            key={index}
            className={`${
              date.getMonth() !== day.getMonth() ? styles.outOfMonth : ""
            } ${isActive ? styles.active : ""} ${isToday ? styles.today : ""}`}
          >
            <button
              onClick={(e) => {
                onClick(e, date);
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
 * Checks if the date is today, ignoring the time portion & timezones
 * @param date The date to compare
 * @returns If the date is today
 */
const IsToday = (date: Date): boolean => {
  return (
    date.getDate() === new Date().getDate() &&
    date.getMonth() === new Date().getMonth() &&
    date.getFullYear() === new Date().getFullYear()
  );
};
