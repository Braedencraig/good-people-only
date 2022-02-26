import { useState, useEffect, useRef } from "react";
import favicon from "../public/favicon.ico";
import Head from "next/head";
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

export default function Home({ store }) {
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="good people only,good people commons,good people studio,good people artist management,the cabin recording,toronto,junction,creative,collective,artists,film"
        />
        <meta
          name="description"
          content="Creative collective based in Toronto, ON. Hosting artists and entrepreneurs in film, music, design, and tech."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content="GOOD PEOPLE ONLY" />
        <meta
          property="og:description"
          content="Creative collective based in Toronto, ON. Hosting artists and entrepreneurs in film, music, design, and tech. Desks available for rent. "
        />
        <meta
          property="og:image"
          content="https://pro2-bar-s3-cdn-cf6.myportfolio.com/f37e5fcc-8293-4aba-b0ef-f9139ce82753/7cc800bc-d19e-49bc-ac01-a8543ff25553_rw_600.png?h=bd99fb1f7bb5b6f66a398b08d6521a4a"
        />
        <link
          rel="icon"
          href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAADUExURUxpcU3H2DoAAAABdFJOUwBA5thmAAAADElEQVQI12NgIA0AAAAwAAHHqoWOAAAAAElFTkSuQmCC"
        />
        <link rel="canonical" href="https://goodpeopleonly.com/" />
        <title>GOOD PEOPLE ONLY</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div>
        <h1>Good People Only</h1>
        <GlobalStyles />
        <div ref={node}>
          <Menu open={open} setOpen={setOpen} store={store[0].fields.url} />
          <Burger open={open} setOpen={setOpen} />
          <Logo />
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
