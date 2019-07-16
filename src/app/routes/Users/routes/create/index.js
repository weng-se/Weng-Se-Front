import React from 'react';
import {
    connect
} from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { toast } from 'react-toastify';
import { createUserRequest } from '../../../../../actions/Users';
import Template from './template';
import './style.css';

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            repeatPassword: null,
            photoURL: null,
            phoneNumber: null,
            username: null,
            disabled: false,
            role: 'ROLE_GESTIONNAIRE',
            note: null
        }
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            const { password } = this.state;
            if (value !== password) {
                return false;
            }
            return true;
        });
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSwicth = (e) => {
        this.setState({
            disabled: !this.state.disabled
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            if (!toast.isActive('toastError')) {
                toast.error('Fix: “something went wrong” while creating account !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'toastError'
                });
            }
        } else if (nextProps.error === null && nextProps.data) {
            if (!toast.isActive('toastSuccess')) {
                toast.success('Your account has been successfully created !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'toastSuccess'
                });
            }
            setTimeout(() => { 
                this.reset();
                this.props.history.push('/app/users/lists');
            }, 2000);
            
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createUser(this.state);
    }


    reset() {
        this.setState({
            email: null,
            password: null,
            repeatPassword: null,
            phoneNumber: null,
            username: null,
            disabled: false,
            role: 'ROLE_GESTIONNAIRE',
            note: null
        });
    }


    render() {
        return (Template(this));
    }

}

Create.propTypes = {

};

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (formData) => dispatch(createUserRequest(formData))
    }
}

const mapStateToProps = (state) => {
    const {
        users,
        progress,
        error
    } = state.users;
    return {
        data: users,
        progress: progress,
        error: error
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);