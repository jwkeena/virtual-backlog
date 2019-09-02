import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol} from 'mdbreact';
import FixedNavbarShare from "../components/FixedNavbarShare";
import Game from "../components/Game";
import API from "../utils/API";
import gameSeed from "../components/GamesTest/gameListTest";
import '../components/Game/styles.css'
import { Spinner } from 'reactstrap';
import Statistics from '../components/Statistics';

const styles = {
  middle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  }
}
class Games extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            sharingUser: null,
            sortOption: "system_type",
            customSearch: "",
            gamesSorted: null,
            amountOfGamesSorted: 0,
            amountOfGamesInCollection: null,
            gameSeed: gameSeed,
            gamesLoaded: null,
            gamesCount: 13,
            currentGame: -1,
            counter: 0,
            gameOpen: 0,
            clicked: [],
            checked: false,
            zIndex: 0,
            zCounter: 0,
            page: 1,
            switch1: true,
            switch2: false,
            transform: false,
            vanish: 0
        }
        this.loadGames = this.loadGames.bind(this);
        this.updateSortOption = this.updateSortOption.bind(this);
        this.updateCustomSearch = this.updateCustomSearch.bind(this);
    }

    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
        const { handle } = this.props.match.params;
        this.setState({
            sharingUser: handle
        }, () => {
            this.loadGames()
        })
    }

    loadGames () {
        API.getGames(this.state.sharingUser)
        .then((res) => {
            this.setState({
                gamesLoaded: res.data,
            }, () => {
                this.sortGames();
            })
            }
        )
    }

    updateSortOption = (option) => {
        this.setState({
            sortOption: option
        }, () => {
            this.sortGames();
        })
    }

    updateCustomSearch = (query) => {
        let sorted = this.state.gamesLoaded;
        sorted = sorted.filter(game => !game.wishlist).filter(game => game.title.toLowerCase().includes(query));
        const amount = sorted.length;
        this.setState({
            sortOption: "custom search",
            gamesSorted: sorted,
            amountOfGamesSorted: amount
        });
    }

    sortGames = () => {
        let sorted = this.state.gamesLoaded;
        const amountInCollection = sorted.filter(game => !game.wishlist).length;
        switch (this.state.sortOption) {
            case "system_type":
                sorted = sorted.filter(game => !game.wishlist).sort((a, b) => (a.system_type > b.system_type) 
                    ? 1 
                    : (a.system_type === b.system_type) 
                    ? ((a.title > b.title) 
                    ? 1 
                    : -1) 
                    : -1 ); // Filter non-wishlist, sort by system, then alphabetically
                break;
            case "title":
                sorted = sorted.filter(game => !game.wishlist).sort((a, b) => (a.title > b.title) ? 1 : -1 ) // Sort by title only
                break;
            case "is_beaten":
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.is_beaten).sort((a, b) => (a.system_type > b.system_type) ? 1 : -1 );
                break;
            case "backlog":
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.backlog).sort((a, b) => (a.system_type > b.system_type) ? 1 : -1 );
                break;
            case "digital":
                sorted = sorted.filter(game => !game.wishlist).filter(game => !game.physical).sort((a, b) => (a.system_type > b.system_type) ? 1 : -1 );
                break;    
            case "physical":
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.physical).sort((a, b) => (a.system_type > b.system_type) ? 1 : -1 );
                break;
            case "wishlist":
                sorted = sorted.filter(game => game.wishlist).sort((a, b) => (a.system_type > b.system_type) ? 1 : -1 );
                break;
            case "now_playing":
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.now_playing).sort((a, b) => (a.system_type > b.system_type) ? 1 : -1 );
                break;
            case "year_released":
                sorted = sorted.filter(game => !game.wishlist).sort((a, b) => (a.year_released > b.year_released) ? 1 : -1 ) // Sort by title only
                break;
            case "cib":
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.physical).filter(game => game.cib).sort((a, b) => (a.system_type > b.system_type) ? 1 : -1 );
                break;
            case "favorite":
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.favorite).sort((a, b) => (a.title > b.title) ? 1 : -1 );
                break;
            default: 
                sorted = sorted.filter(game => !game.wishlist).sort((a, b) => (a.system_type > b.system_type) ? 1 : (a.system_type === b.system_type) ? ((a.title > b.title) ? 1 : -1) : -1 ); // Same as first option
        }
        
        const amount = sorted.length;
        this.setState({
            gamesSorted: sorted,
            amountOfGamesSorted: amount,
            amountOfGamesInCollection: amountInCollection
        })
    }

    // $(window).scroll(function() {
    //     var scrollLocation = $(document).scrollTop();   
    //     var vanishingPoint = scrollLocation + window.innerHeight / 2;
    //     $(".bk-list").css('-webkit-perspective-origin', ' 50% ' + vanishingPoint + 'px');
    // })

    handleScroll = () =>{
        var scrollLocation = window.pageYOffset;   
        // console.log("scroolloco "+ scrollLocation)
        var vanishingPoint = scrollLocation + window.innerHeight / 2;
        // console.log("windowheight " + window.innerHeight)
        this.setState({vanish:vanishingPoint})
        // console.log("scrolling " + vanishingPoint)
        }
    
    handleClick = i =>{
        let clickedArray = this.state.clicked.slice(0)
        // console.log("clickedArray" + clickedArray)
        
        if (this.state.gameOpen === 0){
        this.setState({zIndex: 1})
        clickedArray[i] = !clickedArray[i]
        this.setState({clicked:clickedArray})
            this.setState({gameOpen:1})
            setTimeout(() => {
                this.setState({gameOpen:2})
            }, 500)
        // this.setState.currentGame = 0;
        }

        else if (this.state.gameOpen === 2){
            this.setState({gameOpen:3})
        }
        //     // $content.removeClass( 'bk-content-current').eq( this.state.current ).addClass( 'bk-content-current' );
        // }
    }

    handlePageRight = i => {
        // console.log("clicked!")
        if (this.state.page === 1){
            this.setState({page:2})
        }
        else if (this.state.page === 2){
            this.setState({page:3})
        }  
        else if (this.state.page === 3){
            this.setState({page:4})
        }  
    }

    handleClose = i => {
        // console.log("clicked!")
         if (this.state.gameOpen === 3){
            this.setState({gameOpen:2})
            setTimeout(() => {
            this.setState({
                gameOpen:0, 
                clicked: [], 
                zindex: 0, 
                page: 1})
            }, 400)
        }
    }

    handlePageLeft = i => {
        // console.log("clicked!")
        if (this.state.page === 2){
            this.setState({page:1})
        }
        else if (this.state.page === 3){
            this.setState({page:2})
        }  
        else if (this.state.page === 4){
            this.setState({page:3})
        }  
    }

    handleSwitchChange = nr => () => {
        let switchNumber = `switch${nr}`;
        this.setState({
          [switchNumber]: !this.state[switchNumber]
        });
      }

    render () {
      let gamesCount = 12
      let zCounter = this.state.zCounter
      let negativeC = 7
      return (
        <div>
        <FixedNavbarShare 
            sortOption={this.state.sortOption}
            updateSortOption={this.updateSortOption}
            loggedIn={this.props.loggedIn} 
            loadGames={this.loadGames} 
            logoutBoolean={this.props.logoutBoolean} 
            sharingUser={this.state.sharingUser}/>
        <MDBContainer fluid > 
        
        <br/>
        
            {(this.state.gamesSorted) ? 
            
            <MDBRow>
                <MDBCol size='sm-8' className =  'bk-list' style = {{WebkitPerspectiveOriginY:this.state.vanish}}>
                    {this.state.gamesSorted.map((games,i) => 
                     <Game
                    sharingUser = {this.state.sharingUser}
                    sharing = {true}
                    loadGames = {this.loadGames}
                    sortOption = {this.state.sortOption}
                    gameOpen = {this.state.gameOpen} 
                    title = {games.title}
                    system_type = {games.system_type}
                    physical = {games.physical}
                    box_art = {games.box_art}
                    description = {games.description}
                    is_beaten = {games.is_beaten}
                    favorite = {games.favorite}
                    now_playing = {games.now_playing}
                    year_released = {games.year_released}
                    date = {games.data}
                    backlog = {games.backlog}
                    cib = {games.cib}
                    guid = {games.guid}
                    gb_url={games.gb_url}
                    points = {games.points}
                    wishlist = {games.wishlist}
                    note = {games.note}
                    id = {games._id}
                    key = {games._id}
                    page = {this.state.page}
                    switch1 = {this.state.switch1}
                    switch2 = {this.state.switch2}
                    zIndex = {this.state.zIndex}
                    clicked = {this.state.clicked[i]}
                    zCounter = {zCounter < gamesCount/2 ? (zCounter += 1): gamesCount - zCounter && negativeC --}
                    handleClick = {() => this.handleClick(i)}
                    handlePageLeft = {()=>this.handlePageLeft(i)}
                    handleClose = {() => this.handleClose(i)}
                    handlePageRight = {()=>this.handlePageRight(i)}
                    handleSwitchChange = {()=>this.handleSwitchChange()}
                    />)}
                    {/* <MDBSwitch checked={this.state.switch1} onChange={this.handleSwitchChange(1)} /> */}
                </MDBCol>
            </MDBRow>  : <div style={styles.middle} ><Spinner size='lg'color="primary" /></div>
                } {/* <-- remove this bracket when loading from gameSeed */}
            </MDBContainer> 
            <Statistics
                updateCustomSearch={this.updateCustomSearch}
                sortOption={this.state.sortOption}
                updateSortOption={this.updateSortOption}
                amountOfGamesInCollection={this.state.amountOfGamesInCollection}
                amountOfGamesSorted={this.state.amountOfGamesSorted}/>
            </div>
        )
    } 
};

export default Games;