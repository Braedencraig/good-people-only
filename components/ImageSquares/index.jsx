import React from "react";
import styles from "../../styles/ImageSquares.module.css";

export default function ImageSquares({ images }) {
  return (
    <div className={styles.squares}>
      {images &&
        images.map(({ name, site, url }, i) => {
          return (
            <a
              className={styles.square}
              href={site}
              key={name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={url} alt={name} />
              <p> {name} </p>
            </a>
          );
        })}
    </div>
  );
}
