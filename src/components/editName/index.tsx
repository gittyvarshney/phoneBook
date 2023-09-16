import React, { useEffect, useState } from 'react';
import { ApolloQueryResult, useQuery, useMutation } from '@apollo/client';
import { GET_PHONE_NUMBERS, EDIT_CONTACT_NAME } from '../../queries/getDataQuery';
import { validateFields } from '../../helper';
import { PAGE_LIMIT } from '../../constants';

import { Data } from '../../types/contactType';

interface EditNameProps{
    firstName: string,
    lastName: string,
    contactId: number,
    currentPage: number,
    onPageChange: (limit: number, offset: number) => void,
    togglePopup: () => void
}


const EditName: React.FC<EditNameProps> = (props) => {

    const {firstName, lastName, contactId, togglePopup, onPageChange, currentPage } = props;

    const { refetch: searchforSameName } = useQuery(GET_PHONE_NUMBERS, { skip: true });

    const [ editName, { data: editedData, loading, error }] = useMutation(EDIT_CONTACT_NAME);

      useEffect(() => {

        if(editedData){
            console.log("edit data is: ", editedData);
            onPageChange(PAGE_LIMIT, currentPage)
            togglePopup();
        }

      },[editedData])

    const [userName, setUserName] = useState({ first_name: '', last_name: ''});

    const [validationError, setValidationError] = useState<string>('');

    const { first_name: updateFirstName, last_name: updateLastName } = userName;

    const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target; 

        if(target.id === 'first-name-input'){
            setUserName({ ...userName, first_name: target.value})
        }else{
            setUserName({ ...userName, last_name: target.value})
        }

        e.stopPropagation();
    }

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
            }).catch((reason) => {
                console.log(reason);
            })
        }
        e.stopPropagation();
    }

    return(
        <div className='editName-wrapper' onClick={(e) => e.stopPropagation()}>
            <p>
            Edit Name
            </p>
            <div className='curr-names'>
                <p>First Name:</p>
                <p>{firstName}</p>
            </div>
            <div className='curr-names'>
                <p>Last Name:</p>
                <p>{lastName}</p>
            </div>
            <div className='update-wrapper'>
                <label>Update First Name</label>
                <input id='first-name-input' value={updateFirstName} max={20} onChange={handleNameInput} />
            </div>
            <div className='update-wrapper'>
                <label>Update Last Name</label>
                <input id='last-name-input' value={updateLastName} max={20} onChange={handleNameInput} />
            </div>
            <div className='action-btns'>
                <button onClick={togglePopup}>Cancel</button>
                { loading ? 'Loading' : <button onClick={handleSubmit}>Submit</button>}
            </div>
            {validationError && 
                <div className='validation'>
                    <p>{validationError}</p>
                </div>
            }
        </div>
    )

}

export default EditName;