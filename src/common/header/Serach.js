import React from 'react';

export default function Serach(props) {
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            props.handleClickOnSearch();
        }
    };

    

    return (
        <div className='serachmain'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="searchbar">
                            <div id="search">
                                <input
                                    id="input"
                                    placeholder="Search..."
                                    value={props.searchValue}
                                    onChange={props.handleInputChange}
                                    onKeyPress={handleKeyPress} // Attach handleKeyPress here
                                />
                                <button id="button" onClick={props.handleClickOnSearch}>
                                    <i className="fa fa-search"></i>
                                </button>
                                <div className="spinner"><i className="fa fa-spinner"></i></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
