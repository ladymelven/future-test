import React, { useState } from "react";
import styles from "./Filter.module.css";

import Button from "../../Button/Button";

const Filter = props => {
	//здесь я использую Хук, потому что только одна переменная состояния
	const [value, setValue] = useState("");

	const onSubmit = event => {
		event.preventDefault();
		if (value) {
			props.submit(value);
		}
	};
	return (
		<form className={styles.Filter} onSubmit={event => onSubmit(event)}>
			<label htmlFor="filter">Поиск по ключевому слову</label>
			<input
				className={styles.filterInput}
				type="text"
				name="filter"
				id="filter"
				value={value}
				onChange={event => setValue(event.target.value)}
			/>
			<Button clicked={props.submit} type="submit">
				Найти
			</Button>
		</form>
	);
};

export default Filter;
