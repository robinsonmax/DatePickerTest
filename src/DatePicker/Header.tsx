import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import styles from "./Header.module.scss";

export default function DatePickerHeader({
  text,
  titleClick,
  previousClick,
  nextClick,
}: {
  text: string;
  titleClick?: () => void;
  previousClick?: () => void;
  nextClick?: () => void;
}) {
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
}
