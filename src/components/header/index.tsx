import React from 'react';
import { HeaderWrapper } from './styles';
// import './styles.css';


const HeaderRow: React.FC<{}> = (): React.ReactElement => {
    return (
        <HeaderWrapper className='headerWrapper'>
            <div className='nameWrapper'>
                Contact Name
            </div>
            <div className='contactWrapper'>
                Contact Number
            </div>
            <div className='actionsWrapper'>
                Actions
            </div>
        </HeaderWrapper>
    )
}

export default HeaderRow;