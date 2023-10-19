import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  addContact,
  editContact,
  editPhoneNumber,
} from "../../service/ContactService";
import { Contact, Phone, IContactForm } from "../../interfaces/contact";
import { ContactContext } from "../../Context/ContactContext";
import { CONTACT_ACTION } from "../../actions/action";

const useContactForm = ({
  data,
  submitText,
  handleContactChange,
  formId,
}: IContactForm) => {
  const { dispatch } = useContext(ContactContext);
  const [hasError, setHasError] = useState(false);
  const [formData, setFormData] = useState<Contact>(data);
  const [phones, setPhone] = useState<Phone[]>(
    data?.phones?.length
      ? data?.phones.map((val) => {
          return {
            number: val?.number,
          };
        })
      : [{ number: "" }]
  );
  const handleChange = (name, val, err) => {
    setHasError(err);
    setFormData((prevData) => ({
      ...prevData,
      [name]: val,
    }));
  };
  const handlePhoneChange = (index, value, err) => {
    const arr = [...phones];
    arr[index].number = value;
    setPhone(arr);
    setHasError(err);
  };
  const handleRemovePhone = (index) => {
    const arr = phones;
    arr.splice(index, 1);
    setPhone([...arr]);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Send formDataObject to API here
    const tempData = formData;

    if (submitText === "Create") {
      addContact(tempData)
        .then((result) => {
          // Handle the result
          if (result?.data?.insert_contact?.returning?.length) {
            dispatch({
              type: CONTACT_ACTION.ADD_CONTACT,
              payload: result?.data?.insert_contact?.returning[0],
            });
            handleContactChange("");
          }
        })
        .catch((error) => {
          toast.warn(error.message);
        });
    } else {
      let err = false;
      for (let i = 0; i < phones.length; i++) {
        if (!err) {
          if (data?.phones[i].number !== phones[i].number) {
            await editPhoneNumber(
              formId,
              data?.phones[i].number,
              phones[i].number
            )
              .then()
              .catch((error) => {
                err = true;
                toast.warn(error.message);
              });
          }
        } else {
          break;
        }
      }
      if (err) {
        return;
      }
      editContact(formId, {
        first_name: tempData?.first_name,
        last_name: tempData?.last_name,
      })
        .then((result: any) => {
          if (result?.data) {
           
            dispatch({
              type: CONTACT_ACTION.EDIT_CONTACT,
              payload: {
                id: Number(formId),
                data: {
                  id: Number(formId),
                  first_name: tempData?.first_name,
                  last_name: tempData?.last_name,
                  phones: phones,
                },
              },
            });
            handleContactChange("");
          }
        })
        .catch((error) => {
          toast.warn(error.message);
        });
    }
  };
  if (submitText == "View") {
  }

  return {
    hasError,
    handleSubmit,
    handlePhoneChange,
    handleRemovePhone,
    handleChange,
    formData,
    phones,
    setPhone,
  };
};

export default useContactForm;
