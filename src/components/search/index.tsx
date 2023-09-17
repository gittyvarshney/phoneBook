import React, { useEffect, useState } from 'react';
import { getUserSearchInput } from '../../hooks/manageLocalStorage';
import { Input } from './styles';

interface SearchInputProps{
    onChangeInput: (value: string ) => void;
}


const SearchInput: React.FC<SearchInputProps> = ({onChangeInput}) => {
    
    const [ searchVal, setSearchVal] = useState<string>('');

    const onHandleThrottle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputVal = e.target.value;
        const trimVal = inputVal.trim();

        setSearchVal(trimVal);
    }

    useEffect(() => {
        const debounceInput = setTimeout(() => {
            onChangeInput(searchVal)

        },1000)

        return () => {
            clearTimeout(debounceInput)
        }

    },[searchVal]);

    useEffect(() => {
        const searchInput = getUserSearchInput();
        console.log("userSearchInput mount is: ", searchInput);
        if(searchInput){
            setSearchVal(searchInput);
        }
    },[])

    return(

        <Input value={searchVal} placeholder='Search for a Contact Name' max={25} onChange={onHandleThrottle} />

    )

}

export default SearchInput;