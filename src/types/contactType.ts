/** Consisting of all Data types used within the project except local types, Props types & style types */

export type Phone = {
    number: string
}

export type ContactInfo = {
    created_at: string,
    first_name: string,
    last_name: string,
    id: number,
    phones: Phone[]
}

export type DeletedData = {
    delete_contact_by_pk: {
        first_name: string,
        last_name: string,
        id: number
    }
}

export type ContactList = ContactInfo[]

export type Data = {
    contact: ContactList
}

export type APIStatus = {
    status: null | 'success' | 'failure'
    statusMessage: string
};
