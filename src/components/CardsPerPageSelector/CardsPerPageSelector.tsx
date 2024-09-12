import styles from "./CardsPerPageSelector.module.scss";

interface CardsPerPageSelectorProps {
  cardsPerPage: number;
  onChange: (value: number) => void;
}

const CardsPerPageSelector: React.FC<CardsPerPageSelectorProps> = ({
  cardsPerPage,
  onChange,
}) => {
  const options = [2, 4, 6, 8, 10];

  return (
    <div className={styles.controls}>
      <label htmlFor="cardsPerPage">Карточек на странице: </label>
      <select
        id="cardsPerPage"
        value={cardsPerPage}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.select}
      >
        {options.map((count) => (
          <option key={count} value={count}>
            {count}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CardsPerPageSelector;
