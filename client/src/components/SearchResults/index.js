import React, { Component, Fragment } from 'react';

const styles = {
    boxArt: {
      width: "125px"
    },
    gameTitle: {
      width: "20%"
    },
    gameDescription: {
        width: "60%"
    },
    wideButton: {
      width: "100%"
    },
    clickable: {
        cursor: "pointer"
    }, 
    noResults: {
      display: "block", 
      marginLeft: "auto",
      marginRight: "auto",
      width: "75%"
    },
    container: {
      position: "relative",
      textAlign: "center",
      color: "red"
    },
    bottomText: {
      position: "absolute",
      bottom: "10px",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }

  }

class SearchResults extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            imageLoaded: false
        };
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
      }

    handleImageLoaded() {
        this.setState({
            imageStatus: true
        })
    }

    render() {
      
      if (this.props.searchResults.length === 0) {
        return(
          <div style={styles.container}>
            <img style={styles.noResults} src={"https://media2.giphy.com/media/puTfCZ53juoZW/giphy.gif?cid=790b761138267f22dc40c99c42c1651dac9a9460a8d666b3&rid=giphy.gif"} alt="Mario Kart 64 wipeout"/>
            <h1 style={styles.bottomText}>NO RESULTS!</h1>
          </div>
        )
      } else {
          return (
            <tbody>
                {this.props.searchResults.map((item, i) => {
                return (
                    <Fragment key={item.site_detail_url}>
                    <tr key={item.id} onClick={() => {this.props.chooseGame(i)}} style={styles.clickable}>
                        <th 
                        key={item.guid} 
                        scope="row">
                        {i + 1}
                        </th>
                        <td 
                        key={item.api_detail_url}>
                            <img 
                            key={item.image.date_added}
                            alt="Box art"
                            style={styles.boxArt} 
                            src={(this.state.imageStatus === true) ? item.image.medium_url : "https://media1.giphy.com/media/131tNuGktpXGhy/200w.webp?cid=790b76113ba5fe99518cc2e9ded42ef3b6c9cb0ea0ff8b6b&rid=200w.webp"}
                            onLoad={this.handleImageLoaded}/>
                        </td>
                        <td 
                        key={item.name}
                        style={styles.gameTitle}>
                        {item.name}
                        </td>
                        <td 
                        key={item.date_last_updated}
                        style={styles.gameDescription}>
                            {item.deck}
                        </td>
                    </tr>
                    </Fragment>
              )
            })}
          </tbody>
            )

      }
    }

}

export default SearchResults;