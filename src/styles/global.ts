import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
    * {
        padding: 0px;
        margin: 0px;
        border: none;
    }
    body{
        height: 100vh;
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

    :focus,
    :active {
        outline: none;
    }

    a:focus,
    a:active {
         outline: none;
    }

    a, a:link, a:visited  {
        /* color: inherit; */
        text-decoration: none;
        /* display: inline-block; */
    }

    a:hover  {
        text-decoration: none;
    }

    aside, nav, footer, header, section, main {
        display: block;
    }

    h1, h2, h3, h4, h5, h6, p {
        font-size: inherit;
        font-weight: inherit;
    }

    ul, ul li {
        list-style: none;
    }
`