import React, { useState, useEffect } from "react";
import BackButton from "../../components/BackButton";
import AdvertisementForm from "../../components/AdvertisementForm";
import AdvertisementView from "../../components/AdvertisementView";
import Loader from "../../components/Loader";
import { useParams } from "react-router-dom";
import { getApiResource, updateApiResource } from "../../utils/network";
import { Advertisement } from "../../types/interfaces";
import { API_ADVERTISEMENTS } from "../../constants/api";
import defaultImage from "./../StartPage/img/avito.jpeg";
import styles from "./AdvertisementsPage.module.scss";

const AdvertisementsPage: React.FC = () => {
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

  if (!advertisement) return <Loader />;

  return (
    <div className={styles.detailContainer}>
      <BackButton text="Назад" />
      {editing ? (
        <AdvertisementForm
          formData={formData}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />
      ) : (
        <AdvertisementView
          advertisement={advertisement}
          onEdit={() => setEditing(true)}
        />
      )}
    </div>
  );
};

export default AdvertisementsPage;
