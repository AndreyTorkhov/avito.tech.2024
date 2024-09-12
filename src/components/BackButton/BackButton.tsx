import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BackButton.module.scss";

interface BackButtonProps {
  text: string;
}

const BackButton: React.FC<BackButtonProps> = ({ text }) => {
  const navigate = useNavigate();
  const handleGoBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <a href="#" onClick={handleGoBack} className={styles.backButton}>
      {text}
    </a>
  );
};

export default BackButton;
