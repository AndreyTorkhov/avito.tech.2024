import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getApiResource, updateApiResource } from "../../utils/network";
import { Advertisement } from "../../types/interfaces";
import { API_ADVERTISEMENTS } from "../../constants/api";
import defaultImage from "./../StartPage/img/avito.jpeg";
import styles from "./AdvertisementsPage.module.scss";

const AdvertisementsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [advertisement, setAdvertisement] = useState<Advertisement | null>(
    null
  );
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Advertisement>>({
    imageUrl: "",
    name: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    const fetchAdvertisement = async () => {
      const res = await getApiResource(`${API_ADVERTISEMENTS}/${id}`);

      if (res) {
        setAdvertisement(res);
        setFormData({
          imageUrl: res.imageUrl || defaultImage,
          name: res.name,
          price: res.price,
          description: res.description,
        });
      } else {
        throw new Error("Не удалось загрузить объявление");
      }
    };

    fetchAdvertisement();
  }, [id]);

  const handleGoBack = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    navigate(-1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!advertisement) return;

    const validatedImageUrl =
      formData.imageUrl && isValidUrl(formData.imageUrl)
        ? formData.imageUrl
        : defaultImage;

    const updatedAd = {
      ...advertisement,
      imageUrl: validatedImageUrl,
      name: formData.name || "",
      price: formData.price || 0,
      description: formData.description || "",
    };

    try {
      const result = await updateApiResource(
        `${API_ADVERTISEMENTS}/${id}`,
        updatedAd
      );

      if (!result) {
        throw new Error("Ошибка при обновлении объявления");
      }

      setAdvertisement(result);
      setEditing(false);
    } catch (error) {
      console.error("Ошибка при обновлении объявления:", error);
    }
  };

  if (!advertisement) return <div>Loading...</div>;

  return (
    <div className={styles.detailContainer}>
      <Link to="#" onClick={handleGoBack} className={styles.backButton}>
        Назад
      </Link>
      {editing ? (
        <form onSubmit={handleSubmit} className={styles.editForm}>
          <label>
            URL Изображения:
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Название:
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Цена:
            <input
              type="number"
              name="price"
              value={formData.price || 0}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Описание:
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className={styles.submitButton}>
            Сохранить
          </button>
        </form>
      ) : (
        <>
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
          <button
            onClick={() => setEditing(true)}
            className={styles.submitButton}
          >
            Редактировать
          </button>
        </>
      )}
    </div>
  );
};

export default AdvertisementsPage;
