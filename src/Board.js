import React, { useState } from "react";
import Item from "./Item";
import sudoku from "./sudoku";

const Board = () => {
	let rows = [];
	let hooks = [];
	let setters = [];
	for (let i = 0; i < 9; i++) {
		let itemsInRow = [];
		hooks.push([]);
		setters.push([]);
		for (let j = 0; j < 9; j++) {
			const [value, setValue] = useState(0);
			hooks[i].push(value);
			setters[i].push(setValue);
			itemsInRow.push(
				<Item column={j} row={i} setter={setValue} value={value} />
			);
		}
		rows.push(<div className="row">{itemsInRow}</div>);
	}
	console.log(hooks);
	const solvePuzzle = () => {
		let solution = sudoku(hooks);
		console.log(solution);
		setters.forEach((val, i) => {
			val.forEach((setter, j) => {
				setter(solution[i][j]);
			});
		});
	};
	return (
		<div id="board">
			{rows}
			<button id="solve" onClick={solvePuzzle}>
				Solve
			</button>
		</div>
	);
};

export default Board;
