import React from 'react';
import "./SearchMagnifier.css"

const SearchMagnifier = ({setStateForModal}) => {
    return (
        <div>
            <i className={"icon_search"} onClick={() => {setStateForModal(true)}}></i>
        </div>
    );
}

export default SearchMagnifier