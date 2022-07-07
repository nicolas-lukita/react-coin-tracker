import React from "react";
import { Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
	HomeOutlined,
	MoneyCollectOutlined,
	BulbOutlined,
} from "@ant-design/icons";

const Navbar = () => {
	return (
		<>
			<div className="layout-header">
				<div className="logo-container">
					<Typography.Title level={2} className="logo">
						<Link to="/"> Coin Tracker </Link>
					</Typography.Title>
				</div>
				<div className="nav-container">
					<Menu theme="dark" mode="horizontal">
						<Menu.Item key="1" icon={<HomeOutlined />}>
							<Link to="/">Home</Link>
						</Menu.Item>
						<Menu.Item key="2" icon={<MoneyCollectOutlined />}>
							<Link to="/cryptocurrencies">Coins</Link>
						</Menu.Item>
						<Menu.Item key="3" icon={<BulbOutlined />}>
							<Link to="/news">News</Link>
						</Menu.Item>
					</Menu>
				</div>
			</div>
		</>
	);
};

export default Navbar;
