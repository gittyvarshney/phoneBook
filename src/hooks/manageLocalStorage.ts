

export const getDataFromLocalStorage = (userKey: string, pageKey: string, favouritesKey: string) => {

    const savedUserData = localStorage.getItem(userKey);
    const savedUserPage = localStorage.getItem(pageKey);
    const savedUserFavourites = localStorage.getItem(favouritesKey)

    const userData = savedUserData && JSON.parse(savedUserData);
    const userPage = savedUserPage && JSON.parse(savedUserPage);
    const userFavourites = savedUserFavourites && JSON.parse(savedUserFavourites);

    return { userData, userPage, userFavourites }
}
