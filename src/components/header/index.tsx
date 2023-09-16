import React from 'react';
import './styles.css';


const HeaderRow: React.FC<{}> = (): React.ReactElement => {
    return (
        <div className='headerWrapper'>
            <div className='nameWrapper'>
                Contact Name
            </div>
            <div className='contactWrapper'>
                Contact Number
            </div>
            <div className='actionsWrapper'>
                Actions
            </div>
        </div>
    )
}

export default HeaderRow;