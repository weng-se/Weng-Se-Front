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

import compose from 'recompose/compose';
import Template from './template';
import {
    editSupplierRequest
} from '../../../../../actions/Suppliers';
import { FormattedMessage } from 'react-intl';

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
            supplier: {
                isRemoved: false,
                type: "",
                civility: "",
                firstName: "",
                lastName: "",
                dateBirth: "",
                pictureSrc: "",
                email: "",
                newsletter: true,
                sendEmailing: true,
                sendSMS: true,
                department: "",
                timezone: "",
                addressLine1: "",
                addressLine2: "",
                addressLine3: "",
                addressLine4: "",
                addressLine5: "",
                postalCode: null,
                city: "",
                countryCode: "",
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
                isActive: true,
                language: true,
                paymentMethod: "",
                bankReglement: "",
                lastOrder: "",
                createdDate: "",
                lastModifiedDate: "",
                manager: "",

            }
        }
    }



    handleChange = (e) => {
        this.setState({
            supplier: {
                ...this.state.supplier,
                [e.target.name]: e.target.value
            }
        })
    }


    componentWillReceiveProps(nextProps) {
        
        if (nextProps.supplier) {
            this.setState({
                supplier: {
                    ...this.state.supplier,
                    id: nextProps.supplier.id,
                    isRemoved: false,
                    type: nextProps.supplier.type,
                    civility: nextProps.supplier.civility,
                    firstName: nextProps.supplier.firstName,
                    lastName: nextProps.supplier.lastName,
                    dateBirth: "2007-04-04T00:00:00.000Z",
                    pictureSrc: nextProps.supplier.pictureSrc,
                    email: nextProps.supplier.email,
                    newsletter: true,
                    sendEmailing: true,
                    sendSMS: true,
                    department: nextProps.supplier.department,
                    timezone: nextProps.supplier.timezone,
                    addressLine1: nextProps.supplier.addressLine1,
                    addressLine2: nextProps.supplier.addressLine1,
                    addressLine3: nextProps.supplier.addressLine1,
                    addressLine4: nextProps.supplier.addressLine1,
                    addressLine5: nextProps.supplier.addressLine1,

                    city: nextProps.supplier.city,
                    countryCode: nextProps.supplier.countryCode,
                    websiteURL: nextProps.supplier.websiteURL,
                    skype: nextProps.supplier.skype,
                    phone: nextProps.supplier.phone,
                    mobile: nextProps.supplier.mobile,
                    fax: nextProps.supplier.fax,
                    title: nextProps.supplier.title,
                    status: nextProps.supplier.status,
                    bank: nextProps.supplier.bank,
                    iban: nextProps.supplier.iban,
                    bic: nextProps.supplier.bic,
                    oldId: nextProps.supplier.oldId,
                    family: nextProps.supplier.family,
                    tva: nextProps.supplier.tva,
                    accountingAccount: nextProps.supplier.accountingAccount,
                    tvaCode: nextProps.supplier.tvaCode,
                    tvaExport: nextProps.supplier.tvaExport,
                    siren: nextProps.supplier.siren,
                    siret: nextProps.supplier.siret,

                    paymentMethod: nextProps.supplier.paymentMethod,
                    bankReglement: nextProps.supplier.bankReglement,
                    lastOrder: "2007-04-04T00:00:00.000Z",
                    createdDate: "2007-04-04T00:00:00.000Z",
                    lastModifiedDate: "2007-04-04T00:00:00.000Z",
                    manager: nextProps.supplier.manager,

                }
            })
        }


        if (nextProps.error && nextProps.supplier === undefined) {
            if (!toast.isActive('editToastError')) {
                toast.error('Fix: “something went wrong” while updating supplier !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'editToastError'
                });
            }
        }

        if (nextProps.updated && nextProps.supplier !== undefined) {
            if (!toast.isActive('editToastSuccess')) {
                toast.success('Supplier has been successfully updated !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'editToastSuccess'
                });
            }
        }
    }


    editSupplier = () => {
        this.props.updateSupplier(this.state.supplier)
    }


    backtolist = () => {
        this.props.history.push('/app/suppliers/lists');
    }

    render() {
        return (Template(this));
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        updateSupplier: (formData) => dispatch(editSupplierRequest(formData)),
    }
}

const mapStateToProps = (state) => {
    const {
        supplier,
        progress,
        updated,
        error
    } = state.suppliers;
    return {
        supplier: supplier,
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