import { useQuery } from "@apollo/client";
import { getContactDetail } from "../../service/ContactService";

const useViewContact = ({ id }) => {
  const { loading, data } = useQuery(getContactDetail, {
    variables: { id },
    fetchPolicy: 'no-cache',
  });
  return {
    loading,
    data:data?.contact_by_pk || {},
  };
};

export default useViewContact;
