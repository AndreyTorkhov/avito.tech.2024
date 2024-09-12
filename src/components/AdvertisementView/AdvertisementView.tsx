import React from "react";
import { Advertisement } from "../../types/interfaces";
import styles from "./AdvertisementView.module.scss";

interface AdvertisementViewProps {
  advertisement: Advertisement;
  onEdit: () => void;
}

const AdvertisementView: React.FC<AdvertisementViewProps> = ({
  advertisement,
  onEdit,
}) => {
  return (
    <div className={styles.advertisementView}>
      <h1>{advertisement.name}</h1>
      <img
        src={advertisement.imageUrl}
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
