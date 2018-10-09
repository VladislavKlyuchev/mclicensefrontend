import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Graph from '@components/containers/GraphContainer';
import Dialog from '@components/containers/DialogContainer';

const styles = theme => ({
	root: {
		flexGrow: 1,
		minHeight: '90vh',
		width: '100%'
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
});

export class users extends Component {
	static propTypes = {};
	constructor(props) {
		super(props);
	}
	render() {
		const { classes } = this.props;
		let Elem = <Graph />;
		return (
			<Grid
				container
				direction="row"
				spacing={24}
				className={classes.root}
				justify="center"
				alignItems="center">
				<Grid item xs={5}>
					<Paper className={classes.paper}>
						<div id="test" />
						{Elem}
					</Paper>
				</Grid>
				<Grid item xs={5}>
					<Paper className={classes.paper}>xs=5</Paper>
				</Grid>
				<Dialog />
			</Grid>
		);
	}
}

export default withStyles(styles)(users);
