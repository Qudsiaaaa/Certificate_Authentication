import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
//import homeLogo from '../../Assets/home-main.svg';
//import Particle from '../Particle';
import Scanner from './Scanner';

function ScanCertificate() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        {/* <Particle /> */}
      </Container>
      <Container className="home-content">
        <Row>
          <Col md={7} className="home-header">
            <h1 style={{ paddingBottom: 10 }} className="heading">
              Scan your Certificate
            </h1>
            <Scanner />
          </Col>
          <Col md={5} style={{ paddingBottom: 20 }}>
            {/* <img
              src={homeLogo}
              alt="home pic"
              className="img-fluid"
              style={{ maxHeight: '450px' }}
            /> */}
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ScanCertificate;
