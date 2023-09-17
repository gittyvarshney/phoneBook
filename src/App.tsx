import useDataQuery from "./hooks/useDataQuery";

import Content from "./components/content";
import HeaderRow from "./components/header";
import Pagination from "./components/pagination";
import NewContact from "./components/newContact";
import SearchInput from "./components/search";

import { Div } from "./AppStyles";

const App = () => {


  const [pageData, actions] = useDataQuery();

  const {favouritesContacts, regularContacts, currentPage, isNextPageDisabled } = pageData;

  const { onChangeInput, onCreateNewContact, fetchPageData, ...restCallToActions } = actions;

  return (
    <>
      <Div >
        <NewContact onSubmitContact={onCreateNewContact} />
        <SearchInput onChangeInput={onChangeInput} />
      </Div>
      <HeaderRow  />
      <Content
      contactList={favouritesContacts}
      currentPage={currentPage}
      onPageChange={fetchPageData}
      isFavourite={true}
      {...restCallToActions} 
      />

      <Content
      contactList={regularContacts}
      currentPage={currentPage}
      onPageChange={fetchPageData}
      {...restCallToActions} 

      />

      <Pagination currentPage={currentPage} isNextDisabled={isNextPageDisabled} onPageChange={fetchPageData} />

    </>
  )
}

export default App
