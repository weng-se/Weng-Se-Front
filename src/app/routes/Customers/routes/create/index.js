import React from 'react';
import {
    connect
} from 'react-redux';
import IntlMessages from 'util/IntlMessages';
import {
    ValidatorForm
} from 'react-material-ui-form-validator';
import {
    toast
} from 'react-toastify';
import {
    createCustomerRequest
} from '../../../../../actions/Customers';
import Template from './template';
import './style.css';

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "isRemoved ": false,
            "type": "",
            "civility": "",
            "firstName": "Test",
            "lastName": "12/02/2018",
            "dateBirth": "2019-02-12T21:30:41.676Z",
            "pictureSrc": "",
            "email": "",
            "newsletter": true,
            "sendEmailing": true,
            "sendSMS": true,
            "department": "",
            "timezone": "",
            "address": "",
            "city": "",
            "country": "",
            "websiteURL": "",
            "skype": "",
            "phone": "",
            "mobile": "",
            "fax": "",
            "title": "",
            "status": "",
            "bank": "",
            "iban": "",
            "bic": "",
            "oldId": "",
            "family": "",
            "tva": "",
            "accountingAccount": "",
            "tvaCode": "",
            "tvaExport": "",
            "siren": "",
            "siret": "",
            "salesPerson": "",
            "isActive": true,
            "language": true,
            "paymentMethod": "",
            "bankReglement": "",
            "lastOrder": "2019-02-12T21:30:41.676Z"
        }
    }

    componentDidMount() {
      
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.error) {
            if (!toast.isActive('error')) {
                toast.error('Fix: “something went wrong” while creating customer !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'error'
                });
            }
        } else if (nextProps.error === null && nextProps.customers) {
            if (!toast.isActive('success')) {
                toast.success('Customer successfully created !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'success'
                });
            }
            setTimeout(() => {
                this.reset();
                this.props.history.push('/app/customers/lists');
            }, 3000);

        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createUser(this.state);
    }


    reset() {
        this.setState({
            "isRemoved ": false,
            "type": "string",
            "civility": "string",
            "firstName": "Test",
            "lastName": "12/02/2018",
            "dateBirth": "2019-02-12T21:30:41.676Z",
            "pictureSrc": "string",
            "email": "string",
            "newsletter": true,
            "sendEmailing": true,
            "sendSMS": true,
            "department": "string",
            "timezone": "string",
            "address": "string",
            "city": "string",
            "country": "string",
            "websiteURL": "string",
            "skype": "string",
            "phone": "string",
            "mobile": "string",
            "fax": "string",
            "title": "string",
            "status": "string",
            "bank": "string",
            "iban": "string",
            "bic": "string",
            "oldId": "string",
            "family": "string",
            "tva": "string",
            "accountingAccount": "string",
            "tvaCode": "string",
            "tvaExport": "string",
            "siren": "string",
            "siret": "string",
            "salesPerson": "string",
            "isActive": true,
            "language": true,
            "paymentMethod": "string",
            "bankReglement": "string",
            "lastOrder": ""
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
        createUser: (formData) => dispatch(createCustomerRequest(formData))
    }
}

const mapStateToProps = (state) => {
    const {
        customers,
        progress,
        error
    } = state.customers;
    return {
        customers: customers,
        progress: progress,
        error: error
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Create);