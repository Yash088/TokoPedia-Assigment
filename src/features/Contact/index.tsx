/** @jsxImportSource @emotion/react */

import { Fragment } from "react";
import { css } from "@emotion/react";
import ContactImg from "../../asset/images/EmptyContact.png"
import EmptyView from "../../@common/EmptyView/EmptyView";
import ResponsivePagination from "react-responsive-pagination";
import Loader from "../../@common/Loader/Loader";
import useContact from "./useContact";
import Button from "../../@common/Button/Button";
import { flexCenter, removeTapColor } from "../../utils/commonStyle";
import { CONTACT_ACTION_METHOD, PlusColoredSVG, PlusSVG } from "../../utils/utils";
import { theme } from "../../Theme/Theme";
import Header from "../../@components/Header/Header";
import ContactStyle from "./style";
import ContactList from "../../@components/ContactList/ContactList";
import ViewContact from "../../@components/ViewContact/ViewContact";
import ContactForm from "../../@components/ContactForm/ContactForm";



const Contact = () => {
  const {
    loading,
    data,
    contactMethod,
    handleContactChange,
    handleDelete,
    totalPage,
    handleFavourite,
    setCurrentPage,
    setSearchInput,
    searchInput,
    currentPage,
  } = useContact();
  return (
    <div
      css={css`
        height: 100vh;
        overflow: hidden;
        ${flexCenter("column", "normal", "flex-start")}
      `}
    >
      <Header searchInput={searchInput} setSearchInput={setSearchInput} />
      {contactMethod?.action?.length ? (
        <Fragment>
          {contactMethod?.action == CONTACT_ACTION_METHOD.EDIT || contactMethod?.action == CONTACT_ACTION_METHOD.CREATE ? (
            <ContactForm
              handleContactChange={handleContactChange}
              handleDelete={handleDelete}
              handleFavourite={handleFavourite}
              submitText={contactMethod?.action}
              formId={contactMethod.id}
              data={contactMethod.data}
            />
          ) : (
            <ViewContact
              id={contactMethod.id}
              handleContactChange={handleContactChange}
              handleDelete={handleDelete}
              handleFavourite={handleFavourite}
            />
          )}
        </Fragment>
      ) : (
        <>
          {loading ? (
            <Loader />
          ) : data?.length ? (
            <div
              css={css`
                display: flex;
                flex-direction: column;
                height: 100%;
                overflow-y: auto;
              `}
            >
              <div
                css={css`
                  flex: 1;
                  padding: 16px;
                `}
              >
                <Button
                  text="Create contact"
                  icon={PlusColoredSVG()}
                  background="transparent"
                  sx={ContactStyle.button}
                  onClick={() => {
                    handleContactChange(CONTACT_ACTION_METHOD.CREATE);
                  }}
                />

                {data.map((contact, index) => (
                  <div
                    key={`${contact?.id}-${index}`}
                    onClick={() => {
                      if (window.innerWidth <= 768) {
                        handleContactChange(CONTACT_ACTION_METHOD.VIEW, String(contact?.id));
                      }
                    }}
                    css={css`
                      display: flex;
                      align-items: center;
                      justify-content: space-between;
                      padding: 0.5rem 1rem;
                      cursor: pointer;
                      :hover {
                        background-color: #f5f5f5;
                        border-radius: 5px;
                      }
                      flex-wrap: wrap;
                      row-gap: 1rem;
                      ${removeTapColor()}
                    `}
                  >
                    <ContactList
                      contact={contact}
                      index={index}
                      favourite={0}
                      handleContactChange={handleContactChange}
                      handleDelete={handleDelete}
                      handleFavourite={handleFavourite}
                    />
                  </div>
                ))}
                <ResponsivePagination
                  current={currentPage}
                  total={totalPage}
                  onPageChange={(page) => {
                    setCurrentPage(page);
                  }}
                />
              </div>
            </div>
          ) : (
            <EmptyView
              img={ContactImg}
              iconCSS={{
                width: "200px",
                height: "200px",
              }}
              extra={
                <div style={{ textAlign: "center" }}>
                  <h5 style={{ marginTop: "5px" }}>No Contacts yet</h5>
                  <Button
                    text="Create Contact"
                    background="transparent"
                    icon={PlusSVG()}
                    onClick={() => {
                      handleContactChange(CONTACT_ACTION_METHOD.CREATE);
                    }}
                    sx={css`
                      margin-top: 5px;
                      background-color: #fff;
                      color: ${theme.colors.primary};
                    `}
                    iconSx={css`
                      margin: 0;
                    `}
                  />
                </div>
              }
            />
          )}
        </>
      )}
    </div>
  );
};

export default Contact;
