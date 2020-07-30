import React from "react";
import styles from "./Pagination.module.css";

const Pagination = props => {
	const pageFiller = () => {
		const before = [];
		const after = [];

		for (let i = 1; i < 3; i++) {
			if (props.current - i <= 1) {
				break;
			} else {
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

		const currentPage =
			props.current !== 1 && props.current !== props.totalPages ? (
				<div
					className={styles.page + " " + styles.active}
					onClick={() => props.changePage(props.current)}
				>
					{props.current}
				</div>
			) : null;

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
