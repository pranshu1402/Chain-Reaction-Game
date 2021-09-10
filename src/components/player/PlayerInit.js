import PlayerInput from './input/PlayerInput';
import './PlayerInit.css';

const PlayerInit = props => (
	<section className='player-init-panel'>
		{props.playerData?.map((data, i) => (
			<PlayerInput
				key={`player${i}`}
				serial={i}
				handleDeletePlayer={props.handleDeletePlayer}
				{...data}
			/>
		))}
	</section>
);

export default PlayerInit;
