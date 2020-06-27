import React from 'react';
import Molecule from '../molecule/Molecule';
import './Block.css';

const Block = props => {
	const { blockData, onBlockClick } = props;
	const styles = {
		borderColor: props.color
	};

	return (
		<button
			className={`block ${props.isGameActive ? '' : '-inactive'}`}
			id={blockData.blockId}
			style={styles}
			onClick={() => onBlockClick(blockData)}
		>
			<Molecule
				sphereCount={blockData.present}
				isBurstRequired={false}
				moleculeId={`atom${blockData.row}${blockData.col}`}
				color={blockData.color}
			/>
			{blockData.shouldSplit ? (
				<Molecule
					sphereCount={blockData.capacity + 1}
					isBurstRequired={blockData.shouldSplit}
					directions={blockData.directions}
					moleculeId={`atom${blockData.row}${blockData.col}`}
					color={props.color}
				/>
			) : (
				''
			)}
		</button>
	);
};

export default Block;
