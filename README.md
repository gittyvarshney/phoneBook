# Phone-book

Implementation of Responsive UI for Web project assessment.

### Libraries Used
-  Boilerplate
   -  Vite with typescript (https://vitejs.dev/)
-  Libraries
   -  graphql (logic for parsing graph ql queries)
   -  @apollo/client (Wrapper for Query hooks)
   -  @emotion/styled (for styling the components)

## functionality

-   User able to add A New Contact, Delete A Contact
-   User able to Edit a Contact Info
-   User able to Search for a Contact Name
-   User can add Contact to Favourites or Delete from it
-   Pagination Based data population
-   Persisting the data through localstorage
   
## Preview Mobile
![Database](https://github.com/gittyvarshney/phoneBook/blob/main/mobile.png?raw=true)

## Preview Desktop
![Database](https://github.com/gittyvarshney/phoneBook/blob/main/desktop.png?raw=true)

## Assignment Structure
- src
  - main.ts, index.css
  - App.tsx
  - AppStyles.ts
  - components
    - newContact (index.tsx, styles.ts)
    - search (index.tsx, styles.ts)
    - header (index.tsx, styles.ts)
    - content (index.tsx, styles.ts)
    - editName (index.tsx, styles.ts)
    - pagination (index.tsx, styles.ts)
    - toast (index.tsx, styles.ts)
  - hooks
    - useDataQuery.ts
  - queries
    - getDataQuery.ts (graph ql queries)
  - types
    - contactTypes.ts (type defined for data)
  - constants.ts (constants)
  - helper.ts (helper functions)
  - manageLocalStorage.ts (local storage functions)
  
## Flow Chart
![Database](https://github.com/gittyvarshney/phoneBook/blob/main/flow-chart.png?raw=true)

## Breakup
![Database](https://github.com/gittyvarshney/phoneBook/blob/main/breakup.png?raw=true)

## Performance
![Database](https://github.com/gittyvarshney/phoneBook/blob/main/performance.png?raw=true)

## Deployment URL
https://gittyvarshney.github.io/phoneBook

## Steps to run locally

### `git clone`
clone the repository using the git clone command
git clone https://github.com/gittyvarshney/phoneBook.git

### `npm install`

install the required node_modules

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.
