import React from "react";
import styles from "./Row.module.css";

const Row = props => {
	return (
		<tr
			className={styles.Row}
			onClick={() => props.select(props.id, props.phone)}
		>
			<td className={styles.Cell}>{props.id}</td>
			<td className={styles.Cell}>{props.first}</td>
			<td className={styles.Cell}>{props.last}</td>
			<td className={styles.Cell}>{props.email}</td>
			<td className={styles.Cell}>{props.phone}</td>
		</tr>
	);
};

export default Row;
