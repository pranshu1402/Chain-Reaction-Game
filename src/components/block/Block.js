/* import React, { Component } from 'react';
import Molecule from '../molecule/Molecule';
import { EXECUTE_MOVE } from '../../constants/ActionTypes';
import { connect } from 'react-redux';
import './Block.css';

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

		const sphereCount = blockData.shouldBurst
			? blockData.capacity + 1
			: blockData.present;

		return (
			<button
				className='block'
				style={styles}
				onClick={() => onBlockClick(blockId)}
			>
				<Molecule
					sphereCount={sphereCount}
					isBurstRequired={blockData.shouldBurst}
					color={blockData.color}
				/>
			</button>
		);
	}
}

const mapStateToProps = state => {
	return {
		blocks: state.game.blocks,
		color: state.game.color,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onBlockClick: blockId => dispatch({ type: EXECUTE_MOVE, blockId }),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Block); */

import React from 'react';
import Molecule from '../molecule/Molecule';
import './Block.css';

const Block = props => {
	const { blockData, onBlockClick } = props;
	const blockId = `${blockData.row}${blockData.col}`;
	const styles = {
		borderColor: props.color,
		width: `${100 / props.grid}%`,
		height: `${100 / props.grid}%`
	};

	return (
		<button
			className='block'
			style={styles}
			onClick={() => onBlockClick(blockId)}
		>
			<Molecule
				sphereCount={blockData.present}
				isBurstRequired={false}
				directions={blockData.directions}
				color={blockData.color}
			/>
			{blockData.shouldSplit ? (
				<Molecule
					sphereCount={blockData.capacity + 1}
					isBurstRequired={blockData.shouldSplit}
					directions={blockData.directions}
					moleculeId={`atom${blockData.row}${blockData.col}`}
					color={blockData.shouldSplit ? 'grey' : blockData.color}
				/>
			) : (
				''
			)}
		</button>
	);
};

export default Block;
