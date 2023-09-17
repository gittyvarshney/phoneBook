
import { ContactList } from "../types/contactType";

const LOCAL_STORAGE_KEYS = {
    REGULAR_DATA_KEY: 'regular',
    FAVOURITES_DATA_KEY: 'favourites',
    PAGE_KEY: 'pageNumber',
    SEARCH_KEY: 'searchInput'
}

export const getDataFromLocalStorage = () => {

    const savedUserData = localStorage.getItem(LOCAL_STORAGE_KEYS.REGULAR_DATA_KEY);
    const savedUserFavourites = localStorage.getItem(LOCAL_STORAGE_KEYS.FAVOURITES_DATA_KEY);

    const savedUserPage = localStorage.getItem(LOCAL_STORAGE_KEYS.PAGE_KEY);


    const userData = savedUserData && JSON.parse(savedUserData);
    const userPage = savedUserPage && JSON.parse(savedUserPage);
    const userFavourites = savedUserFavourites && JSON.parse(savedUserFavourites);

    console.log("user data parsed is: ", userData);
    console.log("favourites data parsed is: ", userFavourites);
    console.log("user page parsed is: ", userPage);

    return { userData, userPage, userFavourites}
}

export const getUserSearchInput = () => {

    const savedUserSearch = localStorage.getItem(LOCAL_STORAGE_KEYS.SEARCH_KEY);

    const userSearchKey = savedUserSearch && JSON.parse(savedUserSearch);

    console.log("userSearchInput parsed is: ", userSearchKey);

    return userSearchKey;
}

export const setDataInLocalStorage = (regularData: ContactList, favouritesData: ContactList, currPage: number, searchInput: string) => {

    localStorage.setItem(LOCAL_STORAGE_KEYS.REGULAR_DATA_KEY,JSON.stringify(regularData))
    localStorage.setItem(LOCAL_STORAGE_KEYS.FAVOURITES_DATA_KEY,JSON.stringify(favouritesData))

    localStorage.setItem(LOCAL_STORAGE_KEYS.PAGE_KEY,JSON.stringify(currPage))
    localStorage.setItem(LOCAL_STORAGE_KEYS.SEARCH_KEY,JSON.stringify(searchInput))

}
