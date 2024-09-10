import React, { useState } from "react";
import styles from "./SearchBar.module.scss";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    if (value.length > 2) {
      onSearch(value); // Передаем запрос родительскому компоненту
    } else {
      onSearch(""); // Очищаем поиск, если меньше 3 символов
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Введите название..."
        className={styles.searchInput}
      />
    </div>
  );
};

export default SearchBar;
