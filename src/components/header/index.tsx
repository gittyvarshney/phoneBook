import React from 'react';
import { HeaderWrapper } from './styles';

/** Component To Show Read Only heading Information */
const HeaderRow: React.FC<{}> = (): React.ReactElement => {
    return (
        <HeaderWrapper className='headerWrapper'>
            <div className='nameWrapper'>
                Contact Name
            </div>
            <div className='contactWrapper'>
                Contact Number(s)
            </div>
            <div className='actionsWrapper'>
                Actions
            </div>
        </HeaderWrapper>
    )
}

export default HeaderRow;