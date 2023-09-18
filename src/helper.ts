
import { Phone, ContactList, ContactInfo } from "./types/contactType";
import { VALIDATION_ERRORS, NAME_REGEX, CONTACT_NUMBER_REGEX, CONTACT_NUMBER_LENGTH__REGEX} from "./constants";


export const validateFields = (firstName: string, lastName: string, userContact?: Phone[]) => {
    if(!firstName || !lastName){
        return VALIDATION_ERRORS.EMPTY_NAME;
    }

    if(!NAME_REGEX.test(firstName) || !NAME_REGEX.test(lastName)){
        return VALIDATION_ERRORS.NAMING_INVALID;
    }

    if(userContact){

        if(userContact.length === 0){
            return VALIDATION_ERRORS.NO_CONTACT_NUMBER;
        }

        for(let i=0; i<userContact.length; i++){
            const { number: contactNumber } = userContact[i];

            if(!CONTACT_NUMBER_REGEX.test(contactNumber)){
                return VALIDATION_ERRORS.PHONE_INVALID_DIGITS;
            }

            if(!CONTACT_NUMBER_LENGTH__REGEX.test(contactNumber)){
                return VALIDATION_ERRORS.PHONE_INVALID_DIGITS_LENGTH;
            }

        }
    }

    return '';
    
}

export const filterOutFavourites = <T extends ContactList>(contactList: T, favouritesList: T): ContactList => {

    return contactList.filter((contact) => {

        const isFound = favouritesList.find((favContact) => {
            if(contact.id === favContact.id){
                return true;
            }
            return false;
        })
        return isFound ? false: true;

    })

}

export const filterContactById = (contactList: ContactList , id: number): ContactList => {

    return contactList.filter((contact) => {

        if(contact.id === id){
            return false;
        }
        return true;
    })

}

export const checkIfListIncludesId = (contactList: ContactList , id: number): ContactInfo | undefined => {

    return contactList.find((contact) => {

        if(contact.id === id){
            return true;
        }
        return false;
    })

}

