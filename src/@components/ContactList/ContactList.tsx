/** @jsxImportSource @emotion/react */

import { Fragment } from "react";
import { css } from "@emotion/react";

import Avatar from "../../@common/Avatar/Avatar";
import Button from "../../@common/Button/Button";
import { IContactList } from "../../interfaces/contact";
import { CONTACT_ACTION_METHOD, DeleteIcon, PencilIcon, StarIcon } from "../../utils/utils";
import { ellipsis, sTablet, smTablet } from "../../utils/commonStyle";


const ContactList = ({contact,favourite,handleFavourite,handleContactChange,handleDelete}:IContactList) => {

  return (
   <Fragment>
    <div
      css={css`
        display: flex;
        align-items: center;
        flex-grow:1
      `}
    >
      <Avatar name={`${contact?.first_name[0] || ""}`} />
      <div
        css={css`
          margin-left: 1rem;
          width: 100%;
        `}
      >
        <p
          css={css`
            font-weight: 600;
            width: 100%;

            ${ellipsis(1)};
          `}
        >
          {`${contact?.first_name || ""} ${
            contact?.last_name || ""
          }`}
        </p>
        <p
          css={css`
            width: 100%;
            ${ellipsis(1)};
            margin-top: 3px;
          `}
        >
          {contact?.phones[0]?.number}
        </p>
      </div>
    </div>
    <div css={css`   display: flex;
        align-items: center; ${smTablet(`display:none`)};${sTablet(`display:none`)}
        `}>
      <Button icon={StarIcon(favourite)} onClick={()=>{
        handleFavourite();
      }} sx={css`padding:0`}/>
      <Button icon={PencilIcon()} sx={css`padding:0`} onClick={()=>{
        handleContactChange(CONTACT_ACTION_METHOD.EDIT,String(contact?.id),contact);
      }}/>
      <Button icon={DeleteIcon()} sx={css`padding:0`}onClick={()=>{
        handleDelete(String(contact?.id))
      }}/>
    </div>
 </Fragment>
 
  );
};

export default ContactList;
