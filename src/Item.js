import React, { useState } from "react";

const Item = ({ row, column, setter, value }) => {
	const handleChange = (e) => {
		if (
			Number.isInteger(parseInt(e.target.value)) &&
			e.target.value > 0 &&
			e.target.value < 10
		) {
			setter(parseInt(e.target.value));
		}
		if (e.target.value == "") {
			setter(0);
		}
	};
	return (
		<div className="item">
			<input value={value ? value : ""} onChange={handleChange}></input>
		</div>
	);
};

export default Item;
