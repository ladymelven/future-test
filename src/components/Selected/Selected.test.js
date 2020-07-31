import React from "react";
import Selected from "./Selected";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("<Selected />", () => {
	it("should render without throwing", () => {
		shallow(
			<Selected
				item={{
					firstName: "Anna",
					lastName: "Zotova",
					description: "Test",
					address: {}
				}}
			/>
			//Без вводных данных выдает еррор, с ними не выдает
		);
	});
});
