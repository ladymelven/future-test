import React from "react";
import styles from "./Add.module.css";

import Button from "../../Button/Button";

class Add extends React.Component {
	state = {
		active: false,
		id: "",
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		valid: false
	};

	toggleActiveHandler = () => {
		const isActive = !this.state.active;
		this.setState({ active: isActive });
	};

	onChangeHandler = event => {
		const newValue = event.target.value;
		this.setState({ [event.target.name]: newValue }, () => {
			this.checkValidity();
		});
	};

	checkValidity = () => {
		if (
			this.state.id &&
			this.state.firstName &&
			this.state.lastName &&
			this.state.email &&
			this.state.phone
		) {
			this.setState({ valid: true });
		} else {
			this.setState({ valid: false });
		}
	};

	onSubmitHandler = event => {
		event.preventDefault();
		if (!this.state.valid) {
			return;
		}
		const newRow = {
			id: this.state.id,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			phone: this.state.phone,
			address: {}
			/*Добавляем пустой адрес, потому что мы вызываем его в другом месте - иначе
			приложение сломается*/
		};
		this.props.submit(newRow);
		this.toggleActiveHandler();
	};

	render() {
		return this.state.active ? (
			<form
				onSubmit={event => this.onSubmitHandler(event)}
				className={styles.Add}
			>
				<div className={styles.labels}>
					<label htmlFor="id" className={styles.label}>
						ID
					</label>
					<label htmlFor="firstName" className={styles.label}>
						First Name
					</label>
					<label htmlFor="lastName" className={styles.label}>
						Last Name
					</label>
					<label htmlFor="email" className={styles.label}>
						Email
					</label>
					<label htmlFor="phone" className={styles.label}>
						Phone
					</label>
				</div>
				<div className={styles.inputs}>
					<input
						type="text"
						value={this.state.id}
						onChange={event => {
							this.onChangeHandler(event);
						}}
						name="id"
						id="id"
						className={styles.input}
					/>
					<input
						type="text"
						value={this.state.firstName}
						onChange={event => {
							this.onChangeHandler(event);
						}}
						name="firstName"
						className={styles.input}
					/>
					<input
						type="text"
						value={this.state.lastName}
						onChange={event => {
							this.onChangeHandler(event);
						}}
						name="lastName"
						className={styles.input}
					/>
					<input
						type="text"
						value={this.state.email}
						onChange={event => {
							this.onChangeHandler(event);
						}}
						name="email"
						className={styles.input}
					/>
					<input
						type="text"
						value={this.state.phone}
						onChange={event => {
							this.onChangeHandler(event);
						}}
						name="phone"
						placeholder="(xxx)xxx-xxxx"
						className={styles.input}
					/>
				</div>
				<div className={styles.buttonContainer}>
					<Button
						type="submit"
						disabled={!this.state.valid}
						clicked={event => this.onSubmitHandler(event)}
					>
						Добавить в таблицу
					</Button>
				</div>
			</form>
		) : (
			<div className={styles.Add}>
				<Button clicked={this.toggleActiveHandler}>Добавить</Button>
			</div>
		);
	}
}

export default Add;
