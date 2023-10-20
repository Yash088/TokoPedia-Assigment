import { FormEvent, useContext, useState } from "react";
import { toast } from "react-toastify";
import {
  addContact,
  editContact,
  editPhoneNumber,
} from "../../service/ContactService";
import { Contact, Phone, IContactForm } from "../../interfaces/contact";
import { ContactContext } from "../../Context/ContactContext";
import { CONTACT_ACTION } from "../../actions/action";
import { CONTACT_ACTION_METHOD, CONTACT_REG_EXP } from "../../utils/utils";

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
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Send formDataObject to API here
    const tempData = formData;
    if (submitText === CONTACT_ACTION_METHOD.VIEW) {
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
  const isValid =
    hasError ||
    !formData?.first_name?.match(CONTACT_REG_EXP.onlyDigitNumber) ||
    !formData?.last_name?.match(CONTACT_REG_EXP.onlyDigitNumber) ||
    phones?.some((phone) => !phone?.number?.match(CONTACT_REG_EXP.phoneNumber));

  return {
    hasError,
    handleSubmit,
    handlePhoneChange,
    handleRemovePhone,
    handleChange,
    formData,
    phones,
    setPhone,
    isValid,
  };
};

export default useContactForm;
