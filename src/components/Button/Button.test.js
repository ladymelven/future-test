import React from "react";
import Button from "./Button";
import styles from "./Button.module.css";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<Button />", () => {
	it("should render without throwing", () => {
		shallow(<Button />);
	});

	it("should render with class", () => {
		const wrapper = shallow(<Button type="submit" />);
		expect(wrapper.hasClass(styles.submit)).toEqual(true);
	});

	it("should render children", () => {
		const wrapper = shallow(<Button>someText</Button>);
		expect(wrapper.contains("someText")).toEqual(true);
	});

	it("should be disabled upon prop", () => {
		const wrapper = shallow(<Button disabled />);
		expect(wrapper.find({ disabled: true })).toHaveLength(1);
	});
});
