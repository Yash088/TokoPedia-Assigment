/** @jsxImportSource @emotion/react */
import { ButtonHTMLAttributes, FC } from "react";
import { SerializedStyles, css } from "@emotion/react";
import { theme } from "../../Theme/Theme";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: JSX.Element;
  text?: string;
  background?: "transparent" | "primary";
  sx?: SerializedStyles;
  iconSx?: SerializedStyles;
};

const Button: FC<ButtonProps> = ({
  icon,
  text,
  background = "transparent",
  sx,
  iconSx,
  onClick,
  type,
  disabled,
}) => {
  const getButtonStyle = (background) => {
    switch (background) {
      case "transparent":
        return css`
          background: transparent;
        `;
      case "secondary":
        return css`
          background: ${theme.colors.secondary};
        `;
      default:
        return css`
          background: ${theme.colors.primary};
        `;
    }
  };

  return (
    <button
      onClick={(e) => {
        if (onClick) {
          onClick(e);
        }
      }}
      type={type}
      disabled={disabled}
      aria-labelledby={text || "icon-button"}
      aria-label={text || "icon-button"}
      css={() => [
        ` display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem 1rem;
        border: none;
        outline: none;
        box-shadow: none;
        cursor: pointer;
        color: #fff;
        border-radius:10px;
        ${getButtonStyle(background).styles};
        ${sx?.styles?.length ? sx?.styles : ""};
        :disabled{
          background:rgba(0, 0, 0, 0.08);
            color: rgba(0, 0, 0, 0.4);
        }
      `,
      ]}
    >
      {icon && (
        <span
          css={css`
            margin-right: 0.5rem;
            vertical-align: middle;
            ${iconSx?.styles?.length ? iconSx?.styles : ""};
          `}
        >
          {icon}
        </span>
      )}
      <p>{text}</p>
    </button>
  );
};

export default Button;
