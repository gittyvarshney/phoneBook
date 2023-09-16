
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
