import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import FormDialog from './../FormDialog';

const styles = {
  iconButton: {
  },
};

class Toolbar extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      checks: []
    }
  }

  openModalDialog = () => {
    this.setState({
      open: true
    })
  }

  componentDidMount() {
    this.findChecks();
  }

  closeModalDialog = () => {
    this.setState({
      open: false
    })
  }

  findChecks = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) dd = '0'+dd
    if(mm<10) mm = '0'+mm
    
    today = yyyy + '-' + mm + '-' + dd;
    
    fetch(`http://localhost:4000/api/checks?filter[where][issuedDate]=${today}`)
        .then(res => res.json())
        .then(checks => this.setState({ checks }))
        .catch((error) => console.error(error));

  } 

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>

        <Tooltip title={<FormattedMessage id="label.smartDiscount"/>}>
            <Button size="small" variant="contained" color="primary" style={{ backgroundColor: "#5aac44" }} onClick={this.openModalDialog} className={classes.button}>
              <FormattedMessage id="label.smartDiscount"/>
            </Button>
        </Tooltip>
        &nbsp;
        <Tooltip title={<FormattedMessage id="pages.createCheck"/>}>
          <NavLink to="create">
            <Button size="small" variant="contained" color="primary">
              <FormattedMessage id="pages.createCheck"/>
            </Button>
          </NavLink>  
        </Tooltip>        

        <FormDialog 
          open={this.state.open}
          close={this.closeModalDialog}
          checks={this.state.checks}
          count={this.state.checks.length}/>

      </React.Fragment>
    );
  }

}

export default withStyles(
  styles, 
  { name: "Toolbar" }
  )(Toolbar);