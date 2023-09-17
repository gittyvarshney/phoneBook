import { useEffect, useState, useRef } from "react";
import { ApolloQueryResult, useQuery, useMutation } from "@apollo/client";
import { DELETE_CONTACT, GET_PHONE_NUMBERS, ADD_CONTACT } from "../queries/getDataQuery";
import { Data, ContactList, ContactInfo, Phone, DeletedData } from "../types/contactType";
import { getDataFromLocalStorage, setDataInLocalStorage } from "./manageLocalStorage";
import { filterOutFavourites, filterContactById, checkIfListIncludesId } from "../helper";

import { PAGE_LIMIT } from "../constants";

import { MOCK_DATA_RES, MOCK_DATA_RES_EMPTY } from "../mock";


export const useDataQuery = () => {

    const { refetch: fetchContactData } = useQuery(GET_PHONE_NUMBERS, { skip: true })

    const [ deleteContactById, { data: deletedData, loading: loadingDelete, error: errorDeleteing }] = useMutation(DELETE_CONTACT);

      console.log("deleted data: ", deletedData, "loadingDeleted: ", loadingDelete, "error deleting: ", errorDeleteing);

      const [ addNewContact, { data: additonData, loading: loadingAdd, error: errorAdding }] = useMutation(ADD_CONTACT);

      console.log("addition data: ", additonData, "loadingaddition: ", loadingAdd, "error addition: ", errorAdding);

      const [ currPage, setCurrPage ] = useState<number>(0);

      const [ favourites, setFavourites] = useState<ContactList>([]);
  
      const [ regulars, setRegulars] = useState<ContactList>([]);

      const [ nextPageDisabled, setNextPageDisabled] = useState<boolean>(false);

      const [ searchInput, setSearchInput ] = useState<string>('');

      const initRender = useRef<boolean>(true);

      useEffect(() => {

        const { userData, userPage, userFavourites } = getDataFromLocalStorage();

        console.log("user data mount is: ", userData);
        console.log("favourites data mount is: ", userFavourites);
        console.log("user page mount is: ", userPage);
    
        if(userData && typeof userPage === 'number' && userFavourites){
            setCurrPage(Number(userPage));
            setFavourites(userFavourites);
            setRegulars(userData);
        }else{
            fetchPageData(PAGE_LIMIT,0)
        }
    
        },[]);

      useEffect(() => {

        if(searchInput || !initRender.current){
            console.log("in search input");
            initRender.current = false;
            fetchPageData(PAGE_LIMIT,0)
        }

      },[searchInput])

      useEffect(() => {

        if(additonData){
            const { first_name, last_name } = additonData;
            onSuccessFullAddition();
        }

    },[additonData, loadingAdd, errorAdding])

    useEffect(() => {

        if(deletedData){
            console.log("deleted data is: ", deletedData);
            const { delete_contact_by_pk } = deletedData as DeletedData;
            const { id } = delete_contact_by_pk;
            deleteContact(id);
        }

    },[deletedData, loadingDelete, errorDeleteing])

      const deleteContact = (contactId: number) => {

        if(checkIfListIncludesId(favourites,contactId)){
            const newFavouritesList = filterContactById(favourites,contactId);
            setFavourites(newFavouritesList);
        }

        fetchPageData(PAGE_LIMIT, currPage);

    }


    const onSuccessFullAddition = () => {

        fetchPageData(PAGE_LIMIT, currPage);

    }



    const fetchPageData = (limit: number, offset: number, favList: ContactList| null = null) => {
        const searchQuery = searchInput ? { first_name: {_like: `%${searchInput}%`} } : {};
        // Promise.resolve(offset === 1 ? MOCK_DATA_RES_EMPTY : MOCK_DATA_RES)
        fetchContactData({
                limit,
                offset,
                where: searchQuery
        })
        .then((response: ApolloQueryResult<Data>) => {

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


                    setNextPageDisabled(contactList.length < PAGE_LIMIT ? true : false);

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

        fetchPageData(PAGE_LIMIT, currPage,newFavouritesList);

    }

    const onDeleteFromFavourite = (contact: ContactInfo) => {

        const { id } = contact;

        if(checkIfListIncludesId(favourites,id)){
            const newFavouritesList = filterContactById(favourites,id);
            setFavourites(newFavouritesList);
            fetchPageData(PAGE_LIMIT, currPage,newFavouritesList);
        }else{
            fetchPageData(PAGE_LIMIT,currPage);
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

    /** Use Effect to save in local storage */

    useEffect(() => {
        setDataInLocalStorage(regulars,favourites,currPage,searchInput);
    },[searchInput,favourites,regulars,currPage])




    return [{ favouritesContacts: favourites, regularContacts: regulars, currentPage: currPage, isNextPageDisabled: nextPageDisabled }, 
        { onDeleteClick, onAddToFavourite, onDeleteFromFavourite, onCreateNewContact, fetchPageData, onChangeInput: setSearchInput}] as const

}

export default useDataQuery;