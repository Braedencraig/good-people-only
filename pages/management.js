import { Suspense, useState, useRef, useEffect } from "react";
import { createClient } from "contentful";
import Burger from "../components/Burger/Burger.js";
import Menu from "../components/Menu/Menu.js";
import Logo from "../components/Logo/Logo.js";
import SideText from "../components/SideText/SideText.js";
import { useOnClickOutside } from "../hooks.js";
import Jukebox from "../components/Jukebox/Jukebox.js";
import ImageSquares from "../components/ImageSquares/index.jsx";
import HeadInfo from "../components/HeadInfo/HeadInfo.js";
// import RosterImages from "../components/RosterImages/RosterImages.js";
import useWindowSize from "../utils/useWindowSize";

function Management({ artists, store }) {
  // const pexel = (id) =>
  //   `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260`;
  const images = [
    // Front
    {
      position: [0, 0, 1.5],
      rotation: [0, 0, 0],
      url: artists[0].fields.image.fields.file.url,
      name: artists[0].fields.name,
      site: artists[0].fields.site,
    },
    // // Back
    // { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(416430) },
    // { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: pexel(310452) },
    // // Left
    {
      position: [-1, 0, 1.8],
      rotation: [0, Math.PI / 3.5, 0],
      url: artists[3].fields.image.fields.file.url,
      name: artists[3].fields.name,
      site: artists[3].fields.site,
    },
    {
      position: [-1, 0, 1.8],
      rotation: [0, Math.PI / 3.5, 0],
      url: artists[2].fields.image.fields.file.url,
      name: artists[2].fields.name,
      site: artists[2].fields.site,
    },
    // {
    //   position: [-2.15, 0, 1.5],
    //   rotation: [0, Math.PI / 2.5, 0],
    //   url: pexel(325185),
    // },
    // {
    //   position: [-2, 0, 2.75],
    //   rotation: [0, Math.PI / 2.5, 0],
    //   url: pexel(358574),
    // },
    // // Right
    {
      position: [0, 0, 1.5],
      rotation: [0, 0, 0],
      url: artists[4].fields.image.fields.file.url,
      name: artists[4].fields.name,
      site: artists[4].fields.site,
    },
    {
      position: [-1, 0, 1.8],
      rotation: [0, -Math.PI / 3.5, 0],
      url: artists[1].fields.image.fields.file.url,
      name: artists[1].fields.name,
      site: artists[1].fields.site,
    },
    // {
    //   position: [1.75, 0, 0.25],
    //   rotation: [0, -Math.PI / 2.5, 0],
    //   url: pexel(227675),
    // },
    // {
    //   position: [2.15, 0, 1.5],
    //   rotation: [0, -Math.PI / 2.5, 0],
    //   url: pexel(911738),
    // },
    // {
    //   position: [2, 0, 2.75],
    //   rotation: [0, -Math.PI / 2.5, 0],
    //   url: pexel(1738986),
    // },
  ];
  const [open, setOpen] = useState(false);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));

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
      test.style.overflow = "auto";
      test.style.overflowX = "hidden";
      test.style.position = "initial";
    }
  }, [size]);

  return (
    <div>
      <HeadInfo />
      <div ref={node}>
        <Menu open={open} setOpen={setOpen} store={store[0].fields.url} />
        <Burger open={open} setOpen={setOpen} /> <Logo />
      </div>
      <div>
        <SideText
          lineSize={"artists"}
          copy={"Good People Artists Management"}
        />
        <ImageSquares images={images} />
        {/* <Suspense fallback={<div> Loading... </div>}>
          {images && <RosterImages images={images} />}
        </Suspense> */}
      </div>
    </div>
  );
}

export default Management;

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  const data = await client.getEntries();

  return {
    props: {
      artists: data.items.filter(
        (item) => item.sys.contentType.sys.id === "management"
      ),
      store: data.items.filter(
        (item) => item.sys.contentType.sys.id === "store"
      ),
    },
    revalidate: 1,
  };
}
