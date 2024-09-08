import React from "react";
import styles from "./CardsItem.module.scss";

interface CardsItemProps {
  imageUrl?: string;
  title: string;
  price: number;
  views: number;
  likes: number;
}

const CardsItem: React.FC<CardsItemProps> = ({
  imageUrl,
  title,
  price,
  views,
  likes,
}) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.card__image} />
      <div className={styles.card__content}>
        <h2 className={styles.card__title}>{title}</h2>
        <p className={styles.card__price}>{price} ₽</p>
        <div className={styles.card__stat}>
          <span>{views} просмотров</span>
          <span>{likes} лайков</span>
        </div>
      </div>
    </div>
  );
};

export default CardsItem;
