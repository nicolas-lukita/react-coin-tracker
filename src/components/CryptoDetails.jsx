import React, { useState } from "react";
import {
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import { Row, Col, Typography, Select } from "antd";
import {
	MoneyCollectOutlined,
	DollarCircleOutlined,
	FundOutlined,
	ExclamationCircleOutlined,
	StopOutlined,
	TrophyOutlined,
	CheckOutlined,
	NumberOutlined,
	ThunderboltOutlined,
} from "@ant-design/icons";
import millify from "millify";
import { useParams } from "react-router-dom";
import HTMLReactParser from "html-react-parser";
import LineChart from "./LineChart";
import ProgressIndicator from "./ProgressIndicator";

const CryptoDetails = () => {
	//useparams get id from url
	const { coinId } = useParams();
	const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
	const [timePeriod, setTimePeriod] = useState("1y");
	const coinData = data?.data?.coin;

	const { data: coinHistory } = useGetCryptoHistoryQuery({
		coinId,
		timePeriod,
	});
	console.log(coinHistory);

	const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

	const stats = [
		{
			title: "Price in USD",
			value: `$ ${coinData?.price && millify(coinData?.price)}`,
			icon: <DollarCircleOutlined />,
		},
		{ title: "Rank", value: coinData?.rank, icon: <NumberOutlined /> },
		{
			title: "24h Volume",
			value: `$ ${coinData?.volume && millify(coinData?.volume)}`,
			icon: <ThunderboltOutlined />,
		},
		{
			title: "Market Cap",
			value: `$ ${coinData?.marketCap && millify(coinData?.marketCap)}`,
			icon: <DollarCircleOutlined />,
		},
		{
			title: "All-time-high(daily avg.)",
			value: `$ ${
				coinData?.allTimeHigh?.price && millify(coinData?.allTimeHigh?.price)
			}`,
			icon: <TrophyOutlined />,
		},
	];

	const genericStats = [
		{
			title: "Number Of Markets",
			value: coinData?.numberOfMarkets,
			icon: <FundOutlined />,
		},
		{
			title: "Number Of Exchanges",
			value: coinData?.numberOfExchanges,
			icon: <MoneyCollectOutlined />,
		},
		{
			title: "Aprroved Supply",
			value: coinData?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />,
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: "Total Supply",
			value: `$ ${coinData?.supply?.total && millify(coinData?.supply?.total)}`,
			icon: <ExclamationCircleOutlined />,
		},
		{
			title: "Circulating Supply",
			value: `$ ${
				coinData?.supply?.circulating && millify(coinData?.supply?.circulating)
			}`,
			icon: <ExclamationCircleOutlined />,
		},
	];

	if (isFetching) {
		return <ProgressIndicator />;
	}

	return (
		<Col className="coin-detail-container">
			<Col className="coin-heading-container">
				<Typography.Title className="coin-name">
					{coinData.name} [{coinData.symbol}]
				</Typography.Title>
				<p>
					{coinData.name} live price in USD. View value statistics, market cap,
					and supply
				</p>
			</Col>
			<Select
				defaultValue="7d"
				className="select-timeperiod"
				placeholder="Select Time Period"
				onChange={(value) => setTimePeriod(value)}
			>
				{time.map((date) => (
					<Select.Option key={date}>{date}</Select.Option>
				))}
			</Select>
			{
				<LineChart
					coinName={coinData.name}
					coinHistory={coinHistory}
					currentPrice={millify(coinData?.price)}
				></LineChart>
			}
			<Col className="stats-container">
				<Col className="coin-value-statistics">
					<Col className="coin-value-heading">
						<Typography.Title level={2}>
							{coinData.name} Value Statistics
						</Typography.Title>
						<p> An overview showing the stats of {coinData.name}</p>
					</Col>
					{stats.map((stats, i) => (
						<Col className="coin-stats" key={i}>
							<Col className="coin-stats-name">
								<Typography.Text>{stats.icon}</Typography.Text>
								<Typography.Text>{stats.title}</Typography.Text>
							</Col>
							<Typography.Text className="stats">{stats.value}</Typography.Text>
						</Col>
					))}
				</Col>
				<Col className="coin-value-statistics">
					<Col className="coin-value-heading">
						<Typography.Title level={2}>Other Statistics</Typography.Title>
						<p>General cryptocurrencies statistics</p>
					</Col>
					{genericStats.map((stats, i) => (
						<Col className="coin-stats" key={i}>
							<Col className="coin-stats-name">
								<Typography.Text>{stats.icon}</Typography.Text>
								<Typography.Text>{stats.title}</Typography.Text>
							</Col>
							<Typography.Text className="stats">{stats.value}</Typography.Text>
						</Col>
					))}
				</Col>
			</Col>
			<Col className="coin-desc-link">
				<Row className="coin-desc">
					<Typography.Title level={3} className="coin-details-heading">
						{coinData.name}
					</Typography.Title>
					{HTMLReactParser(coinData.description)}
				</Row>
				<Col className="coin-links">
					<Typography.Title level={3} className="coin-details-heading">
						{coinData.name} Links
					</Typography.Title>
					{coinData.links.map((link, i) => (
						<Row key={i} className="coin-link">
							<Typography.Title level={5} className="link-name">
								{link.type}
							</Typography.Title>
							<a href={link.url} target="_blank" rel="noreferrer">
								{link.name}
							</a>
						</Row>
					))}
				</Col>
			</Col>
		</Col>
	);
};

export default CryptoDetails;
