const CANVAS_WIDTH = 360;
const CANVAS_HEIGHT = 540;
const GRID_COLS = 6;
const GRID_ROWS = 9;

let boxSize;
let ctx = document.getElementById("canvas").getContext("2d");

if (CANVAS_WIDTH / GRID_COLS < CANVAS_HEIGHT / GRID_ROWS) {
	boxSize = Math.floor(CANVAS_WIDTH / GRID_COLS);
} else {
	boxSize = Math.floor(CANVAS_HEIGHT / GRID_ROWS);
}

let grid = initGrid(GRID_ROWS, GRID_COLS);
let travellingParticles = [];
console.log(grid);

function initGrid(rows, cols) {
	let box = new Array(rows);

	for (i = 0; i < rows; i++) {
		box[i] = new Array(cols);
		for (j = 0; j < cols; j++) {
			box[i][j] = { color: "none", capacity: 3, atoms: 0, particles: [] };
		}
	}
	for (i = 1; i < cols - 1; i++) {
		box[0][i].capacity = 2;
		box[rows - 1][i].capacity = 2;
	}
	for (i = 1; i < rows - 1; i++) {
		box[i][0].capacity = 2;
		box[i][cols - 1].capacity = 2;
	}
	box[0][0].capacity = 1;
	box[0][cols - 1].capacity = 1;
	box[rows - 1][0].capacity = 1;
	box[rows - 1][cols - 1].capacity = 1;

	return box;
}

const drawParticle = (ctx, player, radius, x, y) => {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
};

function drawGrid(ctx, rows, cols, boxSize, grid, player = { color: "green" }) {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

	for (let i = 0; i < rows; ++i) {
		for (let j = 0; j < cols; ++j) {
			drawBox(ctx, player, i, j, boxSize, grid[i][j]);
			// ctx.strokeStyle = player.color;
			// ctx.strokeRect(j * boxSize, i * boxSize, boxSize, boxSize);
		}
	}
}

const drawOneAtomMolecule = (ctx, color, boxWidth, row, col) => {
	console.log("Drawing single atom with color", color);
	ctx.strokeStyle = color;
	ctx.strokeText(
		"1",
		col * boxWidth + boxWidth / 2,
		row * boxWidth + boxWidth / 2
	);
};

const drawTwoAtomMolecule = (ctx, color, boxWidth, row, col) => {
	ctx.fillStyle = color;
	ctx.strokeText(
		"2",
		col * boxWidth + boxWidth / 2,
		row * boxWidth + boxWidth / 2
	);
};

const drawThreeAtomMolecule = (ctx, color, boxWidth, row, col) => {
	ctx.fillStyle = color;
	ctx.strokeText(
		"3",
		col * boxWidth + boxWidth / 2,
		row * boxWidth + boxWidth / 2
	);
};

function drawBox(ctx, player, row, col, boxWidth, boxDetails) {
	ctx.strokeStyle = player.color;
	ctx.strokeRect(col * boxWidth, row * boxWidth, boxWidth, boxWidth);

	if (boxDetails.atoms == 1) {
		drawOneAtomMolecule(ctx, boxDetails.color, boxWidth, row, col);
	} else if (boxDetails.atoms == 2) {
		drawTwoAtomMolecule(ctx, boxDetails.color, boxWidth, row, col);
	} else if (boxDetails.atoms == 3) {
		drawThreeAtomMolecule(ctx, boxDetails.color, boxWidth, row, col);
	}
}

window.setInterval(function () {
	// console.log("Drawing Grid");
	// console.log(grid[0][0]);
	drawGrid(ctx, 9, 6, boxSize, grid);
}, 1000 / 60);
// let ROWS = 9;
// let COLS = 6;

// let grid = [];

// for(let i =0;i<ROWS; ++i) {

//   grid[i] = new Array(COLS);

//   for(let j=0;j<COLS;++j){

//   }
// }

// function getInitGrid(rows,cols) {

//    let grid=new Array(ROWS);
//     for(i=0;i<=ROWS;i++)
//     {
//         grid[i]=new Array(COLS);
//     }
//     for(i=1;i<=ROWS;i++)
//     {
//         for(j=1;j<=COLS;j++)
//         {
//             grid[i][j]={"color":"none","capacity":3,"atoms":0,"particles":[]};
//         }
//     }
//     for(i=2;i<=COLS;i++)
//     {
//         grid[1][i].capacity=2;
//         grid[ROWS][i].capacity=2;
//     }
//     for(i=2;i<=ROWS;i++)
//     {
//         grid[i][1].capacity=2;
//         grid[i][COLS].capacity=2;
//     }
//     grid[1][1].capacity=1;
//     grid[1][COLS].capacity=1;
//     grid[ROWS][1].capacity=1;
//     grid[ROWS][COLS].capacity=1;
// }

// // function getPlayerColour(player) {
// //   if(player == 1){
// //     return 'green'
// //   }else {
// //     return 'red'
// //   }
// // }
// function drawParticle(x,y,radius,player) {
//   ctx.beginPath()
// ctx.arc(x, y, radius, 0, Math.PI * 2, true);

//  ctx.fillStyle = player.color
//   ctx.fill()
// }

// drawParticle(50,50,20,{color:'green'})

// function drawBox(player,x,y,width,boxDetails) {
//   ctx.strokeStyle=player.color;
//   ctx.strokeRect(x,y,width,width);

// }

// drawBox({color:"green"},100,0,100,)

//  ctx.fill();

let button = document.getElementById("submitButton");
let rowInput = document.getElementById("row");
let columnInput = document.getElementById("column");
let colorInput = document.getElementById("color");
button.onclick = (e) => {
	e.preventDefault();

	console.log(rowInput.value, columnInput.value, colorInput.value);
	let row = rowInput.value;
	let column = columnInput.value;
	let color = colorInput.value;
	let prevValue = grid[parseInt(row) - 1][parseInt(column) - 1];
	grid[parseInt(row) - 1][parseInt(column) - 1] = {
		color: color,
		capacity: prevValue.capacity,
		atoms: prevValue.atoms + 1,
		particles: [],
	};
};
