import styled from "@emotion/styled";

export const Popup = styled.div`

    background-color: #fff;
    opacity: 1;
    width: 40%;
    display: flex;
    border-radius: 1rem;
    flex-direction: column;
    padding: 1rem;

    @media (max-width: 800px) {
            width: 90%;
        }

    & h2{
        font-size: 2rem;
        text-align: center;
    }

    .curr-names{
        display: flex;
        align-self: center;
        & p{
            margin-right: 0.8rem;
            font-size: 2rem;
            font-weight: 600;

            &.name-value{
                color: #464a4f;
            }
        }
    }

    .update-wrapper{

        display: flex;
        margin-block: 1rem;
        justify-content: center;

        input{
            padding: 1rem;
            font-size: 1.6rem;
            outline: none;
            width: 50%;
            border: 1px solid #dae6ca;
            border-radius: 1rem;

            @media (max-width: 800px) {
                width: 90%;
            }

        }

    }

    .action-btns{
        display: flex;
        justify-content: center;
    }

    .validation{
                display: flex;
                justify-content: center;
                margin-top: 1rem;
            & p{
                display: inline-block;
                border: 1px solid #c7254e;
                border-radius: 0.5rem;
                font-size: 1.6rem;
                padding: 0.5rem;
                color:  #c7254e;
            }
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
    margin-right: 1rem;
    padding: 0.6rem 1.6rem;
    word-wrap: break-word;
    cursor: pointer;

    &:hover{
        background-color: #F3F4F6;
    }

    &.cancel:hover{
        background-color: #fae9ec;
    }

    &.submit:hover{
        background-color: #e8ecfa;
    }
  

`