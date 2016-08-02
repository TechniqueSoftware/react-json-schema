import React from 'react';
import { FormGroup,Radio } from 'react-bootstrap';

class CheckboxField extends React.Component {

  constructor(props) {
    super(props);
  }

  renderCheckboxes() {
    const checkboxes = [];
    this.props.checkboxes.forEach(function loop(checkbox, index) {
      checkboxes.push(
        <Radio key={index} {...checkbox}>{checkbox.label}</Radio>
      );
    });
    return checkboxes;
  }

  render() {
    const checkboxes = this.renderCheckboxes();
    return (
      <FormGroup className="checkboxes">
        {checkboxes}
      </FormGroup>
    );
  }
}

CheckboxField.propTypes = {
  checkboxes: React.PropTypes.arrayOf(
    React.PropTypes.shape({
      label: React.PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default CheckboxField;
