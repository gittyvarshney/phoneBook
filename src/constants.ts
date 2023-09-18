export const PAGE_LIMIT = 10;

export const APOLLO_CLIENT_URI = 'https://wpe-hiring.tokopedia.net/graphql'

export const VALIDATION_ERRORS = {
    PHONE_INVALID_DIGITS: 'Phone Number should be valid Numeric digits may or may not be followed by +',
    PHONE_INVALID_DIGITS_LENGTH:'Phone number should be in between 10-14 characters or in between 11-17 characters with (+) country code',
    NO_CONTACT_NUMBER: 'Should Have Aleast One Contact Number',
    NAMING_INVALID: 'First Name or Last Name should only be alphabetical',
    EMPTY_NAME: 'First Name or Last Name should not be empty'
} as const;

export const COMMON_ERRORS = {
    SOMETHING_WENT_WRONG: 'Opps Something Went Wrong',
    GET_CONTACT_APOLLO_QUERY_FAILED: 'Apollo GetContact Query Failed Please Report',
    ADD_NEW_CONTACT_APOLLO_QUERY_FAILED: 'Apollo AddContact Query Failed Please Report',
    EDIT_CONTACT_APOLLO_QUERY_FAILED: 'Apollo EditContact Query Failed Please Report',
    DELETE_CONTACT_APOLLO_QUERY_FAILED: 'Apollo DeleteContact Query Failed Please Report',
    NON_UNIQUE_NAME: 'Name is not Unique'
} as const;

export const SUCCESS_TEXT = {
    DELETION_SUCCESS: 'This Record has been deleted from the database',
    ADDITION_SUCCESS: 'Successfully Added the contact in the database',
    EDITION_SUCCESS: 'Successfully Edited the contact info'
} as const;

export const STATUS = {
    SUCCESS: 'success',
    FAILURE: 'failure'
} as const;

export const NAME_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
export const CONTACT_NUMBER_REGEX = /^(\+\d+|\d+)$/;
export const CONTACT_NUMBER_LENGTH__REGEX =/^(\+\d{11,17}|\d{10,14})$/;

export const TRIANGLE_IMG_CDN_URL = 'https://img.icons8.com/material-rounded/24/give-way.png';