import React from 'react';
import { Grid, Segment } from 'semantic-ui-react';
import AuthForm from '@components/containers/authFormContainer';
const auth = () => {
	return (
		<Grid
			verticalAlign="middle"
			divided
			padded
			className="full-height bg-black">
			<Grid.Column>
				<AuthForm />
			</Grid.Column>
		</Grid>
	);
};

export default auth;
