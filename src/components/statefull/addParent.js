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
		const { classes, users: allUsers, user } = this.props;
		const users = allUsers.filter(us => user.id !== us.id);
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
									value={this.state.group}
									onChange={this.onChangeGroup}
									error={this.state.errorGroup}
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
									value={this.state.group}
									onChange={this.onChangeGroup}
									error={this.state.errorGroup}
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
