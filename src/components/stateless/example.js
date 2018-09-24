import React from 'react';

const example = props => {
	console.log(props);
	const { user } = props;
	return <div onClick={props.onClick}> {user.name}</div>;
};

export default example;
