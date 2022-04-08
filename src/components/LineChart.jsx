import React from "react";
import { Row, Col, Typography } from "antd";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

const LineChart = (props) => {
	const coinPrice = [];
	const coinTimestamp = [];
	for (let i = props.coinHistory?.data?.history?.length - 1; i > 0; i--) {
		coinPrice.push(props.coinHistory.data.history[i].price);
		coinTimestamp.push(
			new Date(
				props.coinHistory.data.history[i].timestamp * 1000
			).toLocaleDateString([], { hour: "2-digit", minute: "2-digit" })
		);
	}
	const data = {
		labels: coinTimestamp,
		datasets: [
			{
				label: props.coinName,
				data: coinPrice,
				tension: 0.1,
				fill: true,
				borderColor: "rgb(88, 133, 237)",
			},
		],
	};

	const option = {
		scales: {
			yAxes: {
				ticks: {
					beginAtZero: true,
				},
			},
		},
	};

	return (
		<>
			<Row className="chart-header">
				<Typography.Title level={2} className="chart-title">
					{props.coinName}
				</Typography.Title>
				<Col className="price-container">
					<Typography.Title level={5} className="price-change">
						{props.coinHistory?.data?.change}%
					</Typography.Title>
					<Typography.Title level={5} className="current-price">
						Current price: ${props.currentPrice}
					</Typography.Title>
				</Col>
			</Row>
			<Line data={data} options={option}></Line>
		</>
	);
};

export default LineChart;
