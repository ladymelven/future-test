import React from "react";
import styles from "./Button.module.css";

const Button = props => {
	let classes = styles.Button + " " + styles[props.type];
	return (
		<button
			onClick={props.clicked}
			className={classes}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};

export default Button;
