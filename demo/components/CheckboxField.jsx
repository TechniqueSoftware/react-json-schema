import React from 'react';
import { Input } from 'react-bootstrap';

class CheckboxField extends React.Component {

  constructor(props) {
    super(props);
  }

  renderCheckboxes() {
    const checkboxes = [];
    this.props.checkboxes.forEach(function loop(checkbox, index) {
      checkboxes.push(
        <Input key={index} type="checkbox" label={checkbox.label} {...checkbox} />
      );
    });
    return checkboxes;
  }

  render() {
    const checkboxes = this.renderCheckboxes();
    return (
      <div className="checkboxes">
        {checkboxes}
      </div>
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
