import React, { useEffect } from 'react';
import { ToastDiv } from './styles' 

interface ToastProps{

    onError: (msg: string) => void,
    errorStatus: { status: boolean, statusMessage: string } 
}



export const Toast: React.FC<ToastProps> = ({errorStatus, onError}) => {


    const { status , statusMessage } = errorStatus;

    useEffect(() => {

        let timeout: ReturnType<typeof setTimeout> | null = null;
            if(status){
                timeout = setTimeout(() => {
                    onError('');
                },3000);
            }
            
        return () => {
            timeout && clearTimeout(timeout);
        }

    },[status])

    if(!status){
        return null;
    }

    return(
        <ToastDiv>
            { statusMessage }
        </ToastDiv>
    )
}