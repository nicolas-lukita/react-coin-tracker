import React from "react";
import { Spin } from "antd";

const ProgressIndicator = () => {
	return (
		<div className="loader">
			<Spin tip="Loading..." />
		</div>
	);
};

export default ProgressIndicator;
