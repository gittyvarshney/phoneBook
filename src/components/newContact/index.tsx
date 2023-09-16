import React, { useState } from 'react';
import { Phone } from '../../types/contactType';
import { GET_PHONE_NUMBERS } from '../../queries/getDataQuery';
import { ApolloQueryResult } from '@apollo/client';
import { Data } from '../../types/contactType';
import { useQuery } from '@apollo/client';
import { VALIDATION_ERRORS, COMMON_ERRORS, NAME_REGEX, CONTACT_NUMBER_REGEX } from '../../constants';
import { validateFields } from '../../helper';
import './styles.css';

interface NewContactProps{
    onSubmitContact: (firstName: string, lastName: string, phones: Phone[]) => void
}

const NewContact: React.FC<NewContactProps> = ({onSubmitContact}) => {

    const { refetch: searchforSameName } = useQuery(GET_PHONE_NUMBERS, { skip: true })

    const [createContactPopup, setCreateContactPopup] = useState<boolean>(false);

    const [userName, setUserName] = useState({ first_name: '', last_name: '', });

    const [userContact, setUserContact] = useState<Phone[]>([]);

    const [validationError, setValidationError] = useState<string>('');

    const { first_name: firstName, last_name: lastName} = userName;

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target; 

        if(target.id === 'first-name-input'){
            setUserName({ ...userName, first_name: target.value})
        }else{
            setUserName({ ...userName, last_name: target.value})
        }

        e.stopPropagation();
    }

    const handleContactAdd = (e: React.MouseEvent<HTMLButtonElement>) => {

        setUserContact([...userContact, { number: ''}])

        e.stopPropagation();

    }

    const handleDeleteContact = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = (e.target as HTMLButtonElement).id;
        const id_index = Number(id);

        const filterContactByIndex = userContact.filter((val,index) => {
            if(id_index === index){
                return false;
            }
            return true;
        })

        setUserContact(filterContactByIndex);
        e.stopPropagation();

    }

    const handleInputContact = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {

        const inputVal = e.target.value;

        const contactList = [...userContact];

        contactList[index] = { number: inputVal};

        setUserContact(contactList);

        e.stopPropagation();
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

        const validationRes = validateFields(firstName,lastName,userContact);

        if(validationRes){
            setValidationError(validationRes);
        }else{
            /** Checking if It is a unique name or not */
            searchforSameName({
                limit: 1,
                offset: 0,
                where: { 
                    first_name: {"_ilike": `${firstName}` },
                    last_name: { "_ilike": `${lastName}`}
                }
            }).then((response: ApolloQueryResult<Data>) => {
                const { data, error } = response;
                if(error){
                    setValidationError(COMMON_ERRORS.SOMETHING_WENT_WRONG);
                }else{

                    const { contact: contactList } = data;
                    if(!contactList || contactList.length !== 0){
                        setValidationError(COMMON_ERRORS.NON_UNIQUE_NAME);
                    }else{
                        onSubmitContact(firstName,lastName,userContact);
                        setValidationError('');
                        togglePopup()
                    }
                }
            })
        }
        e.stopPropagation();
    }

    const togglePopup = (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        setCreateContactPopup((prev) => !prev);
        e && e.stopPropagation();
    }



    return(
        <>
        <div className='create-contact'>
            <button onClick={togglePopup}> Create New </button>
        </div>
        {createContactPopup && 
            (<div className='popupWrapper' onClick={togglePopup}>
                <div className='contentWrapper' onClick={(e) => e.stopPropagation()}>
                    <div className='first-name-input-wrapper'>
                        <input id='first-name-input' value={firstName} max={20} onChange={handleNameInput} />
                    </div>
                    <div className='last-name-input-wrapper'>
                        <input id='last-name-input' value={lastName} max={20} onChange={handleNameInput} />
                    </div>
                    <div className='add-contant'>
                        <button onClick={handleContactAdd}> Add Contact</button>
                    </div>
                    {userContact.map((contact,index) => {
                        const { number: contactNumber } = contact;
                        return (
                            <div key={`${index}-cntc`} className='contact-input' >
                                <input value={contactNumber} pattern='^\+\d*$' max={15} onChange={(e) => handleInputContact(e,index)} />
                                <button id={`${index}`} onClick={handleDeleteContact}> Delete </button>
                            </div>
                        )
                    })}
                    <div className='bottom-btns'>
                        <button onClick={togglePopup}> Close </button>
                        <button onClick={handleSubmit}> Submit </button>
                    </div>
                    {validationError && 
                        <div className='validation'>
                            <p>{validationError}</p>
                        </div>
                        }
                </div>
            </div>)
        }
        </>
    )
}

export default NewContact;