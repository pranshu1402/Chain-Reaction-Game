import React, { useState } from 'react';

const Atom = props => {
	const initialClassNames = props.shootDirection
		? `atom shoot -${props.shootDirection.direction}`
		: 'atom';

	const [classnames, setClassNames] = useState(initialClassNames);
	return (
		<span
			id={props.atomId}
			className={classnames}
			style={{ backgroundColor: props.color }}
			onAnimationEnd={() => setClassNames(`${classnames} hidden`)}
		></span>
	);
};

export default Atom;
