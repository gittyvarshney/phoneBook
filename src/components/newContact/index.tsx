import React, { useState } from 'react';
import { Phone } from '../../types/contactType';
import './styles.css';

interface NewContactProps{
    onSubmitContact: (firstName: string, lastName: string, phones: Phone[]) => void
}

const NewContact: React.FC<NewContactProps> = ({onSubmitContact}) => {


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

    const validateFields = () => {
        if(!firstName || !lastName){
            return 'First Name or Last Name should not be empty'
        }

        const nameRegex = /^[A-Za-z]*$/;
        const phoneRegex = /^\+\d*$/;

        if(!nameRegex.test(firstName) || !nameRegex.test(firstName)){
            return 'First Name or Last Name should only be alphabetical'
        }

        if(userContact.length === 0){
            return 'Should Have Aleast One Contact Number'
        }


        for(let i=0; i<userContact.length; i++){
            const { number: contactNumber } = userContact[i];

            if(!phoneRegex.test(contactNumber)){
                return 'Phone Number should be valid digits follow by +'
            }

            if(contactNumber.length < 10 || contactNumber.length > 14){
                return 'Phone Number should be between 10 - 14 characters';
            }

        }

        return '';
        
    }

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

        const validationRes = validateFields();

        if(validationRes){
            setValidationError(validationRes);
        }else{
            onSubmitContact(firstName,lastName,userContact);
            setValidationError('');
        }
        e.stopPropagation();
    }

    const togglePopup = (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        setCreateContactPopup((prev) => !prev);
        e.stopPropagation();
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