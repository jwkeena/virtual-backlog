import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBarcode } from '@fortawesome/free-solid-svg-icons';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Button } from "react-bootstrap";
import DisplayScan from '../DisplayScan';
import ManualSearch from '../ManualSearch';
import axios from 'axios';

const styles = {
    increaseMargins: {
        position: "relative",
        top: "8px",
        marginRight: "10px"
    },
    golden: {
        color: "rgb(250,205,0)"
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

    processBarcodeThenSearchGames = (barcode) => {
        console.log(barcode)
        axios.get("https://cors-anywhere.herokuapp.com/https://api.upcitemdb.com/prod/trial/lookup?upc=" + barcode)
            .then(res => {
                if (res.data.items[0].title) {
                    this.props.updateBarcodeSearchResult(res.data.items[0].title);
                    this.toggle();
                    this.props.updateTextSearch(res.data.items[0].title);
                    this.props.updateBarcodeSearchResult(null);
                } else {
                    alert("No matching title for that barcode.")
                }
                }) 
            .catch(error=> {
                console.log(error);
                alert("Barcode search failed.");
                this.toggle();
            });
    }

    render() {
        return (
            <div>               
                <FontAwesomeIcon 
                    title="Search by barcode"
                    icon={faBarcode} 
                    inverse size="lg" 
                    onClick={() => this.clickHandler("barcode")} 
                    style={
                        (this.props.searchOption === "barcode" || this.props.searchOption === "barcode-searching") 
                            ? Object.assign({}, styles.golden, styles.increaseMargins) 
                            : styles.increaseMargins
                        }/>

                <FontAwesomeIcon 
                    title="Search by game title"
                    icon={faKeyboard} 
                    inverse size="lg" 
                    style={
                        (this.props.searchOption === "text") 
                            ? Object.assign({}, styles.golden, styles.increaseMargins) 
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
                        ? <ManualSearch 
                            processBarcodeThenSearchGames={this.processBarcodeThenSearchGames}/> 
                        : <div style={styles.middle}>
                            <DisplayScan
                              processBarcodeThenSearchGames={this.processBarcodeThenSearchGames}/>
                          </div>
                    }
                   
                </ModalBody>
                <ModalFooter>
                    {(this.props.manualSearch) 
                        ? <Button 
                            variant="secondary" 
                            size="sm" 
                            onClick={this.props.updateManualSearch}
                            block>
                            back to scanner
                          </Button>
                        : <Button 
                            variant="primary" 
                            size="lg"
                            onClick={this.props.updateManualSearch}
                            block>
                            enter barcode manually
                          </Button>
                    }
                </ModalFooter>
                </Modal>
            </div>
        )
    }

}

export default BarcodeScanController;