import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';
import Atom from './Atom';

class ShootAtom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			when: true,
		};
	}

	componentDidMount() {
		this.setState({ when: false });
	}

	render() {
		const options = {
			left: false,
			right: false,
			bottom: false,
			top: false,
			when: this.state.when,
		};

		options[this.props.shootDirection] = true;
		console.log(options);
		return (
			<Slide {...options}>
				<Atom color={this.props.color} />
			</Slide>
		);
	}
}

export default ShootAtom;
