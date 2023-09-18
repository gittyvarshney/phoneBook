import React, { useEffect, useState } from 'react';
import { ApolloQueryResult, useQuery, useMutation } from '@apollo/client';
import { GET_PHONE_NUMBERS, EDIT_CONTACT_NAME } from '../../queries/getDataQuery';
import { validateFields } from '../../helper';
import { PAGE_LIMIT } from '../../constants';
import { COMMON_ERRORS, SUCCESS_TEXT } from '../../constants';

import { Popup, Button } from './styles';

import { Data } from '../../types/contactType';

interface EditNameProps{
    firstName: string,
    lastName: string,
    contactId: number,
    currentPage: number,
    onPageChange: (limit: number, offset: number) => void,
    togglePopup: () => void,
    onApiStatus: (errMsg: string, isSuceess?: boolean) => void;
}

/** Component used to Render the Edit Contact Popup
 *  it fires the onPageChange callback when click on Submit,
 *  can togglePopup on cancel,
 *  & triggering the onApiStatus callback when the api returned the corresponding response
 */
const EditName: React.FC<EditNameProps> = (props) => {

    const {firstName, lastName, contactId, togglePopup, onPageChange, currentPage, onApiStatus } = props;

    const { refetch: searchforSameName } = useQuery(GET_PHONE_NUMBERS, { skip: true });

    const [ editName, { data: editedData, loading }] = useMutation(EDIT_CONTACT_NAME, {
        onError: (err) => { onApiStatus( COMMON_ERRORS.EDIT_CONTACT_APOLLO_QUERY_FAILED); }
    });

    /** On getting response of GraphQL query performing the corresponding side effects */
    useEffect(() => {

        if(editedData){
            onPageChange(PAGE_LIMIT, currentPage);
            onApiStatus(SUCCESS_TEXT.EDITION_SUCCESS,true);
            togglePopup();
        }

    },[editedData])

    const [userName, setUserName] = useState({ first_name: '', last_name: ''});

    const [validationError, setValidationError] = useState<string>('');

    const { first_name: updateFirstName, last_name: updateLastName } = userName;

    /** event callback to handle input change on firstname and lastname */
    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target; 

        if(target.id === 'first-name-input'){
            setUserName({ ...userName, first_name: target.value})
        }else{
            setUserName({ ...userName, last_name: target.value})
        }

        e.stopPropagation();
    }

    /** on clicking on Submit first performing the validation,
     *  then checking if the same name is present on the database or not,
     *  then finally mutating the database with the edited contact
     */
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {

        const validationRes = validateFields(updateFirstName,updateLastName);

        if(validationRes){
            setValidationError(validationRes);
        }else{
            /** Checking if It is a unique name or not */
            searchforSameName({
                limit: 1,
                offset: 0,
                where: { 
                    "first_name": {"_ilike": `${updateFirstName}` },
                    "last_name": { "_ilike": `${updateLastName}`}
                }
            }).then((response: ApolloQueryResult<Data>) => {
                const { data, error } = response;
                if(error){
                    setValidationError('Something Went Wrong');
                }else{

                    const { contact: contactList } = data;
                    if(!contactList || contactList.length !== 0){
                        setValidationError('Name is not Unique');
                    }else{
                        editName({
                            variables:{
                                id: contactId,
                                _set: {
                                    first_name: updateFirstName,
                                    last_name: updateLastName
                                  }
                            }
                        })
                    }
                }
            }).catch((err: Error) => {
                onApiStatus(COMMON_ERRORS.GET_CONTACT_APOLLO_QUERY_FAILED)
            })
        }
        e.stopPropagation();
    }

    return(
        <Popup className='editName-wrapper' onClick={(e) => e.stopPropagation()}>
            <h2> Edit Name </h2>
            <div className='curr-names'>
                <p>First Name:</p>
                <p className='name-value'>{firstName}</p>
            </div>
            <div className='curr-names'>
                <p>Last Name:</p>
                <p className='name-value'>{lastName}</p>
            </div>
            <div className='update-wrapper'>
                <input id='first-name-input' value={updateFirstName} max={20} onChange={handleNameInput} placeholder='Enter New First Name' />
            </div>
            <div className='update-wrapper'>
                <input id='last-name-input' value={updateLastName} max={20} onChange={handleNameInput}  placeholder='Enter New Last Name' />
            </div>
            <div className='action-btns'>
                <Button className='cancel' onClick={togglePopup}>Cancel</Button>
                { loading ? 'Loading' : <Button className='submit' onClick={handleSubmit}>Submit</Button>}
            </div>
            {validationError && 
                <div className='validation'>
                    <p>{validationError}</p>
                </div>
            }
        </Popup>
    )

}

export default EditName;