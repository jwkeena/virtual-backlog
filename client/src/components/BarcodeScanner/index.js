import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { faParagraph } from '@fortawesome/free-solid-svg-icons';

const styles = {
    increaseMargins: {
        position: "relative",
        top: "8px",
        marginRight: "10px"
    },
    blue: {
        color: "#007bff"
    }
  }

class BarcodeScanner extends Component {

    state = {
        search: "text"
    }

    clickHandler = (searchOption) => {
        this.setState({
            search: searchOption
        });
    }

    render() {
        return (
            <div>               
                <FontAwesomeIcon icon={faBarcode} inverse size="lg" onClick={() => this.clickHandler("barcode")} style={(this.state.search === "barcode") ? Object.assign({}, styles.blue, styles.increaseMargins) : styles.increaseMargins}/>

                <FontAwesomeIcon icon={faParagraph} inverse size="lg" style={(this.state.search === "text") ? Object.assign({}, styles.blue, styles.increaseMargins) : styles.increaseMargins} onClick={() => this.clickHandler("text")} />
            </div>
        )
    }

}

export default BarcodeScanner;