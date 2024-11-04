import React, { useContext } from 'react';
import './Home.css';

import Filterpopup from './Filterpopup';
import Navbar from '../../common/header/Navbar';
import Currentmeal from './Currentmeal';
import { AppContext } from '../AppContext';

export default function Home(props) {
    const {
        showPopup,
        onhandleclick,
        searchValue,
        handleInputChange,
        handleClickOnSearch,
        category,
        filteredCategory,
        handleOnClick,
    } = useContext(AppContext);

    return (
        <>
            <Navbar
                userName={props.userName}
                handleInputChange={handleInputChange}
                handleClickOnSearch={handleClickOnSearch}
                searchValue={searchValue}
                
                handleOnClick={handleOnClick}
               
            />

            <Currentmeal category={category} />
            <div className="foodcard mt-5">
                <div className="container text-left">
                    <div id="fda_app" className="row">
                        <section id="fda_product_tile" className="col-12">
                            <div className="row fda_food_row">
                                <div className="col-lg-12">
                                    <div className="detailosofcategories mt-5">

                                        <h5 style={{ color: 'black' }}><b>Restaurants with online food delivery in Kolkata</b></h5>
                                        <button onClick={onhandleclick} className="buttonfilter">
                                            <i className="las la-sort-amount-up"></i> Filter
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {showPopup && <Filterpopup categories={category} />}
                            <div className="container">
                                <div className="row">
                                    {filteredCategory.map((cat) => (
                                        <div className="col-lg-4 col-12" id='foodcardd' key={cat.idCategory}>
                                            <div className="foodcards" id='foodcarddd'>
                                                <img src={cat.strCategoryThumb} alt={cat.strCategory} /> <br />
                                                <h5 className='foodcardtitle'>{cat.strCategory}</h5> <br />
                                                <h2 className='foodmaintitle'>Japanese Gyozas</h2>
                                                <div className="foomaintitles foodcardsdetails">
                                                    <ion-icon className="meal-icon" name="flame-outline" style={{ color: 'green' }}></ion-icon>
                                                    &nbsp; &nbsp;&nbsp; &nbsp; <h4> <span style={{ color: "black;" }}><b>650 </b></span>calories</h4>
                                                </div>
                                                <div className="foomaintitles foodcardsdetailsnext">
                                                    <ion-icon className="meal-icon" name="restaurant-outline" style={{ color: 'green' }}></ion-icon>
                                                    &nbsp;  &nbsp;&nbsp; &nbsp;  <h4> <span style={{ color: "black;" }}><b>NutriScore ®</b></span> 74</h4>
                                                </div>
                                                <div className="foomaintitles foodcardsdetailslast">
                                                    <ion-icon className="meal-icon" name="star-outline" style={{ color: 'green' }}></ion-icon>
                                                    &nbsp;&nbsp;&nbsp; &nbsp; <h4> <span style={{ color: "black;" }}><b>4.9 rating </b></span>(537)</h4>
                                                </div>
                                                <br /> <br />
                                                <button className="viewdetails">View Details</button> &nbsp;&nbsp;
                                                <button className="addtocart" onClick={() => handleOnClick(cat.idCategory, cat.strCategory, cat.strCategoryThumb, category)}><i className="fa-solid fa-cart-shopping"></i> &nbsp;Add to Cart</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </>
    );
}
