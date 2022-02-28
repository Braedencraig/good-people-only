import { useState, useEffect, useRef } from "react";
import favicon from "../public/favicon.ico";
import HeadInfo from "../components/HeadInfo/HeadInfo.js";
import { createClient } from "contentful";
import Burger from "../components/Burger/Burger.js";
import Menu from "../components/Menu/Menu.js";
import Logo from "../components/Logo/Logo.js";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "../global";
import { theme } from "../theme.js";
import { useOnClickOutside } from "../hooks.js";
import styles from "../styles/Home.module.css";
import { Test } from "../components/Test.tsx";
import useWindowSize from "../utils/useWindowSize";

export default function Home({ store }) {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  const size = useWindowSize();

  useEffect(() => {
    if (size.width < 768) {
      const test = document.querySelector("body");
      test.style.position = "relative";
      test.style.margin = "0";
      test.style.overflowX = "hidden";
      test.style.padding = "0";
      test.style.height = "90vh";
    }
  }, [size]);

  return (
    <ThemeProvider theme={theme}>
      <HeadInfo />
      <div className="home">
        <h1>Good People Only</h1>
        <GlobalStyles />
        <div ref={node}>
          <Menu open={open} setOpen={setOpen} store={store[0].fields.url} />
          <Burger open={open} setOpen={setOpen} />
          {/* <Logo /> */}
        </div>
        <Test />

        <div className={styles.container}></div>
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
