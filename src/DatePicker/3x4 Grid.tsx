import styles from "../DatePicker.module.scss";
import DatePickerHeader from "./Header";

export default function DatePickerGrid({
  title,
  titleClick,
  changeYear,
  startingIndex,
  isActive,
  itemName,
  itemClick,
}: {
  title: string;
  titleClick?: () => void;
  changeYear: (direction: 1 | -1) => void;
  startingIndex?: number;
  isActive: (index: number) => boolean;
  itemName: (index: number) => string;
  itemClick: (index: number) => void;
}) {
  return (
    <div className={styles.gridView}>
      <table>
        <thead>
          <tr>
            <DatePickerHeader
              text={title}
              titleClick={titleClick}
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
                const index = row * 3 + col + (startingIndex ?? 0);
                return (
                  <td
                    key={col}
                    className={isActive(index) ? styles.active : ""}
                  >
                    <button
                      onClick={() => {
                        itemClick(index);
                      }}
                    >
                      {itemName(index)}
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
