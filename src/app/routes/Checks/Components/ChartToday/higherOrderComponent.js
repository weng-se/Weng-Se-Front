import React, {
  Component
} from 'react';
import {
  Properties
} from '../../../../../constants/Properties';
import moment from 'moment';

const higherOrderComponent = (WrappedComponent) => {

  class HOC extends Component {

    constructor(props) {
      super(props);
      this.state = {
        sum: 0,
        count: 0
      }
    }

    componentDidMount() {
      this.getSum();
      this.getCount();
    }


    getSum = () => {

      let fromTime = moment(new Date()).format("YYYY-MM-DD")
      let toTime = moment(new Date()).format("YYYY-MM-DD")

      fetch(`http://${Properties.host}:${Properties.port}/api/checks/getSumCheck?fromTime=${fromTime}&toTime=${toTime}`)
        .then(res => res.json())
        .then(data => this.setState({
          sum: `€${data}`
        }));

    }


    getCount = () => {

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!
      var yyyy = today.getFullYear();

      if (dd < 10) dd = '0' + dd
      if (mm < 10) mm = '0' + mm
      today = yyyy + '-' + mm + '-' + dd;;

      fetch(`http://${Properties.host}:${Properties.port}/api/checks/count?[where][issuedDate]=${today}`)
        .then(res => res.json())
        .then(data => this.setState({
          count: data.count
        }));

    }

    render() {
      return <WrappedComponent {...this.state} /> ;
    }

  }

  return HOC;

};

export default higherOrderComponent;