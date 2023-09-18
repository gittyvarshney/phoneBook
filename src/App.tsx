import useDataQuery from "./hooks/useDataQuery";

import Content from "./components/content";
import HeaderRow from "./components/header";
import Pagination from "./components/pagination";
import NewContact from "./components/newContact";
import SearchInput from "./components/search";
import Toast from "./components/toast";

import { Div, ContentSection, HeaderSection } from "./AppStyles";

const App = () => {

  /** Main hook which will return the desired pageData with actions to perform on that data
   *  which will be used by other components to render the data and perform the callback actions
   */
  const [pageData, actions] = useDataQuery();

  const {favouritesContacts, regularContacts, currentPage, isNextPageDisabled, apiStatus } = pageData;

  const { onChangeInput, onCreateNewContact, fetchPageData, onApiStatus, ...restCallToActions } = actions;

  return (
    <>
      <HeaderSection>
        <Div>
          <NewContact onSubmitContact={onCreateNewContact} onApiStatus={onApiStatus} />
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
        onApiStatus={onApiStatus}
        {...restCallToActions} 
        />

        <Content
        contactList={regularContacts}
        currentPage={currentPage}
        onPageChange={fetchPageData}
        onApiStatus={onApiStatus}
        {...restCallToActions} 
        />
      </ContentSection>
      <Toast apiStatus={apiStatus} onApiStatus={onApiStatus} />
      <Pagination currentPage={currentPage} isNextDisabled={isNextPageDisabled} onPageChange={fetchPageData} />

    </>
  )
}

export default App
