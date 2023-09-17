import useDataQuery from "./hooks/useDataQuery";

import Content from "./components/content";
import HeaderRow from "./components/header";
import Pagination from "./components/pagination";
import NewContact from "./components/newContact";
import SearchInput from "./components/search";

import { Div, ContentSection, HeaderSection } from "./AppStyles";

const App = () => {


  const [pageData, actions] = useDataQuery();

  const {favouritesContacts, regularContacts, currentPage, isNextPageDisabled } = pageData;

  const { onChangeInput, onCreateNewContact, fetchPageData, ...restCallToActions } = actions;

  return (
    <>
      <HeaderSection>
        <Div>
          <NewContact onSubmitContact={onCreateNewContact} />
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
        {...restCallToActions} 
        />

        <Content
        contactList={regularContacts}
        currentPage={currentPage}
        onPageChange={fetchPageData}
        {...restCallToActions} 

        />
      </ContentSection>
      <Pagination currentPage={currentPage} isNextDisabled={isNextPageDisabled} onPageChange={fetchPageData} />

    </>
  )
}

export default App
