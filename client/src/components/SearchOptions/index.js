import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';

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

class SearchOptions extends Component {

    clickHandler = (searchOption) => {
        this.props.updateSearchOption(searchOption);
    }

    render() {
        return (
            <div>               
                <FontAwesomeIcon 
                    icon={faBarcode} 
                    inverse size="lg" 
                    onClick={() => this.clickHandler("barcode")} 
                    style={
                        (this.props.searchOption === "barcode") 
                            ? Object.assign({}, styles.blue, styles.increaseMargins) 
                            : styles.increaseMargins
                        }/>

                <FontAwesomeIcon 
                icon={faKeyboard} 
                inverse size="lg" 
                style={
                    (this.props.searchOption === "text") 
                        ? Object.assign({}, styles.blue, styles.increaseMargins) 
                        : styles.increaseMargins} onClick={() => this.clickHandler("text")
                    } />
            </div>
        )
    }

}

export default SearchOptions;