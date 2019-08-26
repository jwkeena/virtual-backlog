import React from 'react';
// import './styles.css'

// // return { init : init };

 function Game(props) {
   return ( <li key={props.id} className={(props.zIndex === 1  && props.clicked ? 'z-index'+props.zCounter + 1 : 'z-index'+props.zCounter)} onClick = {props.handleClick}>
    <div className={(props.gameOpen === 1 && props.clicked ? 'bk-game game ' + props.id +' bk-outside'  : props.gameOpen === 2 && props.clicked  ? 'bk-game game '+props.id+' bk-outside bk-viewinside' : props.gameOpen === 3 && props.clicked ? 'bk-game game '+props.id+' bk-outside bk-viewinside bk-open' :'bk-game game'+ props.id)}> 
   
    <div className='bk-front'>
        <div className='bk-cover-back'></div>
        <div className='bk-cover' src={props.box_art}>
            <h2><span>  {props.title}  </span> <span> {props.system_type} </span></h2>   
        </div>
    </div>

    <div className='bk-page'>
        <div className='bk-content bk-content-current'>
            <p>{props.description}</p>
        </div>
        <div className='bk-content'>
            <p>{props.is_physical}</p>
            <p>{props.is_beaten}</p>
        </div>
    </div>

    <div className='bk-back'>
        <p>{props.title} </p>
        <p>{props.description} </p>
    </div>

    <div className='bk-right'></div>

    <div className='bk-left'>
        <h2><span>{props.title}</span><span>{props.system_type}</span></h2>
    </div>

    <div className='bk-top'></div>

    <div className='bk-bottom'></div>
   
   
    </div>
    </li>
   )
};

export default Game
