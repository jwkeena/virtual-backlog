import React, { Component } from 'react';
import { Field, Radio, Label } from '@zendeskgarden/react-forms';
import { MDBCol } from 'mdbreact';
  
class RadioButtons extends Component {

    render() {
      return (
      <MDBCol md="3">
        {this.props.mediaTypeChoices.map((choice, index) => (
          <Field key={choice.label}>
            <Radio
            onChange={() => this.props.chooseMediaType(index, choice.checked)}
            key={choice.key}
            checked={(choice.checked)}>
              <Label>{choice.label}</Label>
            </Radio>
          </Field>
        ))}
      </MDBCol>
      );
    }
  }

export default RadioButtons;