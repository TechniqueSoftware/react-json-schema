import React from 'react';
import { Input } from 'react-bootstrap';

const alphaRegex = /^$|[A-Z]+$/i;

class StringField extends React.Component {

  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  validateInput(event) {
    if (alphaRegex.test(event.target.value)) {
      this.setState({ value: event.target.value });
    }
  }

  render() {
    return (
      <Input type="text" onChange={this.validateInput.bind(this)} label={this.props.label} help={this.props.help} />
    );
  }
}

StringField.propTypes = {
  label: React.PropTypes.string.isRequired,
  help: React.PropTypes.string
};

export default StringField;
