import styled from "@emotion/styled";

export const Button = styled.button`

  background-color: #27ae60;
  border-radius: 0.8rem;
  border-style: none;

  box-shadow: rgba(39, 174, 96, .15) 0 4px 9px;
  box-sizing: border-box;

  color: #fff;
  cursor: pointer;
  font-size: 1.6rem;
  font-weight: 600;
  padding: 1.3rem 2rem;
  text-align: center;
  margin-right: 1.2rem;

  @media (max-width: 800px) {
        padding: 0.7rem 1rem;
        font-size: 1.4rem;
    }

`

export const PopupWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(206, 217, 193, 0.58);
    display: flex;
    justify-content: center;
    align-items: center;

    & .contentWrapper{

        background-color: #fff;
        opacity: 1;
        width: 50%;
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

        & .first-name-input-wrapper,.last-name-input-wrapper{
                display: flex;
                margin-block: 1rem;
                justify-content: center;
            & input{
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

        & .add-contact{
                display: flex;
                margin-block: 1rem;
                justify-content: center;

            & button{
                align-items: center;
                background-color: #27ae60;
                cursor: pointer;
                border-radius: 10rem;
                color: #ffffff;
                font-size: 1.6rem;
                font-weight: 600;
                border-style: none;
                padding: 1rem;
                text-align: center;
            }
        }

        & .contact-scroll{
            max-height: 30vh;
            overflow-y: auto;

            & .contact-input{
                    display: flex;
                    margin-block: 1rem;
                    justify-content: center;
                
                & input{
                    padding: 1rem;
                    font-size: 1.6rem;
                    outline: none;
                    width: 70%;
                    border: 1px solid #dae6ca;
                    border-radius: 1rem;
                }

                & button{
                    align-items: center;
                    background-color: #FF4742;
                    margin-left: 1.4rem;
                    cursor: pointer;
                    border-radius: 10rem;
                    color: #ffffff;
                    font-size: 1.6rem;
                    font-weight: 600;
                    border-style: none;
                    padding: 1rem;
                    text-align: center;

                }
            }
        }

        & .bottom-btns{
            margin-block: 1.6rem;
            justify-content: center;
            display: flex;

            & button{
                    align-items: center;
                    background-color: #FF4742;
                    margin-left: 1.4rem;
                    cursor: pointer;
                    border-radius: 1.2rem;
                    color: #ffffff;
                    font-size: 1.6rem;
                    font-weight: 600;
                    border-style: none;
                    padding: 1rem;
                    text-align: center;
            }

            & .submit{
                background-color: #27ae60;
            }
        }

        & .validation{
                display: flex;
                justify-content: center;
            & p{
                display: inline-block;
                border: 1px solid #c7254e;
                border-radius: 0.5rem;
                font-size: 1.6rem;
                padding: 0.5rem;
                color:  #c7254e;
            }
        }
    }

`