import { useState, useRef, useEffect } from "react";
import Burger from "../components/Burger/Burger.js";
import Menu from "../components/Menu/Menu.js";
import Logo from "../components/Logo/Logo.js";
import { createClient } from "contentful";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme.js";
import { useOnClickOutside } from "../hooks.js";
import styles from "../styles/Contact.module.css";

export default function About({ contact, store }) {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  const { email, title } = contact[0].fields;

  useEffect(() => {
    if (open) {
      const test = document.querySelector("#__next");
      test.style.overflow = "hidden";
      test.style.height = "100vh";
    } else {
      const test = document.querySelector("#__next");
      test.style.overflow = "visible";
      test.style.height = "auto";
    }
  }, [setOpen, open]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // updated to ES6 <3
      // check GLITCH.raf ;)

      // magic demo(ns) config
      const CARD_IMAGE_URL = ""; // included at bottom as base64, can be a real image URL

      const GLITCH = {
        raf: true, // make it fast ?! :O (use requestAnimationFrame)
        delay: 100, // glitch interval delay (ignored if RAF=true)
        maxErrors: 130, // max 'glitch' errors ?

        cache: new Map(), // cant't touch this! :D
        timer: null, // tracker for fx updater
      };

      // glitch helpers
      const decodeImage = (imageData, encoder = "data:image/jpeg;base64,") =>
        imageData.replace(encoder, "");
      const encodeImage = (imageData, encoder = "data:image/jpeg;base64,") =>
        `${encoder}${imageData}`;

      const corruptImage = (imageData, maxErrors = 130) => {
        let corrupted = imageData;

        if (Math.random() > 0.8) {
          const errors = Math.round(Math.random() * maxErrors);

          for (let i = 0; i < errors; i++) {
            const l =
              1000 + Math.round(Math.random() * (corrupted.length - 1002));
            corrupted =
              corrupted.substr(0, l) +
              corrupted.charAt(l + 1) +
              corrupted.charAt(l) +
              corrupted.substr(l + 2);
          }
        }

        return encodeImage(corrupted);
      };

      // fetch image URL as base 64
      const fetchImageBase64 = (
        url = "",
        outputFormat = "image/jpeg",
        outputQuality = 0.8
      ) => {
        return new Promise((resolve, reject) => {
          if (!url) reject("Need img URL bro!");

          // const img = new Image();
          console.log(document);
          const img = document.createElement("img");
          img.crossOrigin = "Anonymous";
          img.onerror = () => reject("Image err!");
          img.onload = () => {
            let canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.height = img.height;
            canvas.width = img.width;

            ctx.drawImage(img, 0, 0);

            const dataURL = canvas.toDataURL(outputFormat, outputQuality);
            resolve(dataURL);

            canvas = null;
          };

          img.src = url;
        });
      };

      // glitch FX helpers
      const glitchImage = (imgURL, cb) => {
        const imgData = GLITCH.cache.get(imgURL);
        const corrupted = corruptImage(imgData, GLITCH.maxErrors);
        cb(corrupted);
      };

      const cancelGlitch = (ticker) => {
        if (ticker) {
          if (GLITCH.raf) {
            cancelAnimationFrame(ticker);
          } else {
            clearInterval(ticker);
          }

          ticker = null;
        }
      };

      // 3d transform helpers
      const setBackground = (el, bg) =>
        (el.style.backgroundImage = `url(${bg})`);
      const resetTransform = (el, perspective = 800) =>
        (el.style.transform = `translate3d(0%, 0%, -${
          perspective / 2
        }px) rotateX(0deg) rotateY(0deg)`);

      const onMove = (ev, el) => {
        const { pageX, pageY } = ev;
        const { offsetWidth, offsetHeight } = el;
        const { left, top } = el.getBoundingClientRect();

        const cardX = left + offsetWidth / 2;
        const cardY = top + offsetHeight / 2;

        const angle = 25;
        const rotX = (cardY - pageY) / angle;
        const rotY = (cardX - pageX) / -angle;

        el.style.transform = `translate3d(0%, 0%, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      };

      // GLITCHY glitch!
      (async () => {
        let base64;

        try {
          // fetch & cache image data
          base64 = await fetchImageBase64(CARD_IMAGE_URL || getDemoImage());
          GLITCH.cache.set(CARD_IMAGE_URL, decodeImage(base64));
        } catch (err) {
          throw new Error(err);
        }

        let ticker; // animation tracker

        // get card container & perspective
        const card = document.querySelector(".glitch-card");
        const perspective =
          getComputedStyle(card.parentElement)
            .getPropertyValue("perspective")
            .replace("px", "") || 800;

        // create helper binds for current card
        const updateBackground = (bg) => setBackground(card, bg);
        const onCardMove = (ev) => onMove(ev, card);

        const startGlitch = (url, cb) => {
          if (GLITCH.raf) {
            ticker = requestAnimationFrame(() => startGlitch(url, cb));
            glitchImage(url, cb);
          } else {
            ticker = setInterval(() => glitchImage(url, cb), GLITCH.delay);
          }
        };

        const onHover = () => {
          startGlitch(CARD_IMAGE_URL, updateBackground);
          const atag = document.querySelector(".contact");
          atag.style.display = "none";
          // card.addEventListener("mousemove", onCardMove);
        };

        const onOut = () => {
          cancelGlitch(ticker);
          // card.removeEventListener("mousemove", onCardMove);

          resetTransform(card, perspective); // reset card
          const atag = document.querySelector(".contact");
          atag.style.display = "block";
        };

        // set current card background texture
        setBackground(card, base64);

        // add mouse interaction
        card.addEventListener("mouseover", onHover);
        card.addEventListener("mouseout", onOut);
        card.addEventListener("mousemove", onCardMove);
      })(); // just do it...

      function getDemoImage() {
        return "data:image/jpeg;base64,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";
      }
    }
  }, []);

  // // updated to ES6 <3
  // // check GLITCH.raf ;)

  // // magic demo(ns) config
  // const CARD_IMAGE_URL = ""; // included at bottom as base64, can be a real image URL

  // const GLITCH = {
  //   raf: true, // make it fast ?! :O (use requestAnimationFrame)
  //   delay: 100, // glitch interval delay (ignored if RAF=true)
  //   maxErrors: 130, // max 'glitch' errors ?

  //   cache: new Map(), // cant't touch this! :D
  //   timer: null, // tracker for fx updater
  // };

  // // glitch helpers
  // const decodeImage = (imageData, encoder = "data:image/jpeg;base64,") =>
  //   imageData.replace(encoder, "");
  // const encodeImage = (imageData, encoder = "data:image/jpeg;base64,") =>
  //   `${encoder}${imageData}`;

  // const corruptImage = (imageData, maxErrors = 130) => {
  //   let corrupted = imageData;

  //   if (Math.random() > 0.8) {
  //     const errors = Math.round(Math.random() * maxErrors);

  //     for (let i = 0; i < errors; i++) {
  //       const l = 1000 + Math.round(Math.random() * (corrupted.length - 1002));
  //       corrupted =
  //         corrupted.substr(0, l) +
  //         corrupted.charAt(l + 1) +
  //         corrupted.charAt(l) +
  //         corrupted.substr(l + 2);
  //     }
  //   }

  //   return encodeImage(corrupted);
  // };

  // // fetch image URL as base 64
  // const fetchImageBase64 = (
  //   url = "",
  //   outputFormat = "image/jpeg",
  //   outputQuality = 0.8
  // ) => {
  //   return new Promise((resolve, reject) => {
  //     if (!url) reject("Need img URL bro!");

  //     // const img = new Image();
  //     console.log(document);
  //     const img = document.createElement("img");
  //     img.crossOrigin = "Anonymous";
  //     img.onerror = () => reject("Image err!");
  //     img.onload = () => {
  //       let canvas = document.createElement("canvas");
  //       const ctx = canvas.getContext("2d");
  //       canvas.height = img.height;
  //       canvas.width = img.width;

  //       ctx.drawImage(img, 0, 0);

  //       const dataURL = canvas.toDataURL(outputFormat, outputQuality);
  //       resolve(dataURL);

  //       canvas = null;
  //     };

  //     img.src = url;
  //   });
  // };

  // // glitch FX helpers
  // const glitchImage = (imgURL, cb) => {
  //   const imgData = GLITCH.cache.get(imgURL);
  //   const corrupted = corruptImage(imgData, GLITCH.maxErrors);
  //   cb(corrupted);
  // };

  // const cancelGlitch = (ticker) => {
  //   if (ticker) {
  //     if (GLITCH.raf) {
  //       cancelAnimationFrame(ticker);
  //     } else {
  //       clearInterval(ticker);
  //     }

  //     ticker = null;
  //   }
  // };

  // // 3d transform helpers
  // const setBackground = (el, bg) => (el.style.backgroundImage = `url(${bg})`);
  // const resetTransform = (el, perspective = 800) =>
  //   (el.style.transform = `translate3d(0%, 0%, -${
  //     perspective / 2
  //   }px) rotateX(0deg) rotateY(0deg)`);

  // const onMove = (ev, el) => {
  //   const { pageX, pageY } = ev;
  //   const { offsetWidth, offsetHeight } = el;
  //   const { left, top } = el.getBoundingClientRect();

  //   const cardX = left + offsetWidth / 2;
  //   const cardY = top + offsetHeight / 2;

  //   const angle = 25;
  //   const rotX = (cardY - pageY) / angle;
  //   const rotY = (cardX - pageX) / -angle;

  //   el.style.transform = `translate3d(0%, 0%, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  // };

  // // GLITCHY glitch!
  // (async () => {
  //   let base64;

  //   try {
  //     // fetch & cache image data
  //     base64 = await fetchImageBase64(CARD_IMAGE_URL || getDemoImage());
  //     GLITCH.cache.set(CARD_IMAGE_URL, decodeImage(base64));
  //   } catch (err) {
  //     throw new Error(err);
  //   }

  //   let ticker; // animation tracker

  //   // get card container & perspective
  //   const card = document.querySelector(".glitch-card");
  //   const perspective =
  //     getComputedStyle(card.parentElement)
  //       .getPropertyValue("perspective")
  //       .replace("px", "") || 800;

  //   // create helper binds for current card
  //   const updateBackground = (bg) => setBackground(card, bg);
  //   const onCardMove = (ev) => onMove(ev, card);

  //   const startGlitch = (url, cb) => {
  //     if (GLITCH.raf) {
  //       ticker = requestAnimationFrame(() => startGlitch(url, cb));
  //       glitchImage(url, cb);
  //     } else {
  //       ticker = setInterval(() => glitchImage(url, cb), GLITCH.delay);
  //     }
  //   };

  //   const onHover = () => {
  //     startGlitch(CARD_IMAGE_URL, updateBackground);
  //     const atag = document.querySelector(".contact");
  //     atag.style.display = "none";
  //     // card.addEventListener("mousemove", onCardMove);
  //   };

  //   const onOut = () => {
  //     cancelGlitch(ticker);
  //     // card.removeEventListener("mousemove", onCardMove);

  //     resetTransform(card, perspective); // reset card
  //     const atag = document.querySelector(".contact");
  //     atag.style.display = "block";
  //   };

  //   // set current card background texture
  //   setBackground(card, base64);

  //   // add mouse interaction
  //   card.addEventListener("mouseover", onHover);
  //   card.addEventListener("mouseout", onOut);
  //   card.addEventListener("mousemove", onCardMove);
  // })(); // just do it...

  // function getDemoImage() {
  //   return "data:image/jpeg;base64,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";
  // }

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div ref={node}>
          <Menu open={open} setOpen={setOpen} store={store[0].fields.url} />{" "}
          <Burger open={open} setOpen={setOpen} /> <Logo />
        </div>{" "}
        <div className={`${styles.container} container`}>
          <div className={styles.flex}>
            <div id="wrap">
              <div className="glitch-card"> </div>{" "}
            </div>{" "}
            <div className={styles.card}>
              <img src="/images/envelope.png" alt="envelope" />
            </div>{" "}
            <a className="contact" href={`mailto:${email}`}>
              <h3> {email} </h3>{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </ThemeProvider>
  );
}

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const data = await client.getEntries();

  return {
    props: {
      contact: data.items.filter(
        (item) => item.sys.contentType.sys.id === "contact"
      ),
      store: data.items.filter(
        (item) => item.sys.contentType.sys.id === "store"
      ),
    },
    revalidate: 1,
  };
}
