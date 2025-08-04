import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


import { Link } from 'react-router-dom';

const PageHeader = () => (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
            <Navbar.Brand as={Link} to="/">Order Management System</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <div className="ms-auto">
                    <Link to="/create" className="btn btn-outline-light">
                        + Create Order
                    </Link>
                </div>
            </Navbar.Collapse>
        </Container>
    </Navbar>
);

export default PageHeader;