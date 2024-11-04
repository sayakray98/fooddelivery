import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Search from './Serach'; // Make sure the import is correct
import { AppContext } from '../../components/AppContext';

export default function Navbar(props) {
    const { userName, handleInputChange, handleClickOnSearch, searchValue, } = props;
    const { count } = useContext(AppContext)
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        window.location.reload();
    };

    const onHoverCart = () => {
        const cartDetails = document.querySelector('.cratdetails');
        if (cartDetails) {
            cartDetails.style.display = 'block';
        }
    };

    const onHoverOutCart = () => {
        const cartDetails = document.querySelector('.cratdetails');
        if (cartDetails) {
            cartDetails.style.display = 'none';
        }
    };


    return (
        <div>
            <header>
                <div className="container-fluid">
                    <div className="navb-logo">Logo</div>
                    <div className="navb-items mr-auto">
                        <div className="item">
                            <Search
                                handleInputChange={handleInputChange}
                                handleClickOnSearch={handleClickOnSearch}
                                searchValue={searchValue}
                            />
                        </div>
                        <div className="item">
                            <Link to="/">Home</Link>
                        </div>
                        <div className="item">
                            <i className="fa-solid fa-life-ring"></i> <Link to="/about">Help</Link>
                        </div>
                        <div className="item">
                            <i className="fa-solid fa-percent"></i> <Link to="/resume"> <span className='countvaluefree'>FREE</span> Offers</Link>
                        </div>
                        <div className="item" onMouseEnter={onHoverCart} onMouseLeave={onHoverOutCart}>
                            <i className="fa-solid fa-cart-plus"></i> <Link to="/cart" className='cart'>Cart <span className='countvalue'>{count}</span></Link>
                            {/* <div className="cratdetails">
                                {Array.isArray(selectedCategory) && selectedCategory.length > 0 ? (
                                    selectedCategory.map((category) => (
                                        <div className="detailsofcount" key={category.idCategory}>
                                            <ul>
                                                <li>
                                                    <img src={category.strCategoryThumb} alt={category.strCategory} />
                                                    <h5>{category.strCategory}</h5>
                                                </li>
                                            </ul>
                                        </div>
                                    ))
                                ) : (
                                    <p>No categories selected</p>
                                )}
                            </div> */}
                        </div>
                        <div className="item-button">
                            {userName ? (
                                <div className="dropdown">
                                    <span className="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                        {userName}
                                    </span>
                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                        <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                    </ul>
                                </div>
                            ) : (
                                <Link to="/login">Login</Link>
                            )}
                        </div>
                        {/* <div className="item-button">
                            <Link to="/contact">Sign Up</Link>
                        </div> */}
                    </div>
                    {/* <!-- Button Trigger Modal Start --> */}
                    <div className="mobile-toggle">
                        <Link to="/" data-bs-toggle="modal" data-bs-target="#navModal">
                            <i className="bi bi-list"></i>
                        </Link>
                    </div>
                    {/* <!-- Modal Trigger Modal End -->
                    <!-- Modal Start --> */}
                    <div className="modal fade" id="navModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <p>Logo</p>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"><i className="bi bi-x"></i></button>
                                </div>
                                <div className="modal-body">
                                    <div className="modal-line">
                                        <i className="bi bi-house"></i><Link to="/">Home</Link>
                                    </div>
                                    <div className="modal-line">
                                        <i className="bi bi-info-circle"></i><Link to="/about">About</Link>
                                    </div>
                                    <div className="modal-line">
                                        <i className="bi bi-filetype-doc"></i><Link to="/resume">Resume</Link>
                                    </div>
                                    <div className="modal-line">
                                        <i className="bi bi-folder-check"></i><Link to="/portfolio">Portfolio</Link>
                                    </div>
                                    <div className="modal-line">
                                        <i className="bi bi-telephone"></i><Link to="/contact">Let's Talk</Link>
                                    </div>
                                </div>
                                <div className="mobile-modal-footer">
                                    <a target="_blank" href="/"><i className="bi bi-instagram"></i></a>
                                    <a target="_blank" href="/"><i className="bi bi-linkedin"></i></a>
                                    <a target="_blank" href="/"><i className="bi bi-youtube"></i></a>
                                    <a target="_blank" href="/"><i className="bi bi-facebook"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <!-- Modal End --> */}
                </div>
            </header>
        </div>
    );
}
