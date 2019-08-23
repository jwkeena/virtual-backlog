import React, { Component } from 'react';
import { Field, Checkbox, Label } from "@zendeskgarden/react-forms";
import { MDBCol } from 'mdbreact';

class CheckboxOptions extends Component {
    
    render() {
        return (
        <MDBCol md="4">
            {this.props.isChecked.map((option, index) => (
                <Field key={option.name}>
                    <Checkbox 
                        onChange={() => this.props.chooseDatabaseOptions(index, option.checked)}
                        name={option.name}
                        key={option.key}
                        checked={option.checked}>
                        <Label >{option.label}</Label>
                    </Checkbox>
                </Field>
            ))}
        </MDBCol>
        )
    }
}

export default CheckboxOptions;