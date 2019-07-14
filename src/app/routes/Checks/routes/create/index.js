import React from 'react';
import { 
    createMuiTheme 
} from '@material-ui/core/styles';
import Template from './template';


class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
        }
    }

    componentDidMount() {
        fetch('http://localhost:4000/api/checks?filter[include]=remise')
            .then((response) => response.json())
            .then((data) => this.setState({ data }))
            .catch((error) => console.error(error));
    }

    render() {
        return (Template(this));
    }
}


Create.propTypes = {
    
};

export default Create;