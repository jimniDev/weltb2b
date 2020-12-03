import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
        box-sizing:border-box;
    }
    a{
        color:inherit;
        text-decoration:none;
    }
    body{
        padding:0px 24rem;
        background-color:"#b2bec3";
        font-size:14px;
        padding-top:60px;
        color: #707070;
        font-family: "KoPubWorld Dotum Bold";
    }
   
`;

export default GlobalStyle;
