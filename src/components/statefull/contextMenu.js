import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import CreateGroup from '@components/statefull/createGroup';
import CreateUser from '@components/statefull/createUser';
import AddParent from '@components/statefull/addParent';
import AddUserToGroup from '@components/statefull/addUserToGroup'
import getInfo from '@/functions/getInfo';
class SimpleDialog extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			createUser: false,
			createGroup: false,
			addParent: false,
			addToGroup: false
		};
	}
	openUserCreate = event => this.setState({ createUser: true });
	createNewUser = user => {
		const object = {
			user,
			parent: this.props.data.id
		};
		this.props.createNewUser(object);
		this.setState({ createUser: false });
	};
	openGroupCreate = event => this.setState({ createGroup: true });
	createNewGroup = event => {
		const group = {
			name: event
		};
		const user = {
			group: event,
			name: this.props.data.id,
			admin: true
		};
		this.props.createNewGroup(group);
		this.props.addUserToGroup(user);

		this.setState({ createGroup: false });
	};
	openAddParent = event => this.setState({ addParent: true });
	addNewParent  = event => {
		this.props.addNewParent(event)
		this.setState({addParent: false})
	}
	openAddUserToGroup = event => this.setState({ addToGroup:true})
	handleAddUserToGroup = event => {

	}
	close = event => {
		this.setState({
			createUser: false,
			createGroup: false,
			addParent: false,
			addToGroup: false
		});
		this.props.close();
	};
	render() {
		const { data, open, tree } = this.props;
		const { createUser, createGroup, addParent, addToGroup } = this.state;
		const users = getInfo(data, tree);
		console.log('users', users);
		let content;
		if (!createUser && !createGroup && !addParent && !addToGroup) {
			content = (
				<List component="nav">
					<ListItem button onClick={this.openGroupCreate}>
						<ListItemText primary="Create group" />
					</ListItem>
					<ListItem button onClick={this.openUserCreate}>
						<ListItemText primary="Create user" />
					</ListItem>
					<ListItem button onClick={this.openAddParent} >
						<ListItemText primary="Add parent" />
					</ListItem>
					<ListItem button onClick={this.openAddUserToGroup}>
						<ListItemText primary="Add user to group" />
					</ListItem>
				</List>
			);
		} else if (createGroup) {
			content = <CreateGroup createNewGroup={this.createNewGroup} />;
		} else if (createUser) {
			content = (
				<CreateUser
					createNewUser={this.createNewUser}
					groups={this.props.groups}
					user={this.props.data}
				/>
			);
		} else if (addParent) {
			content = <AddParent users={users} user={this.props.data} addParent={this.addNewParent} />;
		} else if(addToGroup) {
			content = <AddUserToGroup groups={this.props.groups} users={users} user={this.props.data} addUserToGroup={this.handleAddUserToGroup}></AddUserToGroup>
		}

		return (
			<Dialog open={open} aria-labelledby="simple-dialog-title" fullScreen>
				<DialogTitle id="simple-dialog-title">Actions: {data.id}</DialogTitle>
				<div>
					{content}
					<Divider />
					<DialogActions>
						<Button onClick={this.close}>Закрыть</Button>
					</DialogActions>
				</div>
			</Dialog>
		);
	}
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func,
	selectedValue: PropTypes.string
};

export default SimpleDialog;
