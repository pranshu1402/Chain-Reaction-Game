import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';
import Atom from './Atom';

class ShootAtom extends Component {
	constructor(props) {
		super(props);
		this.state = {
			when: true,
			atomClass: ''
		};
	}

	componentDidMount() {
		this.setState({
			// when: false,
			atomClass: 'hidden'
		});
	}

	render() {
		const options = {
			left: false,
			right: false,
			bottom: false,
			top: false,
			when: this.state.when
		};

		options[this.props.shootDirection] = true;
		return (
			<Slide {...options}>
				<Atom
					additionalClass={this.state.atomClass}
					color={this.props.color}
					atomId={this.props.atomId}
				/>
			</Slide>
		);
	}
}

export default ShootAtom;
