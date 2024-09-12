// Импорт необходимых компонентов и стилей
import { Link } from "react-router-dom";
import CreaterAdvertisement from "../CreaterAdvertisement";
import SearchBar from "../SearchBar";
import CardsPerPageSelector from "../CardsPerPageSelector";
import styles from "./ToolsContainer.module.scss";

// Типизация пропсов для компонента
interface ToolsContainerProps {
  onSearch: (query: string) => void;
  onAdvertisementCreated: () => void;
  cardsPerPage: number;
  onCardsPerPageChange: (value: number) => void;
}

const ToolsContainer: React.FC<ToolsContainerProps> = ({
  onSearch,
  onAdvertisementCreated,
  cardsPerPage,
  onCardsPerPageChange,
}) => (
  <div className={styles.toolsContainer}>
    {/* Кнопка для создания нового объявления */}
    <CreaterAdvertisement onAdvertisementCreated={onAdvertisementCreated} />

    {/* Ссылка на страницу заказов */}
    <Link to="/orders" className={styles.orderButton}>
      Перейти к заказам
    </Link>

    {/* Поисковая строка */}
    <SearchBar onSearch={onSearch} />

    {/* Селектор количества карточек на странице */}
    <CardsPerPageSelector
      cardsPerPage={cardsPerPage}
      onChange={onCardsPerPageChange}
    />
  </div>
);

export default ToolsContainer;
