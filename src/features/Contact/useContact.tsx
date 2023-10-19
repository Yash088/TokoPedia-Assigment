
import {  PER_PAGE, } from "../../utils/utils";
import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../Context/ContactContext";
import { Contact } from "../../interfaces/contact";
import { deleteContact, getContactList } from "../../service/ContactService";
import { CONTACT_ACTION } from "../../actions/action";
import { toast } from 'react-toastify';

import useDebounce from "../../hooks/useDebounce";

const useContact = () => {   
  const {state,dispatch} = useContext(ContactContext);
  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const debounceSearch = useDebounce(searchInput, 200);
  const [contactMethod,setContactMethod] = useState<{id:string,action:string,data:Contact}>({id:"",action:'',data:{}});

  useEffect(()=>{
    handleSearch();
},[debounceSearch,currentPage]);

  const handleContactChange = (method,id='',data={}) => {
    setContactMethod({id,action:method,data})
  }
  const handleDelete = (id:string)=>{
    deleteContact(id).then(
      (res)=>{
        if(res?.data?.delete_contact_by_pk?.id){
          dispatch({type:CONTACT_ACTION.DELETE_CONTACT,payload:{id:Number(id)}});
        }
        if(contactMethod.action == 'View'){
          handleContactChange('')
        }
      }
    ).catch((err) => {})
  }

  const  handleFavourite = ()=>{
    toast.warn('There were neither any api endpoint or the schema of graphql has column for this feature, Please check')
      // dispatch({type: CONTACT_ACTION.ADD_TO_FAVORITE_CONTACT,payload:{id:data?.id,data}});
  }

  const handleSearch = async()=>{
      dispatch({type:CONTACT_ACTION.SET_LOADING,payload:{loading:true}});
      const where = debounceSearch?.length ? {
          _or: [
            { first_name: { _ilike: `%${debounceSearch}%` } },
            { last_name: { _ilike: `%${debounceSearch}%` } },
            { phones: { number: { _ilike: `%${debounceSearch}%` } } }
          ]
        }   : {}  
      await getContactList(PER_PAGE, (currentPage - 1) * PER_PAGE, where).then((res)=>{
          dispatch({
              type: CONTACT_ACTION.FETCH_CONTACT,
              payload: {
                contactData:res,
                totalCount:res?.contact_aggregate?.aggregate?.count || 0
              },
            });
       }).catch((err)=>{
          return err
       })

  }



  return {
    loading:state.loading,
    data:state?.contacts || [],
    favouriteData:state.favouriteData || [],
    contactMethod,
    handleContactChange,
    handleDelete,
    handleFavourite,
    totalPage: Math.ceil(state.totalCount/PER_PAGE),
    searchInput,
    setSearchInput,
    currentPage,
    setCurrentPage
  }
}

export default useContact
