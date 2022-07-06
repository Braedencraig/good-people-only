import React from "react";
import { StyledSideText } from "./SideText.styled";

const SideText = ({ copy, lineSize }) => {
  return (
    <StyledSideText>
      <h2> {copy} </h2> <div className={`line ${lineSize}`}> </div>
    </StyledSideText>
  );
};

export default SideText;
