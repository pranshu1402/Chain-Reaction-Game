import { canvasId, directions } from '../constants/index';

let canvas, canvasBrush;

export const getClickLocation = event => {
	let rect = canvas.getBoundingClientRect();
	let row = Math.floor((event.clientY - rect.top) / 50);
	let column = Math.floor((event.clientX - rect.left) / 50);
	return { row, column };
};

/* Draw Balls */
const drawBalls = (row, column, balls, cellWidth) => {
	/* find the center point of the block and create no of balls around that point */
	const blockCenterX = cellWidth * (row + 0.5);
	const blockCenterY = cellWidth * (column + 0.5);

	for (let ball = 0; ball < balls; ball++) {
		const xDist = blockCenterX + (balls - 1) * directions[ball].col;
		const yDist = blockCenterY + (balls - 1) * directions[ball].row;
		/* Create sphere with these coordinates as its center */
	}
};

/* Animation & Transitions */
const translateBalls = (row, column, balls, cellWidth, direction) => {
	/* find the center point of the block and create no of balls around that point */
	const blockCenterX = cellWidth * (row + 0.5);
	const blockCenterY = cellWidth * (column + 0.5);
	const currXPosition = blockCenterX + cellWidth * directions[direction].col;
	const currYPosition = blockCenterY + cellWidth * directions[direction].row;
	const finalXDist = blockCenterX + cellWidth * directions[direction].col;
	const finalYDist = blockCenterY + cellWidth * directions[direction].row;

	/* Translate ball image from initial Distance to the final positions */
};

/* Draw board base */
const drawLines = (rows, columns, gridDimension, cellDimension, color) => {
	canvasBrush.beginPath();
	for (let dist = 0; dist <= gridDimension; dist += cellDimension) {
		if (rows !== 0) {
			/* Horizontal Lines */
			canvasBrush.moveTo(0, dist);
			canvasBrush.lineTo(gridDimension, dist);
			canvasBrush.moveTo(0, dist + 4);
			canvasBrush.lineTo(gridDimension, dist + 4);
		} else if (columns !== 0) {
			/* Vertical Lines */
			canvasBrush.moveTo(dist, 0);
			canvasBrush.lineTo(dist, gridDimension);
			canvasBrush.moveTo(dist + 4, 0);
			canvasBrush.lineTo(dist + 4, gridDimension);
		}
	}

	canvasBrush.strokeStyle = color;
	canvasBrush.stroke();
	canvasBrush.closePath();
};

const drawGrid = (boardDimensions, currentColor) => {
	/* draw horizontal lines */
	drawLines(
		boardDimensions.rows,
		0,
		boardDimensions.canvasWidth,
		boardDimensions.cellWidth,
		currentColor
	);

	/* draw vertical lines */
	drawLines(
		0,
		boardDimensions.columns,
		boardDimensions.canvasHeight,
		boardDimensions.cellWidth,
		currentColor
	);
};

export const initBoard = (boardDimensions, currentColor) => {
	canvas = document.getElementById(canvasId);
	canvasBrush = canvas.getContext('2d');

	/* Clear canvas board first then draw out gridlines and next place the balls */
	canvasBrush.clearRect(
		0,
		0,
		boardDimensions.canvasWidth,
		boardDimensions.canvasHeight
	);

	console.log(boardDimensions, currentColor);
	drawGrid(boardDimensions, currentColor);
};
