import React, { useState } from "react";
import { createAdvertisement } from "../../utils/network";
import { generateUniqueId } from "../../services/generateUniqueId";
import styles from "./CreaterAdvertisement.module.scss";

const CreaterAdvertisement: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [views, setViews] = useState(0);
  const [likes, setLikes] = useState(0);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null); // Храним выбранный файл

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newAdvertisement = {
      id: generateUniqueId(),
      name,
      price,
      description,
      createdAt: new Date().toISOString(),
      views,
      likes,
      imageFile,
    };

    const result = await createAdvertisement(newAdvertisement);

    if (result) {
      alert("Advertisement created successfully!");
      setModalOpen(false);
    } else {
      alert("Error creating advertisement.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]); // Сохраняем выбранный файл
    }
  };

  return (
    <>
      <button
        className={styles.addAdvertisementButton}
        onClick={() => setModalOpen(true)}
      >
        Новое объявление
      </button>
      {isModalOpen && (
        <div className={styles.modal + " " + styles.modalOpen}>
          <div className={styles.modalContent}>
            <button
              className={styles.modalClose}
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>
            <form onSubmit={handleSubmit}>
              <label>
                Название:
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label>
                Цена:
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                />
              </label>
              <label>
                Просмотры:
                <input
                  type="number"
                  value={views}
                  onChange={(e) => setViews(Number(e.target.value))}
                  required
                />
              </label>
              <label>
                Лайки:
                <input
                  type="number"
                  value={likes}
                  onChange={(e) => setLikes(Number(e.target.value))}
                  required
                />
              </label>
              <label>
                Описание:
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </label>
              <label>
                Изображение:
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </label>
              <button type="submit">Создать</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreaterAdvertisement;
