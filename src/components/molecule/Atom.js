import React from 'react';

const Atom = props => {
	// const atom = useRef(null);
	// const shootDirection = props.shootDirection;
	const classNames = props.shootDirection
		? `atom shoot -${props.shootDirection.direction}`
		: 'atom';

	// useEffect(() => {
	// 	shootDirection &&
	// 		atom.current.classList.add(`-${shootDirection.direction}`);
	// }, [shootDirection]);

	return (
		<span
			id={props.atomId}
			className={classNames}
			style={{ backgroundColor: props.color }}
		></span>
	);
};

export default Atom;
