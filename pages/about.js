import { useState, useRef, useEffect } from "react";
import Burger from "../components/Burger/Burger.js";
import Menu from "../components/Menu/Menu.js";
import Logo from "../components/Logo/Logo.js";
import HeadInfo from "../components/HeadInfo/HeadInfo.js";

import Image from "next/image";
import { createClient } from "contentful";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme.js";
import { useOnClickOutside } from "../hooks.js";
import styles from "../styles/About.module.css";
import useWindowSize from "../utils/useWindowSize";

export default function About({ about, goodSpaces, store }) {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  const size = useWindowSize();

  useEffect(() => {
    if (size.width < 768) {
      const test = document.querySelector("body");
      test.style.overflow = "auto";
      test.style.overflowX = "hidden";
      test.style.position = "initial";
    }
  }, [size]);

  const {
    title,
    subtitle,
    description,
    descriptionTwo,
    descriptionTitle,
    descriptionTitleFormat,
  } = about[0].fields;

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

  return (
    <ThemeProvider theme={theme}>
      <HeadInfo />
      <div>
        <div ref={node}>
          <Menu open={open} setOpen={setOpen} store={store[0].fields.url} />
          <Burger open={open} setOpen={setOpen} /> <Logo />
        </div>
        <div className={`${styles.container} container fadeIn`}>
          <div className={styles.title}>
            <h2> {title} </h2> <h2 className={styles.subtitle}> {subtitle} </h2>
          </div>
          <div className={styles.flex}>
            <div className={styles.flexOne}>
              <div className={styles.goodSpaces}>
                <p> Good Spaces </p>
                <ul>
                  {goodSpaces.map((space) => {
                    return (
                      <li key={space.fields.title}>
                        <a
                          href={space.fields.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img src="/images/link.png" alt="link" />
                          {space.fields.title}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className={styles.flexTwo}>
              <div>
                {description.content.map((paragraph) => (
                  <p key={paragraph.content[0].value}>
                    {paragraph.content[0].value}
                  </p>
                ))}
              </div>
              <div>
                <h3 className={styles.descriptionTitle}>
                  {descriptionTitleFormat.content.map((node) => (
                    <span key={node.content[0].value}>
                      {node.content[0].value}
                    </span>
                  ))}
                </h3>
                {descriptionTwo.content.map((paragraph) => (
                  <p key={paragraph.content[0].value}>
                    {paragraph.content[0].value}
                  </p>
                ))}
                <div className={styles.images}>
                  <img src="/images/factor.png" alt="Factor" />
                  <img src="/images/oc.png" alt="Ontario Arts Council" />
                  <img src="/images/canada.png" alt="Canada" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
      about: data.items.filter(
        (item) => item.sys.contentType.sys.id === "about"
      ),
      goodSpaces: data.items.filter(
        (item) => item.sys.contentType.sys.id === "goodSpaces"
      ),
      store: data.items.filter(
        (item) => item.sys.contentType.sys.id === "store"
      ),
    },
    revalidate: 1,
  };
}
