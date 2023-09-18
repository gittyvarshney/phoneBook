import { useEffect, useState, useRef } from "react";
import { ApolloQueryResult, useQuery, useMutation } from "@apollo/client";
import { DELETE_CONTACT, GET_PHONE_NUMBERS, ADD_CONTACT } from "../queries/getDataQuery";
import { Data, ContactList, ContactInfo, Phone, DeletedData, APIStatus } from "../types/contactType";
import { getDataFromLocalStorage, setDataInLocalStorage } from "../manageLocalStorage";
import { filterOutFavourites, filterContactById, checkIfListIncludesId } from "../helper";

import { PAGE_LIMIT, COMMON_ERRORS, STATUS, SUCCESS_TEXT } from "../constants";

/** This is the main hook which performs all the heavy lifting of the project
 *  Its main function includes:
 *  1. Setting the favourite contacts , regular contacts, current page, if next PageShouldBeDisabled, the search input & api status
 *  2. Managing pagination (fetchPageData)
 *  3. Managing addition and deletion of favourite contact (onAddToFavourite, onDeleteFromFavourite)
 *  4. Managing deletion of contact as well as addition of new contact (onDeleteClick, onCreateNewContact)
 */
export const useDataQuery = () => {

    /** fetch contact list query with limit and offset  */
    const { refetch: fetchContactData } = useQuery(GET_PHONE_NUMBERS, { skip: true })

    /** graphQl query for deletion of contact */
    const [ deleteContactById, { data: deletedData, loading: loadingDelete, error: errorDeleteing }] = useMutation(DELETE_CONTACT, {
        onError: (err) => { setApiStatus({status: STATUS.FAILURE, statusMessage: err.message}) }
    });

    /** graphQl query for addition of contact */
    const [ addNewContact, { data: additonData, loading: loadingAdd, error: errorAdding }] = useMutation(ADD_CONTACT, {
        onError: (err) => {  setApiStatus({status: STATUS.FAILURE, statusMessage: err.message}) }
      });

    const [ currPage, setCurrPage ] = useState<number>(0);

    const [ favourites, setFavourites] = useState<ContactList>([]);
  
    const [ regulars, setRegulars] = useState<ContactList>([]);

    const [ nextPageDisabled, setNextPageDisabled] = useState<boolean>(false);

    const [ searchInput, setSearchInput ] = useState<string>('');

    const [ apiStatus, setApiStatus ] = useState<APIStatus>({status: null, statusMessage: ''});

    /** a ref to track if user has input any value on search Input initially */
    const isSearchBarInitiallyEmpty = useRef<boolean>(true);

    /** On Initial render if we have data already present on local storage use it otherwise fetch the
     *  fresh data from page 1
     */
    useEffect(() => {

        const { userData, userPage, userFavourites } = getDataFromLocalStorage();

        if(userData && typeof userPage === 'number' && userFavourites){
            setCurrPage(Number(userPage));
            setFavourites(userFavourites);
            setRegulars(userData);
        }else{
            fetchPageData(PAGE_LIMIT,0)
        }

    },[]);

    /** If search input changes we show the corresponding data from page 1 */
    useEffect(() => {

        /** It will only fire if user enter some value on searchInput initially 
         *  after that it will fire on every input change
         */
        if(searchInput || !isSearchBarInitiallyEmpty.current){
            isSearchBarInitiallyEmpty.current = false;
            fetchPageData(PAGE_LIMIT,0)
        }

    },[searchInput])

    /** When successfully added the data calling onSuccessFullAddition */
    useEffect(() => {

            if(additonData){
                onSuccessFullAddition();
            }

    },[additonData])

    /** When successfully deleted the data calling deleteContact */
    useEffect(() => {

        if(deletedData){
            const { delete_contact_by_pk } = deletedData as DeletedData;
            const { id = null } = delete_contact_by_pk || {};
            id && deleteContact(id);
        }

    },[deletedData, loadingDelete, errorDeleteing])

    /** This function make sure to delete the contact from favourites page as well if included
     *   refreshes the page and update the api status to success
     */
    const deleteContact = (contactId: number) => {

        if(checkIfListIncludesId(favourites,contactId)){
            const newFavouritesList = filterContactById(favourites,contactId);
            setFavourites(newFavouritesList);
        }

        fetchPageData(PAGE_LIMIT, currPage);
        setApiStatus({status: STATUS.SUCCESS, statusMessage: SUCCESS_TEXT.DELETION_SUCCESS})

    }

    /** This function refreshes the page on successful addition 
     *   and update the api status to success
     */
    const onSuccessFullAddition = () => {

        fetchPageData(PAGE_LIMIT, currPage);
        setApiStatus({status: STATUS.SUCCESS, statusMessage: SUCCESS_TEXT.ADDITION_SUCCESS})
    }

    /** Callback function used to update the apiStatus with message provided */
    const onApiStatus = (errMsg: string, isSuccess: boolean = false) => {

        const apiStatus = errMsg ? (isSuccess ? STATUS.SUCCESS : STATUS.FAILURE) : null;
        
        setApiStatus({ status: apiStatus,  statusMessage: errMsg || ''})
        
    }

    /** Callback function to  fire the fetch contact data with desired limit and page offset */
    const fetchPageData = (limit: number, offset: number, favList: ContactList| null = null) => {
        const searchQuery = searchInput ? { _or: [
            { first_name: { _ilike: `%${searchInput}%` } },
            { last_name: { _ilike: `%${searchInput}%` } }
          ]}: {};

        /** GraphQl API to fetch Contact data */
        fetchContactData({
                limit,
                offset: offset*limit,
                where: searchQuery
        })
        .then((response: ApolloQueryResult<Data>) => {

            const { data, error } = response;

            if(error){
                setApiStatus({status: STATUS.FAILURE, statusMessage: COMMON_ERRORS.GET_CONTACT_APOLLO_QUERY_FAILED})
            }else{
                const { contact: contactList } = data;
                const currFavourites = favList || favourites;

                /** if not on initial page and contact list have 0 elements on this page 
                 *  then simply disable the next click
                 */
                if(offset !== 0 && contactList.length === 0) {
                    setNextPageDisabled(true);
                }else{
                    if(currFavourites && Array.isArray(currFavourites) && currFavourites.length > 0) {
                        /** filter out the contacts which are already on the favourites list */
                        const newRegularList = filterOutFavourites( contactList, currFavourites);
                        setRegulars(newRegularList);
                    }else{
                        setRegulars(contactList);
                    }

                    /** also if entries less than the limit then disable the next page */
                    setNextPageDisabled(contactList.length < PAGE_LIMIT ? true : false);

                    setCurrPage(offset);
                }
            }

        }).catch((err: unknown) => {
            setApiStatus({status: STATUS.FAILURE, statusMessage: COMMON_ERRORS.GET_CONTACT_APOLLO_QUERY_FAILED})
        })

    }

    /** Callback function for adding the data to fav */
    const onAddToFavourite = (contact: ContactInfo) => {

        const newFavouritesList = [...favourites, contact];

        setFavourites(newFavouritesList)

        fetchPageData(PAGE_LIMIT, currPage,newFavouritesList);

    }

    /** Callback function for deleting the data from fav */
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

    /** Callback function to delete data from the database */
    const onDeleteClick = (contactId: number) => {
        deleteContactById({
            variables: {
                id: contactId
              }
        })
    }

    /** Callback function to add a new contact to the database */
    const onCreateNewContact = (firstName: string, lastName: string, contacts:Phone[]  ) => {
        addNewContact({
            variables: {
                first_name: firstName,
                last_name: lastName,
                phones: contacts
              }
        })
    }

    /** Use Effect used to save data in local storage whenever the state updates */
    useEffect(() => {
        setDataInLocalStorage(regulars,favourites,currPage,searchInput);
    },[searchInput,favourites,regulars,currPage])




    return [{   favouritesContacts: favourites, regularContacts: regulars, currentPage: currPage, isNextPageDisabled: nextPageDisabled, apiStatus }, 
            {   onDeleteClick, 
                onAddToFavourite,
                onDeleteFromFavourite, 
                onCreateNewContact, 
                fetchPageData, 
                onChangeInput: setSearchInput, 
                onApiStatus}] as const

}

export default useDataQuery;