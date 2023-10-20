/** @jsxImportSource @emotion/react */

import { Fragment } from "react";
import { css } from "@emotion/react";
import Avatar from "../../@common/Avatar/Avatar";
import EmptyView from "../../@common/EmptyView/EmptyView";
import Loader from "../../@common/Loader/Loader";
import { CONTACT_ACTION_METHOD, CloseIconSVG, DeleteIcon, PencilIcon, PhoneSVG, StarIcon } from "../../utils/utils";
import { ViewContactStyle } from "./ViewContactStyle";
import { IContactForm,  } from "../../interfaces/contact";
import useViewContact from "./useViewContact";
import ContactFormStyle from "../ContactForm/ContactFormStyle";
import Button from "../../@common/Button/Button";
import { smTablet, sTablet } from "../../utils/commonStyle";
import EmptyImage from "../../asset/images/EmptyContact.png";

interface IViewContact extends IContactForm {
  id: string;
}
const ViewContact = ({ id,submitText,handleContactChange,handleDelete,handleFavourite }: IViewContact) => {
  const { loading, data } = useViewContact({ id });
  return (
    <div css={ContactFormStyle.container}>
      <div
        css={css`
          position: absolute;
          top: 20px;
          right: 50px;
          display: none;
          align-items: center;
          ${smTablet(`display:flex`)};
          ${sTablet(`display:flex`)}
        `}
      >
        <Button
          icon={StarIcon()}
          onClick={() => {
            handleFavourite();
          }}
          sx={css`
            padding: 0;
          `}
        />
        <Button
          icon={PencilIcon()}
          sx={css`
            padding: 0;
          `}
          onClick={() => {
            handleContactChange(CONTACT_ACTION_METHOD.EDIT, String(id), data);
          }}
        />
        <Button
          icon={DeleteIcon()}
          sx={css`
            padding: 0;
          `}
          onClick={() => {
            handleDelete(String(id));
          }}
        />
      </div>
    <div
      css={ContactFormStyle.closeIcon}
      onClick={() => {
        handleContactChange("");
      }}
    >
      {CloseIconSVG()}
    </div>
    <div
      style={{
        width: "100%",
        marginTop: "60px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {loading ? (
        <Loader />
      ) : Object.entries(data)?.length ? (
        <Fragment>
          <div css={ViewContactStyle.avatarStyle}>
            <Avatar
              name={data?.first_name?.length ? data?.first_name[0] : ""}
            />
            <p>{`${data?.first_name || ""} ${data?.last_name || {}}`}</p>
          </div>
          <div css={ViewContactStyle.bodyContainer}>
            <h3>Contact Detail</h3>
            <div css={ViewContactStyle.phoneContainer}>
              {data?.phones?.map((val, index) => (
                <p key={`${val?.number}-${index}`}>
                  {PhoneSVG()} {`${val?.number || ""}`}
                </p>
              ))}
            </div>
          </div>
        </Fragment>
      ) : (
        <EmptyView
          img={EmptyImage}
          iconCSS={{
            width: "200px",
            height: "200px",
          }}
          title="No Data Found"
        />
      )}
    </div>
    </div>
  );
};

export default ViewContact;
