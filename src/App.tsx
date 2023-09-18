import useDataQuery from "./hooks/useDataQuery";

import Content from "./components/content";
import HeaderRow from "./components/header";
import Pagination from "./components/pagination";
import NewContact from "./components/newContact";
import SearchInput from "./components/search";

import { Div, ContentSection, HeaderSection } from "./AppStyles";
import { Toast } from "./components/taost";

const App = () => {


  const [pageData, actions] = useDataQuery();

  const {favouritesContacts, regularContacts, currentPage, isNextPageDisabled, errorStatus } = pageData;

  const { onChangeInput, onCreateNewContact, fetchPageData, onError, ...restCallToActions } = actions;

  return (
    <>
      <HeaderSection>
        <Div>
          <NewContact onSubmitContact={onCreateNewContact} onError={onError} />
          <SearchInput onChangeInput={onChangeInput}  />
        </Div>
        <HeaderRow  />
      </HeaderSection>
      <ContentSection>
        <Content
        contactList={favouritesContacts}
        currentPage={currentPage}
        onPageChange={fetchPageData}
        isFavourite={true}
        onError={onError}
        {...restCallToActions} 
        />

        <Content
        contactList={regularContacts}
        currentPage={currentPage}
        onPageChange={fetchPageData}
        onError={onError}
        {...restCallToActions} 

        />
      </ContentSection>
      <Toast onError={onError} errorStatus={errorStatus} />
      <Pagination currentPage={currentPage} isNextDisabled={isNextPageDisabled} onPageChange={fetchPageData} />

    </>
  )
}

export default App
