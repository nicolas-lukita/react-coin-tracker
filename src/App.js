import React from "react";
import {
	Navbar,
	Homepage,
	CryptoDetails,
	Cryptocurrencies,
	News,
} from "./components";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";
import "./App.css";

const App = () => {
	return (
		<div className="app">
			<div className="main">
				<Layout>
					<Layout.Header style={{ minHeight: "100px" }}>
						<Navbar></Navbar>
					</Layout.Header>

					<Layout.Content style={{ padding: "0 50px" }}>
						<div className="routes">
							<Routes>
								<Route exact path="/" element={<Homepage />}></Route>
								<Route
									exact
									path="/cryptocurrencies"
									element={<Cryptocurrencies />}
								></Route>
								<Route
									exact
									path="/crypto/:coinId"
									element={<CryptoDetails />}
								></Route>
								<Route exact path="/news" element={<News />}></Route>
							</Routes>
						</div>
					</Layout.Content>
				</Layout>

				<div className="footer">
					<Typography.Title level={5} style={{ color: "white" }}>
						Coin Tracker © <br />
						by {"Nicolas Lu"}
					</Typography.Title>
					<Space>
						<Link to="/">Home</Link>
						<Link to="/cryptocurrencies">Cryptocurrencies</Link>
						<Link to="/news">News</Link>
					</Space>
				</div>
			</div>
		</div>
	);
};

export default App;
