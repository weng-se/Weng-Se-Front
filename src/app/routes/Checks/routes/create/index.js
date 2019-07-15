import React from 'react';
import Template from './template';


class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            customer: null,
            numberOfCheque: null,
            bank: null,
            comment: null,
            amount: null,
            remiseNumber: null,
            issuedDate: new Date('now'),
            cashingDateDesired: new Date('now'),
            selectedDate: null, 
            setSelectedDate: null,
            customers: []
        }
    }

    handleDateChange = (setSelectedDate) => {
        this.setState({ setSelectedDate })
    }

    componentDidMount() {
        fetch('http://localhost:4000/api/costumers')
            .then((response) => response.json())
            .then((customers) => this.setState({ customers }))
            .catch((error) => console.error(error));
            
    }

    render() {
        return (Template(this));
    }
}


Create.propTypes = {
    
};

export default Create;