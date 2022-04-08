import React, { useState, useEffect } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Row, Col, Card, Input } from "antd";
import millify from "millify";
import { Link } from "react-router-dom";
import ProgressIndicator from "./ProgressIndicator";

const Cryptocurrencies = (props) => {
	const count = props.simplified ? 10 : 100;
	const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
	const [cryptos, setCryptos] = useState([]);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		const filteredCryptos = cryptoList?.data?.coins.filter((crypto) =>
			crypto.name.toLowerCase().includes(searchText.toLowerCase())
		);

		setCryptos(filteredCryptos);
	}, [searchText, cryptoList]);

	if (isFetching) {
		return <ProgressIndicator />;
	}

	return (
		<>
			{!props.simplified && (
				<div className="search-crypto">
					<Input
						placeholder="Search Cryptocurrency"
						onChange={(e) => setSearchText(e.target.value)}
					/>
				</div>
			)}
			<Row
				gutter={[32, 32] /*spaces in-between items*/}
				className="crypto-card-container"
			>
				{cryptos?.map((crypto) => {
					return (
						<Col
							xs={24 /*width on small device (total is 24)*/}
							sm={12 /*2 item per row for small (12/24)*/}
							lg={6 /*large */}
							className="crypto-card"
							key={crypto.uuid}
						>
							<Link to={`/crypto/${crypto.uuid}`} key={crypto.uuid}>
								<Card
									title={`${crypto.rank}. ${crypto.name}`}
									extra={
										<img
											className="crypto-image"
											src={crypto.iconUrl}
											alt="logo"
										></img>
									}
									hoverable
								>
									<p>
										Price:{" "}
										{
											millify(
												crypto.price
											) /*millify to makes number readable */
										}
									</p>
									<p>Market Cap: {millify(crypto.marketCap)}</p>
									<p>Daily Change: {millify(crypto.change)}%</p>
								</Card>
							</Link>
						</Col>
					);
				})}
			</Row>
		</>
	);
};

export default Cryptocurrencies;
