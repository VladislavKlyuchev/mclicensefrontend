import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'semantic-ui-react';

export default class authForm extends Component {
	static propTypes = {
		submit: PropTypes.func.isRequired,
		error: PropTypes.object
	};

	constructor(props) {
		super(props);
		this.state = {
			login: null,
			password: null
		};
	}
	onChangePassword = e => this.setState({ password: e.target.value });
	onChangeLogin = e => this.setState({ login: e.target.value });

	render() {
		const { login, password } = this.state;

		return (
			<Form inverted size="small">
				<Form.Field required>
					<label>Login</label>
					<input
						placeholder="John Doe"
						value={login}
						onChange={this.onChangeLogin}
					/>
				</Form.Field>
				<Form.Field required>
					<label>Password</label>
					<input
						placeholder="******"
						value={password}
						onChange={this.onChangePassword}
					/>
				</Form.Field>
				<Button floated="right" size="medium">
					Send
				</Button>
			</Form>
		);
	}
}
