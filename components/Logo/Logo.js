import React from "react";
import { bool, func } from "prop-types";
import { StyledLogo } from "./Logo.styled";
import Link from "next/link";

const Logo = () => {
  return (
    <StyledLogo>
      <Link href="/">
        <img src="/images/gpo.png" alt="Good People Only Logo" />
      </Link>
    </StyledLogo>
  );
};

export default Logo;
