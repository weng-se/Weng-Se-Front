import React from 'react';
import {
    connect
} from 'react-redux';
import './style.css';
import {
    REQUEST_CREATE_USER
} from '../../../../../actions/Users';
import { Card, CardHeader, CardContent, Button } from '@material-ui/core';
import { Form, FormGroup, Label, Input } from 'reactstrap';

class AddUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            phoneNumber: '',
            displayName: '',
            disabled: false,
            note: ''
        }
    }

    componentDidMount() {

    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
    }
 
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createUser(this.state);
    }


    render() {
        return (
            <React.Fragment>
                <div className="app-wrapper">
                    <div className="row animated slideInUpTiny animation-duration-3">
                        <Card style={{ width: '60%' }}>
                            <CardHeader>
                            </CardHeader>
                            <CardContent>
                                <form style={{ width: '100%' }} onSubmit={this.handleSubmit}>
                                    <fieldset>
                                        <legend>Create new user :</legend>
                                        <div className="align-items-center justify-content-between">
                                        <Form>
                                            <FormGroup>
                                                <Label for="displayName">display Name</Label>
                                                <Input type="text" name="displayName" id="displayName" placeholder="Display Name" value={this.state.displayName} onChange={this.handleChange} required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input type="email" name="email" id="email" placeholder="Email address" value={this.state.email} onChange={this.handleChange}  required/>
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="phoneNumber">Phone Number</Label>
                                                <Input type="text" name="phoneNumber" id="phoneNumber" placeholder="Phone Number" value={this.state.phoneNumber} onChange={this.handleChange}  />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="password">Password</Label>
                                                <Input type="password" name="password" id="password" placeholder="Password" value={this.state.password} onChange={this.handleChange}  required />
                                            </FormGroup>
                                            <FormGroup>
                                                <Label for="note">Note</Label>
                                                <Input type="textarea" name="note" id="note" value={this.state.note} onChange={this.handleChange} />
                                            </FormGroup>
                                            <Button type="submit" variant="contained" color="primary"> Create </Button>
                                        </Form>
                                            
                                        </div>
                                    </fieldset>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </React.Fragment>
        );
    }

}

AddUser.propTypes = {

};

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (formData) => dispatch({
            type: REQUEST_CREATE_USER,
            formData: formData
        }),
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.users.users,
        progress: state.users.progress
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AddUser);