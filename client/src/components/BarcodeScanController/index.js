import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from "reactstrap";
import DisplayScan from '../DisplayScan';
import ManualSearch from '../ManualSearch';

const styles = {
    increaseMargins: {
        position: "relative",
        top: "8px",
        marginRight: "10px"
    },
    blue: {
        color: "#007bff"
    },
    middle: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
    }
  }

class BarcodeScanController extends Component {

    constructor(props) {
        super(props);
        this.state = {
          barcodeScanModal: false,
          backdrop: true,
          manualSearch: false
        };
        this.toggle = this.toggle.bind(this);
      }

    clickHandler = (searchOption) => {
        if (searchOption === "barcode") {
            this.toggle();
        }
        this.props.updateSearchOption(searchOption);
    }

    toggle = () => {
        this.setState(prevState => ({
        barcodeScanModal: !prevState.barcodeScanModal
    })) 

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

                {/* Barcode Modal */}
                <Modal 
                    scrollable={true} 
                    size={"lg"} 
                    autoFocus={true} 
                    isOpen={this.state.barcodeScanModal} 
                    toggle={this.toggle} 
                    className={this.props.className} 
                    backdrop={this.state.backdrop}>
                <ModalHeader toggle={this.toggle}>
                    Searching by barcode...
                </ModalHeader>
                <ModalBody>
                
                    {(this.props.manualSearch) 
                        ? <ManualSearch/> 
                        : <div style={styles.middle}><DisplayScan/></div>
                    }
                   
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" size="lg" onClick={this.props.updateManualSearch}>{(this.props.manualSearch) ? "back to scanner" : "enter barcode manually"}</Button>
                </ModalFooter>
                </Modal>
            </div>
        )
    }

}

export default BarcodeScanController;