/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react";
import EmptyView from "../../@common/EmptyView/EmptyView";
import Loader from "../../@common/Loader/Loader";
import useContact from "./useContact";
import Button from "../../@common/Button/Button";
import { flexCenter, removeTapColor } from "../../utils/commonStyle";
import { PlusColoredSVG, PlusSVG } from "../../utils/utils";
import { theme } from "../../Theme/Theme";
import Header from "../../@components/Header/Header";
import ContactStyle from "./style";
import ContactForm from "../../@components/ContactForm/ContactForm";
import ResponsivePagination from "react-responsive-pagination";
import ContactList from "../../@components/ContactList/ContactList";
import { Fragment } from "react";
import ViewContact from "../../@components/ViewContact/ViewContact";

const Contact = () => {
  const {
    loading,
    data,
    contactMethod,
    handleContactChange,
    favouriteData,
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
          {contactMethod?.action == "Edit" || contactMethod?.action == "Add" ? (
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
                    handleContactChange("Create");
                  }}
                />

                {data.map((contact, index) => (
                  <div
                    key={`${contact?.id}-${index}`}
                    onClick={() => {
                      if (window.innerWidth <= 768) {
                        handleContactChange("View", String(contact?.id));
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
              img="/asset/images/EmptyContact.png"
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
                      handleContactChange("Create");
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
