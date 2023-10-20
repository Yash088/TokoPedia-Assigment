import { CONTACT_ACTION } from "../actions/action";

const ContactReducer = (state, action) => {
  switch (action.type) {
    case CONTACT_ACTION.FETCH_CONTACT:
      return {
        ...state,
        contacts: [...action.payload?.contactData?.contact] || [],
        // favouriteData: action.payload?.favouriteData || [],
        totalCount:action.payload?.totalCount,
        loading: false,
      };
    case CONTACT_ACTION.ADD_CONTACT:
      const tempContact = state?.totalCount < 10 ? [...state.contacts, action.payload] : state.contacts
      return {
        ...state,
        contacts: tempContact,
        totalCount:state?.totalCount + 1,
      };
    // case CONTACT_ACTION.ADD_TO_FAVORITE_CONTACT:
    //   const regularContacts = state.contacts.filter((contact) => {
    //     return contact.id !== action.payload.id
    //   });
    //   return {
    //     ...state,
    //     // contacts:regularContacts,
    //     // favouriteData:[...state.favouriteData, action.payload.data]
    //   };
    // case CONTACT_ACTION.REMOVE_FAVORITE_CONTACT:
    //   const favouriteData = state.favouriteData?.filter((contact) => {
    //     return contact.id !== action.payload.id
    //   });
    //   const newData = state.contacts;
    //   newData?.push(action.payload.data);
    //   return{
    //     ...state,
    //     // contacts:[...newData],
    //     // favouriteData:favouriteData
    //   };
    case CONTACT_ACTION.EDIT_CONTACT:
      
      const updatedContacts = state.contacts?.map((contact) => {
        if (contact.id == action.payload.id) {
          return action.payload.data;
        }
        return contact;
      });

      return {
        ...state,
        contacts: [...updatedContacts],
      };
    case CONTACT_ACTION.DELETE_CONTACT:
      return {
        ...state,
        contacts: state.contacts.filter(
          (contact) => contact?.id !== action?.payload?.id
        ),
        totalCount: state.totalCount - 1
      };
    case CONTACT_ACTION.SET_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    default:
      return state;
  }
};

export { ContactReducer };
