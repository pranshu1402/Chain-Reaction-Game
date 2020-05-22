import { canvasId } from '../../constants/index';

const getCanvasBrush = () => {
	return document.getElementById(canvasId).getContext('2d');
};

const canvasBrush = getCanvasBrush();

/* const getClickLocation = () => {}; */

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

export const initBoard = (boardDimensions, blocks, currentColor) => {
	/* Clear canvas board first then draw out gridlines and next place the balls */
	canvasBrush.clearRect(
		0,
		0,
		boardDimensions.canvasWidth,
		boardDimensions.canvasHeight
	);

	drawGrid(boardDimensions, currentColor);
};
