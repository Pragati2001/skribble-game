import React from "react";
import { Rect } from "react-konva";
import "../styles/canvas_prac.css";

const Menu = ({ setLineColor, setLineWidth,
setLineOpacity }) => {
return (
	<div className="Menu">
	<label>Brush Clor </label>
	<Rect x={10} y={10} 
	/>

	{/* <input
		type="color"
		onChange={(e) => {
		setLineColor(e.target.value);
		}}
	/> */}
	<label>Brush Width </label>
	<input
		type="range"
		min="3"
		max="20"
		onChange={(e) => {
		setLineWidth(e.target.value);
		}}
	/>
	<label>Brush Opacity</label>
	<input
		type="range"
		min="1"
		max="100"
		onChange={(e) => {
		setLineOpacity(e.target.value / 100);
		}}
	/>
	</div>
);
};

export default Menu;
