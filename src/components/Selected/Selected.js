import React from "react";
import styles from "./Selected.module.css";

const Selected = props => {
	return (
		<div className={styles.Selected}>
			Выбран пользователь{" "}
			<b>
				{props.item.firstName} {props.item.lastName}
			</b>
			<p>Описание:</p>
			<p>{props.item.description}</p>
			{/*Точно имелась в виду textarea? В ТЗ нигде не сказано про формы или 
				редактирование существующих строк*/}
			<p>
				Адрес проживания: <b>{props.item.address.streetAddress}</b>
			</p>
			<p>
				Город: <b>{props.item.address.city}</b>
			</p>
			<p>
				Провинция/штат: <b>{props.item.address.state}</b>
			</p>
			<p>
				Индекс: <b>{props.item.address.zip}</b>
			</p>
		</div>
	);
};

export default Selected;
