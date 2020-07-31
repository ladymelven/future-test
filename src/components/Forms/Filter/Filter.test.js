import React from "react";
import Filter from "./Filter";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<Filter />", () => {
	it("should render without throwing", () => {
		shallow(<Filter />);
	});
});
