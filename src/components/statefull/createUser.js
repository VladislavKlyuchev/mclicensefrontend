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
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: '100%'
	},
	button: {
		marginTop: 8,
		height: 56
	},
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		marginTop: 8
	},
	selectEmpty: {
		marginTop: theme.spacing.unit * 2
	}
});

export class createUser extends Component {
	static propTypes = {};
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			group: '',
			errorName: false,
			errorGroup: false
		};
	}
	onChangeName = event =>
		this.setState({ name: event.target.value, errorName: false });
	onChangeGroup = event =>
		this.setState({ group: event.target.value, errorGroup: false });
	submit = event => {
		const { name, group } = this.state;
		if (name.length == 0 && group.length == 0) {
			this.setState({ errorName: true, errorGroup: true });
		} else if (name.length == 0) {
			this.setState({ errorName: true });
		} else if (group.length == 0) {
			this.setState({ errorGroup: true });
		} else {
			const user = { id: this.state.name, children: [], targets: [] };
			this.props.createNewUser(user);
			this.setState({ name: '', group: '' });
		}
	};
	render() {
		const { classes, groups: allGroups } = this.props;
		console.log(this.props);
		console.log(allGroups);
		const groups = allGroups.filter(group =>
			group.users.some(el => el.id == this.props.user.id && el.admin)
		);
		return (
			<Grid container spacing={24}>
				<Grid item xs={4}>
					<FormControl variant="outlined" className={classes.formControl}>
						<InputLabel
							ref={ref => {
								this.labelRef = ReactDOM.findDOMNode(ref);
							}}
							htmlFor="outlined-age-simple">
							Group
						</InputLabel>
						<Select
							value={this.state.group}
							onChange={this.onChangeGroup}
							error={this.state.errorGroup}
							input={
								<OutlinedInput
									labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0}
									name="age"
									fullWidth
									id="outlined-age-simple"
								/>
							}>
							{groups.map(group => (
								<MenuItem key={group.name} value={group.name}>
									{group.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={4}>
					<TextField
						id="outlined-name"
						label="Name"
						fullWidth
						className={classes.textField}
						value={this.state.name}
						error={this.state.errorName}
						InputLabelProps={{ shrink: true }}
						onChange={this.onChangeName}
						margin="normal"
						variant="outlined"
					/>
				</Grid>
				<Grid item xs={4}>
					<Button
						fullWidth
						className={classes.button}
						onClick={this.submit}
						variant="outlined">
						Create
					</Button>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(createUser);
