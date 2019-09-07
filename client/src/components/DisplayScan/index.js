import React, { Component } from 'react';
import Scanner from '../Scanner';
import { Spinner } from 'reactstrap';

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

    submitSearch = (barcode) => {
        this.toggleScanning();
        this.props.processBarcodeThenSearchGames(barcode);
    }
    
    render() {
        return (
            <div>
                {this.state.scanning 
                    ? 
                        <Scanner onDetected={(result) => this.submitSearch(result.codeResult.code)} /> 
                    :   <div style={styles.middle} ><Spinner size='lg'color="secondary" /></div>}
            </div>
        )
    }
};

export default DisplayScan;