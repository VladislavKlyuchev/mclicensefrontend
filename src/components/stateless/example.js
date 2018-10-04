import React from 'react';

const example = props => {
	const { user } = props;
	return <div onClick={props.onClick}> {user.name}</div>;
};

export default example;
