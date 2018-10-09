import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import red from '@material-ui/core/colors/red';
const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		marginLeft: 10,
		marginRight: 10
	},
	button: {
		marginTop: 16,
		height: 53
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		color: red[500]
	},
	dense: {
		marginTop: 16
	},
	menu: {
		width: 200
	}
});
export class createGroup extends Component {
	static propTypes = {};
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			error: false
		};
	}
	handleChange = event =>
		this.setState({ name: event.target.value, error: false });

	submit = event => {
		if (!this.state.name.length) {
			this.setState({ error: true });
		} else {
			this.props.createNewGroup(this.state.name);
		}
	};
	render() {
		const { classes } = this.props;

		return (
			<div>
				<form className={classes.container} noValidate autoComplete="off">
					<Grid container spacing={24}>
						<Grid item xs={10}>
							<TextField
								id="outlined-name"
								label="Group name"
								fullWidth
								className={classes.textField}
								value={this.state.name}
								InputLabelProps={{ shrink: true }}
								onChange={this.handleChange}
								margin="normal"
								variant="outlined"
							/>
						</Grid>
						<Grid item xs={2}>
							<Button
								fullWidth
								className={classes.button}
								onClick={this.submit}
								variant="outlined">
								Create
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		);
	}
}

export default withStyles(styles)(createGroup);
