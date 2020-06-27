import React from 'react';

const Atom = props => {
	let atomClasses = 'atom';

	if (props.shootDirection) {
		atomClasses = 'atom shoot';

		/* To trigger transition */
		setTimeout(() => {
			const atom = document.getElementById(props.atomId);
			atom && atom.classList.add(`-${props.shootDirection.direction}`);
		}, 1);
	}
	return (
		<span
			id={props.atomId}
			className={atomClasses}
			style={{ backgroundColor: props.color }}
		></span>
	);
};

export default Atom;
