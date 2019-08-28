import React, { Component } from 'react';
import { Field, Input, Message } from '@zendeskgarden/react-forms';

class ManualSearch extends Component {
    
    state = {
        manualBarcode: ""
    }

    inputChange = event => {
        // Getting the value and name of the input which triggered the change
        let value = event.target.value;
    
        // Updating the input's state
        this.setState({
        manualBarcode: value
        });
      };

    render() {

        return (
            <Field>
              <Input 
                manualBarcode={this.state.manualBarcode} 
                onChange={this.inputChange}/>
            </Field>
        )
    }
}

export default ManualSearch;