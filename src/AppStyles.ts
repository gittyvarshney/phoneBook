import styled from '@emotion/styled';

export const Div = styled.div`

    display: flex;
    width: 100%;
    align-items: center;

`

export const HeaderSection = styled.div`
    display: flex;
    flex-direction: column;
`

export const ContentSection = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    height: 78.4vh;
    overflow-y: auto;

    @media (max-width: 600px) {
        height: 84vh;
    }

`