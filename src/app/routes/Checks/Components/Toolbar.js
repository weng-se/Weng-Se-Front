import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from "react-intl";
import FormDialog from './FormDialog';

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
    this.findChecks();
    this.setState({
      open: true
    })
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

        <Tooltip title={<FormattedMessage id="pages.createCheck"/>}>
            <Button size="small" variant="contained" color="default" className={classes.button}>
              <NavLink to="create" style={{ color: '#666' }}>
                <FormattedMessage id="pages.createCheck"/>
              </NavLink>
            </Button>
        </Tooltip>
        &nbsp;
        <Tooltip title={<FormattedMessage id="label.smartDiscount"/>}>
            <Button size="small" variant="contained" color="primary" style={{ backgroundColor: "#5aac44" }} onClick={this.openModalDialog} className={classes.button}>
              <FormattedMessage id="label.smartDiscount"/>
            </Button>
        </Tooltip>

        <FormDialog 
          open={this.state.open}
          close={this.closeModalDialog}
          checks={this.state.checks}/>

      </React.Fragment>
    );
  }

}

export default withStyles(
  styles, 
  { name: "Toolbar" }
  )(Toolbar);