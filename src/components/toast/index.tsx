import React, { useEffect } from 'react';
import { ToastDiv } from './styles' 

import { APIStatus } from '../../types/contactType';
import { STATUS } from '../../constants';

interface ToastProps{

    onApiStatus: (errMsg: string, isSuceess?: boolean) => void;
    apiStatus: APIStatus 
}

/** Component used to render the toast message whenever the api status 
 *  of Delete contact, Add contact OR Edit Contact changes
 */
const Toast: React.FC<ToastProps> = ({apiStatus, onApiStatus}) => {


    const { status , statusMessage } = apiStatus;

    /** this useEffect will automatically closes the toast after 2 seconds */
    useEffect(() => {

        let timeout: ReturnType<typeof setTimeout> | null = null;
            if(status){
                timeout = setTimeout(() => {
                    onApiStatus('');
                },2000);
            }
            
        return () => {
            timeout && clearTimeout(timeout);
        }

    },[status])

    /** If no status then don't render the component */
    if(!status){
        return null;
    }

    return(
        <ToastDiv isSuccess={status === STATUS.SUCCESS}>
            { statusMessage }
        </ToastDiv>
    )
}

export default Toast;