import React, { useState } from 'react';
import { Phone } from '../../types/contactType';
import { GET_PHONE_NUMBERS } from '../../queries/getDataQuery';
import { ApolloQueryResult } from '@apollo/client';
import { Data } from '../../types/contactType';
import { useQuery } from '@apollo/client';
import { COMMON_ERRORS } from '../../constants';
import { validateFields } from '../../helper';
import { Button, PopupWrapper, CustomButton } from './styles';

interface NewContactProps{
    onSubmitContact: (firstName: string, lastName: string, phones: Phone[]) => void
    onApiStatus: (errMsg: string, isSuceess?: boolean) => void;
}

/** Component used to Render the Create New Button & Create Contact Popup
 *  it fires the onSubmitContact callback when submitting the new entry
 *  and corresponding onApiStatus whether the api failed or succeed
 */
const NewContact: React.FC<NewContactProps> = ({onSubmitContact, onApiStatus}) => {

    const { refetch: searchforSameName } = useQuery(GET_PHONE_NUMBERS, { skip: true })

    const [createContactPopup, setCreateContactPopup] = useState<boolean>(false);

    /** state saving first name and last name input with values */
    const [userName, setUserName] = useState({ first_name: '', last_name: '', });

    /** state saving array of contact inputs with values */
    const [userContact, setUserContact] = useState<Phone[]>([{number: ''}]);

    /** state saving the validation error */
    const [validationError, setValidationError] = useState<string>('');

    const { first_name: firstName, last_name: lastName} = userName;

    /** on Changing the first or last name saving the corresponding details on userName state */
    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target; 

        if(target.id === 'first-name-input'){
            setUserName({ ...userName, first_name: target.value})
        }else{
            setUserName({ ...userName, last_name: target.value})
        }

        e.stopPropagation();
    }

    /** on Clicking Add Contact adding the state with an additional empty contact */
    const handleContactAdd = (e: React.MouseEvent<HTMLButtonElement>) => {

        setUserContact([...userContact, { number: ''}])

        e.stopPropagation();

    }

    /** deleting the corresponding contact number index on clicking on Delete */
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

    /** on contact number input change saving the value on corresponding index */
    const handleInputContact = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {

        const inputVal = e.target.value;

        const contactList = [...userContact];

        contactList[index] = { number: inputVal};

        setUserContact(contactList);

        e.stopPropagation();
    }

    /** on clicking on submit first performing the validation,
     *  then checking if the same name is present on the database or not,
     *  then finally mutating the database with the new contact
     */
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

        const validationRes = validateFields(firstName,lastName,userContact);

        if(validationRes){
            setValidationError(validationRes);
        }else{

            /** Checking if the name submitted is unique or not by querying the database */
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
                        setUserName({ first_name: '', last_name: '', });
                        setUserContact([{number: ''}]);
                        togglePopup();
                    }
                }
            }).catch((err: unknown) => {
                onApiStatus(COMMON_ERRORS.GET_CONTACT_APOLLO_QUERY_FAILED);
            })
        }
        e.stopPropagation();
    }

    /** toggle popup open state */
    const togglePopup = (e?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
        setCreateContactPopup((prev) => !prev);
        e && e.stopPropagation();
    }



    return(
        <>
        <div className='create-contact'>
            <Button onClick={togglePopup}> Create New </Button>
        </div>
        {createContactPopup && 
            (<PopupWrapper className='popupWrapper' onClick={togglePopup}>
                <div className='contentWrapper' onClick={(e) => e.stopPropagation()}>
                    <h2> Create New Contact</h2>
                    <div className='first-name-input-wrapper'>
                        <input id='first-name-input' value={firstName} max={20} onChange={handleNameInput} placeholder='Input First Name' />
                    </div>
                    <div className='last-name-input-wrapper'>
                        <input id='last-name-input' value={lastName} max={20} onChange={handleNameInput} placeholder='Input Last Name' />
                    </div>
                    <div className='add-contact'>
                        <CustomButton onClick={handleContactAdd}> Add Contact </CustomButton>
                    </div>
                    <div className='contact-scroll'>
                    {userContact.map((contact,index) => {
                        const { number: contactNumber } = contact;
                        return (
                            <div key={`${index}-cntc`} className='contact-input' >
                                <input value={contactNumber} pattern='^\+\d*$' max={15} onChange={(e) => handleInputContact(e,index)} />
                                <CustomButton id={`${index}`} onClick={handleDeleteContact}> Delete </CustomButton>
                            </div>
                        )
                    })}
                    </div>
                    <div className='bottom-btns'>
                        <CustomButton className='close' onClick={togglePopup}> Close </CustomButton>
                        <CustomButton className='submit' onClick={handleSubmit}> Submit </CustomButton>
                    </div>
                    {validationError && 
                        <div className='validation'>
                            <p>{validationError}</p>
                        </div>
                        }
                </div>
            </PopupWrapper>)
        }
        </>
    )
}

export default NewContact;