import { useState, useRef, useEffect } from "react";
import Burger from "../components/Burger/Burger.js";
import Menu from "../components/Menu/Menu.js";
import Logo from "../components/Logo/Logo.js";
import Image from "next/image";
import { createClient } from "contentful";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme.js";
import { useOnClickOutside } from "../hooks.js";
import styles from "../styles/Consulting.module.css";
import useWindowSize from "../utils/useWindowSize";

export default function About({ consulting, store }) {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  const { title, description, email } = consulting[0].fields;

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

  const size = useWindowSize();

  useEffect(() => {
    if (size.width < 768) {
      const test = document.querySelector("body");
      test.style.position = "initial";
    }
  }, [size]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div ref={node}>
          <Menu open={open} setOpen={setOpen} store={store[0].fields.url} />
          <Burger open={open} setOpen={setOpen} /> <Logo />
        </div>
        <div className={`${styles.container} container`}>
          <div className={styles.title}>
            <h2> {title} </h2>
          </div>
          <div className={styles.flex}>
            {description.content.map((paragraph) => (
              <p key={paragraph.content[0].value}>
                {paragraph.content[0].value}
              </p>
            ))}
            <div className={styles.bottom}>
              <img src="/images/envelope.png" alt="envelope" />
              <a href={`mailto:${email}`}> {email} </a>
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
      consulting: data.items.filter(
        (item) => item.sys.contentType.sys.id === "consulting"
      ),
      store: data.items.filter(
        (item) => item.sys.contentType.sys.id === "store"
      ),
    },
    revalidate: 1,
  };
}
