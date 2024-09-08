import React, { useState, useEffect } from "react";
import CardsItem from "../../components/CardsItem";
import Pagination from "../../components/Pagination";
import CreaterAdvertisement from "../../components/CreaterAdvertisement";
import { getApiResource } from "../../utils/network";
import { Advertisment } from "../../types/interfaces";
import { API_ADVERTISEMENTS } from "../../constants/api";
import { DEFAULT_CARDS_PER_PAGE } from "../../constants/api";
import defaultImage from "./img/avito.jpeg";
import styles from "./StartPage.module.scss";

const StartPage: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Advertisment[]>([]);
  const [cardsPerPage, setCardsPerPage] = useState(DEFAULT_CARDS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const getResource = async (url: string) => {
    const res = await getApiResource(url);

    if (!res || res.length === 0) {
      throw new Error("Не удалось загрузить объявления");
    }

    const adsWithDefaultImage = res.map((ad: Advertisment) => ({
      ...ad,
      imageUrl: ad.imageUrl || defaultImage,
    }));

    setAdvertisements(adsWithDefaultImage);
  };

  useEffect(() => {
    getResource(API_ADVERTISEMENTS);
  }, []);

  const handleCardsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCardsPerPage(Number(event.target.value));
    setCurrentPage(1); // Reset to the first page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(advertisements.length / cardsPerPage);

  return (
    <div className={styles.pageContainer}>
      <CreaterAdvertisement />
      <div className={styles.controls}>
        <label htmlFor="cardsPerPage">Карточки на странице: </label>
        <select
          id="cardsPerPage"
          value={cardsPerPage}
          onChange={handleCardsPerPageChange}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((count) => (
            <option key={count} value={count}>
              {count}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.cardsContainer}>
        {advertisements
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
