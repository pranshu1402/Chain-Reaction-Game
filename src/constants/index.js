export const directions = [
	{ row: 0, col: 1, modifier: '-right' },
	{ row: 0, col: -1, modifier: '-left' },
	{ row: 1, col: 0, modifier: '-bottom' },
	{ row: -1, col: 0, modifier: '-top' },
];

export const canvasId = 'gameBoard';

/* Cell width should be equal to below const times the radius of Atom */
export const scaleDownAtomBy = '5';

export const canvasDimensions = { width: 400, height: 400 };
