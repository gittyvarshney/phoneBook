
import { ContactList } from "./types/contactType";

const LOCAL_STORAGE_KEYS = {
    REGULAR_DATA_KEY: 'regular',
    FAVOURITES_DATA_KEY: 'favourites',
    PAGE_KEY: 'pageNumber',
    SEARCH_KEY: 'searchInput'
}

/** function used to get Data from the local storage which are
 *  regular data, favourites data, current page */
export const getDataFromLocalStorage = () => {

    const savedUserData = localStorage.getItem(LOCAL_STORAGE_KEYS.REGULAR_DATA_KEY);
    const savedUserFavourites = localStorage.getItem(LOCAL_STORAGE_KEYS.FAVOURITES_DATA_KEY);

    const savedUserPage = localStorage.getItem(LOCAL_STORAGE_KEYS.PAGE_KEY);


    const userData = savedUserData && JSON.parse(savedUserData);
    const userPage = savedUserPage && JSON.parse(savedUserPage);
    const userFavourites = savedUserFavourites && JSON.parse(savedUserFavourites);

    return { userData, userPage, userFavourites}
}

/** function used to get the users input on search bar from local storage */
export const getUserSearchInput = () => {

    const savedUserSearch = localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_KEY);

    const userSearchKey = savedUserSearch && JSON.parse(savedUserSearch);

    return userSearchKey;
}

/** this function will set all the important page data to the local storage when the corresponding data updates */
export const setDataInLocalStorage = (regularData: ContactList, favouritesData: ContactList, currPage: number, searchInput: string) => {

    localStorage.setItem(LOCAL_STORAGE_KEYS.REGULAR_DATA_KEY,JSON.stringify(regularData))
    localStorage.setItem(LOCAL_STORAGE_KEYS.FAVOURITES_DATA_KEY,JSON.stringify(favouritesData))

    localStorage.setItem(LOCAL_STORAGE_KEYS.PAGE_KEY,JSON.stringify(currPage))
    localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_KEY,JSON.stringify(searchInput))

}
