/** @jsxImportSource @emotion/react */

import { memo } from "react";
import InputField from "../../@common/Input/Input";
import { CONTACT_REG_EXP, CloseIconSVG, PlusSVG } from "../../utils/utils";
import ContactFormStyle from "./ContactFormStyle";
import Button from "../../@common/Button/Button";
import { IContactForm } from "../../interfaces/contact";
import useContactForm from "./useContactForm";

const ContactForm = memo(
  ({
    submitText,
    formId,
    data,
    handleContactChange,
  }: IContactForm) => {
    const {
      hasError,
      formData,
      phones,
      setPhone,
      handleSubmit,
      handlePhoneChange,
      handleRemovePhone,
      handleChange,
      isValid
    } = useContactForm({ formId, data, handleContactChange, submitText });
    return (
      <div css={ContactFormStyle.container}>
        <div
          css={ContactFormStyle.closeIcon}
          onClick={() => {
            handleContactChange("");
          }}
        >
          {CloseIconSVG()}
        </div>
        <div css={ContactFormStyle.formContainer}>
          <InputField
            label="First Name"
            name="first_name"
            errorRegex={CONTACT_REG_EXP.onlyDigitNumber}
            errorMessage="Please enter valid first name"
            value={formData?.first_name}
            handleChange={(value, err) => {
              handleChange("first_name", value, err);
            }}
          />
          <InputField
            label="Last Name"
            name="last_name"
            errorRegex={CONTACT_REG_EXP.onlyDigitNumber}
            errorMessage="Please enter valid last name"
            handleChange={(value, err) => {
              handleChange("last_name", value, err);
            }}
            value={formData.last_name}
          />
          {phones?.map((_, index) => (
            <div
              key={`contact-phone-${index}`}
              css={ContactFormStyle.multiPhoneContainer}
            >
              <InputField
                type="tel"
                label="Contact Number"
                name={`contactPhone-${index}`}
                errorRegex={CONTACT_REG_EXP.phoneNumber}
                errorMessage="Please enter number in format +91phone number"
                value={phones[index].number}
                handleChange={(value, err) => {
                  handlePhoneChange(index, value, err);
                }}
                postFix={
                  index > 0 ? (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        handleRemovePhone(index);
                      }}
                    >
                      {CloseIconSVG()}
                    </div>
                  ) : null
                }
              />
            </div>
          ))}
          <Button
            icon={PlusSVG()}
            text="Add Phone Number"
            disabled={!phones[phones?.length - 1]?.number?.match(CONTACT_REG_EXP.phoneNumber)}
            onClick={() => {
              const arr = [...phones];
              arr.push({ number: "" });
              setPhone([...arr]);
            }}
            sx={ContactFormStyle.addButton}
          />
          <Button
            text={submitText}
            background="primary"
            disabled={
              isValid
            }
            onClick={(e) => {
              if (!hasError) {
                handleSubmit(e);
              }
            }}
          />
        </div>
      </div>
    );
  }
);

export default ContactForm;
