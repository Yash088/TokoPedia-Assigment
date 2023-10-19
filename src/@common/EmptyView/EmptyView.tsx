import { ReactNode } from "react";

const EmptyView = ({
  img,
  title,
  iconCSS,
  extra,
}: {
  img: string;
  title?: string;
  iconCSS?: { [key: string]: string | number };
  extra?: ReactNode;
}) => {
  return (
    <div className="emptyView-container">
      <img src={img} style={iconCSS} alt='emptyView'/>
      {title && <h4>{title}</h4>}
      {extra}
    </div>
  );
};

export default EmptyView;
