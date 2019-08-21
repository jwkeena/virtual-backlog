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

    state = { 
        gameSeed: gameSeed,
        gamesCount: 13,
        currentGame: -1,
        counter: 0,
        open: false
    }

    


    componentDidMount(){
        this.loadGames()
        console.log("Mounted")
    }

    handleClick = id =>{

        // const currentClass = this.state.open;
        // this.setState({ open: !currentState});


        if (this.state.currentGame !== -1){
        // closeCurrent()
        }

        if(this.hasClass('bk-open')){
            this.removeClass('bk-open');
        }
        else if(this.hasClass('bk-outside' && 'bk-viewinside')){
            this.addClass('bk-open')
        }

        else {
            this.data( 'opened', true ).addClass( 'bk-outside' ).on(function() {
                this.addClass( 'bk-viewinside' );  
                this.css( 'z-index', this.state.gamesCount );
                this.state.currentGame = this.index();
                console.log("Current Game " + this.state.currentGame)
            } );
            this.state.currentGame = 0;
        }
        //     // $content.removeClass( 'bk-content-current').eq( this.state.current ).addClass( 'bk-content-current' );
            
        // }

    }

    handleThreeD = () =>{
        if (this.state.counter ===13){
            this.state.counter = 0
        }

        if (this.state.counter < this.state.gamesCount/2){
            this.css('z-index', this.state.counter).attr( 'data-stackval', this.state.counter )
            this.state.counter ++;
        }
        else {
            this.css( 'z-index', this.state.gamesCount - 1 - this.state.counter ).attr( 'data-stackval', this.state.gamesCount - 1 - this.state.counter );
			this.state.counter ++;	
        }
    }


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
            <h1>Games Bookshelf</h1>
            <MDBRow>
                <MDBCol size='sm-12' className = 'bk-list'>
                    {this.state.gameSeed.map(games => 
                     <Game 
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
                    // key = {this.state.counter++}
                    handleClick = {this.handleClick}
                    /> )}
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        )
    }
};

export default Games;