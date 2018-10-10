import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
	root: {
		flexGrow: 1
	},
	bar: {
		background: deepOrange[500]
	},
	grow: {
		flexGrow: 1
	},
	button: {
		height: 45,
		padding: '0 30',
		color: 'white',
		borderRadius: 0,
		'&:hover': {
			color: 'white'
		}
	},
	menuButton: {
		marginLeft: -12,
		marginRight: 20
	}
};

const appBar = props => {
	const { location, history, classes } = props;

	function go(e, link) {
		history.push(`/${link.name === 'home' ? '' : link.name}`);
	}
	return (
		<div className={classes.root}>
			<AppBar className={classes.bar} position="static">
				<Toolbar variant="dense">
					<Button
						component={Link}
						to="/"
						className={classes.button}
						color="inherit">
						Users
					</Button>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default withStyles(styles)(appBar);
