/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { flexCenter } from "../../utils/commonStyle"
import SearchBox from "../SearchBox/SearchBox"
import { HeadingStyle } from "./HeaderStyle"
import { searchBoxInterface } from "../../interfaces/contact"
import ContactImg from '../../asset/images/ContactsLogo.png';


const Header = (props:searchBoxInterface) => {
  return (
    <div  css={HeadingStyle.container}>
    <div css={HeadingStyle.imgContianer}>  
    <img src={ContactImg} style={{width:'30px'}} alt='header-element'/>
    <p css={HeadingStyle.title}>Contacts</p>
    </div>
    <div css={css`
    ${flexCenter()};
    flex-grow:1
  `}>
    <SearchBox sx={css`width:50%`} searchInput={props.searchInput} setSearchInput={props.setSearchInput}/>
  </div>
    </div>
  )
}

export default Header
