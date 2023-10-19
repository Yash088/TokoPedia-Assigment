import { css } from "@emotion/react";
import { flexCenter, mTablet } from "../../utils/commonStyle";

export const HeadingStyle = {
    container:css`
    padding: 0.5rem 1rem;
    ${flexCenter('row','flex-start','flex-start')};
    ${mTablet(`padding:16px`)}
  `,
  imgContianer: css`${flexCenter()};
    gap:10px; img{height:30px};${mTablet(`img{
        height:40px !important
    }`)}`,
  title: css`color: #5f6368;
    opacity: 1;font-weight:400;${mTablet('display:none')}`,
};
