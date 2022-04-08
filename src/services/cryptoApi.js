import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
	"X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
	"X-RapidAPI-Key": "ab5f0eda0emshf4ae307b59c3bdep1308a6jsn583061fe0273",
};

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createReq = (url) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
	reducerPath: "cryptoApi",
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: (builder) => ({
		getCryptos: builder.query({
			query: (count) => createReq(`/coins?limit=${count}`),
		}),
		getCryptoDetails: builder.query({
			query: (coinId) => createReq(`/coin/${coinId}`),
		}),
		getCryptoHistory: builder.query({
			query: ({ coinId, timePeriod }) =>
				createReq(`/coin/${coinId}/history?timeperiod=${timePeriod}`),
		}),
	}),
});

export const {
	useGetCryptosQuery,
	useGetCryptoDetailsQuery,
	useGetCryptoHistoryQuery,
} = cryptoApi;
