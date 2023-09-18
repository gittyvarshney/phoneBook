import React, { useState} from 'react';
import { ContactList, ContactInfo } from '../../types/contactType';
import EditName from '../editName';
import { Heading, ContentSection, Button, PopupWrapper, Accordian } from './styles';
import { TRIANGLE_IMG_CDN_URL } from '../../constants';

interface ContentProps{
    contactList: ContactList,
    isFavourite?: boolean,
    currentPage: number,
    onDeleteClick: (id: number) => void,
    onAddToFavourite: (contact: ContactInfo) => void, 
    onDeleteFromFavourite: (contact: ContactInfo) => void,
    onPageChange: (limit: number, offset: number) => void,
    onError: (errMsg: string) => void;
}

const Content: React.FC<ContentProps> = (props): React.ReactElement => {

    const { contactList, onDeleteClick, onAddToFavourite, onDeleteFromFavourite, isFavourite = false, currentPage, onPageChange, onError } = props || {};

    const [editNamePopup, setEditNamePopup] = useState<boolean| number>(false);

    const [contentView, setContentView] = useState<boolean>(true);


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

    const toggleView = (e?: React.MouseEvent<HTMLDivElement>) => {

        setContentView(prev => !prev);

        e?.stopPropagation();
    }

    return (
        <>
        <Accordian onClick={toggleView} visible={contentView}>
            <img width="14" height="14" src={TRIANGLE_IMG_CDN_URL} alt="Toggle"/>
            <Heading isFavourite={isFavourite} className='fav-placeholder'>{ isFavourite ? 'Favourite Contacts' : 'Regular Contacts' }</Heading>
        </Accordian>
        {contentView && <ContentSection isFavourite={isFavourite} className='contentWrapper'>
            {
                contactList.map((contact: ContactInfo, index: number) => {
                    const { first_name, last_name, id, phones } = contact || {};

                    return (
                        <div key={`${id}-row-${index}`} className='contentRow' >
                            <div className='name-wrapper'>
                                <p className='name-label-mobile'> Name: </p>
                                <p className='nameRow'>
                                    {`${first_name} ${last_name}`}
                                </p>
                            </div>
                            <div className='contactRow'>
                                <p className='contact-label-mobile'> Contact(s): </p>
                                {phones.map((contactNumber, contactIdx) => {
                                    const { number } = contactNumber;
                                    return(
                                        <p key={`${contactIdx}-number`} className='contact-number'>
                                        {number}
                                        </p>
                                    )
                                })}
                            </div>
                            <div className='actionsRow'>
                                <Button onClick={(e) => handleFavourite(e, contact)}>{isFavourite ? 'Delete From Favourites' : 'Add To Favourites'}</Button>
                                <Button className='deleteContact' onClick={(e) => handleDelete(e,id)}> Delete </Button>
                                <Button className='editContact' onClick={(e) => toggleEditName(e,id)}> Edit Contact</Button>
                            </div>
                            { editNamePopup && editNamePopup === id &&
                                <PopupWrapper className='edit-name-popupWrapper' onClick={toggleEditName}>
                                    <EditName 
                                        firstName={first_name} 
                                        lastName={last_name} 
                                        contactId={id} 
                                        currentPage={currentPage} 
                                        onPageChange={onPageChange} 
                                        togglePopup={toggleEditName}
                                        onError={onError}
                                    />
                                </PopupWrapper>
                            }
                        </div>
                    )

                })
            }
        </ContentSection>}
        </>
    )
}

export default Content;