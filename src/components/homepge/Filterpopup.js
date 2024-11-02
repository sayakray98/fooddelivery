import React, { useState } from 'react'
import './Home.css';
export default function Filterpopup(props) {
    let oncrossclick = () => {
        var crossmarksign = document.getElementById('listp');
        crossmarksign.style.display = 'none';
        var appCsData = document.getElementsByClassName('App')[0];
        appCsData.style.opacity = 1;
    }
    return (
        <div className='popup'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="popupshow">
                            <div className="popbox">
                                <ul className='listpart' id='listp'>
                                    {props.categories.map((item) => <li className='listparts'>{item.strCategory}</li>)}

                                    <h5 className='crossmark' id='cross' onClick={oncrossclick}>X</h5>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
