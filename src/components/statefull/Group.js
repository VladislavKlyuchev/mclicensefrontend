import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

function UserFilter(user, current, classes) {
	if (user.admin && user.id !== current.id) {
		return (
			<Grid xs={3}>
				<Paper className={classes.child}>
					<Typography>{user.id}</Typography>
					<Typography>
						{' '}
						GA:{' '}
						{user.admin ? (
							<span className={classes.ga}>Yes</span>
						) : (
							<span className={classes.no}>No</span>
						)}
					</Typography>
				</Paper>
			</Grid>
		);
	}
	return;
}
function UserFilter2(user, current, classes) {
	if (user.id !== current.id) {
		return (
			<Grid xs={3}>
				<Paper className={classes.child}>
					<Typography>{user.id}</Typography>
					<Typography>
						{' '}
						GA:{' '}
						{user.admin ? (
							<span className={classes.ga}>Yes</span>
						) : (
							<span className={classes.no}>No</span>
						)}
					</Typography>
				</Paper>
			</Grid>
		);
	}
}
const styles = theme => ({
	root: {
		width: '100%'
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		textAlign: 'left',
		flexBasis: '33.33%',
		flexShrink: 0
	},
	maxHeight: {
		height: 20
	},
	ga: {
		color: '#76FF03'
	},
	no: {
		color: '#FF3D00'
	},
	child: {
		margin: 10
	},
	desc: {
		padding: 0
	},
	thirtyHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
		flexShrink: 0,
		textAlign: 'right',
		flexBasis: '33.33%'
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary
	}
});

class ControlledExpansionPanels extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false
		};
	}
	open = object => event => {};
	render() {
		const { classes, groups, current } = this.props;
		const filterGroups = groups.filter(group => {
			return group.users.some(user => {
				return current.id == user.id;
			});
		});

		return (
			<div className={classes.root}>
				{filterGroups.map(el => (
					<ExpansionPanel key={el.name} expanded={true}>
						<ExpansionPanelSummary className={classes.maxHeight}>
							<Typography className={classes.heading}>
								GroupName: <span className={classes.ga}>{el.name} </span>
							</Typography>
							<Typography className={classes.secondaryHeading}>
								GroupAdmin:{' '}
								{el.users.some(u => u.id == current.id && u.admin) ? (
									<span className={classes.ga}>Yes</span>
								) : (
									<span className={classes.no}>No</span>
								)}
							</Typography>
							<Typography className={classes.thirtyHeading}>
								{' '}
								UserName: <span className={classes.ga}>{current.id}</span>
							</Typography>
						</ExpansionPanelSummary>
						<ExpansionPanelDetails className={classes.desc}>
							<Grid container spacing={8}>
								{el.users.some(u => u.id == current.id && u.admin)
									? el.users.map(user => UserFilter2(user, current, classes))
									: el.users.map(user => UserFilter(user, current, classes))}
							</Grid>
						</ExpansionPanelDetails>
					</ExpansionPanel>
				))}
			</div>
		);
	}
}

export default withStyles(styles)(ControlledExpansionPanels);
/**
 *
 *
 *
 *
 *
 */
