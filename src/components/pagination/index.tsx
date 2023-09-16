import React from 'react';
import './styles.css';

interface PaginationProps{
    currentPage: number,
    onPageChange: (limit: number, offset: number) => void,
    isNextDisabled: boolean
}

const Pagination: React.FC<PaginationProps> = (props): React.ReactElement => {

    const { currentPage, onPageChange, isNextDisabled } = props;

    const handlePageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = (e.target as HTMLButtonElement).id;
        
        if(id === 'prev-btn'){
            currentPage > 0 && onPageChange(10,currentPage -1);
        }else{
            !isNextDisabled && onPageChange(10, currentPage + 1);
        }

    }

    return(
        <div className='paginationWrapper'>
            <button id='prev-btn' onClick={handlePageChange}> Previous </button>
            <div className='currentPage'>
                {`Current Page is ${currentPage + 1}`}
            </div>
            <button id='next-btn' onClick={handlePageChange}> Next </button>
        </div>
    )

}

export default Pagination;