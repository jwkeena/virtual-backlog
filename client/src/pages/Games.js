import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import FixedNavbar from "../components/FixedNavbar";
import Game from "../components/Game";
import API from "../utils/API";
import gameSeed from "../components/GamesTest/gameListTest";
import '../components/Game/styles.css'
// import Modernizr from '../utils/modernizr.custom'

// var transEndEventNames = {
//     'WebkitTransition' : 'webkitTransitionEnd',
//     'MozTransition' : 'transitionend',
//     'OTransition' : 'oTransitionEnd',
//     'msTransition' : 'MSTransitionEnd',
//     'transition' : 'transitionend'
// }
// var transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ]
// gameList = $( '#bk-list > li > div.bk-game' ), gamesCount = 13, currentgame = -1, counter = 0; 

class Games extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            gameSeed: gameSeed,
            gamesLoaded: null,
            gamesCount: 13,
            currentGame: -1,
            counter: 0,
            gameOpen: 0,
            clicked: [],
            checked: false
        }
        this.loadGames = this.loadGames.bind(this);
    }

    componentDidMount(){
        this.loadGames()
    }
    
    handleClick = i =>{
        let clickedArray = this.state.clicked.slice(0)
        console.log("clickedArray" + clickedArray)
        
        
        if (this.state.gameOpen === 0){
        this.setState({zIndex: 1})
        clickedArray[i] = !clickedArray[i]
        this.setState({clicked:clickedArray})
            this.setState({gameOpen:1})
            setTimeout(() => {
                this.setState({gameOpen:2})
                

        }, 1000)

        // this.setState.currentGame = 0;
        }

        else if (this.state.gameOpen === 2){
            this.setState({gameOpen:3})


        }

        else if (this.state.gameOpen === 3){
            this.setState({gameOpen:2})

            setTimeout(() => {
            this.setState({gameOpen:1})

            }, 1000)
            setTimeout(() => {
            this.setState({gameOpen:0})
            this.setState({clicked:[]})
            }, 1000)
            this.setState({zIndex: 0})
            
        }
    
        //     // $content.removeClass( 'bk-content-current').eq( this.state.current ).addClass( 'bk-content-current' );
        // }

    }

    loadGames () {
        const username = localStorage.getItem("username");
        API.getGames(username)
        .then((res) => {
            console.log(res.data)
            this.setState({
                gamesLoaded: res.data
            })
            }
        )
    }

    render () {
      let gamesCount = 12
      let zCounter = this.state.zCounter
      let negativeC = 7
      return (
        <MDBContainer fluid>
        <FixedNavbar loggedIn={this.props.loggedIn} loadGames={this.loadGames} logoutBoolean={this.props.logoutBoolean} username={this.props.username}/>
        
        <br/>
        
            {(this.state.gamesLoaded) && 
            
            <MDBRow>
                <MDBCol size='sm-12' className = 'bk-list'>
                    {this.state.gamesLoaded.map((games,i) => 
                     <Game 
                    gameOpen = {this.state.gameOpen} 
                    title = {games.title}
                    system_type = {games.system_type}
                    box_art = {games.box_art}
                    description = {games.description}
                    is_beaten = {games.is_beaten}
                    favorite = {games.favorite}
                    now_playing = {games.now_playing}
                    owned = {games.owned}
                    rating = {games.rating}
                    price = {games.price}
                    year_released = {games.year_released}
                    date = {games.data}
                    note = {games.note}
                    id = {games._id}
                    zIndex = {this.state.zIndex}
                    clicked = {this.state.clicked[i]}
                    zCounter = {zCounter < gamesCount/2 ? (zCounter += 1): gamesCount - zCounter && negativeC --}
                    handleClick = { () => this.handleClick(i)}
                    />)}
                    
                </MDBCol>
            </MDBRow>
            }
            </MDBContainer> 
        )
    }
    
};

export default Games;