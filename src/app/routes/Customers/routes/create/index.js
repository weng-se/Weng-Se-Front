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
            customer: {
                isRemoved: false,
                type: "",
                civility: "",
                firstName: "",
                lastName: "",
                dateBirth: "2019-02-12",
                pictureSrc: "",
                email: "",
                newsletter: true,
                sendEmailing: true,
                sendSMS: true,
                department: "",
                timezone: "",
                address: "",
                city: "",
                country: "",
                region: "",
                websiteURL: "",
                skype: "",
                phone: "",
                mobile: "",
                fax: "",
                title: "",
                status: "",
                bank: "",
                iban: "",
                bic: "",
                oldId: "",
                family: "",
                tva: "",
                accountingAccount: "",
                tvaCode: "",
                tvaExport: "",
                siren: "",
                siret: "",
                salesPerson: "",
                isActive: true,
                language: true,
                paymentMethod: "",
                bankReglement: "",
                lastOrder: "2019-02-12"
            },
            selectedDate: new Date('2014-08-18T21:11:54'),
            setSelectedDate: new Date('2014-08-18T21:11:54')
        }
    }

    componentDidMount() {

    }

    handleChange = (e) => {
        this.setState({ customer: 
            { 
                ...this.state.customer, 
                [e.target.name] : e.target.value 
            } 
        })
    }

    selectCountry(val) {
        this.setState({
            country: val
        });
    }

    selectRegion(val) {
        this.setState({
            region: val
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
        this.setState({ customer: 
            { 
                ...this.state.customer, 
                type: "",
                civility: "",
                firstName: "",
                lastName: "",
                dateBirth: "2019-02-12",
                pictureSrc: "",
                email: "",
                newsletter: true,
                sendEmailing: true,
                sendSMS: true,
                department: "",
                timezone: "",
                address: "",
                city: "",
                country: "",
                region: "",
                websiteURL: "",
                skype: "",
                phone: "",
                mobile: "",
                fax: "",
                title: "",
                status: "",
                bank: "",
                iban: "",
                bic: "",
                oldId: "",
                family: "",
                tva: "",
                accountingAccount: "",
                tvaCode: "",
                tvaExport: "",
                siren: "",
                siret: "",
                salesPerson: "",
                isActive: true,
                language: true,
                paymentMethod: "",
                bankReglement: "",
                lastOrder: new Date("now")
            } 
        })
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