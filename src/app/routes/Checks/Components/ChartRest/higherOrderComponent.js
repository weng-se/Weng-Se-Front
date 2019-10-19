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

      let fromTime =  moment().endOf('isoWeek').add(1, 'days').format("YYYY-MM-DD");
      let toTime =    "3000-01-01";

      console.log("date", fromTime);

      fetch(`http://${Properties.host}:${Properties.port}/api/checks/getSumCheck?fromTime=${fromTime}&toTime=${toTime}`)
        .then(res => res.json())
        .then(data => this.setState({
          sum: `€${data}`
        }))

    }



    getCount = () => {

      let fromTime =  moment().endOf('isoWeek').add(1, 'days').format("YYYY-MM-DD");
      let toTime =    "3000-01-01";

      fetch(`http://${Properties.host}:${Properties.port}/api/checks/getCountCheck?fromTime=${fromTime}&toTime=${toTime}`)
        .then(res => res.json())
        .then(data => this.setState({
          count: data.count
        }));

    }


    render() {
      return <WrappedComponent {
        ...this.state
      }
      /> ;
    }

  }

  return HOC;

};

export default higherOrderComponent;