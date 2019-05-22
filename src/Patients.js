import React, { Component } from 'react';

import {Button, Form, FormControl, Nav, Navbar, Table} from "react-bootstrap";
import axios from "axios";

require('./Patients.css');

let api = 'http://hapi.fhir.org/baseDstu3/Patient';

export default class Patients extends Component {

    constructor() {
        super();

        this.state = {
            patients: [],
            page: 0,
            searchValue: ''
        }
    }

    componentWillMount() {

        this.fetchData();
    }

    fetchData = () => {

        let query = '';

        if (this.state.searchValue.length > 0) {
            query = '?_id=' + this.state.searchValue +  '&_count=10&_pretty=true&_getpagesoffset=' + this.state.page;
        } else {
            query = '?_count=10&_pretty=true&_getpagesoffset=' + this.state.page;
        }

        axios({
            method: 'get',
            url: api + query
        })
        .then(response => {
            console.log('patients response');
            console.log(response);

            if (response && response.data && response.data && response.data.entry)
                this.setState({
                    patients: response.data.entry
                })
        })
        .catch(error => {
            console.log('error getting patients');
            console.log(error.response.data);
        })
    };

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
                        {
                            this.props && this.props.location && this.props.location.pathname === '/patients' ?
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={(e) => {this.setState({searchValue: e.target.value})}}/>
                                    <Button variant="outline-success" onClick={() => {this.setState({page: 0}, () => this.fetchData())}}>Search</Button>
                                </Form> : ''
                        }
                    </Navbar.Collapse>
                </Navbar>

                <div className={'paginationContainer'}>
                    <Button onClick={() => {this.setState({page: this.state.page === 0 ? 0 : this.state.page - 10}, () => this.fetchData())}} className={'paginationButton'}>
                        Previous
                    </Button>
                    <Button onClick={() => {this.setState({page: this.state.page + 10}, () => this.fetchData())}} className={'paginationButton'}>
                        Next
                    </Button>
                </div>

                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Date of birth</th>
                        <th>Sex</th>
                        <th>Deceased</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.state.patients.map(patient => {
                            return (
                                <tr key={patient.resource.id}>
                                    <td>{patient.resource.id}</td>
                                    <td>{patient.resource.birthDate}</td>
                                    <td>{patient.resource.gender}</td>
                                    <td>{patient.resource.deceasedBoolean ? 'Yes' : 'No'}</td>
                                </tr>
                            )
                        })
                    }

                    </tbody>
                </Table>
            </div>
        );
    }
}
