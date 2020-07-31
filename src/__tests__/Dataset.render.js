import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Dataset from "../Dataset";
import ChooseSet from "../components/ChooseSet/ChooseSet";
import Spinner from "../components/Spinner/Spinner";
import Table from "../components/Table/Table";
import Add from "../components/Forms/Add/Add";
import Filter from "../components/Forms/Filter/Filter";
import Pagination from "../components/Pagination/Pagination";

configure({ adapter: new Adapter() });

describe("<Dataset />", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Dataset />);
	});

	it("should render without data passed in", () => {
		expect(wrapper.find("div")).toHaveLength(1);
	});

	it("should render only ChooseSet by default", () => {
		expect(wrapper.find(ChooseSet)).toHaveLength(1);
		expect(wrapper.contains(<Spinner />)).toBe(false);
		expect(wrapper.contains(<Add />)).toBe(false);
		expect(wrapper.contains(<Filter />)).toBe(false);
		expect(wrapper.contains(<Table />)).toBe(false);
		expect(wrapper.contains(<Pagination />)).toBe(false);
	});

	it("should render Spinner when loading", () => {
		wrapper.setState({ fetching: true });
		expect(wrapper.find(Spinner)).toHaveLength(1);
		expect(wrapper.contains(<ChooseSet />)).toBe(false);
		expect(wrapper.contains(<Add />)).toBe(false);
		expect(wrapper.contains(<Filter />)).toBe(false);
		expect(wrapper.contains(<Table />)).toBe(false);
		expect(wrapper.contains(<Pagination />)).toBe(false);
	});

	it("should render error message when broken", () => {
		wrapper.setState({ broken: true });
		expect(wrapper.find(".errorMessage")).toHaveLength(1);
		expect(wrapper.contains(<ChooseSet />)).toBe(false);
		expect(wrapper.contains(<Spinner />)).toBe(false);
		expect(wrapper.contains(<Add />)).toBe(false);
		expect(wrapper.contains(<Filter />)).toBe(false);
		expect(wrapper.contains(<Table />)).toBe(false);
		expect(wrapper.contains(<Pagination />)).toBe(false);
	});

	it("should render Table, Add and Filter when has data", () => {
		wrapper.setState({ hasData: true });
		expect(wrapper.find(Add)).toHaveLength(1);
		expect(wrapper.find(Filter)).toHaveLength(1);
		expect(wrapper.find(Table)).toHaveLength(1);
		expect(wrapper.contains(<ChooseSet />)).toBe(false);
		expect(wrapper.contains(<Spinner />)).toBe(false);
	});

	it("should only render Pagination when 2+ pages", () => {
		wrapper.setState({ hasData: true, totalPages: 1 });
		expect(wrapper.contains(<Pagination />)).toBe(false);
		wrapper.setState({ hasData: true, totalPages: 2 });
		wrapper.update();
		expect(wrapper.find(Pagination)).toHaveLength(1);
	});
});
