import React from "react";
import millify from "millify"; // for number formatting
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "../components";
import ProgressIndicator from "./ProgressIndicator";

const Homepage = () => {
	const { data, isFetching } = useGetCryptosQuery(10);

	console.log(data);

	if (isFetching) {
		return <ProgressIndicator />;
	}

	const globalStats = data?.data?.stats;

	return (
		<>
			<Typography.Title level={2} className="heading">
				Global Stats
			</Typography.Title>
			<Row>
				{/*ant design total span is 24 */}
				<Col span={12}>
					<Statistic title="Total Cryptocurrencies" value={globalStats.total} />
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Exchanges"
						value={globalStats.totalExchanges}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total Market Cap"
						value={globalStats.totalMarketCap}
					/>
				</Col>
				<Col span={12}>
					<Statistic
						title="Total 24h Volume"
						value={globalStats.total24hVolume}
					/>
				</Col>
				<Col span={12}>
					<Statistic title="Total Markets" value={globalStats.totalMarkets} />
				</Col>
			</Row>

			<div className="home-heading-container">
				<Typography.Title level={2} className="home-title">
					Top Cryptocurrencies
				</Typography.Title>
				<Typography.Title level={3} className="show-more">
					<Link to="/cryptocurrencies">Show more</Link>
				</Typography.Title>
			</div>
			<Cryptocurrencies simplified></Cryptocurrencies>

			<div className="home-heading-container">
				<Typography.Title level={2} className="home-title">
					Crypto News
				</Typography.Title>
				<Typography.Title level={3} className="show-more">
					<Link to="/news">Show more</Link>
				</Typography.Title>
			</div>
			<News simplified></News>
		</>
	);
};

export default Homepage;
