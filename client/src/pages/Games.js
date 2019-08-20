import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import Game from "../components/Game";
import API from "../utils/API";

class Games extends Component {

    state = { 
        gameList : "",
        title: String,
        system_type: String,
        developer: String,
        box_art:String,
        description:String,
        is_beaten:Boolean,
        favorite:Boolean,
        now_playing:Boolean,
        owned:Boolean,
        rating:Number,
        price:Number,
        year_released:Number,
        date:Date,
        note:Object,
        gamesCount: 13,
        currentGame: -1,
        counter: 0,

    }
    // componentDidMount: check if already logged in; if so, redirect to library or home page?
    componentDidMount(){
        this.loadGames()
        console.log("Mounted")
    }

    // handleClick = id =>{


    //     if (this.state.currentGame !== -1){
    //     closeCurrent()
    //     }

    //     if(this.hasClass('bk-open')){
    //         this.removeClass('bk-open');
    //     }
    //     else if(this.hasClass('bk-outside' && 'bk-viewinside')){
    //         this.addClass('bk-open')
    //     }

    //     else {
    //         this.data( 'opened', true ).addClass( 'bk-outside' ).on( transEndEventName, function() {
    //             $( this ).off( transEndEventName ).addClass( 'bk-viewinside' );  
    //             this.css( 'z-index', this.state.gamesCount );
    //             this.state.currentGame = this.index();
    //             console.log("Current Game " + this.state.currentGame)
    //         } );
    //         current = 0;
    //         $content.removeClass( 'bk-content-current').eq( this.state.current ).addClass( 'bk-content-current' );
            
    //     }

    // }

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
	// 		counter ++;	
    //     }
    // }


    loadGames = () =>{
        API.getGames()
        .then(res=>
            this.setState({
                gameList: res.data,
                title: res.data.title,
                system_type: res.data.system_type,
                developer: res.data.developer,
                box_art:res.data.box_art,
                description:res.data.description,
                is_beaten:res.data.is_beaten,
                favorite:res.data.favorite,
                now_playing:res.data.now_playing,
                owned:res.data.owned,
                rating:res.data.rating,
                price:res.data.price,
                year_released:res.data.year_released,
                date:res.data.date,
                note:res.data.note
            }))
    }

    render () {
        return (
        <MDBContainer fluid>
            <h1>Games Bookshelf</h1>
            <MDBRow>
                <MDBCol size='sm-12'>
                    {/* {this.state.gameList.map(gameCase =>  */}
                    {/* <Game 
                    title = {this.state.title}
                    system_type = {this.state.system_type}
                    developer = {this.state.developer}
                    box_art = {this.state.box_art}
                    description = {this.state.description}
                    is_beaten = {this.state.is_beaten}
                    favorite = {this.state.favorite}
                    now_playing = {this.state.now_playing}
                    owned = {this.state.owned}
                    rating = {this.state.rating}
                    price = {this.state.price}
                    year_released = {this.state.year_released}
                    date = {this.state.data}
                    note = {this.state.note}
                    id = {gameCase.title}
                    handleClick = {this.handleClick}
                    /> */}
                </MDBCol>
            </MDBRow>
        </MDBContainer>
        )
    }
};

export default Games;