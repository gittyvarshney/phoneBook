import styled from "@emotion/styled";

export const HeaderWrapper = styled.div`

    font-size: 1.6rem;
    font-weight: 600;
    padding-block: 1.2rem;
    width: 100%;
    display: flex;
    border-bottom: 2px solid #f2f0ed;

    @media (max-width: 600px) {
            display: none;
        }

    & .nameWrapper{
        display: flex;
        width: 20%;
        flex-wrap: wrap;
    }

    & .contactWrapper{
        display: flex;
        width: 60%;
        flex-wrap: wrap;
    }

    & .actionsWrapper{
        width: 20%;
        display: flex;
        flex-wrap: wrap;
    }




`