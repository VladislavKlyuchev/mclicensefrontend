import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Graph from '@components/statefull/d3Graph';

const styles = theme => ({
	root: {
		flexGrow: 1,
		minHeight: '90vh'
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
});

export class users extends Component {
	static propTypes = {};

	render() {
		const { classes } = this.props;
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
						<svg
							id="test"
							viewBox="0 0 900 600"
							width={(window.screen.width / 12) * 5}
							height="600"
						/>
						<Graph />
					</Paper>
				</Grid>
				<Grid item xs={5}>
					<Paper className={classes.paper}>xs=5</Paper>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(users);
