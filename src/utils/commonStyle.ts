import { css } from "@emotion/react";

export const flexCenter = (
  direction = "row",
  alignItems = "center",
  justifyContent = "center"
) => {
  return css`display: flex;
    flex-direction: ${direction};
    align-items: ${alignItems};
    justify-content: ${justifyContent}`.styles;
};

export const ellipsis = (line = 4) => {
  return css`overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${line}; 
  -webkit-box-orient: vertical`.styles;
}

export const largerDesktop = (styles: string) => css`
  @media (min-width: 1920px) {
    ${styles}
  }
`;

export const lDesktop = (styles: string) => css`
  @media (max-width: 1536px) {
    ${styles}
  }
`;

export const smDesktop = (styles: string) => css`
  @media (max-width: 1350px) {
    ${styles}
  }
`;

export const mDesktop = (styles: string) => css`
  @media (max-width: 1200px) {
    ${styles}
  }
`;

export const sDesktop = (styles: string) => css`
  @media (max-width: 1024px) {
    ${styles}
  }
`;

export const lTablet = (styles: string) => css`
  @media (max-width: 991px) {
    ${styles}
  }
`;

export const mTablet = (styles: string) => css`
  @media (max-width: 768px) {
    ${styles}
  }
`;

export const smTablet = (styles: string) => css`
  @media (min-width: 601px) and (max-width: 768px) {
    ${styles}
  }
`;

export const sTablet = (styles: string) => css`
  @media (max-width: 550px) {
    ${styles}
  }
`;

export const lMobile = (styles: string) => css`
  @media (max-width: 425px) {
    ${styles}
  }
`;

export const mMobile = (styles: string) => css`
  @media (max-width: 375px) {
    ${styles}
  }
`;

export const sMobile = (styles: string) => css`
  @media (max-width: 350px) {
    ${styles}
  }
`;

export const xsMobile = (styles: string) => css`
  @media (max-width: 300px) {
    ${styles}
  }
`;

export const removeTapColor = () => css`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
}`
