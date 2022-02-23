import React from "react";
import { bool } from "prop-types";
import Link from "next/link";
import { StyledMenu } from "./Menu.styled";

const Menu = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <Link href="/roster">
        <a>Roster</a>
      </Link>
      <Link href="/consulting">
        <a href="/">Consulting</a>
      </Link>
      <a href="https://www.google.ca">Store</a>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/contact">
        <a>Contact</a>
      </Link>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
