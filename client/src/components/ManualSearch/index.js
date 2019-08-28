import React, { Component } from 'react';
import { Field, Input } from '@zendeskgarden/react-forms';

const styles = {
    hide: {
        display: "none"
    }
}
class ManualSearch extends Component {
    
    state = {
        manualBarcode: ""
    }

    inputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
        // Number validation
        if (isNaN(value) === true) {
            console.log("not a number")
        } else if ( value.length > 13) {
            console.log("barcode too long")
        } 
        else {
            // Updating the input's state
            this.setState({
            manualBarcode: value
            });
        }
      };

      onFormSubmit = e => {
          e.preventDefault();
          if (this.state.manualBarcode.length < 10) {
              alert ("Barcode must be at least 10 numbers.")
          } else {
              console.log("submitted", this.state.manualBarcode)
          }
      }

    render() {

        return (
            
            <form onSubmit={this.onFormSubmit}>
                <Field>
                <Input 
                    value={this.state.manualBarcode}
                    onChange={this.inputChange}
                    />
                <button style={styles.hide} type="submit">search</button>
                </Field>
            </form>
        )
    }
}

export default ManualSearch;