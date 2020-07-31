import React from "react";
import Add from "./Add";
import styles from "./Add";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<Add />", () => {
	it("should render without throwing", () => {
		shallow(<Add />);
	});

	it("should disable button", () => {
		expect(shallow(<Add />).find({ disabled: true })).toBeTruthy();
	});

	it("should render input#id", () => {
		expect(shallow(<Add />).find("input#id")).toBeTruthy();
	});

	// it("should update state on change", () => {
	// 	const testState = { id: null };
	// 	const wrapper = shallow(
	// 		<Add
	// 			id={testState.id}
	// 			onChange={e => {
	// 				testState[e.target.name] = e.target.value;
	// 			}}
	// 		/>
	// 	);
	// 	const idInput = wrapper.find("input#id");
	// 	console.log(idInput);
	// 	idInput.simulate("focus");
	// 	idInput.simulate("change", { target: { name: "id", value: "42" } });
	// 	expect(testState.id).toEqual("42");
	// });
});
