import styled from "styled-components";

export const StyledLogo = styled.button`
  position: absolute;
  top: 6%;
  right: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 14;
  &:focus {
    outline: none;
  }
  img {
    max-width: 90px;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background: #d8d8d8;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }
    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }
    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
  @media only screen and (max-width: 768px) {
    top: 4%;
    right: 4rem;
  }
`;
