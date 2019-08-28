import React from 'react';
// import './styles.css'

// // return { init : init };

 function Game(props) {
   return ( <li key={props._id} className={(props.zIndex === 1  && props.clicked ? 'z-index'+props.zCounter + 1 : 'z-index'+props.zCounter)} onClick = {props.handleClick}>
    <div className={(props.gameOpen === 1 && props.clicked ? 'bk-game game' + props._id +' bk-outside'  : props.gameOpen === 2 && props.clicked  ? 'bk-game game'+props._id+' bk-outside bk-viewinside' : props.gameOpen === 3 && props.clicked ? 'bk-game game'+props._id+' bk-outside bk-viewinside bk-open' :'bk-game game'+ props._id)}> 
   
    <div className='bk-front'>
        <div className='bk-cover-back'></div>
        <div className={('bk-cover '+ props.system_type )} src={(props.box_art)}>
            <h2><span>  {props.title}  </span> <span> {props.system_type} </span></h2>   
        </div>
    </div>

    <div className='bk-page'>
        <div className={(props.page === 1 && props.clicked ? 'bk-content bk-content-current': 'bk-content')}>
            <p>{props.description}</p>
        </div>
        <div className={(props.page === 2 && props.clicked ? 'bk-content bk-content-current': 'bk-content')}>
            <p>Owned?{props.owned}</p>
            <p>Physical Copy?{props.is_physical}</p>
            <p>Completed?{props.is_beaten}</p>
            <p>Currently Playing?{props.now_playing}</p>
            <p>Favorite Game?{props.is_favorite}</p>
            <p>Rating{props.rating}</p>
            <p>Estimated Value{props.price}</p>
            {/* <div className="custom-control custom-switch">
            <input type="checkbox" className="custom-control-input" id="customSwitches"/>
            <label className="custom-control-label" htmlFor="customSwitches">Toggle this switch element</label>
            </div> */}
        </div>
        <div className={(props.page === 3 && props.clicked ? 'bk-content bk-content-current': 'bk-content')}>
            <p>Notes{props.note}</p>
            <p>Year Released{props.date}</p>
        </div>
        <div className={(props.page === 3 && props.clicked ? 'bk-content bk-content-current': 'bk-content')}>
            <p>Delete This Title?{props.note}</p>
            
        </div>

    <nav>
    <span className="bk-page-prev" onClick = {props.handlePageLeft}>&lt;</span>
    <span className="bk-page-close" onClick = {props.handleClose}>X</span>
    <span className="bk-page-next" onClick = {props.handlePageRight}>&gt;</span>
    </nav>

    </div>


    <div className='bk-back'>
        <p>{props.title} </p>
        <p>{props.description} </p>
    </div>

    <div className='bk-right'></div>

    <div className={('bk-left ' + props.system_type)}>
        <h2><span>{props.title}</span><span>{props.system_type}</span></h2>
    </div>

    <div className='bk-top'></div>

    <div className='bk-bottom'></div>
   
   
    </div>
    </li>
   )
};

export default Game
