import React from 'react';
import logo from '../assets/images/VCBallers_Logo-flat.png';
import Header from "./HeaderComponent";
import {Col, Row} from 'reactstrap';

const Home = () => (
    <React.Fragment>
      <Header/>
      <div className="container">
        <Row>
          <Col md={12}>
            <h2>Home</h2>
          </Col>
          <Col md={12}>
            <p className="lead">Welcome to VC Ballers</p>
          </Col>
        </Row>
      </div>
    </React.Fragment>
);

export default Home;
