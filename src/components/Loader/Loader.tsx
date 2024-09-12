import React from "react";
import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderСontainer}>
      <div className={styles.loader}></div>
    </div>
  );
};

export default Loader;
