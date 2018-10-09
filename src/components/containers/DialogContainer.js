import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { closeDialog } from '@redux/api/actions';
import {
	createNewGroup,
	addUserToGroup,
	createNewUser
} from '@redux/graph/actions';
import { getUsers } from '@redux/graph/selectors';
import Dialog from '@components/statefull/contextMenu';

export class DialogContainer extends Component {
	static propTypes = {};

	render() {
		return <Dialog {...this.props} />;
	}
}

const mapStateToProps = state => ({
	data: state.graph.current,
	open: state.api.context,
	groups: state.graph.groups,
	tree: state.graph.defaultTree
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	close: event => dispatch(closeDialog(event)),
	createNewGroup: event => dispatch(createNewGroup(event)),
	addUserToGroup: event => dispatch(addUserToGroup(event)),
	createNewUser: event => dispatch(createNewUser(event))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DialogContainer);
