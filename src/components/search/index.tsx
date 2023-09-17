import React, { useEffect, useState } from 'react';

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
            clearInterval(debounceInput)
        }

    },[searchVal])

    return(

        <Input value={searchVal} placeholder='Search for a Contact Name' max={25} onChange={onHandleThrottle} />

    )

}

export default SearchInput;