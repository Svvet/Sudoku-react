export default function sudoku(puzzle) {
	let sudoku = puzzle.map((val) => {
		return val.map((val) => {
			if (val == 0) val = [1, 2, 3, 4, 5, 6, 7, 8, 9];
			return val;
		});
	});

	const checkRow = (row, arr) => {
		row.forEach((val) => {
			if (!Array.isArray(val)) {
				arr.forEach((arrVal) => {
					if (arrVal == val) arr.splice(arr.indexOf(val), 1);
				});
			}
		});
	};

	const checkColumn = (idx, arr) => {
		for (let i = 0; i < 9; i++) {
			let val = sudoku[i][idx];
			if (!Array.isArray(val)) {
				arr.forEach((arrVal) => {
					if (arrVal == val) arr.splice(arr.indexOf(val), 1);
				});
			}
		}
	};

	const checkSquare = (idx1, idx2, arr) => {
		let pos1 = Math.floor(idx1 / 3) * 3;
		let pos2 = Math.floor(idx2 / 3) * 3;
		for (let i = pos1; i < pos1 + 3; i++)
			for (let j = pos2; j < pos2 + 3; j++) {
				let val = sudoku[i][j];
				if (!Array.isArray(sudoku[i][j])) {
					arr.forEach((arrVal) => {
						if (arrVal == val) arr.splice(arr.indexOf(val), 1);
					});
				}
			}
	};

	const eliminationRow = (rowNr) => {
		let row = sudoku[rowNr];
		let numbersToSearch = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		row.forEach((val) => {
			if (val != 0 && !Array.isArray(val)) {
				numbersToSearch = numbersToSearch.filter((val2) => val2 != val);
			}
		});

		numbersToSearch.forEach((val) => {
			let indexes = [];
			row.forEach((val2, index) => {
				if (Array.isArray(val2) && val2.includes(val)) {
					indexes.push(index);
				}
			});
			if (indexes.length == 1) row[indexes[0]] = val;
			if (
				(indexes.length == 2 || indexes.length == 3) &&
				checkIfInSquare(indexes)
			) {
				console.log("checked row: " + rowNr);

				clearSquareAfterInSquare(indexes, rowNr, "row", val);
			}
		});
	};
	const eliminationRowAll = () => {
		for (let i = 0; i < 9; i++) eliminationRow(i);
	};
	const eliminationColumn = (index) => {
		let numbersToSearch = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		for (let i = 0; i < 9; i++) {
			let val = sudoku[i][index];
			if (!Array.isArray(val) && val != 0)
				numbersToSearch = numbersToSearch.filter((val2) => val2 != val);
		}

		numbersToSearch.forEach((val) => {
			let indexes = [];
			for (let i = 0; i < 9; i++) {
				let val2 = sudoku[i][index];
				if (Array.isArray(val2) && val2.includes(val)) {
					indexes.push(i);
				}
			}
			if (indexes.length == 1) sudoku[indexes[0]][index] = val;
			if (
				(indexes.length == 2 || indexes.length == 3) &&
				checkIfInSquare(indexes)
			) {
				clearSquareAfterInSquare(indexes, index, "column", val);
			}
		});
	};

	const eliminationColumnAll = () => {
		for (let i = 0; i < 9; i++) eliminationColumn(i);
	};

	const eliminationSquare = (a, b) => {
		let pos1 = a * 3;
		let pos2 = b * 3;
		let numbersToSearch = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		for (let i = pos1; i < pos1 + 3; i++)
			for (let j = pos2; j < pos2 + 3; j++) {
				let val = sudoku[i][j];
				if (!Array.isArray(val) && val != 0)
					numbersToSearch = numbersToSearch.filter((val2) => val2 != val);
			}
		numbersToSearch.forEach((val) => {
			let indexes = [];
			for (let i = pos1; i < pos1 + 3; i++)
				for (let j = pos2; j < pos2 + 3; j++) {
					let val2 = sudoku[i][j];
					if (Array.isArray(val2) && val2.includes(val)) {
						indexes.push([i, j]);
					}
				}
			if (indexes.length == 1) sudoku[indexes[0][0]][indexes[0][1]] = val;
		});
		console.log(sudoku);
	};

	const eliminationSquareAll = () => {
		for (let i = 0; i < 3; i++)
			for (let j = 0; j < 3; j++) {
				eliminationSquare(i, j);
			}
	};

	const checkIfInSquare = (indexes) => {
		indexes = indexes.map((val) => Math.floor(val / 3));
		let equal = 1;
		indexes.forEach((val) => {
			if (val != indexes[0]) equal = 0;
		});
		return Boolean(equal);
	};

	const clearSquareAfterInSquare = (
		indexes,
		secondIndex,
		rowOrColumn,
		number
	) => {
		switch (rowOrColumn) {
			case "row": {
				let [pos1, pos2] = [
					Math.floor(secondIndex / 3) * 3,
					Math.floor(indexes[0] / 3) * 3,
				];
				console.log(
					"Number checked: " + number + " Positions: " + pos1 + " " + pos2
				);

				for (let i = pos1; i < pos1 + 3; i++)
					for (let j = pos2; j < pos2 + 3; j++) {
						let val = sudoku[i][j];
						if (
							Array.isArray(val) &&
							val.includes(number) &&
							i != secondIndex
						) {
							console.log("Ten if sprawdzony val przed: " + val);

							val = val.filter((val2) => val2 != number);
							sudoku[i][j] = val;
						}
					}
				break;
			}
			case "column":
				let [pos1, pos2] = [
					Math.floor(indexes[0] / 3) * 3,
					Math.floor(secondIndex / 3) * 3,
				];
				for (let i = pos1; i < pos1 + 3; i++)
					for (let j = pos2; j < pos2 + 3; j++) {
						let val = sudoku[i][j];
						if (
							Array.isArray(val) &&
							val.includes(number) &&
							j != secondIndex
						) {
							val = val.filter((val) => val != number);
							sudoku[i][j] = val;
						}
					}
				break;
		}
	};
	const cleanArrays = (fullSudoku) => {
		fullSudoku = fullSudoku.map((val) => {
			return val.map((val) => {
				if (Array.isArray(val) && val.length == 1) val = val[0];
				return val;
			});
		});
		return fullSudoku;
	};
	const checkArr = (arr) => {
		let f = false;
		arr.forEach((val) => {
			val.forEach((val) => {
				if (Array.isArray(val)) f = true;
			});
		});
		return f;
	};
	sudoku = [
		[0, 0, 0, 0, 0, 0, 2, 0, 0],
		[0, 8, 0, 0, 0, 7, 0, 9, 0],
		[6, 0, 2, 0, 0, 0, 5, 0, 0],
		[0, 7, 0, 0, 6, 0, 0, 0, 0],
		[0, 0, 0, 9, 0, 1, 0, 0, 0],
		[0, 0, 0, 0, 2, 0, 0, 4, 0],
		[0, 0, 5, 0, 0, 0, 6, 0, 3],
		[0, 9, 0, 4, 0, 0, 0, 7, 0],
		[0, 0, 6, 0, 0, 0, 0, 0, 0],
	];
	sudoku = sudoku.map((val) => {
		return val.map((val) => {
			if (val == 0) val = [1, 2, 3, 4, 5, 6, 7, 8, 9];
			return val;
		});
	});
	let count = 0;

	while (checkArr(sudoku) && count < 20) {
		sudoku = sudoku.map((val1, idx1) => {
			return val1.map((val2, idx2) => {
				if (Array.isArray(val2)) {
					checkRow(val1, val2);
					checkColumn(idx2, val2);
					checkSquare(idx1, idx2, val2);
				}
				return val2;
			});
		});
		sudoku = cleanArrays(sudoku);
		eliminationRowAll();
		eliminationColumnAll();
		eliminationSquareAll();
		count++;
	}

	return sudoku;
}
