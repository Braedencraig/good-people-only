import { useState, useRef } from "react";
import Burger from "../components/Burger/Burger.js";
import Menu from "../components/Menu/Menu.js";
import Logo from "../components/Logo/Logo.js";
import Head from "../components/Head/Head.js";

import { createClient } from "contentful";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme.js";
import { useOnClickOutside } from "../hooks.js";
import styles from "../styles/About.module.css";

export default function Custom404({ about, goodSpaces, store }) {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  return (
    <ThemeProvider theme={theme}>
      <Head />
      <div>
        <div ref={node}>
          <Menu open={open} setOpen={setOpen} store={store[0].fields.url} />
          <Burger open={open} setOpen={setOpen} />
          <Logo />
        </div>
        <div className={styles.container}>
          <div className={styles.title}>
            <h2>Page Not Found</h2>
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
      store: data.items.filter(
        (item) => item.sys.contentType.sys.id === "store"
      ),
    },
    revalidate: 1,
  };
}
