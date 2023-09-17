import styled from "@emotion/styled";

export const PaginationWrapper = styled.footer`
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
    align-items: center;

    .currentPage{
        font-size: 1.8rem;
        margin-block: 0;
        margin-inline: 1rem;
        font-weight: 600;
        color: #464a4f;
    }

`;

export const Button = styled.button`

  background-color: #FAFBFC;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292E;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  padding: 0.6rem 1.6rem;
  word-wrap: break-word;
  cursor: pointer;
  

  &.disable{
    cursor: not-allowed;
  }

  &.disable:hover{
    background-color: #f6e8ef;
  }

  &:hover{
    background-color: #e8ecfa;
  }

`;