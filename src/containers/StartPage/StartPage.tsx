import React, { useState, useEffect } from "react";
import CardsItem from "../../components/CardsItem";
import Pagination from "../../components/Pagination";
import ToolsContainer from "../../components/ToolsContainer";
import { getApiResource } from "../../utils/network";
import { Advertisement } from "../../types/interfaces";
import {
  API_ADVERTISEMENTS,
  DEFAULT_CARDS_PER_PAGE,
} from "../../constants/api";
import DEFAULT_IMAGE_URL from "../../assets/avito.jpeg";
import styles from "./StartPage.module.scss";

const StartPage: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [filteredAds, setFilteredAds] = useState<Advertisement[]>([]);
  const [cardsPerPage, setCardsPerPage] = useState(DEFAULT_CARDS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  const getResource = async (url: string) => {
    const res = await getApiResource(url);
    if (!res || res.length === 0) {
      throw new Error("Не удалось загрузить объявления");
    }

    const adsWithDefaultImage = res.map((ad: Advertisement) => ({
      ...ad,
      imageUrl: ad.imageUrl || DEFAULT_IMAGE_URL,
    }));

    setAdvertisements(adsWithDefaultImage);
    setFilteredAds(adsWithDefaultImage);
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

  const handleCardsPerPageChange = (value: number) => {
    setCardsPerPage(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(filteredAds.length / cardsPerPage);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.toolsContainer}>
        <ToolsContainer
          onSearch={handleSearch}
          onAdvertisementCreated={() => getResource(API_ADVERTISEMENTS)}
          cardsPerPage={cardsPerPage}
          onCardsPerPageChange={handleCardsPerPageChange}
        />
      </div>

      <div className={styles.cardsContainer}>
        {filteredAds
          .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
          .map((ad) => (
            <CardsItem
              key={ad.id}
              id={ad.id}
              imageUrl={ad.imageUrl}
              title={ad.name}
              price={ad.price}
              views={ad.views}
              likes={ad.likes}
            />
          ))}
      </div>
      <div className={styles.paginationContainer}></div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default StartPage;
