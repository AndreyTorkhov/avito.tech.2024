import React, { useState, useEffect } from "react";
import CardsItem from "../../components/CardsItem";
import Pagination from "../../components/Pagination";
import CreaterAdvertisement from "../../components/CreaterAdvertisement";
import SearchBar from "../../components/SearchBar"; // Импортируем поиск
import { getApiResource } from "../../utils/network";
import { Advertisement } from "../../types/interfaces";
import {
  API_ADVERTISEMENTS,
  DEFAULT_CARDS_PER_PAGE,
} from "../../constants/api";
import defaultImage from "./img/avito.jpeg";
import styles from "./StartPage.module.scss";

const StartPage: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [filteredAds, setFilteredAds] = useState<Advertisement[]>([]); // Отфильтрованные объявления
  const [cardsPerPage, setCardsPerPage] = useState(DEFAULT_CARDS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const getResource = async (url: string) => {
    const res = await getApiResource(url);

    if (!res || res.length === 0) {
      throw new Error("Не удалось загрузить объявления");
    }

    const adsWithDefaultImage = res.map((ad: Advertisement) => ({
      ...ad,
      imageUrl: ad.imageUrl || defaultImage,
    }));

    setAdvertisements(adsWithDefaultImage);
    setFilteredAds(adsWithDefaultImage); // Изначально показываем все объявления
  };

  useEffect(() => {
    getResource(API_ADVERTISEMENTS);
  }, []);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = advertisements.filter((ad) =>
      ad.name.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredAds(filtered);
  };

  const handleCardsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCardsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredAds.length / cardsPerPage);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.toolsContainer}>
        <CreaterAdvertisement
          onAdvertisementCreated={() => getResource(API_ADVERTISEMENTS)}
        />
        <SearchBar onSearch={handleSearch} /> {/* Добавляем компонент поиска */}
        <div className={styles.controls}>
          <label htmlFor="cardsPerPage">Карточек на странице: </label>
          <select
            id="cardsPerPage"
            value={cardsPerPage}
            onChange={handleCardsPerPageChange}
          >
            {[2, 4, 6, 8, 10].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {filteredAds
          .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
          .map((ad) => (
            <CardsItem
              key={ad.id}
              imageUrl={ad.imageUrl}
              title={ad.name}
              price={ad.price}
              views={ad.views}
              likes={ad.likes}
            />
          ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default StartPage;
