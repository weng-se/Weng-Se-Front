import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { NavLink } from 'react-router-dom';

const defaultToolbarStyles = {
  iconButton: {
  },
};

class Toolbar extends React.Component {
  
  handleClick = () => {
    console.log("clicked on icon!");
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Tooltip title={"Create"}>
          <NavLink to="create">
            <IconButton className={classes.iconButton} onClick={this.handleClick}>
              <AddIcon className={classes.deleteIcon} />
            </IconButton>
          </NavLink>
        </Tooltip>
      </React.Fragment>
    );
  }

}

export default withStyles(
  defaultToolbarStyles, 
  { name: "Toolbar" }
  )(Toolbar);