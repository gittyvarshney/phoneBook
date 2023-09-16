import { useEffect, useState } from "react";
import { ApolloQueryResult, useQuery, useMutation } from "@apollo/client";
import { DELETE_CONTACT, GET_PHONE_NUMBERS, ADD_CONTACT } from "../queries/getDataQuery";
import { Data, ContactList, ContactInfo, Phone, DeletedData } from "../types/contactType";
import { getDataFromLocalStorage } from "./manageLocalStorage";

import { GetContactListVariable } from "../types/queryVariableTypes";

import { MOCK_DATA_RES, MOCK_DATA_RES_SHORT, MOCK_DATA_RES_EMPTY } from "../mock";

const filterOutFavourites = <T extends ContactList>(contactList: T, favouritesList: T): ContactList => {

    return contactList.filter((contact) => {

        const isFound = favouritesList.find((favContact) => {
            if(contact.id === favContact.id){
                return true;
            }
            return false;
        })
        return isFound ? false: true;

    })

}

const filterContactById = (contactList: ContactList , id: number): ContactList => {

    return contactList.filter((contact) => {

        if(contact.id === id){
            return false;
        }
        return true;
    })

}

const checkIfListIncludesId = (contactList: ContactList , id: number): ContactInfo | undefined => {

    return contactList.find((contact) => {

        if(contact.id === id){
            return true;
        }
        return false;
    })

}



export const useDataQuery = () => {

    const { refetch: fetchContactData } = useQuery(GET_PHONE_NUMBERS, { skip: true, variables: {limit: 10, offset: 0, where: { } }})

    const [ deleteContactById, { data: deletedData, loading: loadingDelete, error: errorDeleteing }] = useMutation(DELETE_CONTACT, {
        variables: {
            id: 99999
        },
      });

      console.log("deleted data: ", deletedData, "loadingDeleted: ", loadingDelete, "error deleting: ", errorDeleteing);

      const [ addNewContact, { data: additonData, loading: loadingAdd, error: errorAdding }] = useMutation(ADD_CONTACT, {
        variables: {
            first_name: '', 
            last_name: '',
            phones: [] 
        },
      });

      console.log("addition data: ", additonData, "loadingaddition: ", loadingAdd, "error addition: ", errorAdding);

      const [ currPage, setCurrPage ] = useState<number>(0);

      const [ favourites, setFavourites] = useState<ContactList>([]);
  
      const [ regulars, setRegulars] = useState<ContactList>([]);

      const [ nextPageDisabled, setNextPageDisabled] = useState<boolean>(false);

      const [ searchInput, setSearchInput ] = useState<string>('');

      useEffect(() => {

        if(searchInput){
            fetchPageData(10,0)
        }

      },[searchInput])

      useEffect(() => {

        const { userData, userPage, userFavourites } = getDataFromLocalStorage('userData', 'currKey', 'userFavourites');
    
        if(userData && userPage && userFavourites){
            setCurrPage(Number(userPage));
            setFavourites(favourites);
            setRegulars(regulars);
        }else{
            fetchPageData(10,0)
        }
    
        },[]);

      const deleteContact = (contactId: number) => {

        if(checkIfListIncludesId(favourites,contactId)){
            const newFavouritesList = filterContactById(favourites,contactId);
            setFavourites(newFavouritesList);
        }

        fetchPageData(10, currPage);

    }


    useEffect(() => {

        if(deletedData){
            console.log("deleted data is: ", deletedData);
            const { delete_contact_by_pk } = deletedData as DeletedData;
            const { id } = delete_contact_by_pk;
            deleteContact(id);
        }

    },[deletedData, loadingDelete, errorDeleteing])


    const onSuccessFullAddition = (firstName: string, lastName: string) => {

        fetchPageData(10, currPage);

    }

    useEffect(() => {

        if(additonData){
            const { first_name, last_name } = additonData;
            onSuccessFullAddition(first_name, last_name);
        }

    },[additonData, loadingAdd, errorAdding])

    const fetchPageData = (limit: number, offset: number, favList: ContactList| null = null) => {
        const searchQuery = searchInput ? { first_name: {_like: `%${searchInput}%`} } : {};
        // Promise.resolve(offset === 1 ? MOCK_DATA_RES_EMPTY : MOCK_DATA_RES)

        fetchContactData({
                limit,
                offset,
                where: searchQuery
        })
        .then((response: any /*ApolloQueryResult<Data>*/) => {
            console.log("response is: ", response);
            const { data, error } = response;

            if(error){

            }else{
                const { contact: contactList } = data;
                const currFavourites = favList || favourites;

                if(offset !== 0 && contactList.length === 0) {
                    setNextPageDisabled(true);
                }else{
                    if(currFavourites && Array.isArray(currFavourites) && currFavourites.length > 0) {
                        const newRegularList = filterOutFavourites( contactList, currFavourites);
                        setRegulars(newRegularList);
                    }else{
                        setRegulars(contactList);
                    }


                    setNextPageDisabled(contactList.length < 10 ? true : false);

                    setCurrPage(offset);
                }
            }

        }).catch((err: Error) => {
            console.log("error is: ", err.message)
        }).finally(() => {

        })

    }

    const onAddToFavourite = (contact: ContactInfo) => {

        const newFavouritesList = [...favourites, contact];

        setFavourites(newFavouritesList)

        fetchPageData(10, currPage,newFavouritesList);

    }

    const onDeleteFromFavourite = (contact: ContactInfo) => {

        const { id } = contact;

        if(checkIfListIncludesId(favourites,id)){
            const newFavouritesList = filterContactById(favourites,id);
            setFavourites(newFavouritesList);
            fetchPageData(10, currPage,newFavouritesList);
        }else{
            fetchPageData(10,currPage);
        }

    }


    const onDeleteClick = (contactId: number) => {
        deleteContactById({
            variables: {
                id: contactId
              }
        })
    }

    const onCreateNewContact = (firstName: string, lastName: string, contacts:Phone[]  ) => {
        console.log("add new contact called");
        addNewContact({
            variables: {
                first_name: firstName,
                last_name: lastName,
                phones: contacts
              }
        })
    }




    return [{ favouritesContacts: favourites, regularContacts: regulars, currentPage: currPage, isNextPageDisabled: nextPageDisabled }, 
        { onDeleteClick, onAddToFavourite, onDeleteFromFavourite, onCreateNewContact, fetchPageData, onChangeInput: setSearchInput}] as const

}

export default useDataQuery;