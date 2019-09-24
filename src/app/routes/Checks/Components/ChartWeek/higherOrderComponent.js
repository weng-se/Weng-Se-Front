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

      var fromTime = moment().startOf('isoWeek').format("YYYY-MM-DD");
      var toTime = moment().endOf('isoWeek').format("YYYY-MM-DD");

      fetch(`http://${Properties.host}:${Properties.port}/api/checks/getSumCheck?fromTime=${fromTime}&toTime=${toTime}`)
          .then(res => res.json())
          .then(data => this.setState({ sum: `€${data}` }));

    }



    getCount = () => {

      let fromTime = moment().startOf('isoWeek').format("YYYY-MM-DD");
      let toTime = moment().endOf('isoWeek').format("YYYY-MM-DD");

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