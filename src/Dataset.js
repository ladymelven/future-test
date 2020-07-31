import React from "react";
import "./App.css";

import ChooseSet from "./components/ChooseSet/ChooseSet";
import Spinner from "./components/Spinner/Spinner";
import Table from "./components/Table/Table";
import Pagination from "./components/Pagination/Pagination";
import Selected from "./components/Selected/Selected";
import Filter from "./components/Forms/Filter/Filter";
import Add from "./components/Forms/Add/Add";

class Dataset extends React.Component {
	/*доки Реакта советуют как можно меньше компонетов с состоянием. Поэтому оно есть
	только здесь и в формах (вся основная логика, handlers - здесь, в корневом компоненте).
	Если бы я знала, как сделать формы без состояний, то и они бы были dumb.*/
	state = {
		broken: false,
		fetching: false,
		hasData: false,
		data: [],
		filteredData: [],
		sorted: {
			id: false,
			firstName: false,
			lastName: false,
			email: false,
			phone: false
		},
		selected: null,
		totalPages: null,
		perPage: 50,
		currentPage: 1
	};

	fetchDataHandler = type => {
		// запускаем спиннер
		this.setState({ fetching: true });
		//задаем адрес запроса в зависимости от выбранного объема данных
		let url;
		if (type === "small") {
			url =
				"http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
		} else if (type === "large") {
			url =
				"http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}";
		}
		fetch(url)
			.then(response => {
				//проверяем успешность запроса, т.к. сам fetch выдает error только при ошибках сети
				if (response.ok) {
					return response.json();
				} else {
					throw new Error("Failed to reach server");
				}
			})
			.then(data => {
				const numPages = Math.ceil(data.length / this.state.perPage);
				this.setState({
					fetching: false,
					hasData: true,
					data: data,
					filteredData: data,
					totalPages: numPages
				});
			})
			.catch(error => {
				// это для разраба и продвинутого юзера
				console.log(error.message);
				// это для юзера
				this.setState({ fetching: false, hasData: false, broken: true });
			});
	};

	changePageHandler = page => {
		this.setState({ currentPage: page });
	};

	sortHandler = field => {
		//копируем данные для иммутабельного апдейта
		const newData = [];
		for (let item of this.state.data) {
			newData.push({ ...item });
		}
		if (this.state.sorted[field]) {
			newData.sort((a, b) => {
				return a[field] < b[field] ? 1 : -1;
			});
		} else {
			newData.sort((a, b) => {
				return a[field] > b[field] ? 1 : -1;
			});
		}

		//иммутабельно апдейтим также sorted, чтобы отобразить индикатор в шапке
		const newSorted = { ...this.state.sorted };
		newSorted[field] = !newSorted[field];

		this.setState({
			data: newData,
			filteredData: newData,
			sorted: newSorted,
			currentPage: 1
		});
	};

	//передаем id И телефон, потому что id не уникальны
	selectHandler = (id, phone) => {
		const selected = this.state.data.find(
			item => item.id === id && item.phone === phone
		);
		this.setState({ selected: selected });
	};

	filterHandler = string => {
		const filtered = this.state.data.filter(item => {
			const props = ["id", "firstName", "lastName", "email", "phone"];
			for (let prop of props) {
				if (item[prop].toString().includes(string)) {
					return true;
				}
			}
			return false;
		});
		const newLength = Math.ceil(filtered.length / this.state.perPage);
		this.setState({
			filteredData: filtered,
			currentPage: 1,
			totalPages: newLength
		});
	};

	addHandler = row => {
		const updatedData = [row];
		for (let item of this.state.data) {
			updatedData.push({ ...item });
		}
		//можно сначала скопировать, а потом unshift(), но это хуже для производительности

		const newLength = Math.ceil(updatedData.length / this.state.perPage);
		this.setState({
			data: updatedData,
			filteredData: updatedData,
			currentPage: 1,
			totalPages: newLength
		});
	};

	render() {
		//по дефолту в качестве welcome экрана рендерится модуль выбора размера
		let component = (
			<ChooseSet
				clickSmall={() => this.fetchDataHandler("small")}
				clickLarge={() => this.fetchDataHandler("large")}
			/>
		);

		let postsToRender;
		//для пагинации - рендерятся максимум 50 постов за раз
		if (this.state.currentPage === this.state.totalPages) {
			postsToRender = this.state.filteredData.slice(
				(this.state.currentPage - 1) * this.state.perPage
			);
		} else {
			postsToRender = this.state.filteredData.slice(
				(this.state.currentPage - 1) * this.state.perPage,
				this.state.currentPage * this.state.perPage
			);
		}

		//когда меняется состояние, показываем спиннер или основное UI
		if (this.state.fetching) {
			component = <Spinner />;
		} else if (this.state.hasData) {
			component = (
				<React.Fragment>
					<Add submit={this.addHandler} />
					<Filter submit={this.filterHandler} />
					<Table
						data={postsToRender}
						sort={this.sortHandler}
						select={this.selectHandler}
						sorted={this.state.sorted}
					/>
					{this.state.totalPages > 1 ? (
						<Pagination
							current={this.state.currentPage}
							totalPages={this.state.totalPages}
							changePage={this.changePageHandler}
						/>
					) : null}
					{this.state.selected ? <Selected item={this.state.selected} /> : null}
				</React.Fragment>
			);
			//если не загрузились посты - компонент не юзабелен, выводим сообщение об рошибке
		} else if (this.state.broken) {
			component = <h1 className="errorMessage">Ошибка при загрузке данных</h1>;
		}

		return <div>{component}</div>;
	}
}

export default Dataset;
