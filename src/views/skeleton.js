import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@components/stateless/appBar';
import Main from '@components/stateless/main';
import Footer from '@components/stateless/footer';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const styles = {
	root: {
		flexGrow: 1
	},
	e: {
		background: grey[700],
		minHeight: '100vh'
	}
};
class skeleton extends Component {
	static propTypes = {};

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Grid className={classes.e}>
					<Grid item xs={12}>
						<AppBar {...this.props} />
					</Grid>
					<Grid item xs={12}>
						<Main />
					</Grid>
					<Grid item xs={12}>
						<Footer />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default withStyles(styles)(skeleton);
