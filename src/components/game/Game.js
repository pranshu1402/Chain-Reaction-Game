import Board from '../board/Board';
import GameControls from './GameControls';
import { executeMove, getLogin } from './GameActions';
import { useDispatch, useSelector } from 'react-redux';
import './Game.css';

const Game = ({ history }) => {
	const {
		user,
		grid,
		blocks,
		color: currentColor,
		turn,
		players,
		isGameActive,
		updating,
		winner,
		status
	} = useSelector(store => ({ ...store.game, ...store.auth }));

	const dispatch = useDispatch();

	if (!user) {
		dispatch(getLogin());
		history.replace('/auth');
		/* Toast: please login first */
		return null;
	} else if (!blocks) {
		history.replace('/');
		/* Toast : Game Not Started */
		return <div>Game not started</div>;
	}

	return (
		<div className='game-container'>
			{/* Game  Status */}
			<div className='game-status'>
				<span style={{ color: currentColor }}>
					{isGameActive
						? status
						: (winner.name ? winner.name : winner.id + 1) + ' Won'}
				</span>
				<GameControls />
			</div>
			<Board
				grid={grid}
				blocks={blocks}
				color={currentColor}
				isGameActive={isGameActive}
				onBlockClick={blockClicked => {
					const gameState = {
						blockClicked,
						turn,
						color: currentColor,
						grid,
						blocks,
						players,
						isGameActive
					};
					/* If game is not in the middle of updates then execute moves */
					!updating && dispatch(executeMove(gameState));
				}}
			/>
			{/* Leaderboard / Scoreboard */}
		</div>
	);
};

export default Game;
