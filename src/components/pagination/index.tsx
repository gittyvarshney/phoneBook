import React from 'react';
import { PaginationWrapper, Button } from './styles';

interface PaginationProps{
    currentPage: number,
    onPageChange: (limit: number, offset: number) => void,
    isNextDisabled: boolean
}
/** Component which renders the pagination content
 *  It fires the onPageChange Event when clicking the
 *  next or previous buttons
 */
const Pagination: React.FC<PaginationProps> = (props): React.ReactElement => {

    const { currentPage, onPageChange, isNextDisabled } = props;

    /** event callback to either increase or decrease the page number */
    const handlePageChange = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = (e.target as HTMLButtonElement).id;
        
        if(id === 'prev-btn'){
            currentPage > 0 && onPageChange(10,currentPage -1);
        }else{
            !isNextDisabled && onPageChange(10, currentPage + 1);
        }

    }

    return(
        <PaginationWrapper className='paginationWrapper'>
            <Button id='prev-btn' className={`${currentPage === 0 ? 'disable' : ''}`} onClick={handlePageChange}> Previous </Button>
            <p className='currentPage'>
                {currentPage + 1}
            </p>
            <Button id='next-btn' className={`${isNextDisabled ? 'disable' : ''}`} onClick={handlePageChange}> Next </Button>
        </PaginationWrapper>
    )

}

export default Pagination;