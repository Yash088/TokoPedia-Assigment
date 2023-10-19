import { css } from "@emotion/react";
import { theme } from "../../Theme/Theme";
import { mTablet } from "../../utils/commonStyle";

const ContactStyle={
    button:css`
    color: ${theme.colors.secondary};
    padding: 0;
    z-index:999;
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
      0 1px 3px 1px rgba(60, 64, 67, 0.149);
    padding-top: 2px;
    padding-right: 24px;
    padding-bottom: 2px;
    padding-left: 24px;
    height: 48px;
    border-radius: 24px 24px 24px 24px;
    font-weight: 600;
    margin:20px;
    ${mTablet(`
    margin:0;
    position: fixed;
    right: 20px;
    bottom:20px;
    height: 56px;
    width: 56px;
    padding: 2px;
    border-radius:50%;
    p{
      display:none
    };
 span{
  margin-right:0
 }
    `)}
  `
}

export default ContactStyle;