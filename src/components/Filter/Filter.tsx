import React from "react";
import { OrderStatus, OrderStatusType } from "../../types/interfaces";
import styles from "./Filter.module.scss";

interface FiltersProps {
  onFilterChange: (status: OrderStatusType | "") => void;
  onSortChange: (sortOrder: "asc" | "desc") => void;
}

const Filter: React.FC<FiltersProps> = ({ onFilterChange, onSortChange }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    let numericValue;

    if (value === "") {
      window.location.reload();
    } else {
      numericValue = Number(value);
    }

    if (Object.values(OrderStatus).includes(numericValue as OrderStatusType)) {
      onFilterChange(numericValue as OrderStatusType);
    } else {
      onFilterChange("");
    }
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as "asc" | "desc");
  };

  return (
    <div className={styles.filtersContainer}>
      <label>
        Фильтр по статусу:
        <select onChange={handleStatusChange} className={styles.filterSelect}>
          <option value="">Все</option>
          <option value={OrderStatus.Created}>Создан</option>
          <option value={OrderStatus.Paid}>Оплачен</option>
          <option value={OrderStatus.Transport}>В пути</option>
          <option value={OrderStatus.DeliveredToThePoint}>
            Доставлен в пункт
          </option>
          <option value={OrderStatus.Received}>Получен</option>
          <option value={OrderStatus.Archived}>Архивирован</option>
          <option value={OrderStatus.Refund}>Возврат</option>
        </select>
      </label>
      <label>
        Сортировка по сумме:
        <select onChange={handleSortChange} className={styles.filterSelect}>
          <option value="asc">По возрастанию</option>
          <option value="desc">По убыванию</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
