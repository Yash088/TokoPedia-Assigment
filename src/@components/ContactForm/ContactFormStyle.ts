import { css } from "@emotion/react";
import { flexCenter, lTablet, removeTapColor, sTablet } from "../../utils/commonStyle";
import { theme } from "../../Theme/Theme";

const ContactFormStyle = {
    container:css`
    ${flexCenter('column','flex-start',"flex-start")};
    position:relative;
    padding:1rem 1.5rem;
    height:100%;
    `,
    closeIcon :css`
    position:absolute;
    top:20px;
    right:20px;
    cursor:pointer;
   ${removeTapColor()}
   svg{
    width:25px;
    height:25px;    
   }
    `,
    formContainer:css`
    ${flexCenter('column','center',"flex-start")};
    gap:20px;
    width: 100%;
    margin-top: 2rem;
    .input-main-container{
        width:100%;
        display:flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .input-container{
        width:50%;
        ${lTablet(`width:70%`)}
        ${sTablet(`width:100%`)}
    }
    .custom-input{
        width:100%;
    }
    `,
    multiPhoneContainer:css`    ${flexCenter('row','center',"flex-start")};
    gap:20px;
    width:100%;
   .input-container{
        gap:10px;
    }
    `,
    addButton:css`
    width:50%;
    ${lTablet(`width:70%`)}
    ${sTablet(`width:100%`)}
    color:${theme.colors.primary};
    background-color:#DFE8F6
    `
}

export default ContactFormStyle