import React, { Component } from "react";
import Board from "../board/Board";
import GameControls from "./GameControls";
import { executeMove } from "./GameActions";
import { useDispatch, useSelector } from "react-redux";
import "./Game.css";

const Game = ({ history }) => {
	const {
		grid,
		blocks,
		color: currentColor,
		turn,
		players,
		isGameActive,
		updating,
		winner,
		status,
	} = useSelector((store) => store.game);

	const dispatch = useDispatch();

	if (!blocks) {
		history.replace("/");
		/* Return Toast : Game Not Started */
		return <div>Game not started</div>;
	}

	return (
		<div className="game-container">
			{/* Game  Status */}
			<div className="game-status">
				<span style={{ color: currentColor }}>
					{isGameActive
						? status
						: (winner.name ? winner.name : winner.id + 1) + " Won"}
				</span>
				<GameControls />
			</div>
			{/* Game Controls: UNDO RESET */}
			<Board
				grid={grid}
				blocks={blocks}
				color={currentColor}
				isGameActive={isGameActive}
				onBlockClick={(blockClicked) => {
					const gameState = {
						blockClicked,
						turn,
						color: currentColor,
						grid,
						blocks,
						players,
						isGameActive,
					};
					/* If game is not in the middle of updates then execute moves */
					!updating && dispatch(executeMove(gameState));
				}}
			/>
			{/* Leaderboard */}
		</div>
	);
};

export default Game;
