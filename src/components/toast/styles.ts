import styled from "@emotion/styled";

type FavProps = {
    isSuccess: boolean
  }

export const ToastDiv = styled.div<FavProps>`

    position: fixed;
    top: 1rem;
    right: 1rem;
    font-size: 1.6rem;
    width: 20%;
    color: ${props => (props.isSuccess ? '#649075' : '#96173e')};
    padding: 1rem;
    background-color: #fff;
    border: ${props => (props.isSuccess ? '1px solid #22603a' : '1px solid #871538')};
    border-radius: 1rem;
    z-index: 1;

    @media (max-width: 600px) {
        top: auto;
        bottom: 1rem;
        right: 1rem;
        width: 90%;
      }

`