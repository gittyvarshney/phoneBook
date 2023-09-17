import styled from "@emotion/styled";

type FavProps = {
  isFavourite: boolean
}

type ViewProps = {
  visible: boolean
}

export const Heading = styled.h2<FavProps>`

    font-weight: 600;
    color: ${props => (props.isFavourite ? '#542a48' : '#000')};
    font-size: 1.6rem;
`;

export const Accordian = styled.div<ViewProps>`
    display: flex;
    align-items: center;
    cursor: pointer;
    img{
      margin-right: 1rem;
      transform-origin: center;
      transform: ${props => (props.visible ? 'rotate(0deg)' : 'rotate(180deg)')};
    }
`

export const ContentSection = styled.section<FavProps>`

    display: flex;
    flex-direction: column;


    .contentRow{
      display: flex;
      padding-block: 1rem;
      border-bottom: 2px solid #f2f0ed;
      background-color: ${props => (props.isFavourite ? '#fdf6fb' : '#fff')};

      @media (max-width: 600px) {
        flex-direction: column;
      }

      & p{
          font-size: 1.6rem;
          margin: 0;
      }

      .name-wrapper{
        display: flex;
        font-weight: 600;
        width: 20%;

        .name-label-mobile{
          display: none;

        }
        .nameRow{
          margin-left: 0.5rem;
          color: ${props => (props.isFavourite ? '#653f5a' : '#41444d')};

        }

        @media (max-width: 600px) {
            width: 100%;
            margin-block: 0.5rem;
            .name-label-mobile{
              margin-left: 0.5rem;
              margin-right: 1rem;
              display: inline-block;
            }
          }
      }

      .contactRow{

        color: ${props => (props.isFavourite ? '#47213c' : '#595d67')};
        font-weight: 600;
        display: flex;
        width: 60%;
        flex-wrap: wrap;

        .contact-label-mobile{
          display: none;

        }

      .contact-number{
          margin-right: 1rem;
        }
        
        
        @media (max-width: 600px) {
          margin-block: 0.5rem;
          width: 100%;
          .contact-label-mobile{
            margin-left: 0.5rem;
            margin-right: 1rem;
            display: inline-block;

          }
        }
        
      }

      .actionsRow{
          width: 20%;
          display: flex;
          flex-wrap: wrap;

          @media (max-width: 600px) {
            width: 100%;
        }

      }
  }
`

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
  
  &:hover{
    background-color: #F3F4F6;

  }

  &.deleteContact:hover{
    background-color: #fae9ec;
  }

  &.editContact:hover{
    background-color: #e8ecfa;
  }
`;

export const PopupWrapper = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(70, 74, 79, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;

`