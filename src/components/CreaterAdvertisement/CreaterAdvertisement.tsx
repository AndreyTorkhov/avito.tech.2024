import React, { useState } from "react";
import { createAdvertisement } from "../../utils/network";
import { generateUniqueId } from "../../services/generateUniqueId";
import { useDispatch } from "react-redux";
import { Advertisement } from "../../types/interfaces";
import { addAdvertisement } from "../../store/advertisementSlice";
import styles from "./CreaterAdvertisement.module.scss";
import defaultImage from "../../containers/StartPage/img/avito.jpeg";

const CreaterAdvertisement: React.FC<{
  onAdvertisementCreated: () => void;
}> = ({ onAdvertisementCreated }) => {
  const [formData, setFormData] = useState<Partial<Advertisement>>({
    name: "",
    price: 0,
    description: "",
    imageUrl: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

  // Функция для сброса формы
  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      description: "",
      imageUrl: "",
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Проверка URL изображения и установка заглушки, если URL пустой или некорректен
    const imageUrl =
      formData.imageUrl && isValidUrl(formData.imageUrl)
        ? formData.imageUrl
        : defaultImage;

    const newAd: Advertisement = {
      id: generateUniqueId(),
      name: formData.name || "",
      price: formData.price || 0,
      description: formData.description || "",
      createdAt: new Date().toISOString(),
      views: formData.views || 0,
      likes: formData.likes || 0,
      imageUrl: imageUrl,
    };

    dispatch(addAdvertisement(newAd));

    const result = await createAdvertisement(newAd);

    if (result) {
      alert("Объявление успешно создано!");
      setModalOpen(false);
      onAdvertisementCreated(); // Обновляем список объявлений
      resetForm(); // Сбрасываем форму после успешной отправки
    } else {
      alert("Ошибка при создании объявления.");
    }
  };

  // Валидация URL для проверки корректности ссылки
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Цена:
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Описание:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                URL Изображения:
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
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
