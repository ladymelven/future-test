import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Dataset from "../Dataset";
import Selected from "../components/Selected/Selected";

configure({ adapter: new Adapter() });

describe("<Dataset />", () => {
	let wrapper;
	let instance;

	beforeEach(() => {
		wrapper = shallow(<Dataset />);
		instance = wrapper.instance();
		wrapper.setState({
			data: [
				{
					id: 2,
					firstName: "Test2",
					lastName: "Test2",
					email: "@",
					phone: "2"
				},
				{
					id: 1,
					firstName: "Test1",
					lastName: "Test1",
					email: "@",
					phone: "1"
				},
				{
					id: 3,
					firstName: "Test3",
					lastName: "Test3",
					email: "@",
					phone: "3"
				}
			]
		});
	});

	it("should change pages", () => {
		wrapper.setState({ hasData: true, currentPage: null });
		instance.changePageHandler(2);
		expect(wrapper.state("currentPage")).toEqual(2);
	});

	it("should sort elements by field", () => {
		expect(wrapper.state("data")[0].id).toEqual(2);
		instance.sortHandler("id");
		expect(wrapper.state("data")[0].id).toEqual(1);
		expect(wrapper.state("sorted").id).toEqual(true);
	});

	it("should filter elements and update page count", () => {
		instance.filterHandler("1");
		expect(wrapper.state("filteredData")).toHaveLength(1);
		expect(wrapper.state("totalPages")).toEqual(1);
	});

	it("should select element and render Selected", () => {
		expect(wrapper.contains(<Selected />)).toBe(false);
		instance.selectHandler(1, "1");
		expect(wrapper.state("selected").id).toEqual(1);
		expect(wrapper.find(Selected)).toHaveLength(1);
	});

	it("should add new items to data and update page count", () => {
		instance.addHandler({
			id: 4,
			firstName: "Anna",
			lastName: "Zotova",
			email: "@",
			phone: "4",
			address: {}
		});
		expect(wrapper.state("data")[0].id).toEqual(4);
		expect(wrapper.state("data")[0].firstName).toEqual("Anna");
		expect(wrapper.state("filteredData")[0].lastName).toEqual("Zotova");
		expect(wrapper.state("totalPages")).toEqual(1);
	});
});
