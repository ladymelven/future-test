import React from "react";
import styles from "./ChooseSet.module.css";

import Button from "../Button/Button";

const ChooseSet = props => {
	return (
		<div className={styles.ChooseSet}>
			<Button clicked={props.clickSmall}>Маленький объем</Button>
			<Button clicked={props.clickLarge}>Большой объем</Button>
		</div>
	);
};

export default ChooseSet;
