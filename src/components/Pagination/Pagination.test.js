import React from "react";
import Pagination from "./Pagination";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import styles from "./Pagination.module.css";

configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
	wrapper = shallow(<Pagination />);
});

describe("<Pagination />", () => {
	it("should render without throwing", () => {
		shallow(<Pagination />);
	});

	it("should render in the middle with breaks", () => {
		wrapper.setProps({ totalPages: 10, current: 5 });
		expect(wrapper.find(`.${styles.break}`)).toHaveLength(2);
	});

	it("should render first page without breaks", () => {
		wrapper.setProps({ totalPages: 3, current: 1 });
		expect(wrapper.children()).toHaveLength(3);
	});

	it("should render last page with breaks", () => {
		wrapper.setProps({ totalPages: 10, current: 10 });
		expect(wrapper.children()).toHaveLength(5);
	});
});
