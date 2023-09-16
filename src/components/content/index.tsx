import React from 'react';
import { ContactList, ContactInfo } from '../../types/contactType';
import './styles.css';

interface ContentProps{
    contactList: ContactList,
    isFavourite?: boolean,
    onDeleteClick: (id: number) => void,
    onAddToFavourite: (contact: ContactInfo) => void, 
    onDeleteFromFavourite: (contact: ContactInfo) => void
}

const Content: React.FC<ContentProps> = (props): React.ReactElement => {

    const { contactList, onDeleteClick, onAddToFavourite, onDeleteFromFavourite, isFavourite = false } = props || {};

    const handleFavourite = (e:  React.MouseEvent<HTMLButtonElement>, contact: ContactInfo) => {

        !isFavourite ? onAddToFavourite(contact) : onDeleteFromFavourite(contact); 
        e.stopPropagation();
    }

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {

        onDeleteClick(id);
        e.stopPropagation();
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
                                <button> Edit</button>
                            </div>
                        </div>
                    )

                })
            }

        </div>
        </>
    )
}

export default Content;