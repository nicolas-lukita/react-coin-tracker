import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsApiHeaders = {
	"X-BingApis-SDK": "true",
	"X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
	"X-RapidAPI-Key": "ab5f0eda0emshf4ae307b59c3bdep1308a6jsn583061fe0273",
};

const baseUrl = "https://bing-news-search1.p.rapidapi.com";

const createReq = (url) => ({ url, headers: cryptoNewsApiHeaders });

export const cryptoNewsApi = createApi({
	reducerPath: "cryptoNewsApi",
	baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
	endpoints: (builder) => ({
		getNews: builder.query({
			query: ({ newsCategory, count }) =>
				createReq(
					`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
				),
		}),
	}),
});

export const { useGetNewsQuery } = cryptoNewsApi;
