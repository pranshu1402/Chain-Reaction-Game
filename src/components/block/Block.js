import React, { Component } from 'react';
import Sphere from '../sphere/Sphere';
import { EXECUTE_MOVE } from '../../constants/ActionTypes';
import { connect } from 'react-redux';

class Block extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { blockData, onBlockClick } = this.props;
		const blockId = `${blockData.row}${blockData.col}`;
		const styles = {
			borderColor: this.props.color,
			width: `${100 / this.props.grid}%`,
			height: `${100 / this.props.grid}%`,
		};

		return (
			<button
				className='block'
				style={styles}
				onClick={() => onBlockClick(blockId)}
			>
				<Sphere sphereCount={blockData.present} />
			</button>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onBlockClick: blockId => dispatch({ type: EXECUTE_MOVE, blockId }),
	};
};

export default connect(null, mapDispatchToProps)(Block);
