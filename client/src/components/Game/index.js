import React from 'react';
import './styles.css'


// return { init : init };


const Game = props => (
    <li>
    <div className='bk-game game'> 
   
    <div className='bk-front'>
        <div className='bk-cover-back'></div>
        <div className='bk-cover' background_image={props.box_art}>
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
            <p>{props.personal_rating}</p>
        </div>
        <div className='bk-content'>
            <p>{props.developer}</p>
        </div>
    </div>

    <div className='bk-back'>
        <p>{props.title} </p>
        <p>{props.description} </p>
    </div>

    <div className='bk-right'></div>

    <div className='bk-left' className={props.system_type}>
        <h2><span>{props.title}</span><span>{props.system_type}</span></h2>
    </div>

    <div className='bk-top'></div>

    <div className='bk-bottom'></div>
   
   
    </div>
    </li>
);

export default Game