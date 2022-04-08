import React, { useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { useGetNewsQuery } from "../services/cryptoNewsApi";
import { Row, Typography, Col, Card, Avatar, Select } from "antd";
import moment from "moment";
import ProgressIndicator from "./ProgressIndicator";

const { Option } = Select;
const placeholderImg =
	"https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = (props) => {
	const [userNewsCategory, setUserNewsCategory] = useState("Cryptocurrency");
	const { data: cryptoNews } = useGetNewsQuery({
		newsCategory: userNewsCategory,
		count: props.simplified ? 6 : 24,
	});
	const { data, isFetching } = useGetCryptosQuery(10);
	console.log(cryptoNews);

	if (!cryptoNews?.value || isFetching) {
		return <ProgressIndicator />;
	}

	return (
		<Row gutter={[24, 24]}>
			{!props.simplified && (
				<Col span={24}>
					<Select
						showSearch
						className="select-news"
						placeholder="Select a Crypto"
						optionFilterProp="children"
						onChange={(value) => setUserNewsCategory(value)}
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
					>
						<Option value="Cryptocurency">Cryptocurrency</Option>
						{data?.data?.coins?.map((currency, i) => (
							<Option value={currency.name} key={i}>
								{currency.name}
							</Option>
						))}
					</Select>
				</Col>
			)}

			{cryptoNews.value.map((news, index) => (
				<Col key={index.toString()} xs={24} sm={12} lg={8}>
					<Card hoverable className="news-card">
						<a href={news.url} target="_blank" rel="noreferrer">
							<div className="news-image-container">
								<img
									src={news?.image?.thumbnail?.contentUrl || placeholderImg}
									alt="news"
									style={{ maxWidth: "200px", maxHeight: "100px" }}
								></img>
								<Typography.Title level={4} className="news-title">
									{news.name}
								</Typography.Title>
							</div>
							<p>
								{news.description.length > 250
									? `${news.description.substring(0, 250)}...`
									: news.description}
							</p>
							<div className="provider-container">
								<div>
									<Avatar
										src={news?.provider[0]?.image?.thumbnail?.contentUrl}
										alt="news-provider"
										style={{ maxWidth: "50px", maxHeight: "50px" }}
									/>
									<Typography.Text className="provider-name">
										{news.provider[0].name}
									</Typography.Text>
								</div>
								<Typography.Text>
									{moment(news.datePublished).startOf("ss").fromNow()}
								</Typography.Text>
							</div>
						</a>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default News;
