import { css } from "@emotion/react";
import { flexCenter, lTablet, sTablet } from "../../utils/commonStyle";

export const ViewContactStyle = {
  avatarStyle: css`
  width: 100%;
  margin-bottom:35px;
    ${flexCenter('column')};
    div {
      width: 80px;
      height: 80px;
      font-size:25px;
      font-weight:bold;
    }
    p{
      font-size:30px;
    }
  `,
  bodyContainer: css`
    ${flexCenter("column", "flex-start", "flex-start")};
    gap: 20px;
    background-color: #F0F4F8;
    border-radius:20px;
    padding:16px;
    width:50%;
    ${lTablet(`width:70%`)}
    ${sTablet(`width:100%`)}
  `,
  phoneContainer: css`${flexCenter(
    "column",
    "flex-start",
    "flex-start"
  )}; gap:10px;p{${flexCenter()};gap:15px;color:#595A5D}`,
};
