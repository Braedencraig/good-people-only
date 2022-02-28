import React, { useRef } from "react";
import styles from "../../styles/Jukebox.module.css";

export default function Jukebox({ images }) {
  const middle = images[(images.length / 2) | 0];

  return (
    <div className={styles.jukebox}>
      <div className={styles.flex}>
        <div className={`${styles.box} ${styles.flex}`}>
          {images &&
            images.map(({ name, site, url }, i) => {
              const imageRef = useRef();
              return (
                <a
                  className={`${name === middle.name && styles.active} ${
                    styles.artist
                  } ${images.length === i + 1 && styles.last}`}
                  href={site}
                  ref={imageRef}
                  key={name}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => {
                    // imageRef.current.style.transform = "scale(1.05)";
                    const active = document.querySelector(`.${styles.active}`);
                    if (active) {
                      active.classList.remove(styles.active);
                    }
                  }}
                >
                  <img src={url} alt={name} />
                  <p>{name}</p>
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
}
