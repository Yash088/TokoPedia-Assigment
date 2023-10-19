import { gql, ApolloClient, InMemoryCache } from '@apollo/client';
import { Contact,   } from '../interfaces/contact';

const client = new ApolloClient({
    uri: process.env.REACT_APP_API_ENDPOINT_URL, // Replace with your GraphQL API URL
    cache: new InMemoryCache(),
  });
  
  // Function to fetch contact list
export const getContactList = async (limit, offset, where = {}) => {
  try {
    const { data } = await client.query({
      query: gql`
        query GetContactList (
          $distinct_on: [contact_select_column!], 
          $limit: Int, 
          $offset: Int, 
          $order_by: [contact_order_by!], 
          $where: contact_bool_exp
        ) {
          contact(
              distinct_on: $distinct_on, 
              limit: $limit, 
              offset: $offset, 
              order_by: $order_by, 
              where: $where
          ){
            created_at
            first_name
            id
            last_name
            phones {
              number
            }
          }
          
          contact_aggregate(
              where: $where
          ) {
            aggregate {
              count
            }
          }
        }
      `,
      variables: { limit, offset, where },
    });
    return data;
  } catch (err) {
    return err;
  }
};

  
  // Function to get a single contact
  export const getContactDetail = 
        gql`query GetContactDetail($id: Int!) {
          contact_by_pk(id: $id) {
            last_name
            id
            first_name
            created_at
            phones {
              number
            }
          }
        }
      `
  
  // Function to add a contact
  export const addContact = (contactData: Contact) => {
    return client.mutate({
      mutation: gql`
        mutation AddContactWithPhones($first_name: String!, $last_name: String!, $phones: [phone_insert_input!]!) {
          insert_contact(objects: { first_name: $first_name, last_name: $last_name, phones: { data: $phones } }) {
            returning {
              first_name
              last_name
              id
              phones {
                number
              }
            }
          }
        }
      `,
      variables: contactData,
    });
  };
  
  // Function to edit a contact
  export const editContact = (id: string, updatedData: Contact) => {
    return client.mutate({
      mutation: gql`
      mutation EditContactById($id: Int!, $_set: contact_set_input) {
        update_contact_by_pk(pk_columns: {id: $id}, _set: $_set) {
          id
          first_name
          last_name
          phones {
            number
          }
        }
      }      
      `,
      variables: { id: parseInt(id), _set: updatedData },
    });
  };
  // Function to edit a phone number
export const editPhoneNumber = (contact_id: string, number: string, new_phone_number: string) => {
  return client.mutate({
    mutation: gql`
      mutation EditPhoneNumber($pk_columns: phone_pk_columns_input!, $new_phone_number:String!) {
        update_phone_by_pk(pk_columns: $pk_columns, _set: { number: $new_phone_number }) {
          contact {
            id
            last_name
            first_name
            created_at
            phones {
              number
            }
          }
        }
      }
    `,
    variables: { pk_columns: { number, contact_id }, new_phone_number },
  });
};


  // Function to delete a contact
  export const deleteContact = (id:string) => {
    return client.mutate({
      mutation: gql`
      mutation MyMutation($id: Int!) {
        delete_contact_by_pk(id: $id) {
          first_name
          last_name
          id
        }
      }
      
      `,
      variables: { id: parseInt(id), },
    });
  };