/** @jsxImportSource @emotion/react */

import { SerializedStyles, css } from '@emotion/react';
import { flexCenter, mTablet } from '../../utils/commonStyle';
import { InputHTMLAttributes } from 'react';
import { searchBoxInterface } from '../../interfaces/contact';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, searchBoxInterface {
    sx?:SerializedStyles,

}


const SearchBox = (props:InputProps) => {
  return (
    <input
      type="text"
      placeholder="Search contact"
      value={props.searchInput}
      onChange={(e)=>{
        props.setSearchInput(e.target.value)
      }}
      css={css`
        ${flexCenter()};
        padding: 0.5rem 1rem;
        border: none;
        height:25px;
        border-radius: .5rem;
        background-color:#F0F3F4;
        transition: box-shadow 250ms;
        &:focus {
          background-color: #fff;
          box-shadow: 0 1px 1px 0 rgba(65,69,73,.3),0 1px 3px 1px rgba(65,69,73,.15);
        };
        ${mTablet(`width:100%`)}
        ${props.sx}
      `}
    />
  );
};

export default SearchBox;
