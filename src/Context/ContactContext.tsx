import { FC, ReactNode, createContext, useReducer } from "react";
import { ContactReducer } from "../reducer/ContactReducer";
import { ContactContext, ContactReducerState } from "../interfaces/contact";

const initialState: ContactReducerState = {
  contacts: [],
  favouriteData: [],
  loading: true,
  totalCount:10,
};

const ContactContext = createContext<ContactContext>({
  state: initialState,
  dispatch: () => {},
});

const ContactProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(ContactReducer, initialState);

 
  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};

export { ContactContext, ContactProvider };
