import React from 'react';
import PropTypes from 'prop-types';
import { Button, Grid, Col, Row } from 'react-bootstrap';

class ContactForm extends React.Component {

  constructor(props) {
    super(props);
  }

  alertSubmit() {
    alert('Hey, you submitted the form!');
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col md={6} mdOffset={3} xs={12}>
            <h3>{this.props.title}</h3>
            <form>
              {this.props.children}
              <Button type="submit" bsStyle="success" onClick={this.alertSubmit}>Submit Contact Information!</Button>
            </form>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ContactForm.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element)
};

export default ContactForm;
