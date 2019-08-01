import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'unfetch';
import MUIDataTable from "mui-datatables";
import IntlMessages from 'IntlMessages';


const columns = [
    {
     name: "lastName",
     label: <IntlMessages id="label.name"/>,
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "city",
     label: <IntlMessages id="label.city"/>,
     options: {
      filter: true,
      sort: false,
     }
    },
    {
     name: "phone",
     label: <IntlMessages id="label.phone"/>,
     options: {
      filter: true,
      sort: false,
     }
    },
    {
    name: "email",
    label: <IntlMessages id="label.email"/>,
    options: {
    filter: true,
    sort: false,
    }
    },
    {
    name: "manager",
    label: <IntlMessages id="label.manager"/>,
    options: {
    filter: true,
    sort: false,
    }
    },
    {
        name: "department",
        label: <IntlMessages id="label.department"/>,
        options: {
         filter: true,
         sort: false,
        }
    },
   ];

   const options = {
        filterType: "dropdown",
        responsive: "scroll",
        selectableRows: false
   };


class EnhancedTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount(){
    this.updateData();
  }

  updateData = () => {
    fetch('http://localhost:4000/api/suppliers')
    .then( r => r.json() )
    .then( data => {
      this.setState({data: data});
    });
  }


  render() {    
    return (
        <MUIDataTable
          data={this.state.data.map(item => {
            return [
                item.lastName,
                item.city,
                item.phone,
                item.email,
                item.manager,
                item.department,
            ]
        })}
          columns={columns}
          options={options}
        />

    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (EnhancedTable);