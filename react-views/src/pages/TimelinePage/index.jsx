import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '../../components/NavBar';
import Feed from '../../components/Feed';
import './style.css';

const TimelinePage = () => (
  <>
    <NavBar />
    <Row className="timeline-page-container">
      <Col lg={3} />
      <Col lg={6} className="timeline-page-feed">
        <Feed />
      </Col>
    </Row>
  </>
);

export default TimelinePage;
