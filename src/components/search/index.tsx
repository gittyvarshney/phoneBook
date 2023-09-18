import React, { useEffect, useState } from 'react';
import { getUserSearchInput } from '../../manageLocalStorage';
import { Input } from './styles';

interface SearchInputProps{
    onChangeInput: (value: string ) => void;
}

/** Component used to render the Input Field at the top of page
 *  It also throttles the user input to minimize the api calls
 *  and fire the onChangeInput accordingly
 */
const SearchInput: React.FC<SearchInputProps> = ({onChangeInput}) => {
    
    const [ searchVal, setSearchVal] = useState<string>('');

    /** event callback to trim and set the desired input */
    const onHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value;
        const trimVal = inputVal.trim();

        setSearchVal(trimVal);
    }

    /** debouncing the onChangeInput field to minimize the API calls */
    useEffect(() => {
        const debounceInput = setTimeout(() => {
            onChangeInput(searchVal)

        },1000)

        return () => {
            clearTimeout(debounceInput)
        }

    },[searchVal]);

    /** On Initial render make sure to set the search input from the database */
    useEffect(() => {
        const searchInput = getUserSearchInput();
        if(searchInput){
            setSearchVal(searchInput);
        }
    },[])

    return(
        <Input value={searchVal} placeholder='Search for a Contact Name' max={25} onChange={onHandleInput} />
    )

}

export default SearchInput;