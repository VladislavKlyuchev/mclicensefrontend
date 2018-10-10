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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { addToGroup } from '../../redux/graph/actions';
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
	checkbox: {
		marginTop: 13
	},
	dense: {
		marginTop: 16
	},
	menu: {
		width: 200
	}
});
export class addUserToGroup extends Component {
	static propTypes = {};
	constructor(props) {
		super(props);
		this.state = {
			group: '',
			user: '',
			admin: false,
			error: false,
			error2: false
		};
	}
	onChangeGroup = event => {
		this.setState({ group: event.target.value, error: false });
	};
	onChangeAdmin = event => {
		this.setState({ admin: !this.state.admin });
	};
	onChangeUser = event =>
		this.setState({ user: event.target.value, error2: false });
	submit = event => {
		if (!this.state.group.length && !this.state.user) {
			this.setState({ error: true, error2: true });
		} else if (!this.state.group.length) {
			this.setState({ error2: true });
		} else if (!this.state.user.length) {
			this.setState({ error: true });
		} else {
			const options = {
				group: this.state.group,
				name: this.state.user,
				admin: this.state.admin
			};

			this.props.addUserToGroup(options);
		}
	};
	render() {
		const { classes, users: allUsers, user, groups } = this.props;
		const { group, user: currentUser } = this.state;
		console.log('groups', groups);
		const filterGroups = groups.filter(group =>
			group.users.some(u => u.id == user.id && u.admin)
		);
		let currentGroup,
			users,
			filterUsers = false;
		if (group) {
			currentGroup = filterGroups.find(g => g.name == group);
			users = allUsers.filter(us => user !== us.id);
			console.log('currentGroup', currentGroup);
			console.log('users', users);
			filterUsers = users.filter(
				us => !currentGroup.users.some(user => user.id == us.id)
			);
			console.log('filter', filterUsers);
		}
		const usersMap = filterUsers || allUsers;
		return (
			<div>
				<form className={classes.container} noValidate autoComplete="off">
					<Grid container spacing={24}>
						<Grid item xs={4}>
							<FormControl variant="outlined" className={classes.formControl}>
								<InputLabel
									ref={ref => {
										this.labelRef = ReactDOM.findDOMNode(ref);
									}}
									htmlFor="outlined-age-simple">
									Groups
								</InputLabel>
								<Select
									value={group}
									onChange={this.onChangeGroup}
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
									{filterGroups.map(group => (
										<MenuItem key={group.name} value={group.name}>
											{group.name}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={4}>
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
									error={this.state.error2}
									disabled={!group}
									className={classes.formControl}
									input={
										<OutlinedInput
											labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
											name="age"
											fullWidth
											id="outlined-age-simple"
										/>
									}>
									{usersMap.map(group => (
										<MenuItem key={group.id} value={group.id}>
											{group.id}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={1}>
							<FormControlLabel
								className={classes.checkbox}
								control={
									<Checkbox
										checked={this.state.admin}
										onChange={this.onChangeAdmin}
										value="GA"
									/>
								}
								label="GA"
							/>
						</Grid>
						<Grid item xs={3}>
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

export default withStyles(styles)(addUserToGroup);
