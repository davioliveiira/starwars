import React, { Component } from 'react';
import Router from './routes';
import { Container, Row, Col } from 'reactstrap';
// components
import Sidebar from './components/Sidebar';

class App extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col md={2} lg={2} className="d-none d-md-block bg-light sidebar">
            <Sidebar />
          </Col>
          <Col md={10} lg={10} className="ml-sm-auto p-4">
            <Router />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;
