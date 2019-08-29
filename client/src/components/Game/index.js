import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import API from '../../utils/API';
// import './styles.css'

// // return { init : init };

class Game extends Component {

    deleteGame = (event) => {
        const answer = window.confirm("Are you sure you want to delete this game from your collection?");
        const id = event.target.value

        if (answer) {
            API.deleteGame(id)
              .then(res=> {
                this.props.handleClose();
                setTimeout(() => {this.props.loadGames()}, 2000)
              })
              .catch(err => console.log(err));
        } else {
            return;
        }
      }

    render () {
        return (
            <li 
                key={this.props.id} 
                className={(this.props.zIndex === 1  && this.props.clicked ? 'z-index'+this.props.zCounter + 1 : 'z-index'+this.props.zCounter)} 
                onClick = {this.props.handleClick}>
                    <div className={(this.props.gameOpen === 1 && this.props.clicked ? 'bk-game game' + this.props.id +' bk-outside'  : this.props.gameOpen === 2 && this.props.clicked  ? 'bk-game game'+this.props.id+' bk-outside bk-viewinside' : this.props.gameOpen === 3 && this.props.clicked ? 'bk-game game'+this.props.id+' bk-outside bk-viewinside bk-open' :'bk-game game'+ this.props.id)}> 
        
            <div className='bk-front'>
                <div className='bk-cover-back'></div>
                <div className={('bk-cover '+ this.props.system_type )} src={(this.props.box_art)}>
                    <h2><span>  {this.props.title}  </span> <span> {this.props.system_type} </span></h2>   
                </div>
            </div>

            <div className='bk-page'>
                <div className={(this.props.page === 1 && this.props.clicked ? 'bk-content bk-content-current': 'bk-content')}>
                    <p>{this.props.description}</p>
                </div>
                <div className={(this.props.page === 2 && this.props.clicked ? 'bk-content bk-content-current': 'bk-content')}>
                    <p>Owned?{this.props.owned}</p>
                    <p>Physical Copy?{this.props.is_physical}</p>
                    <p>Completed?{this.props.is_beaten}</p>
                    <p>Currently Playing?{this.props.now_playing}</p>
                    <p>Favorite Game?{this.props.is_favorite}</p>
                    <p>Rating{this.props.rating}</p>
                    <p>Estimated Value{this.props.price}</p>
                    {/* <div className="custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="customSwitches"/>
                    <label className="custom-control-label" htmlFor="customSwitches">Toggle this switch element</label>
                    </div> */}
                </div>
                <div className={(this.props.page === 3 && this.props.clicked ? 'bk-content bk-content-current': 'bk-content')}>
                    <p>Notes{this.props.note}</p>
                    <p>Year Released{this.props.date}</p>
                </div>
                <div className={(this.props.page === 3 && this.props.clicked ? 'bk-content bk-content-current': 'bk-content')}>
                    <p>Delete This Title?{this.props.note}</p>
                    <Button value={this.props.id} onClick={this.deleteGame}>Delete</Button>
                    
                </div>

            <nav>
            <span className="bk-page-prev" onClick = {this.props.handlePageLeft}>&lt;</span>
            <span className="bk-page-close" onClick = {this.props.handleClose}>X</span>
            <span className="bk-page-next" onClick = {this.props.handlePageRight}>&gt;</span>
            </nav>

            </div>


            <div className='bk-back'>
                <p>{this.props.title} </p>
                <p>{this.props.description} </p>
            </div>

            <div className='bk-right'></div>

            <div className={('bk-left ' + this.props.system_type)}>
                <h2><span>{this.props.title}</span><span>{this.props.system_type}</span></h2>
            </div>

            <div className='bk-top'></div>

            <div className='bk-bottom'></div>
        
        
            </div>
            </li>
        )
    }
};

export default Game
