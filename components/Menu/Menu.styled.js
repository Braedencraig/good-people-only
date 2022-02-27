import styled from "styled-components";

export const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: #000;
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 12;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  @media (max-width: ${({ theme }) => theme.mobile}) {
    width: 100%;
  }
  a {
    font-size: 5rem;
    text-transform: uppercase;
    width: fit-content;
    padding: 0.25rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: #d8d8d8;
    position: relative;
    text-decoration: none;
    transition: color 0.3s linear;
    :nth-child(2) {
      svg.circle {
        top: -15%;
      }
      svg:scratch-out {
        top: 33%;
      }
    }
    @keyframes sign {
      to {
        stroke-dashoffset: 0;
      }
    }
    svg {
      width: 100%;
      height: auto;
    }
    svg.scratch-out {
      position: absolute;
      top: 40%;
      left: 0;
      right: 0;
      z-index: 10;
    }
    :hover {
      svg.scratch-out {
        display: none;
      }
    }
    svg.circle {
      position: absolute;
      right: 0;
      left: 0;
      top: 12%;
      stroke-dasharray: 1046.557861328125;
      stroke-dashoffset: 1046.557861328125;
      transition: stroke-dashoffset 0.4s cubic-bezier(0.7, 0, 0.3, 1);
    }
    svg.circle:hover {
      stroke-dashoffset: 0;
      transition-timing-function: cubic-bezier(0.8, 1, 0.7, 1);
      transition-duration: 0.3s;
    }
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }
    &:hover {
      // color: ${({ theme }) => theme.primaryHover};
    }
  }
  @media only screen and (max-width: 768px) {
    justify-content: center;
    height: 100vh;
    padding: 1rem;
    a {
      font-size: 2rem;
    }
  }
`;
