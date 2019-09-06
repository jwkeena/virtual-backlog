import React, { Component } from "react";
import { MDBContainer, MDBRow} from 'mdbreact';
import FixedNavbar from "../components/FixedNavbar";
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
            sortOption: "system_type",
            customSearch: "",
            gamesSorted: null,
            amountOfGamesSorted: 0,
            amountOfGamesInCollection: null,
            gameSeed: gameSeed,
            gamesLoaded: null,
            allTags: [],
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
        this.updateCustomTitleSearch = this.updateCustomTitleSearch.bind(this);
        this.updateCustomSystemSearch = this.updateCustomSystemSearch.bind(this);
        this.updateCustomTagSearch = this.updateCustomTagSearch.bind(this);
    }

    componentDidMount () {
        this.loadGames();
        window.addEventListener('scroll', this.handleScroll);
    }

    loadGames () {
        const username = localStorage.getItem("username");
        API.getGames(username)
        .then((res) => {
            this.setState({
                gamesLoaded: res.data,
            }, () => {
                this.sortGames();
                this.collectAllTags();
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

    updateCustomTitleSearch = (query) => {
        if (query === "") {
            this.setState({
                sortOption: "system"
            }, () => {
                this.sortGames();
            })
        }
        
        let sorted = this.state.gamesLoaded;
        sorted = sorted.filter(game => !game.wishlist).filter(game => game.title.toLowerCase().includes(query));
        const amount = sorted.length;
        this.setState({
            sortOption: "custom (title)",
            gamesSorted: sorted,
            amountOfGamesSorted: amount
        });
    }

    updateCustomSystemSearch = (query) => {
        if (query === "") {
            this.setState({
                sortOption: "system"
            }, () => {
                this.sortGames();
            })
        }
        
        let sorted = this.state.gamesLoaded;
        sorted = sorted.filter(game => !game.wishlist).filter(game => game.system_type.toLowerCase().includes(query)).sort((a, b) => (a.system_type > b.system_type) ? 1 : -1)

        const amount = sorted.length;
        this.setState({
            sortOption: "custom (system)",
            gamesSorted: sorted,
            amountOfGamesSorted: amount
        });
    }

    updateCustomTagSearch = (query) => {
        if (query === "") {
            this.setState({
                sortOption: "system"
            }, () => {
                this.sortGames();
            })
        }
        
        let sorted = this.state.gamesLoaded;
        sorted = sorted.filter(game => !game.wishlist).filter(game => game.tags.includes(query.toLowerCase())).sort((a, b) => (a.system_type > b.system_type) ? 1 : -1)

        const amount = sorted.length;
        this.setState({
            sortOption: "custom (tag)",
            gamesSorted: sorted,
            amountOfGamesSorted: amount
        });
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
   
    handleScroll = () =>{
        var scrollLocation = window.pageYOffset;   
        var vanishingPoint = scrollLocation + window.innerHeight / 2;
        this.setState({vanish:vanishingPoint})
        }
    
    handleClick = i =>{
        let clickedArray = this.state.clicked.slice(0)
        
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
            this.setState({gameOpen:1})

            }, 300)
            setTimeout(() => {
            this.setState({gameOpen:0})
            this.setState({clicked:[]})
            this.setState({zIndex: 0})
            this.setState({page:1})
            }, 900)
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
      let zCounter = 0
    //   if (zCounter >= 13){
    //     zCounter = 0
    //   }
      let negativeC = 7

  
      return (
        <div>
        <FixedNavbar 
            sortOption={this.state.sortOption}
            updateSortOption={this.updateSortOption}
            loggedIn={this.props.loggedIn} 
            loadGames={this.loadGames} 
            logoutBoolean={this.props.logoutBoolean} 
            username={this.props.username}/>
        <MDBContainer fluid className= "shelf"> 
        
        <br/>
        <br/>
        <br/>
        <br/>
        
            {(this.state.gamesSorted) ? 
            
            <MDBRow>
                <div className =  'bk-list' style = {{WebkitPerspectiveOriginY:this.state.vanish, Width:533}}>
                    {this.state.gamesSorted.map((games,i) => 
                     <Game
                    sharing = {false}
                    username = {this.props.username}
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
                    
                    {/* <MDBSwitch checked={this.state.switch1} onChange={this.handleSwitchChange(1)} /> */}
                </div>
            </MDBRow>  : <div style={styles.middle} ><Spinner size='lg'color="primary" /></div>
            }   {/* <-- remove this bracket when loading from gameSeed */}
            </MDBContainer> 
            <Statistics
                updateCustomTitleSearch={this.updateCustomTitleSearch}
                updateCustomSystemSearch={this.updateCustomSystemSearch}
                updateCustomTagSearch={this.updateCustomTagSearch}
                allTags={this.state.allTags}
                sortOption={this.state.sortOption}
                updateSortOption={this.updateSortOption}
                amountOfGamesInCollection={this.state.amountOfGamesInCollection}
                amountOfGamesSorted={this.state.amountOfGamesSorted}/>
            </div>
        )
    } 
};

export default Games;