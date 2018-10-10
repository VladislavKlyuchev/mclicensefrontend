import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const styles = theme => ({
	container: {
		display: 'flex',
		flexWrap: 'wrap',
		marginLeft: 10,
		marginRight: 10
	},
	button: {
		marginTop: 16,
		height: 56
	},

	formControl: {
		margin: theme.spacing.unit,
		minWidth: '100%'
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
	dense: {
		marginTop: 16
	},
	menu: {
		width: 200
	}
});
export class addParent extends Component {
	static propTypes = {};
	constructor(props) {
		super(props);
		this.state = {
			user: '',
			userTo: '',
			error: false,
			errorTwo: false
		};
	}
	onChangeUser = event =>
		this.setState({ user: event.target.value, error: false });
	onChangeUserTo = event =>
		this.setState({ userTo: event.target.value, errorTwo: false });
	submit = event => {
		if (!this.state.userTo.length && !this.state.user) {
			this.setState({ error: true, errorTwo: true });
		} else if (!this.state.userTo.length) {
			this.setState({ errorTwo: true });
		} else if (!this.state.user.length) {
			this.setState({ error: true });
		} else {
			const options = {
				fromUser: this.state.user,
				toUser: this.state.userTo
			};

			this.props.addParent(options);
		}
	};
	render() {
		const { classes, users: allUsers, user } = this.props;
		const { user: userOne, userTo } = this.state;
		const users = allUsers.filter(us => user.id !== us.id);
		console.log('userOne', userOne);
		const usersTo = allUsers.filter(
			us =>
				us.id !== userOne &&
				!us.targets.some(u => u == userOne) &&
				!us.children.some(u => u.id == userOne)
		);
		return (
			<div>
				<form className={classes.container} noValidate autoComplete="off">
					<Grid container spacing={24}>
						<Grid item xs={5}>
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel
									ref={ref => {
										this.labelRef = ReactDOM.findDOMNode(ref);
									}}
									htmlFor="outlined-age-simple">
									Users
								</InputLabel>
								<Select
									value={this.state.user}
									onChange={this.onChangeUser}
									error={this.state.error}
									className={classes.formControl}
									input={
										<OutlinedInput
											labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
											name="age"
											fullWidth
											id="outlined-age-simple"
										/>
									}>
									{users.map(group => (
										<MenuItem key={group.id} value={group.id}>
											{group.id}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={5}>
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel
									ref={ref => {
										this.labelRef = ReactDOM.findDOMNode(ref);
									}}
									htmlFor="outlined-age-simple">
									Users to
								</InputLabel>
								<Select
									value={this.state.userTo}
									onChange={this.onChangeUserTo}
									error={this.state.errorTwo}
									className={classes.formControl}
									input={
										<OutlinedInput
											labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
											name="age"
											fullWidth
											id="outlined-age-simple"
										/>
									}>
									{usersTo.map(group => (
										<MenuItem key={group.id} value={group.id}>
											{group.id}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={2}>
							<Button
								fullWidth
								className={classes.button}
								onClick={this.submit}
								variant="outlined">
								Add
							</Button>
						</Grid>
					</Grid>
				</form>
			</div>
		);
	}
}

export default withStyles(styles)(addParent);
