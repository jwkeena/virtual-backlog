import React, { Component } from 'react';
import Scanner from '../Scanner';
import { Spinner } from 'reactstrap';
import axios from 'axios';

const styles = {
    middle: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }
  }
class DisplayScan extends Component {

    constructor(props) {
        super(props);
        this.state = {
          scanning: true,
        };
    }

    toggleScanning = () => {
        console.log("toggling")
        this.setState(prevState => ({
            scanning: !prevState.scanning
        })
        )
    }

    processBarcodeThenSearchGames = (barcode) => {
        this.toggleScanning();
        console.log(barcode)
        axios.get("https://cors-anywhere.herokuapp.com/https://api.upcitemdb.com/prod/trial/lookup?upc=" + barcode)
            .then(res => {
                console.log(res);
                if (res.items[0].title) {
                    this.props.updateBarcodeSearchResult(res.items[0].title)
                } else {
                    alert("No matching title for that barcode.")
                }
                }) 
            .catch(error=> {
                console.log(error);
                alert("Barcode search failed.")
            });
    }
    
    render() {
        return (
            <div>
                {this.state.scanning 
                    ? 
                        <Scanner onDetected={(result) => this.processBarcodeThenSearchGames(result.codeResult.code)} /> 
                    :   <div style={styles.middle} ><Spinner size='lg'color="primary" /></div>}
            </div>
        )
    }
};

export default DisplayScan;