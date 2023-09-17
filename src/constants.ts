export const PAGE_LIMIT = 10;

export const VALIDATION_ERRORS = {
    PHONE_INVALID_DIGITS: 'Phone Number should be valid Numeric digits & follow by +',
    PHONE_INVALID_DIGITS_LENGTH:'Phone Number should be between 10 - 14 characters',
    NO_CONTACT_NUMBER: 'Should Have Aleast One Contact Number',
    NAMING_INVALID: 'First Name or Last Name should only be alphabetical',
    EMPTY_NAME: 'First Name or Last Name should not be empty'
} as const;

export const COMMON_ERRORS = {
    SOMETHING_WENT_WRONG: 'Opps Something Went Wrong',
    NON_UNIQUE_NAME: 'Name is not Unique'
}

export const NAME_REGEX = /^[A-Za-z]*$/;
export const CONTACT_NUMBER_REGEX = /^\+\d*$/;

export const TRIANGLE_IMG_CDN_URL = 'https://img.icons8.com/material-rounded/24/give-way.png';