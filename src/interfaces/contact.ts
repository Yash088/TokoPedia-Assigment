import { Dispatch, SetStateAction } from "react";

export interface Contact {
  id?: number;
  first_name?: string;
  last_name?: string;
  phones?: Phone[];
}

export interface ContactData extends Contact {
  created_at: Date;
}
export interface ContactRes {
  contact: ContactData[];
}
export interface ContactReducerState {
  contacts: ContactData[];
  favouriteData: ContactData[];
  loading: boolean;
  totalCount: number;
}
export interface ContactContext {
  state: ContactReducerState;
  dispatch: Dispatch<{ type: string; payload: { [key: string]: any } }>;
}
export interface Phone {
  number: string;
}

export interface searchBoxInterface {
  searchInput: string;
  setSearchInput: Dispatch<SetStateAction<string>>;
}
export interface IContactFunction {
  handleFavourite?: () => void;
  handleDelete?:(id:string)=>void;
  handleContactChange: (
    method: string,
    id?: string,
    data?: ContactData | Contact
  ) => void;
}
export interface IContactForm extends IContactFunction { 
  submitText?: string;
  formId?: string;
  data?: Contact;
}
export interface IContactList extends IContactFunction {
  contact: ContactData;
  index: number;
  favourite?: number;

}
