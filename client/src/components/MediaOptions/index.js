import React, { Component } from 'react';
import { Field, Radio, Label } from '@zendeskgarden/react-forms';
import { MDBCol } from 'mdbreact';
  
const PollOption = ({ options, selected, onChange }) => {
  return (
    <div>
      {options.map((choice, index) => (
        <label key={index}>
          <MDBCol md="2">
              <Field>
                  <Radio 
                      value={choice.value}
                      key={index}
                      checked={selected === choice.value}
                      onChange={onChange}>
                      <Label>{choice.text}</Label>      
                  </Radio>
              </Field>
          </MDBCol>
        </label>
      ))}
    </div>
  );
};
  
class MediaOptions extends Component {
    constructor(props) {
      super(props);
      this.state = { selectedOption: '' }
    }

    handleOnChange(e) {
        this.setState({ selectedOption: e.target.value});
        this.props.chooseMediaType(e.target.value);
      }
    
      render() {
        return (
            <PollOption
              options={this.props.model.choices}
              onChange={(e) => this.handleOnChange(e)}
              selected={this.state.selectedOption} />
        );
      }
  }

export default MediaOptions;