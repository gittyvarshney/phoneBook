import useDataQuery from "./hooks/useQuery";
import { useState } from "react";
import Content from "./components/content";
import HeaderRow from "./components/header";
import Pagination from "./components/pagination";
import NewContact from "./components/newContact";
import SearchInput from "./components/search";

const App = () => {


  const [pageData, actions] = useDataQuery();

  const {favouritesContacts, regularContacts, currentPage, isNextPageDisabled } = pageData;

  const {onDeleteClick, onAddToFavourite, onDeleteFromFavourite, onCreateNewContact, fetchPageData, onChangeInput } = actions;

  return (
    <>
      <SearchInput onChangeInput={onChangeInput} />
      <NewContact onSubmitContact={onCreateNewContact} />
      <HeaderRow  />
      <Content
      contactList={favouritesContacts} 
      onDeleteClick={onDeleteClick} 
      onAddToFavourite={onAddToFavourite} 
      onDeleteFromFavourite={onDeleteFromFavourite}
      isFavourite={true}
      />

      <Content
      contactList={regularContacts} 
      onDeleteClick={onDeleteClick} 
      onAddToFavourite={onAddToFavourite} 
      onDeleteFromFavourite={onDeleteFromFavourite} />

      <Pagination currentPage={currentPage} isNextDisabled={isNextPageDisabled} onPageChange={fetchPageData} />

    </>
  )
}

export default App
