import Molecule from '../molecule/Molecule';
import './Block.css';

const Block = ({ isGameActive, blockData, onBlockClick, color }) => (
	<button
		className={`block ${isGameActive ? '' : '-inactive'}`}
		id={blockData.blockId}
		style={{
			borderColor: color
		}}
		onClick={() => onBlockClick(blockData)}
	>
		{blockData.shouldSplit ? (
			<Molecule
				sphereCount={blockData.capacity + 1}
				isBurstRequired={blockData.shouldSplit}
				directions={blockData.directions}
				moleculeId={`atom${blockData.row}${blockData.col}`}
				color={color}
			/>
		) : (
			<Molecule
				sphereCount={blockData.present}
				isBurstRequired={false}
				moleculeId={`atom${blockData.row}${blockData.col}`}
				color={blockData.color}
			/>
		)}
	</button>
);

export default Block;
