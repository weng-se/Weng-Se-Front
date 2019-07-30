import React from 'react';
import {
    toast
} from 'react-toastify';
import {
    connect
} from 'react-redux';
import {
    withStyles
} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import Template from './template';
import {
    editCustomerRequest
} from '../../../../../actions/Customers';

const styles = {
    checked: {},
    size: {
        width: 40,
        height: 40,
    },
    sizeIcon: {
        fontSize: 20,
    },
};


class Update extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: {
                id: "",
                type: "",
                civility: "MEN",
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
            selectedDate: null,
            setSelectedDate: null,
        }
    }

    handleDateChange = (setSelectedDate) => {
        this.setState({
            setSelectedDate
        })
    }

    handleChange = (e) => {
        this.setState({
            customer: {
                ...this.state.customer,
                [e.target.name]: e.target.value
            }
        })
    }

    editCheck = () => {
        this.props.updateCustomer(this.state.customer);
    }

    formatTime(dates) {
        var dt = new Date();
        return dt.toISOString(dates).split('T')[0];
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.customer) {
            this.setState({
                customer: {
                    ...this.state.customer,
                    type: nextProps.customer.type,
                    civility: nextProps.customer.civility,
                    firstName: nextProps.customer.firstName,
                    lastName: nextProps.customer.lastName,
                    dateBirth: nextProps.customer.dateBirth,
                    email: nextProps.customer.email,
                    department: nextProps.customer.department,
                    address: nextProps.customer.address,
                    city: nextProps.customer.city,
                    country: nextProps.customer.country,
                    websiteURL: nextProps.customer.websiteURL,
                    skype: nextProps.customer.skype,
                    phone: nextProps.customer.phone,
                    mobile: nextProps.customer.mobile,
                    fax: nextProps.customer.fax,
                    title: nextProps.customer.title,
                    status: nextProps.customer.status,
                    bank: nextProps.customer.bank,
                    iban: nextProps.customer.iban,
                    bic: nextProps.customer.bic,
                    family: nextProps.customer.family,
                    tvaCode: nextProps.customer.tvaCode,
                    tvaExport: nextProps.customer.tvaExport,
                    siren: nextProps.customer.siren,
                    siret: nextProps.customer.siret,
                    paymentMethod: nextProps.customer.paymentMethod
                }
            })
        }


        if (nextProps.error && nextProps.customer === undefined) {
            if (!toast.isActive('editToastError')) {
                toast.error('Fix: “something went wrong” while updating account !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'editToastError'
                });
            }
        }

        if (nextProps.updated && nextProps.customer !== undefined) {
            if (!toast.isActive('editToastSuccess')) {
                toast.success('User has been successfully updated !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'editToastSuccess'
                });
            }
        }

    }

    render() {
        return (Template(this));
    }
}


Update.propTypes = {
    customer : PropTypes.array.isRequired,
    updated : PropTypes.bool
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCustomer: (formData) => dispatch(editCustomerRequest(formData)),
    }
}

const mapStateToProps = (state) => {
    const {
        customer,
        progress,
        updated,
        error
    } = state.customers;
    return {
        customer: customer,
        progress: progress,
        updated: updated,
        error: error
    }
}

export default compose(
    withStyles(styles),
    connect(
        mapStateToProps,
        mapDispatchToProps
))(Update);