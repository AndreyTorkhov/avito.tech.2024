import React from "react";
import { Advertisement } from "../../types/interfaces";
import styles from "./AdvertisementView.module.scss";
import DEFAULT_IMAGE_URL from "../../assets/avito.jpeg";
import { isValidUrl } from "../../services/isValidUrl";

interface AdvertisementViewProps {
  advertisement: Advertisement;
  onEdit: () => void;
}

const AdvertisementView: React.FC<AdvertisementViewProps> = ({
  advertisement,
  onEdit,
}) => {
  const validatedImageUrl =
    advertisement.imageUrl && isValidUrl(advertisement.imageUrl)
      ? advertisement.imageUrl
      : DEFAULT_IMAGE_URL;

  return (
    <div className={styles.advertisementView}>
      <h1>{advertisement.name}</h1>
      <img
        src={validatedImageUrl}
        alt={advertisement.name}
        className={styles.image}
      />
      <p>{advertisement.description}</p>
      <p>Цена: {advertisement.price} рублей</p>
      <p>Просмотры: {advertisement.views}</p>
      <p>Лайки: {advertisement.likes}</p>
      <button onClick={onEdit} className={styles.submitButton}>
        Редактировать
      </button>
    </div>
  );
};

export default AdvertisementView;
