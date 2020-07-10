import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    html {
        box-sizing: border-box;
        font-family: Segoe UI, SegoeUI, 'Helvetica Neue', Helvetica, Arial, sans-serif;
        -webkit-tap-highlight-color: transparent;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    body {
    }
`;

export default GlobalStyle;
