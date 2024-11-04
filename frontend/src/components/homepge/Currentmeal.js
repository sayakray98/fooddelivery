import React from 'react'

export default function Currentmeal(props) {

    const onhandleNext = () => {
        var currentmeal = document.getElementsByClassName('currentmealall')[0];
        currentmeal.scrollLeft += 350;
        currentmeal.style.scrollBehavior = 'smooth';

    }
    const onhandlePrev = () => {
        var currentmeal = document.getElementsByClassName('currentmealall')[0];
        currentmeal.scrollLeft -= 350;
        currentmeal.style.scrollBehavior = 'smooth';
    }
  return (
    <div className='current'>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <h5 className='mainhead text-left py-5' style={{color:'black'}}><b >What's on your mind?</b></h5>
                    <div className="currentmealall">
                        <div className="mealnavs">
                            <div className="nav next" onClick={onhandleNext} disabled={props.category.length === 0 } >
                            <i class="fa-solid fa-arrow-right"></i>
                            </div>
                            <div className="nav prev" onClick={onhandlePrev} disabled={props.category.length === 0 }>
                            <i class="fa-solid fa-arrow-left"></i>
                            </div>
                        </div>
                    {props.category.map((e) => (
                        <div className="currentmeal">
                        <img src={e.strCategoryThumb} alt="" /> <br />
                        <h5>{e.strCategory}</h5>
                    </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
