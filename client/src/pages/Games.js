import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import FixedNavbar from "../components/FixedNavbar";
import Game from "../components/Game";
// import API from "../utils/API";
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

    state = { 
        gameSeed: gameSeed,
        gamesCount: 13,
        currentGame: -1,
        counter: 0,
        gameOpen: 0,
        clicked: [],
        checked: false
        
    }

   


    componentDidMount(){
        this.loadGames()
        console.log("Mounted")
    }
    
    // checkClicked = ids => {
    //     let matchFound = false;
    //     this.state.clicked.map(function(id){
    //         if (ids === id) {
    //             matchFound = true;
    //         }
    //     })
    //     return matchFound;
    // }
    

    handleClick = i =>{
        console.log(`id: ${i}`)
        this.setState({clicked:[...this.state.clicked,i]})
        
        console.log(this.state.clicked)

        if (this.state.gameOpen === 0){
            this.setState({gameOpen: 1})
        setTimeout(() => {
        this.setState({gameOpen : 2})
        }, 1000)
        // this.setState.currentGame = 0;
        }

        else if (this.state.gameOpen === 2){
            this.setState({gameOpen: 3})
        }


        else if (this.state.gameOpen === 3){
            this.setState({gameOpen: 2})
            setTimeout(() => {
            this.setState({gameOpen : 1})
            }, 1000)
            setTimeout(() => {
            this.setState({gameOpen : 0})
            }, 1000)
            
        }
    
    
        //     // $content.removeClass( 'bk-content-current').eq( this.state.current ).addClass( 'bk-content-current' );
            
        // }

    }

    // handleThreeD = () =>{
    //     if (this.state.counter ===13){
    //         this.state.counter = 0
    //     }

    //     if (this.state.counter < this.state.gamesCount/2){
    //         this.css('z-index', this.state.counter).attr( 'data-stackval', this.state.counter )
    //         this.state.counter ++;
    //     }
    //     else {
    //         this.css( 'z-index', this.state.gamesCount - 1 - this.state.counter ).attr( 'data-stackval', this.state.gamesCount - 1 - this.state.counter );
	// 		this.state.counter ++;	
    //     }
    // }


    loadGames = () =>{
        // console.log(gameSeed)
        
        // // API.getGames()
        // .then( 
            // res=> console.log(res.data)
           
        }

    render () {
      return (
        <MDBContainer fluid>
        <FixedNavbar loggedIn={this.props.loggedIn} logoutBoolean={this.props.logoutBoolean} username={this.props.username}/>
            <br/>
            <MDBRow>
                <MDBCol size='sm-12' className = 'bk-list'>
                    {this.state.gameSeed.map((games,i) => 
                     <Game 
                    gameOpen = {this.state.gameOpen} 
                    title = {games.title}
                    system_type = {games.system_type}
                    developer = {games.developer}
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
                    id = {games.id}
                    key = {games.id}
                    i = {this.state.clicked}
                    handleClick = { () => this.handleClick(i)}
                    /> )}
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        )
    }
};

export default Games;