import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

html,
body {
    scroll-behavior: smooth;
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%
}
p {
    margin: 0;
}

*, *::before, *::after{
    box-sizing: border-box;
}

#root{
    height: 100%;
}
`

export default GlobalStyle;