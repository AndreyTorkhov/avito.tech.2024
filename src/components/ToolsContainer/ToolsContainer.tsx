import { Link } from "react-router-dom";
import CreaterAdvertisement from "../CreaterAdvertisement";
import SearchBar from "../SearchBar";
import CardsPerPageSelector from "../CardsPerPageSelector";
import styles from "./ToolsContainer.module.scss";

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
    <CreaterAdvertisement onAdvertisementCreated={onAdvertisementCreated} />
    <Link to="/orders" className={styles.orderButton}>
      Перейти к заказам
    </Link>
    <SearchBar onSearch={onSearch} />
    <CardsPerPageSelector
      cardsPerPage={cardsPerPage}
      onChange={onCardsPerPageChange}
    />
  </div>
);

export default ToolsContainer;
