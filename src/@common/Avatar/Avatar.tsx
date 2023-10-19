/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { SerializedStyles, css } from "@emotion/react";
import { flexCenter } from "../../utils/commonStyle";
import { getRandomColor } from "../../utils/utils";

interface AvatarProps {
  name: string;
  sx?:SerializedStyles
}

const Avatar: FC<AvatarProps> = ({ name,sx }) => {
  return (
    <div
      css={css`
        ${flexCenter()};
        height: 45px;
        width: 45px;
        border-radius: 50%;
        background-color: ${getRandomColor()};
        color: #fff;
        ${sx?.styles?.length ?sx : ''}
      `}
    >
      {name[0].toUpperCase()}
    </div>
  );
};

export default Avatar;
