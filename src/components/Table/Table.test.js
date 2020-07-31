import React from "react";
import Table from "./Table";
import Row from "./Row/Row";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<Table />", () => {
	it("should render without throwing", () => {
		shallow(<Table data={[]} sorted={{}} />);
	});

	it("should render 3 rows upon props", () => {
		const wrapper = shallow(
			<Table
				data={[
					{
						id: 1,
						firstName: "Test1",
						lastName: "Test1",
						email: "@",
						phone: "1"
					},
					{
						id: 2,
						firstName: "Test2",
						lastName: "Test2",
						email: "@",
						phone: "2"
					},
					{
						id: 3,
						firstName: "Test3",
						lastName: "Test3",
						email: "@",
						phone: "3"
					}
				]}
				sorted={{}}
			/>
		);
		expect(wrapper.find(Row)).toHaveLength(3);
	});

	it("should update indicator upon sorting", () => {
		const wrapper = shallow(<Table data={[]} sorted={{}} />);
		expect(
			wrapper
				.find("th")
				.first()
				.text()
		).toEqual("Id ▼");
		wrapper.setProps({ sorted: { id: true } });
		expect(
			wrapper
				.find("th")
				.first()
				.text()
		).toEqual("Id ▲");
	});
});
