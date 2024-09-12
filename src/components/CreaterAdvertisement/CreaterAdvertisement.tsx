import React, { useState } from "react";
import { createAdvertisement } from "../../utils/network";
import { useDispatch } from "react-redux";
import { Advertisement } from "../../types/interfaces";
import { addAdvertisement } from "../../store/advertisementSlice";
import { API_ADVERTISEMENTS } from "../../constants/api";
import { generateUniqueId } from "../../services/generateUniqueId";
import { isValidUrl } from "../../services/isValidUrl";
import styles from "./CreaterAdvertisement.module.scss";
import DEFAULT_IMAGE_URL from "../../assets/avito.jpeg";

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
  const [adIdCounter, setAdIdCounter] = useState(14);
  const dispatch = useDispatch();

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

    const imageUrl =
      formData.imageUrl && isValidUrl(formData.imageUrl)
        ? formData.imageUrl
        : DEFAULT_IMAGE_URL;

    const newId = await generateUniqueId();
    const newAd: Advertisement = {
      id: newId.toString(),
      name: formData.name || "",
      price: formData.price || 0,
      description: formData.description || "",
      createdAt: new Date().toISOString(),
      views: formData.views || 0,
      likes: formData.likes || 0,
      imageUrl: imageUrl,
    };

    dispatch(addAdvertisement(newAd));

    const result = await createAdvertisement(API_ADVERTISEMENTS, newAd);

    if (result) {
      alert("Объявление успешно создано!");
      setAdIdCounter(adIdCounter + 1);
      setModalOpen(false);
      onAdvertisementCreated();
      resetForm();
    } else {
      alert("Ошибка при создании объявления.");
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
