import React from 'react';
import './Button.css';

const Button = props => {
	const styleWith = props.className ? props.className : 'button';
	return (
		<button className={styleWith} onClick={props.buttonClickHandler}>
			{props.buttonLabel}
		</button>
	);
};

export default Button;
