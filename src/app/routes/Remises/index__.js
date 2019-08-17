import React from 'react';
import CardBox from 'components/CardBox/index';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Moment from 'react-moment';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import DoneIcon from '@material-ui/icons/Done';
// import IntlMessages from '../Customers/node_modules/util/IntlMessages';
// import ContainerHeader from '../Customers/node_modules/components/ContainerHeader/index';



const styles = theme => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '16%',
      flexShrink: 0,
    },
    title: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '16%',
        flexShrink: 0,
        fontWeight: 'bold'
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '14.28%',
        flexShrink: 0,
      color: theme.palette.text.secondary,
    },
  });


class Remises extends React.Component {

    state = {
        expanded: null,
        data: []
      };

      componentDidMount(){
        this.fetchData();
      }
    
      handleChange = panel => (event, expanded) => {
        this.setState({
          expanded: expanded ? panel : false,
        });
      };
    
      fetchData = () => {
        fetch('http://localhost:4000/api/remises?filter[include]=checks')
        .then( r => r.json() )
        .then( data => {
          this.setState({data});
        });
      }

      getStatusChip = (status) => {
          let color
        switch (status) {
            case 'En attente':
              color = "secondary"
              break;
            case 'Partiel':
              color = "default"
              break;
            case 'Validee':
              color = "primary"
              break;
          }
          return <Chip
          icon={<FaceIcon />}
          label={status}
          clickable
          color={color}
        />
      }
    render() {
        const { classes } = this.props;
        const { expanded } = this.state;
        const { data } = this.state;
        return (
            <div className="app-wrapper">
                {/* <ContainerHeader match={this.props.match} title={<IntlMessages id="pages.listRemises"/>}/> */}
                <div className="row animated slideInUpTiny animation-duration-3">
                    <CardBox styleName="col-12" cardStyle=" p-0" headerOutside>
                         <div className={classes.root}>
                         <ExpansionPanelSummary>
                           <Typography className={classes.title}>Numero</Typography>
                           <Typography className={classes.title}>Banque</Typography>
                           <Typography className={classes.title}>Montant</Typography>
                           <Typography className={classes.title}>Nombre de cheques</Typography>
                           <Typography className={classes.title}>Status</Typography>
                           <Typography className={classes.title}>Date de remise</Typography>
                         </ExpansionPanelSummary>
                         {data.map((remise, index) => 
                         <ExpansionPanel expanded={expanded === index} onChange={this.handleChange(index)}>
                         <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                           <Typography className={classes.heading}>{remise.number}</Typography>
                           <Typography className={classes.heading}>{remise.bank}</Typography>
                           <Typography className={classes.heading}>{remise.amount}</Typography>
                           <Typography className={classes.heading}>{remise.numberCheck}</Typography>
                           <Typography className={classes.heading}>
                                {this.getStatusChip(remise.status)}
                            </Typography>
                           <Typography className={classes.heading}><Moment format="DD/MM/YYYY">{remise.issuedDate}</Moment></Typography>
                         </ExpansionPanelSummary>
                         
                         {remise.checks.map(check => 
                            <ExpansionPanelDetails>
                            <Typography className={classes.secondaryHeading}>
                                {check.number}
                            </Typography>
                            <Typography className={classes.secondaryHeading}>
                                {check.bank}
                            </Typography>
                            <Typography className={classes.secondaryHeading}>
                                {check.amount}
                            </Typography>
                            <Typography className={classes.secondaryHeading}>
                                {check.status}
                            </Typography>
                            <Typography className={classes.secondaryHeading}>
                                <Moment format="DD/MM/YYYY">{check.issuedDate}</Moment>
                            </Typography>
                            <Typography className={classes.secondaryHeading}>
                                <Moment format="DD/MM/YYYY">{check.cashingDateDesired}</Moment>
                            </Typography>
                            <Typography className={classes.secondaryHeading}>
                                {check.comment}
                            </Typography>
                            </ExpansionPanelDetails>
                        )}
                       </ExpansionPanel>
                            )}
      </div>
                    </CardBox>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Remises);