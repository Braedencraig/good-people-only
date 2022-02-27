import styled from "styled-components";

export const StyledSideText = styled.div`
  @media only screen and (max-width: 768px) {
    display: none;
  }
  position: absolute;
  color: #d8d8d8;
  top: 20%;
  left: -15.5rem;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 20rem;
  height: 3rem;
  background: transparent;
  border: none;
  cursor: default;
  padding: 0;
  z-index: 10;
  transform: rotate(90deg) scaleX(-1);
  transform-origin: top right;
  h2 {
    transform: scaleX(-1);
    font-size: 20px;
    font-weight: 400;
  }
  .line {
    width: 100%;
    height: 2px;
    border: 1px solid #d8d8d8;
    margin: 3px;
    /* display: inline-block; */
    /* left: -10%; */
    position: relative;
    top: -32px;
    right: 56%;
  }
  &:focus {
    outline: none;
  }
`;
