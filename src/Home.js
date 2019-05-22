import React, { Component } from 'react';

import {Redirect} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";

export default class Home extends Component {

    render() {

        return (
            <div>

                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="#home">E-Health</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/patients">Patients</Nav.Link>
                            <Nav.Link href="/medication">Medication</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                Home page

            </div>
        );
    }
}
