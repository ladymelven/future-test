import React from "react";
import styles from "./Table.module.css";
import Row from "./Row/Row";

const Table = React.memo(props => {
	const rows = props.data.map(item => {
		return (
			<Row
				key={item.id + item.phone.replace(/\D/g, "")}
				//Однако id в датасете не уникальны! Как так, как так
				id={item.id}
				first={item.firstName}
				last={item.lastName}
				email={item.email}
				phone={item.phone}
				select={props.select}
			/>
		);
	});

	return (
		<table className={styles.Table}>
			<thead className={styles.Thead}>
				<tr>
					<th className={styles.Cell} onClick={() => props.sort("id")}>
						Id <span>{props.sorted.id ? "▲" : "▼"}</span>
					</th>
					<th className={styles.Cell} onClick={() => props.sort("firstName")}>
						First Name <span>{props.sorted.firstName ? "▲" : "▼"}</span>
					</th>
					<th className={styles.Cell} onClick={() => props.sort("lastName")}>
						Last Name <span>{props.sorted.lastName ? "▲" : "▼"}</span>
					</th>
					<th className={styles.Cell} onClick={() => props.sort("email")}>
						Email <span>{props.sorted.email ? "▲" : "▼"}</span>
					</th>
					<th className={styles.Cell} onClick={() => props.sort("phone")}>
						Phone <span>{props.sorted.phone ? "▲" : "▼"}</span>
					</th>
				</tr>
			</thead>
			<tbody>{rows}</tbody>
		</table>
	);
});

export default Table;
