import React from 'react';
import {
    connect
} from 'react-redux';
import CardBox from 'components/CardBox/index';
import { toast } from 'react-toastify';
import { createSupplierRequest } from '../../../../../actions/Suppliers';
import Template from './template';
// import IntlMessages from '../../../Customers/node_modules/util/IntlMessages';
// import ContainerHeader from '../../../Customers/node_modules/components/ContainerHeader/index';


class Add extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            supplier: {
                isRemoved: false,
                type: "test",
                civility: "test",
                firstName: "test",
                lastName: "ARTISLACH",
                dateBirth: "2007-04-04T00:00:00.000Z",
                pictureSrc: "test",
                email: "test@zni.com",
                newsletter: true,
                sendEmailing: true,
                sendSMS: true,
                department: "kh",
                timezone: "hjhj",
                addressLine1: "zv",
                addressLine2: "cd",
                addressLine3: "cd",
                addressLine4: "GENTHOF 6",
                addressLine5: "cd",
                postalCode: 9255,
                city: "BUGGENHOUT",
                countryCode: "BE",
                websiteURL: "cd",
                skype: "cd",
                phone: "cd",
                mobile: "cd",
                fax: "cd",
                title: "cd",
                status: "cd",
                bank: "cd",
                iban: "cd",
                bic: "cd",
                oldId: "1",
                family: "cd",
                tva: "N",
                accountingAccount: "cd",
                tvaCode: "4",
                tvaExport: "cd",
                siren: "cd",
                siret: "cd",
                isActive: true,
                language: true,
                paymentMethod: "cd",
                bankReglement: "cd",
                lastOrder: "2007-04-04T00:00:00.000Z",
                createdDate: "2007-04-04T00:00:00.000Z",
                lastModifiedDate: "2007-04-04T00:00:00.000Z",
                manager: "cd"
            }
        } 
    }

    handleChange = (e) => {
        this.setState({
            supplier:
            {
                ...this.state.supplier,
                [e.target.name]: e.target.value
            }
        })
    }
    
    handleSubmit = (e) => {
        //e.preventDefault();
        this.props.createSupplier(this.state.supplier);
    }

    componentWillReceiveProps(nextProps) {

        
        if(nextProps.supplier && nextProps.created) {
            if (!toast.isActive('success')) {
                toast.success('Successfully Created !', {
                    delay: 200,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'success'
                });
            }
            this.reset();
            setTimeout(() => { 
                this.props.history.push('/app/suppliers/listSuppliers');
            }, 2000);
        }

        if (nextProps.error) {
            if (!toast.isActive('error')) {
                toast.error('Fix: “something went wrong” while creating supplier !', {
                    delay: 1000,
                    autoClose: true,
                    closeButton: true,
                    toastId: 'error'
                });
            }
        }

    }

    reset = () => {
        this.setState({
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
            
        })
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
        createSupplier: (formData) => dispatch(createSupplierRequest(formData))
    }
}

const mapStateToProps = (state) => {
    const {
        error,
        supplier,
        created
    } = state.suppliers;
    return {
        error,
        supplier,
        created
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Add);