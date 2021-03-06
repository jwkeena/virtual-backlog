import React, { Component } from "react";
import { MDBContainer, MDBRow } from 'mdbreact';
import FixedNavbarShare from "../components/FixedNavbarShare";
import Game from "../components/Game";
import API from "../utils/API";
import gameSeed from "../components/GamesTest/gameListTest";
import '../components/Game/styles.css'
import { Spinner } from 'reactstrap';
import Statistics from '../components/Statistics';

const styles = {
    middle: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }
  }
class Games extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            sharingUser: null,
            sortOption: "favorite",
            customSearch: "",
            gamesSorted: null,
            amountOfGamesSorted: 0,
            amountOfGamesInCollection: null,
            gameSeed: gameSeed,
            gamesLoaded: null,
            allTags: [],
            allSystemAbbreviations: [],
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
            vanish: 312
        }
        this.loadGames = this.loadGames.bind(this);
        this.updateSortOption = this.updateSortOption.bind(this);
    }

    componentDidMount () {
        window.addEventListener('scroll', this.handleScroll);
        const { handle } = this.props.match.params;
        this.setState({
            sharingUser: handle
        }, () => {
            this.loadGames();
        })
    }

    loadGames () {
        API.getGames(this.state.sharingUser)
        .then((res) => {
            this.setState({
                gamesLoaded: res.data,
            }, () => {
                this.sortGames(this.state.customSearch);
                this.collectAllTags();
                this.collectAllSystemAbbreviations();
            })
            }
        )
    }

    updateSortOption = (option, query) => {
        this.setState({
            sortOption: option,
            customSearch: query
        }, () => {
            this.sortGames(query);
        })
    }

    collectAllTags = () => {
        const list = [];
        for (let i=0; i<this.state.gamesLoaded.length; i++) {
            const gameTags = this.state.gamesLoaded[i].tags
            for (let j=0; j < gameTags.length; j++) {
                if (!list.includes(gameTags[j])) {
                    list.push(gameTags[j])
                }
            }
        }
        this.setState({
            allTags: list
        })
    }

    
    collectAllSystemAbbreviations = () => {
        const list = [];
        for (let i=0; i<this.state.gamesLoaded.length; i++) {
            const systemAbbr = this.state.gamesLoaded[i].system_type
            if (!list.includes(systemAbbr)) {
                list.push(systemAbbr)
            }
        }
        this.setState({
            allSystemAbbreviations: list
        })
    }

    sortGames = (query) => {
        let sorted = this.state.gamesLoaded;
        const amountInCollection = sorted.filter(game => !game.wishlist).length;
        switch (this.state.sortOption) {
            
            // Only the custom searches use the query parameter
            case "tag": 
                if (query === "" || query === " ") {
                    return;
                }
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.tags.includes(query.toLowerCase())).sort((a, b) => (a.system_type > b.system_type) ? 1 : (a.system_type === b.system_type) ? ((a.title > b.title) ? 1 : -1) : -1 );
                break;
            case "title": 
                if (query === "" || query === " ") {
                    return;
                }
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.title.toLowerCase().includes(query)).sort((a, b) => (a.system_type > b.system_type) ? 1 : (a.system_type === b.system_type) ? ((a.title > b.title) ? 1 : -1) : -1 );;
                break;
            case "system": 
                if (query === "" || query === " ") {
                    return;
                }
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.system_type.toLowerCase().includes(query)).sort((a, b) => (a.system_type > b.system_type) ? 1 : (a.system_type === b.system_type) ? ((a.title > b.title) ? 1 : -1) : -1 );
                break;
            case "year": 
                if (query === "" || query === " ") {
                    return;
                }
                sorted = sorted.filter(game => !game.wishlist).filter(game => (game.year_released === parseInt(query))).sort((a, b) => (a.system_type > b.system_type) ? 1 : (a.system_type === b.system_type) ? ((a.title > b.title) ? 1 : -1) : -1 );
                break;

            // Non-custom searches
            case "system_type":
                sorted = sorted.filter(game => !game.wishlist).sort((a, b) => (a.system_type > b.system_type) 
                    ? 1 
                    : (a.system_type === b.system_type) 
                    ? ((a.title > b.title) 
                    ? 1 
                    : -1) 
                    : -1 ); // Filter non-wishlist, sort by system, then alphabetically
                break;
            case "is_beaten":
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.is_beaten).sort((a, b) => (a.system_type > b.system_type) ? 1 : (a.system_type === b.system_type) ? ((a.title > b.title) ? 1 : -1) : -1 );
                break;
            case "backlog":
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.backlog).sort((a, b) => (a.system_type > b.system_type) ? 1 : (a.system_type === b.system_type) ? ((a.title > b.title) ? 1 : -1) : -1 );
                break;
            case "digital":
                sorted = sorted.filter(game => !game.wishlist).filter(game => !game.physical).sort((a, b) => (a.system_type > b.system_type) ? 1 : -1 );
                break;    
            case "physical":
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.physical).sort((a, b) => (a.system_type > b.system_type) ? 1 : -1 );
                break;
            case "wishlist":
                sorted = sorted.filter(game => game.wishlist).sort((a, b) => (a.system_type > b.system_type) ? 1 : (a.system_type === b.system_type) ? ((a.title > b.title) ? 1 : -1) : -1 );
                break;
            case "now_playing":
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.now_playing).sort((a, b) => (a.system_type > b.system_type) ? 1 : (a.system_type === b.system_type) ? ((a.title > b.title) ? 1 : -1) : -1 );
                break;
            case "cib":
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.physical).filter(game => game.cib).sort((a, b) => (a.system_type > b.system_type) ? 1 : (a.system_type === b.system_type) ? ((a.title > b.title) ? 1 : -1) : -1 );
                break;
            case "favorite":
                sorted = sorted.filter(game => !game.wishlist).filter(game => game.favorite).sort((a, b) => (a.system_type > b.system_type) ? 1 : (a.system_type === b.system_type) ? ((a.title > b.title) ? 1 : -1) : -1 );
                break;
        }
        
        const amount = sorted.length;
        this.setState({
            gamesSorted: sorted,
            amountOfGamesSorted: amount,
            amountOfGamesInCollection: amountInCollection
        })
    }

    handleScroll = () =>{
        var scrollLocation = window.pageYOffset;   
        var vanishingPoint = scrollLocation + window.innerHeight / 2;
        this.setState({vanish:vanishingPoint})
        }
    
        handleClick = i => {
            const openBook = this.state.currentGame;
            const clickedBook = i;
            let clickedArray = this.state.clicked.slice(0);
    
            if (openBook === -1) {
                this.setState({
                    currentGame: clickedBook
                }, () => {
                
                    if (this.state.gameOpen === 0){
                    this.setState({zIndex: 1})
                    clickedArray[i] = !clickedArray[i]
                    this.setState({clicked:clickedArray})
                        this.setState({gameOpen:1})
                        setTimeout(() => {
                            this.setState({gameOpen:2})
                        }, 500)
                    }
    
                     // Taking this out of a setTimeout makes the cover open instantly
                    else if (this.state.gameOpen === 2){
                    this.setState({gameOpen:3})
                }
                })
            } else if (clickedBook === openBook) {
                let clickedArray = this.state.clicked.slice(0);
                
                if (this.state.gameOpen === 0){
                this.setState({zIndex: 1})
                clickedArray[i] = !clickedArray[i]
                this.setState({clicked:clickedArray})
                    this.setState({gameOpen:1})
                    setTimeout(() => {
                        this.setState({gameOpen:2})
                    }, 500)
                } else if (this.state.gameOpen === 2){
                    this.setState({gameOpen:3})
                }
            } else {
                // Close currently open game first
                this.setState({gameOpen:2})
                setTimeout(() => {
                this.setState({gameOpen:1})
                }, 300)
                setTimeout(() => {
                this.setState({
                    gameOpen:0,
                    clicked:[],
                    zIndex: 0,
                    page:1,
                    currentGame: clickedBook // Sets the new book to be opened
                })}, 800)
    
                // Then open new book
                setTimeout(() => {
                    let clickedArray = this.state.clicked.slice(0);
            
                    if (this.state.gameOpen === 0){
                    this.setState({zIndex: 1})
                    clickedArray[i] = !clickedArray[i]
                    this.setState({clicked:clickedArray})
                        this.setState({gameOpen:1})
                        setTimeout(() => {
                            this.setState({gameOpen:2})
                        }, 500)
                    }}, 850)
            }    
        }

    handlePageRight = i => {
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

    handlePage1 = i => {
        this.setState({page:1})
    }
    handlePage2 = i => {
        this.setState({page:2})
    }
    handlePage3 = i => {
        this.setState({page:3})
    }
    handlePage4 = i => {
        this.setState({page:4})
    }

    handlePageLeft = i => {
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
        <br/>
        <br/>
        <br/>
        <br/>
        
            {(this.state.gamesSorted) ? 

            (this.state.gamesSorted.length > 0 ) ? 
            
            <MDBRow>
                <div 
                    className='bk-list' 
                    style ={{WebkitPerspectiveOriginY:this.state.vanish, Width:533}}>
                    
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
                    tags = {games.tags}
                    id = {games._id}
                    key = {games._id}
                    page = {this.state.page}
                    switch1 = {this.state.switch1}
                    switch2 = {this.state.switch2}
                    zIndex = {this.state.zIndex}
                    clicked = {this.state.clicked[i]}
                    zCounter = {negativeC === 0 ? (negativeC = 7) & (zCounter = 1) : zCounter < gamesCount/2 ? (zCounter += 1): gamesCount - zCounter && negativeC -- }
                    negativeC = {negativeC}
                    handleClick = { () => this.handleClick(i)}
                    handlePageLeft = {()=>this.handlePageLeft(i)}
                    handleClose = {() => this.handleClose(i)}
                    handlePageRight = {()=>this.handlePageRight(i)}
                    handleSwitchChange = {()=>this.handleSwitchChange()}
                    handlePage1 = {()=>this.handlePage1()}
                    handlePage2 = {()=>this.handlePage2()}
                    handlePage3 = {()=>this.handlePage3()}
                    handlePage4 = {()=>this.handlePage4()}
                    />)}
                </div>
            </MDBRow>  
               : <div style={styles.middle}><span className="pixel-font-large text-secondary">No matching games.</span></div>  
            : <div style={styles.middle} ><Spinner size='lg'color="secondary" /></div>    
            } 

            <br/>
            <br/>
            <br/>
            </MDBContainer> 
            <Statistics
                allTags={this.state.allTags}
                allSystemAbbreviations={this.state.allSystemAbbreviations}
                sortOption={this.state.sortOption}
                updateSortOption={this.updateSortOption}
                amountOfGamesInCollection={this.state.amountOfGamesInCollection}
                amountOfGamesSorted={this.state.amountOfGamesSorted}/>
            </div>
        )
    } 
};

export default Games;