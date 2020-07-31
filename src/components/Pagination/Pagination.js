import React from "react";
import styles from "./Pagination.module.css";

const Pagination = props => {
	const pageFiller = () => {
		/*функция определяет, сколько сколько "соседей" будет у активной страницы с
	каждой стороны, ставить ли заглушки (...) и с какой стороны. Наверно, можно бы
	сделать ее короче, но хотела сделать читабельнее. */
		const before = [];
		const after = [];

		//добавляем соседей слева (предыдущие страницы)
		for (let i = 1; i < 3; i++) {
			if (props.current - i <= 1) {
				break;
			} else {
				//unshift нехорош для производительности, но у нас всегда только 2 элемента
				before.unshift(
					<div
						key={props.current - i}
						className={styles.page}
						onClick={() => props.changePage(props.current - i)}
					>
						{props.current - i}
					</div>
				);
			}
		}

		//добавляем соседей справа (следующие страницы)
		for (let i = 1; i < 3; i++) {
			if (props.current + i >= props.totalPages) {
				break;
			} else {
				after.push(
					<div
						key={props.current + i}
						className={styles.page}
						onClick={() => props.changePage(props.current + i)}
					>
						{props.current + i}
					</div>
				);
			}
		}

		//определяем, не является ли текущая страница первой/последней
		const currentPage =
			props.current !== 1 && props.current !== props.totalPages ? (
				<div
					className={styles.page + " " + styles.active}
					onClick={() => props.changePage(props.current)}
				>
					{props.current}
				</div>
			) : null;

		//собираем все вместе и по необходимости добавляем заглушки
		return (
			<React.Fragment>
				{props.current > 4 ? <div className={styles.break}>...</div> : null}
				{before}
				{currentPage}
				{after}
				{props.current < props.totalPages - 3 ? (
					<div className={styles.break}>...</div>
				) : null}
			</React.Fragment>
		);
	};

	//css классы для первой и последней страницы
	let firstPageClasses = styles.page + " " + styles.first;
	if (props.current === 1) {
		firstPageClasses += ` ${styles.active}`;
	}
	let lastPageClasses = styles.page + " " + styles.last;
	if (props.current === props.totalPages) {
		lastPageClasses += ` ${styles.active}`;
	}

	return (
		<div className={styles.Pagination}>
			<div className={firstPageClasses} onClick={() => props.changePage(1)}>
				1
			</div>
			{pageFiller()}
			<div
				className={lastPageClasses}
				onClick={() => props.changePage(props.totalPages)}
			>
				{props.totalPages}
			</div>
		</div>
	);
};

export default Pagination;
