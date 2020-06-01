import React from 'react';
import './Board.css';

const Board = props => {
	return (
		<canvas
			id={props.boardId}
			className='game-board'
			width={`${props.canvasDimensions.width}px`}
			height={`${props.canvasDimensions.height}px`}
			onClick={props.clickHandler}
		/>
	);
};

export default Board;
