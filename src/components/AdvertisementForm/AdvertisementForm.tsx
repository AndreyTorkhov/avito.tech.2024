import React from "react";
import { Advertisement } from "../../types/interfaces";
import styles from "./AdvertisementForm.module.scss";

interface AdvertisementFormProps {
  formData: Partial<Advertisement>;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const AdvertisementForm: React.FC<AdvertisementFormProps> = ({ formData, onSubmit, onChange }) => {
  return (
    <form onSubmit={onSubmit} className={styles.editForm}>
      <label>
        URL Изображения:
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl || ""}
          onChange={onChange}
        />
      </label>
      <label>
        Название:
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={onChange}
        />
      </label>
      <label>
        Цена:
        <input
          type="number"
          name="price"
          value={formData.price || 0}
          onChange={onChange}
          required
        />
      </label>
      <label>
        Описание:
        <textarea
          name="description"
          value={formData.description || ""}
          onChange={onChange}
        />
      </label>
      <button type="submit" className={styles.submitButton}>
        Сохранить
      </button>
    </form>
  );
};

export default AdvertisementForm;
