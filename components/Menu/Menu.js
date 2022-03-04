import React, { useEffect } from "react";
import { bool } from "prop-types";
import Link from "next/link";
import { StyledMenu } from "./Menu.styled";

const Menu = ({ open, store }) => {
  return (
    <StyledMenu open={open}>
      <Link href="/roster">
        <a>
          Roster
          <svg
            width="373px"
            height="84px"
            viewBox="0 0 373 84"
            version="1.1"
            className="circle"
          >
            <g
              id="GPO-SITE"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="1.1-landing-expanded-copy-4"
                transform="translate(-17.000000, -253.000000)"
                stroke="#D8D8D8"
              >
                <path
                  id="test"
                  d="M390,272.53922 C300.847435,259.335842 277.823751,259.335842 157.5926,259.335842 C78.4252274,259.335842 -29.3959003,289.848205 40.5873821,321.140925 C85.4113963,341.183788 219.346731,335.088467 252.782835,334.15637 C295.344051,332.969893 376.793189,311.825332 376.793189,294.750244 C376.793189,277.675157 367.437803,274.913211 357.658811,269.645829 C349.902476,265.467936 328.941531,260.652111 320.655972,259.335842 C252.176869,248.457042 179.034209,254.618127 112.447968,267.939684"
                  id="Path-2"
                ></path>
              </g>
            </g>
          </svg>
        </a>
      </Link>
      <Link href="/about">
        <a>
          About
          <svg
            width="373px"
            height="84px"
            viewBox="0 0 373 84"
            version="1.1"
            className="circle"
          >
            <g
              id="GPO-SITE"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="1.1-landing-expanded-copy-4"
                transform="translate(-17.000000, -253.000000)"
                stroke="#D8D8D8"
              >
                <path
                  id="test"
                  d="M390,272.53922 C300.847435,259.335842 277.823751,259.335842 157.5926,259.335842 C78.4252274,259.335842 -29.3959003,289.848205 40.5873821,321.140925 C85.4113963,341.183788 219.346731,335.088467 252.782835,334.15637 C295.344051,332.969893 376.793189,311.825332 376.793189,294.750244 C376.793189,277.675157 367.437803,274.913211 357.658811,269.645829 C349.902476,265.467936 328.941531,260.652111 320.655972,259.335842 C252.176869,248.457042 179.034209,254.618127 112.447968,267.939684"
                  id="Path-2"
                ></path>
              </g>
            </g>
          </svg>
        </a>
      </Link>
      <a href={store} target="_blank" rel="noopener noreferrer">
        Store
        <svg
          width="373px"
          height="84px"
          viewBox="0 0 373 84"
          version="1.1"
          className="circle"
        >
          <g
            id="GPO-SITE"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="1.1-landing-expanded-copy-4"
              transform="translate(-17.000000, -253.000000)"
              stroke="#D8D8D8"
            >
              <path
                id="test"
                d="M390,272.53922 C300.847435,259.335842 277.823751,259.335842 157.5926,259.335842 C78.4252274,259.335842 -29.3959003,289.848205 40.5873821,321.140925 C85.4113963,341.183788 219.346731,335.088467 252.782835,334.15637 C295.344051,332.969893 376.793189,311.825332 376.793189,294.750244 C376.793189,277.675157 367.437803,274.913211 357.658811,269.645829 C349.902476,265.467936 328.941531,260.652111 320.655972,259.335842 C252.176869,248.457042 179.034209,254.618127 112.447968,267.939684"
                id="Path-2"
              ></path>
            </g>
          </g>
        </svg>
      </a>
      <Link href="/consulting">
        <a href="/">
          Consulting
          <svg
            width="373px"
            height="84px"
            viewBox="0 0 373 84"
            version="1.1"
            className="circle"
          >
            <g
              id="GPO-SITE"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="1.1-landing-expanded-copy-4"
                transform="translate(-17.000000, -253.000000)"
                stroke="#D8D8D8"
              >
                <path
                  id="test"
                  d="M390,272.53922 C300.847435,259.335842 277.823751,259.335842 157.5926,259.335842 C78.4252274,259.335842 -29.3959003,289.848205 40.5873821,321.140925 C85.4113963,341.183788 219.346731,335.088467 252.782835,334.15637 C295.344051,332.969893 376.793189,311.825332 376.793189,294.750244 C376.793189,277.675157 367.437803,274.913211 357.658811,269.645829 C349.902476,265.467936 328.941531,260.652111 320.655972,259.335842 C252.176869,248.457042 179.034209,254.618127 112.447968,267.939684"
                  id="Path-2"
                ></path>
              </g>
            </g>
          </svg>
        </a>
      </Link>np
      <Link href="/contact">
        <a>
          Contact
          <svg
            width="373px"
            height="84px"
            viewBox="0 0 373 84"
            version="1.1"
            className="circle"
          >
            <g
              id="GPO-SITE"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g
                id="1.1-landing-expanded-copy-4"
                transform="translate(-17.000000, -253.000000)"
                stroke="#D8D8D8"
              >
                <path
                  id="test"
                  d="M390,272.53922 C300.847435,259.335842 277.823751,259.335842 157.5926,259.335842 C78.4252274,259.335842 -29.3959003,289.848205 40.5873821,321.140925 C85.4113963,341.183788 219.346731,335.088467 252.782835,334.15637 C295.344051,332.969893 376.793189,311.825332 376.793189,294.750244 C376.793189,277.675157 367.437803,274.913211 357.658811,269.645829 C349.902476,265.467936 328.941531,260.652111 320.655972,259.335842 C252.176869,248.457042 179.034209,254.618127 112.447968,267.939684"
                  id="Path-2"
                ></path>
              </g>
            </g>
          </svg>
        </a>
      </Link>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
