import { gql } from '@apollo/client';  

export const GET_PHONE_NUMBERS = gql(`
  query GetContactList (
      $limit: Int, 
      $offset: Int,
      $where: contact_bool_exp, 
  ) {
    contact(
        limit: $limit, 
        offset: $offset,
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
  }
  `);

export const DELETE_CONTACT = gql(`
  mutation MyMutation($id: Int!) {
    delete_contact_by_pk(id: $id) {
      first_name
      last_name
      id
    }
  }
  `);

export const ADD_CONTACT = gql(`
mutation AddContactWithPhones(
  $first_name: String!, 
  $last_name: String!, 
  $phones: [phone_insert_input!]!
  ) {
insert_contact(
    objects: {
        first_name: $first_name, 
        last_name: 
        $last_name, phones: { 
            data: $phones
          }
      }
  ) {
  returning {
    first_name
    last_name
    id
    phones {
      number
    }
  }
}
}`);

export const EDIT_CONTACT_NAME = gql`
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
`