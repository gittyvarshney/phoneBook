import React, { useState} from 'react';
import { ContactList, ContactInfo } from '../../types/contactType';
import EditName from '../editName';
import './styles.css';

interface ContentProps{
    contactList: ContactList,
    isFavourite?: boolean,
    currentPage: number,
    onDeleteClick: (id: number) => void,
    onAddToFavourite: (contact: ContactInfo) => void, 
    onDeleteFromFavourite: (contact: ContactInfo) => void,
    onPageChange: (limit: number, offset: number) => void,
}

const Content: React.FC<ContentProps> = (props): React.ReactElement => {

    const { contactList, onDeleteClick, onAddToFavourite, onDeleteFromFavourite, isFavourite = false, currentPage, onPageChange } = props || {};

    const [editNamePopup, setEditNamePopup] = useState<boolean| number>(false);


    const handleFavourite = (e:  React.MouseEvent<HTMLButtonElement>, contact: ContactInfo) => {

        !isFavourite ? onAddToFavourite(contact) : onDeleteFromFavourite(contact); 
        e.stopPropagation();
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {

        onDeleteClick(id);
        e.stopPropagation();
    }

    const toggleEditName = (e?: React.MouseEvent<HTMLButtonElement| HTMLDivElement>, id?: number) => {

        if(id){
            setEditNamePopup(id);
        }else{
            setEditNamePopup((prev) => !prev);
        }
        e && e.stopPropagation();
    }

    return (
        <>
        <p className='fav-placeholder'>{ isFavourite ? 'Favourite Contacts' : 'Regular Contacts' }</p>
        <div className='contentWrapper'>
            {
                contactList.map((contact: ContactInfo, index: number) => {
                    const { first_name, last_name, id, phones } = contact || {};

                    return (
                        <div key={`${id}-row-${index}`} className='contentRow' >
                            <p className='nameRow'>
                                {`${first_name} ${last_name}`}
                            </p>
                            <div className='contactRow'>
                                {phones.map((contactNumber, contactIdx) => {
                                    const { number } = contactNumber;
                                    return(
                                        <p key={`${contactIdx}-number`}>
                                        {number}
                                        </p>
                                    )
                                })}
                            </div>
                            <div className='actionsRow'>
                                <button onClick={(e) => handleFavourite(e, contact)}>{isFavourite ? 'Delete From Favourites' : 'Add To Favourites'}</button>
                                <button onClick={(e) => handleDelete(e,id)}> Delete </button>
                                <button onClick={(e) => toggleEditName(e,id)}> Edit Contact</button>
                            </div>
                            { editNamePopup && editNamePopup === id &&
                                <div className='edit-name-popupWrapper' onClick={toggleEditName}>
                                    <EditName 
                                        firstName={first_name} 
                                        lastName={last_name} 
                                        contactId={id} 
                                        currentPage={currentPage} 
                                        onPageChange={onPageChange} 
                                        togglePopup={toggleEditName}
                                    />
                                </div>
                            }
                        </div>
                    )

                })
            }

        </div>
        </>
    )
}

export default Content;